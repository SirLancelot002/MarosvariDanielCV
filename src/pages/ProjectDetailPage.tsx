import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect } from 'react';
import NavBar from '../NavBar';
import { projects } from '../data/loadProjects';
import { publicAsset } from '../utils/asset';
import { formatProjectDuration } from '../utils/date';
import './ProjectDetailPage.css';
import FaultyTerminal from '../modules/FaultyTerminal';
import DifficultyLevel from '../modules/DifficultyLevel';
import TiltedCard from '../modules/TiltedCard';
import GradientText from '../modules/GradientText';
import SpecularButton from '../modules/SpecularButton';
import { getBlockColumnClasses } from '../utils/blockLayout';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';

import calendarLogoImg from '../assets/calendarlogo.png';

function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const lang = i18n.language === 'hu' ? 'hu' : 'en';
    const quality = useAdaptiveQuality();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    // Bigger squares (in rem, so they stay square and consistent across screens) and a lower render resolution are cheaper to shade.
    let squareSizeRem = 1.75;
    let terminalDpr = Math.min(window.devicePixelRatio || 1, 2);

    switch (quality) {
        case 'low':
            squareSizeRem = 6;
            terminalDpr = 1;
            break;
        case 'medium':
            squareSizeRem = 4;
            terminalDpr = Math.min(window.devicePixelRatio || 1, 1.5);
            break;
        case 'high':
            squareSizeRem = 2.25;
            terminalDpr = Math.min(window.devicePixelRatio || 1, 2);
            break;
    }

    const project = projects.find(p => p.id === id);

    if (!project) {
        return <Navigate to="/projects" replace />;
    }

    const content = project.translations[lang];
    const accentColor = project.color ?? '#a67dff';

    return (
        <>
            <div className="studies-bg-fixed project-detail-bg-fixed">
                <FaultyTerminal
                    scale={1.5}
                    squareSizeRem={squareSizeRem}
                    digitSize={1.2}
                    dpr={terminalDpr}
                    timeScale={0.5}
                    pause={false}
                    scanlineIntensity={0.5}
                    glitchAmount={1}
                    flickerAmount={1}
                    noiseAmp={1}
                    chromaticAberration={0}
                    dither={0}
                    curvature={0.1}
                    tint="#A7EF9E"
                    mouseReact={true}
                    mouseStrength={0.5}
                    pageLoadAnimation
                    brightness={0.6}
                />
            </div>
            <div className="studies-content-layer project-detail-content-layer">
                <NavBar />

                <div className="container mt-5 studies-content-container project-detail-container">
                    <article className="project-detail" style={{ '--project-accent': accentColor } as React.CSSProperties}>
                        <div className="row project-detail__top-row align-items-center">
                            <div className="col-12 col-md-6">
                                <Link to="/projects" className="project-detail__back">
                                    &larr; {t("projects.backToList")}
                                </Link>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="project-detail__level-wrap">
                                    <DifficultyLevel level={project.level} />
                                </div>
                            </div>
                        </div>

                        <header className="project-detail__header">
                            <h1 className="project-detail__title">
                                <GradientText colors={["#2b4539", accentColor, "#61b3dc"]} animationSpeed={8} showBorder={false} className="gradient-Title">
                                    {content.title}
                                </GradientText>
                            </h1>
                            {content.role && <p className="project-detail__role">{content.role}</p>}
                            <p className="project-detail__period">
                                <img src={calendarLogoImg} alt="" className="personal-data-icon" />
                                <span> {formatProjectDuration(project.startDate, project.endDate, lang)}</span>
                            </p>
                        </header>

                        {content.content.length > 0 && <hr className="project-detail__section-divider project-detail__section-divider--header" />}

                        <div className="project-detail__body">
                            {content.content.map((section, sectionIndex) => {
                                const colClasses = getBlockColumnClasses(section.items);
                                const isLastSection = sectionIndex === content.content.length - 1;
                                return (
                                    <div key={sectionIndex}>
                                        <div className="row project-detail__section g-4">
                                            {section.items.map((block, i) => {
                                                const colClass = colClasses[i];

                                                switch (block.type) {
                                                    case 'heading': {
                                                        const Tag = `h${block.level ?? 3}` as 'h2' | 'h3' | 'h4';
                                                        return (
                                                            <div key={i} className={colClass}>
                                                                <Tag className="project-detail__heading">{block.text}</Tag>
                                                            </div>
                                                        );
                                                    }
                                                    case 'paragraph':
                                                        return (
                                                            <div key={i} className={colClass}>
                                                                <p className="project-detail__paragraph">{block.text}</p>
                                                            </div>
                                                        );
                                                    case 'image':
                                                        return (
                                                            <div key={i} className={colClass}>
                                                                <figure className="project-detail__figure">
                                                                    <TiltedCard
                                                                        className="project-detail__tilted-card"
                                                                        imageSrc={publicAsset(block.src ?? '')}
                                                                        altText={block.alt ?? ''}
                                                                        captionText={block.caption ?? ''}
                                                                        containerHeight="auto"
                                                                        containerWidth="100%"
                                                                        imageHeight="auto"
                                                                        imageWidth="auto"
                                                                        rotateAmplitude={12}
                                                                        scaleOnHover={1.05}
                                                                        showMobileWarning={false}
                                                                        showTooltip={false}
                                                                        displayOverlayContent
                                                                        overlayContent={
                                                                            block.caption ? (
                                                                                <p className="tilted-card-demo-text">{block.caption}</p>
                                                                            ) : null
                                                                        }
                                                                    />
                                                                </figure>
                                                            </div>
                                                        );
                                                    case 'link':
                                                        return (
                                                            <div key={i} className={colClass}>
                                                                <a href={block.url} target="_blank" rel="noreferrer noopener" className="project-detail__link">
                                                                    {block.text}
                                                                </a>
                                                            </div>
                                                        );
                                                    default:
                                                        return null;
                                                }
                                            })}
                                        </div>
                                        {!isLastSection && <hr className="project-detail__section-divider" />}
                                    </div>
                                );
                            })}
                        </div>
                    </article>
                </div>

                <div className="specular-button-shell">
                    <SpecularButton
                        size="md" radius={18} tint="#ffffff" tintOpacity={0} blur={26}
                        textColor="#f5f5f5" lineColor={accentColor} baseColor="#313131" intensity={1}
                        shineSize={14} shineFade={36} thickness={1} speed={0.35}
                        followMouse proximity={250}
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        {t("nav.backtoTheTop")}
                    </SpecularButton>
                </div>
            </div>
        </>
    );
}

export default ProjectDetailPage;