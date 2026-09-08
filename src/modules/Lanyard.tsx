/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, type ThreeElement, type ThreeEvent } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, type RapierRigidBody, type RigidBodyProps } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import cardGLB from '../assets/lanyard/card.glb';
import lanyard from '../assets/lanyard/lanyard.png';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    meshLineGeometry: ThreeElement<typeof MeshLineGeometry>;
    meshLineMaterial: ThreeElement<typeof MeshLineMaterial>;
  }
}

const BLANK_PIXEL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

interface LanyardProps {
  position?: [number, number, number]; gravity?: [number, number, number]; fov?: number; transparent?: boolean;
  frontImage?: string | null; backImage?: string | null; imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null; lanyardWidth?: number;
}

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true, frontImage = null, backImage = null, imageFit = 'cover', lanyardImage = null, lanyardWidth = 1 }: LanyardProps) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [rendererKey, setRendererKey] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  useEffect(() => {
    const frameId = requestAnimationFrame(() => setCanvasReady(true));
    return () => cancelAnimationFrame(frameId);
  }, []);
  return <div className="lanyard-wrapper">
    {canvasReady && <Canvas
      key={rendererKey}
      camera={{ position, fov }}
      dpr={isMobile ? 1 : 1.25}
      gl={{ alpha: transparent, antialias: false, powerPreference: 'low-power' }}
      onCreated={({ gl, invalidate }) => {
        gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1);
        gl.domElement.addEventListener('webglcontextlost', event => {
          event.preventDefault();
          window.setTimeout(() => setRendererKey(key => key + 1), 250);
        }, false);
        gl.domElement.addEventListener('webglcontextrestored', () => {
          gl.resetState();
          invalidate();
        }, false);
      }}
    >
      <ambientLight intensity={Math.PI} />
      <Physics gravity={gravity} timeStep={isMobile ? 1 / 30 : 1 / 60}>
        <Band isMobile={isMobile} frontImage={frontImage} backImage={backImage} imageFit={imageFit} lanyardImage={lanyardImage} lanyardWidth={lanyardWidth} />
      </Physics>
      <Environment blur={0.75}>
        <Lightformer intensity={2} color="white" position={[0, -1, 5]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[-1, -1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={3} color="white" position={[1, 1, 1]} rotation={[0, 0, Math.PI / 3]} scale={[100, 0.1, 1]} />
        <Lightformer intensity={10} color="white" position={[-10, 0, 14]} rotation={[0, Math.PI / 2, Math.PI / 3]} scale={[100, 10, 1]} />
      </Environment>
    </Canvas>}
  </div>;
}

interface BandProps { isMobile?: boolean; frontImage?: string | null; backImage?: string | null; imageFit?: 'cover' | 'contain'; lanyardImage?: string | null; lanyardWidth?: number; }
type LanyardRigidBody = RapierRigidBody & { lerped?: THREE.Vector3 };

