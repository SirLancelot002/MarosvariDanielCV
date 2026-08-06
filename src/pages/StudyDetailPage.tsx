import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLayoutEffect } from 'react';
import NavBar from '../NavBar';
import studiesData from '../data/studies.json';
import type { Study } from '../types/study';
import { publicAsset } from '../utils/asset';
import { formatStudyPeriod } from '../utils/date';
import './StudyDetailPage.css';
import Strands from '../modules/Strands';
import EqfLevel from '../modules/EqfLevel';
import TiltedCard from '../modules/TiltedCard';
import GradientText from '../modules/GradientText';

import calendarLogoImg from '../assets/calendarlogo.png';
import cityLogoImg from '../assets/citylogo.png';
import SpecularButton from '../modules/SpecularButton';

const studies = studiesData as Study[];
function StudyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const study = studies.find(s => s.id === id);

  if (!study) {
    return <Navigate to="/studies" replace />;
  }

  const content = study.translations[lang];

  return (
    <>
      <div className="studies-bg-fixed study-detail-bg-fixed">
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
          className="study-detail-strands"
        />
      </div>
      <div className="studies-content-layer study-detail-content-layer">
        <NavBar />

        <div className="container mt-5 studies-content-container study-detail-container">
          <article className="study-detail">
            <div className="row study-detail__top-row align-items-center">
              <div className="col-12 col-md-6">
                <Link to="/studies" className="study-detail__back">
                  &larr; {t("studies.backToList")}
                </Link>
              </div>
              <div className="col-12 col-md-6">
                <div className="study-detail__level-wrap">
                  <EqfLevel level={study.level} />
                </div>
              </div>
            </div>

            <header className="study-detail__header">
              <h1 className="study-detail__title"><GradientText colors={["#3300ff", "#ff77fb", "#97c0cf"]} animationSpeed={8} showBorder={false} className="gradient-Title">{content.title}</GradientText></h1>
              <img src={cityLogoImg} alt="" className="personal-data-icon" />
              {content.facility && study.institutionSrc ? (
                <a
                  href={study.institutionSrc}
                  className="study-detail__facility"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content.facility}
                </a>
              ) : (
                content.facility && <p className="study-detail__facility">{content.facility}</p>
              )}
              <p className="study-detail__period"><img src={calendarLogoImg} alt="" className="personal-data-icon" /><span> {formatStudyPeriod(study.startDate, study.endDate, lang)}</span></p>
            </header>

            <div className="row study-detail__body study-detail__body-grid g-4">
              {content.longDescription.map((block, i) => {
                const isLastBlock = i === content.longDescription.length - 1;
                const hasOddBlockCount = content.longDescription.length % 2 === 1;
                const blockColumnClass = hasOddBlockCount && isLastBlock ? 'col-12' : 'col-12 col-lg-6';

                if (block.type === 'paragraph') {
                  return (
                    <div key={i} className={blockColumnClass}>
                      <p className="study-detail__paragraph">{block.text}</p>
                    </div>
                  );
                }
                if (block.type === 'image') {
                  return (
                    <div key={i} className={blockColumnClass}>
                      <figure className="study-detail__figure">
                        <TiltedCard
                          className="study-detail__tilted-card"
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
                              <p className="tilted-card-demo-text">
                                {block.caption}
                              </p>
                            ) : null
                          }
                        />
                      </figure>
                    </div>
                  );
                }
                return null;
              })}
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

export default StudyDetailPage;