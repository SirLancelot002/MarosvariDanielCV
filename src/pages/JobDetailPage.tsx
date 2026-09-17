import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect } from 'react';
import NavBar from '../NavBar';
import { jobs } from '../data/loadJobs';
import { publicAsset } from '../utils/asset';
import { shiftHexToward } from '../utils/color';
import { formatJobPeriod } from '../utils/date';
import { getBlockColumnClasses } from '../utils/blockLayout';
import LightTunnel from '../modules/LightTunnel';
import DifficultyLevel from '../modules/DifficultyLevel';
import TiltedCard from '../modules/TiltedCard';
import GradientText from '../modules/GradientText';
import SpecularButton from '../modules/SpecularButton';
import CollapsibleSection from '../modules/CollapsibleSection';
import Lanyard from '../modules/Lanyard';
//import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
import type { JobContentItem } from '../types/job';
import './JobDetailPage.css';
import './ProjectDetailPage.css';

import calendarLogoImg from '../assets/calendarlogo.png';
import cityLogoImg from '../assets/citylogo.png';

function JobDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const lang = i18n.language === 'hu' ? 'hu' : 'en';
    //const quality = useAdaptiveQuality();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const job = jobs.find(j => j.id === id);

    if (!job) {
        return <Navigate to="/experience" replace />;
    }

    const content = job.translations[lang];
    const accentColor = job.color ?? '#a67dff';
    const darkAccentColor = shiftHexToward(accentColor, '#0000ff', 0.35);
    const lightAccentColor = shiftHexToward(accentColor, '#ffffff', 0.35);

    const renderBlock = (block: JobContentItem, colClass: string, key: number) => {
        switch (block.type) {
            case 'heading': {
                const Tag = `h${block.level ?? 3}` as 'h2' | 'h3' | 'h4';
                return (
                    <div key={key} className={colClass}>
                        <Tag className="project-detail__heading">{block.text}</Tag>
                    </div>
                );
            }
            case 'paragraph':
                return (
                    <div key={key} className={colClass}>
                        <p className="project-detail__paragraph">{block.text}</p>
                    </div>
                );
            case 'image':
                return (
                    <div key={key} className={colClass}>
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
                                overlayContent={block.caption ? <p className="tilted-card-demo-text">{block.caption}</p> : null}
                            />
                        </figure>
                    </div>
                );
            case 'link':
                return (
                    <div key={key} className={colClass}>
                        <a href={block.url} target="_blank" rel="noreferrer noopener" className="project-detail__link">
                            {block.text}
                        </a>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="studies-bg-fixed job-detail-bg-fixed">
                <LightTunnel
                    cableColor={accentColor}
                    pulseColor={lightAccentColor}
                    tunnelColor="#5227FF"
                    tunnelOpacity={0}
                    speed={0.1}
                    flowDirection="outward"
                    pulseSpeed={2}
                    pulseLength={0.28}
                    pulseBlend={1}
                    pulseWidth={1}
                    cableCount={20}
                    thickness={0.35}
                    rimWidth={0.15}
                    waviness={0.3}
                    sway={0.5}
                    size={1}
                    centerX={0}
                    centerY={0}
                    glow={1}
                    fadeNear={0.5}
                    fadeFar={2}
                    brightness={1}
                    colorVariance
                    grain
                    grainIntensity={0.05}
                    opacity={1}
                    mouseInteraction
                    mouseStrength={0.1}
                />
            </div>
            <div className="studies-content-layer job-detail-content-layer">
                <NavBar />

                <div className="container mt-5 studies-content-container project-detail-container">
                    <article className="project-detail" style={{ '--job-accent': accentColor, '--project-accent': accentColor } as React.CSSProperties}>
                        <div className="row project-detail__top-row align-items-center">
                            <div className="col-12 col-md-6">
                                <Link to="/experience" className="project-detail__back">
                                    &larr; {t("experience.backToList")}
                                </Link>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="project-detail__level-wrap">
                                    <DifficultyLevel level={job.level} />
                                </div>
                            </div>
                        </div>

                        <header className="project-detail__header">
                            <h1 className="project-detail__title">
                                <GradientText colors={[darkAccentColor, accentColor, lightAccentColor]} animationSpeed={8} showBorder={false} className="gradient-Title">
                                    {content.title}
                                </GradientText>
                            </h1>
                            {content.employer && job.employerSrc ? (
                                <a
                                    href={job.employerSrc}
                                    className="project-detail__role job-detail__employer"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img src={cityLogoImg} alt="" className="personal-data-icon" />
                                    {content.employer}
                                </a>
                            ) : (
                                content.employer && (
                                    <p className="project-detail__role job-detail__employer">
                                        <img src={cityLogoImg} alt="" className="personal-data-icon" />
                                        {content.employer}
                                    </p>
                                )
                            )}
                            <p className="project-detail__period">
                                <img src={calendarLogoImg} alt="" className="personal-data-icon" />
                                <span> {formatJobPeriod(job.startDate, job.endDate, lang)}</span>
                            </p>
                        </header>

                        {content.content.length > 0 && <hr className="project-detail__section-divider project-detail__section-divider--header" />}

                        <div className="project-detail__body">
                            {content.content.map((section, sectionIndex) => {
                                const isLastSection = sectionIndex === content.content.length - 1;
                                const firstItem = section.items[0];
                                const canCollapse = !!section.isCloseable && firstItem?.type === 'heading';

                                if (canCollapse) {
                                    const HeadingTag = `h${firstItem.level ?? 3}` as 'h2' | 'h3' | 'h4';
                                    const restItems = section.items.slice(1);
                                    const restColClasses = getBlockColumnClasses(restItems);

                                    return (
                                        <div key={sectionIndex}>
                                            <CollapsibleSection
                                                isCloseable
                                                isClosedByDefault={!!section.isClosedByDefault}
                                                headingContent={<HeadingTag className="project-detail__heading">{firstItem.text}</HeadingTag>}
                                            >
                                                <div className="row project-detail__section g-4">
                                                    {restItems.map((block, i) => renderBlock(block, restColClasses[i], i))}
                                                </div>
                                            </CollapsibleSection>
                                            {!isLastSection && <hr className="project-detail__section-divider" />}
                                        </div>
                                    );
                                }

                                const colClasses = getBlockColumnClasses(section.items);
                                return (
                                    <div key={sectionIndex}>
                                        <div className="row project-detail__section g-4">
                                            {section.items.map((block, i) => renderBlock(block, colClasses[i], i))}
                                        </div>
                                        {!isLastSection && <hr className="project-detail__section-divider" />}
                                    </div>
                                );
                            })}
                        </div>
                    </article>

                    <div className="job-detail__lanyard-rest">
                        <Lanyard
                            frontImage={publicAsset(job.lanyardFrontSrc)}
                            backImage={publicAsset(job.lanyardBackSrc)}
                            lanyardImage={publicAsset(job.lanyardBandSrc)}
                            position={[0, 0, 15]}
                            gravity={[0, -40, 0]}
                            lanyardWidth={1.15}
                        />
                    </div>
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

export default JobDetailPage;