function Band({ isMobile = false, frontImage = null, backImage = null, imageFit = 'cover', lanyardImage = null, lanyardWidth = 1 }: BandProps) {
  const band = useRef<THREE.Mesh<InstanceType<typeof MeshLineGeometry>, InstanceType<typeof MeshLineMaterial>>>(null!);
  const fixed = useRef<RapierRigidBody>(null!); const j1 = useRef<LanyardRigidBody>(null!); const j2 = useRef<LanyardRigidBody>(null!); const j3 = useRef<RapierRigidBody>(null!); const card = useRef<RapierRigidBody>(null!);
  const vec = new THREE.Vector3(); const ang = new THREE.Vector3(); const rot = new THREE.Vector3(); const dir = new THREE.Vector3();
  const segmentProps: RigidBodyProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const getLerped = (body: LanyardRigidBody) => { body.lerped ??= new THREE.Vector3().copy(body.translation()); return body.lerped; };
  const { nodes, materials } = useGLTF(cardGLB) as any;
  const texture = useTexture(lanyardImage || lanyard); const frontTex = useTexture(frontImage || BLANK_PIXEL); const backTex = useTexture(backImage || BLANK_PIXEL);
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map as THREE.Texture;
    if (!frontImage && !backImage) return baseMap;
    const baseImg = baseMap.image as any; const canvas = document.createElement('canvas'); canvas.width = baseImg.width; canvas.height = baseImg.height;
    const ctx = canvas.getContext('2d'); if (!ctx) return baseMap; ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);
    const drawFitted = (img: any, rect: typeof FRONT_UV_RECT) => { const rx = rect.x * canvas.width; const ry = rect.y * canvas.height; const rw = rect.w * canvas.width; const rh = rect.h * canvas.height; const scale = (imageFit === 'contain' ? Math.min : Math.max)(rw / img.width, rh / img.height); const dw = img.width * scale; const dh = img.height * scale; ctx.save(); ctx.beginPath(); ctx.rect(rx, ry, rw, rh); ctx.clip(); ctx.drawImage(img, rx + (rw - dw) / 2, ry + (rh - dh) / 2, dw, dh); ctx.restore(); };
    if (frontImage && frontTex.image) drawFitted(frontTex.image, FRONT_UV_RECT); if (backImage && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);
    const composite = new THREE.CanvasTexture(canvas); composite.colorSpace = THREE.SRGBColorSpace; composite.flipY = baseMap.flipY; composite.anisotropy = 16; return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);
  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState<false | THREE.Vector3>(false); const [hovered, hover] = useState(false);
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]); useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]); useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]); useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]);
  useEffect(() => { document.body.style.cursor = hovered ? (dragged ? 'grabbing' : 'grab') : 'auto'; return () => { document.body.style.cursor = 'auto'; }; }, [hovered, dragged]);
  useFrame((state, delta) => {
    if (dragged) { vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera); dir.copy(vec).sub(state.camera.position).normalize(); vec.add(dir.multiplyScalar(state.camera.position.length())); [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp()); card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z }); }
    if (fixed.current) { [j1, j2].forEach(ref => { const lerped = getLerped(ref.current); const distance = Math.max(0.1, Math.min(1, lerped.distanceTo(ref.current.translation()))); lerped.lerp(ref.current.translation(), delta * distance * 50); }); curve.points[0].copy(j3.current.translation()); curve.points[1].copy(getLerped(j2.current)); curve.points[2].copy(getLerped(j1.current)); curve.points[3].copy(fixed.current.translation()); band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32)); ang.copy(card.current.angvel()); rot.copy(card.current.rotation()); card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z }, true); }
  });
  curve.curveType = 'chordal'; texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return <>
    <group position={[0, 4, 0]}>
      <RigidBody ref={fixed} {...segmentProps} type="fixed" />
      <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}><BallCollider args={[0.1]} /></RigidBody>
      <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
        <CuboidCollider args={[0.8, 1.125, 0.01]} />
        <group scale={2.25} position={[0, -1.2, -0.05]} onPointerOver={() => hover(true)} onPointerOut={() => hover(false)} onPointerUp={(event: ThreeEvent<PointerEvent>) => { (event.target as Element).releasePointerCapture(event.pointerId); drag(false); }} onPointerDown={(event: ThreeEvent<PointerEvent>) => { (event.target as Element).setPointerCapture(event.pointerId); drag(new THREE.Vector3().copy(event.point).sub(vec.copy(card.current.translation()))); }}>
          <mesh geometry={nodes.card.geometry}><meshPhysicalMaterial map={cardMap} map-anisotropy={16} clearcoat={isMobile ? 0 : 1} clearcoatRoughness={0.15} roughness={0.9} metalness={0.8} /></mesh>
          <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} /><mesh geometry={nodes.clamp.geometry} material={materials.metal} />
        </group>
      </RigidBody>
    </group>
    <mesh ref={band}><meshLineGeometry /><meshLineMaterial color="white" depthTest={false} resolution={isMobile ? [1000, 2000] : [1000, 1000]} useMap map={texture} repeat={[-4, 1]} lineWidth={lanyardWidth} /></mesh>
  </>;
}
