import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
import GhostFibers from '../modules/GhostFibers';
import HobbyCard from '../modules/HobbyCard';
import RevealOnScroll from '../modules/RevealOnScroll';
import { hobbies } from '../data/loadHobbies';
import SpecularButton from '../modules/SpecularButton';
import Magnet from '../modules/Magnet';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
import './JobsPage.css';

function HobbiesPage() {
    const { t } = useTranslation();
    const quality = useAdaptiveQuality();

    const threads = quality === 'low' ? 12 : quality === 'medium' ? 60 : 120;

    return (
        <>
            <div className="studies-bg-fixed jobs-page-bg">
                <GhostFibers
                    glowColor="#34d399"
                    layers={2}
                    twist={0.7}
                    threads={threads}
                    fiberStyle="lines"
                    depthOfField={0.45}
                    hoverEffect="focus"
                    intro
                    mouseInteraction
                    lineColor="#ecfdf5"
                    secondaryColor="#0ea5e9"
                    gradient="depth"
                    waves={1.5}
                    volume={1.1}
                    spread={1}
                    scale={1}
                    rotation={18}
                    perspective={0.65}
                    density={1}
                    thickness={1}
                    tips={0}
                    foldGlow={2}
                    speed={0.5}
                    flow={0.4}
                    rollSpeed={0.15}
                    focusDepth={0}
                    particles={1}
                    sparkle={0.2}
                    glow={0.8}
                    brightness={1}
                    vignette={0.3}
                    grain={0.06}
                    mouseStrength={1}
                    pulseOnClick
                    lightMode={false}
                />
            </div>
            <div className="studies-content-layer">
                <main className="hero-section studies-hero-section">
                    <TextType
                        as="h1"
                        className="projects-text-type"
                        text={[t("hobbies.title1"), t("hobbies.title2"), t("hobbies.title3")]}
                        typingSpeed={75}
                        pauseDuration={2500}
                        showCursor
                        cursorCharacter="_"
                        deletingSpeed={50}
                        variableSpeed={{ min: 60, max: 120 }}
                        cursorBlinkDuration={0.5}
                    />
                </main>

                <NavBar />
                <div className="container mt-5 studies-list">
                    {hobbies.map((hobby, index) => {
                        const isOdd = index % 2 === 0;
                        return (
                            <RevealOnScroll key={hobby.id} className="studies-list__row-wrapper">
                                <div className="row studies-list__row">
                                    {isOdd ? (
                                        <>
                                            <div className="col-12 col-xl-5">
                                                <HobbyCard hobby={hobby} />
                                            </div>
                                            <div className="col-xl-7 d-none d-xl-block" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="col-xl-7 d-none d-xl-block" />
                                            <div className="col-12 col-xl-5">
                                                <HobbyCard hobby={hobby} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                <div className="magnet-button-container">
                    <Magnet
                        wrapperClassName="projects-magnet-vignette"
                        padding={{ left: 250, right: 250, top: 100, bottom: 40 }}
                        disabled={false}
                        magnetStrength={1}
                    >
                        <div className="specular-button-shell p-0">
                            <SpecularButton
                                size="md" radius={18} tint="#ffffff" tintOpacity={0} blur={24}
                                textColor="#f5f5f5" lineColor="#3664c9" baseColor="#4d4d4d" intensity={1}
                                shineSize={14} shineFade={36} thickness={1} speed={0.35}
                                followMouse proximity={250}
                                onClick={() => {
                                    window.location.href = 'mailto:marosvaridaniel7@gmail.com';
                                }}>
                                {t("impressed")}
                            </SpecularButton>
                        </div>
                    </Magnet>
                </div>
            </div>
        </>
    );
}

export default HobbiesPage;

