import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect } from 'react';
import NavBar from '../NavBar';
import { projects } from '../data/loadProjects';
import { publicAsset } from '../utils/asset';
import { formatProjectDuration } from '../utils/date';
import './ProjectDetailPage.css';
import Strands from '../modules/Strands';
import DifficultyLevel from '../modules/DifficultyLevel';
import TiltedCard from '../modules/TiltedCard';
import GradientText from '../modules/GradientText';
import SpecularButton from '../modules/SpecularButton';

import calendarLogoImg from '../assets/calendarlogo.png';

function ProjectDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const project = projects.find(p => p.id === id);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const content = project.translations[lang];
  const accentColor = project.color ?? '#a67dff';

  return (
    <>
      <div className="studies-bg-fixed project-detail-bg-fixed">
        <Strands
          colors={["#162ef9", "#7400ff", "#06B6D4"]}
          count={3}
          speed={0.5}
          amplitude={1.9}
          waviness={2}
          thickness={0.7}
          glow={2.3}
          taper={3}
          spread={1}
          intensity={0.5}
          saturation={2}
          opacity={1}
          scale={1.5}
          glass
          refraction={3}
          dispersion={1}
          glassSize={1}
          hueShift={0}
          className="project-detail-strands"
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

            {project.headerSrc && (
              <div className="project-detail__header-image">
                <img src={publicAsset(project.headerSrc)} alt="" />
              </div>
            )}

            <header className="project-detail__header">
              <h1 className="project-detail__title">
                <GradientText colors={["#3300ff", "#ff77fb", "#97c0cf"]} animationSpeed={8} showBorder={false} className="gradient-Title">
                  {content.title}
                </GradientText>
              </h1>
              {content.role && <p className="project-detail__role">{content.role}</p>}
              <p className="project-detail__period">
                <img src={calendarLogoImg} alt="" className="personal-data-icon" />
                <span> {formatProjectDuration(project.startDate, project.endDate, lang)}</span>
              </p>
            </header>

            <div className="project-detail__body">
              {content.content.map((section, sectionIndex) => (
                <div className="row project-detail__section g-4" key={sectionIndex}>
                  {section.items.map((block, i) => {
                    const isTextBlock = block.type === 'heading' || block.type === 'paragraph' || block.type === 'link';
                    const colClass = isTextBlock
                      ? 'col-12'
                      : section.items.filter(it => it.type === 'image').length > 1
                        ? 'col-12 col-md-6'
                        : 'col-12';

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
                            <a
                              href={block.url}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="project-detail__link"
                            >
                              {block.text}
                            </a>
                          </div>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="specular-button-shell">
          <SpecularButton
            size="md" radius={18} tint="#ffffff" tintOpacity={0} blur={26}
            textColor="#f5f5f5" lineColor="#2600ff" baseColor="#313131" intensity={1}
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