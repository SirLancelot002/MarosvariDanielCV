import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect } from 'react';
import NavBar from '../NavBar';
import { useBackTarget } from '../hooks/useBackTarget';
import { hobbies } from '../data/loadHobbies';
import { publicAsset } from '../utils/asset';
import { shiftHexToward } from '../utils/color';
import { getBlockColumnClasses } from '../utils/blockLayout';
import AeroShards from '../modules/AeroShards';
import TiltedCard from '../modules/TiltedCard';
import GradientText from '../modules/GradientText';
import SpecularButton from '../modules/SpecularButton';
import CollapsibleSection from '../modules/CollapsibleSection';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
import type { JobContentItem } from '../types/job';
import './JobDetailPage.css';
import './ProjectDetailPage.css';




function HobbyDetailPage() {
    const { id } = useParams<{ id: string }>();
    const { t, i18n } = useTranslation();
    const lang = i18n.language === 'hu' ? 'hu' : 'en';
    const quality = useAdaptiveQuality();
    const back = useBackTarget('/hobbies', 'hobbies.backToList');

    const shardCount = quality === 'low' ? 400 : quality === 'medium' ? 800 : 1600;

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const job = hobbies.find(h => h.id === id);

    if (!job) {
        return <Navigate to="/hobbies" replace />;
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
                <AeroShards
                    shardColor={accentColor}
                    accentColor={lightAccentColor}
                    placement="full"
                    material="glass"
                    markers="plus"
                    count={shardCount}
                    depthOfField={0.75}
                    vignette={0.3}
                    mouseInteraction
                    pulseOnClick
                    holdToGather
                    lightMode={false}
                    shardSize={1}
                    spread={1}
                    twist={1}
                    billow={1}
                    speed={1}
                    scale={1}
                    glow={0.35}
                    grain={0}
                    intro
                    mouseStrength={0.5}
                    parallax={0.5}
                    paused={false}
                />
            </div>
            <div className="studies-content-layer job-detail-content-layer">
                <NavBar />

                <div className="container mt-5 studies-content-container project-detail-container">
                    <article className="project-detail" style={{ '--job-accent': accentColor, '--project-accent': accentColor } as React.CSSProperties}>
                        <div className="row project-detail__top-row align-items-center">
                            <div className="col-12 col-md-6">
                                <Link to={back.to} className="project-detail__back">
                                    &larr; {back.label}
                                </Link>
                            </div>
                        </div>

                        <header className="project-detail__header" id="job-detail__header">
                            {quality === 'low' ? (
                                <h1 className="project-detail__title" style={{ color: accentColor }}>
                                    {content.title}
                                </h1>
                            ) : (
                                <h1 className="project-detail__title">
                                    <GradientText colors={[darkAccentColor, accentColor, lightAccentColor]} animationSpeed={8} showBorder={false} className="gradient-Title">
                                        {content.title}
                                    </GradientText>
                                </h1>
                            )}</header>

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
                </div>
            </div>

            <div className={`job-detail__lanyard-rest job-detail__lanyard-rest--no-lanyard`}>
                <div className="specular-button-shell job-detail__back-to-top">
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

export default HobbyDetailPage;

