import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import studiesData from '../data/studies.json';
import type { Study } from '../types/study';
import { publicAsset } from '../utils/asset';
import { formatStudyPeriod } from '../utils/date';
import './StudyDetailPage.css';
import Strands from '../modules/Strands';
import EqfLevel from '../modules/EqfLevel';

import calendarLogoImg from '../assets/calendarlogo.png';
import cityLogoImg from '../assets/citylogo.png';

const studies = studiesData as Study[];
function StudyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';

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
              <h1 className="study-detail__title">{content.title}</h1>
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

            <div className="study-detail__body">
              {content.longDescription.map((block, i) => {
                if (block.type === 'paragraph') {
                  return <p key={i}>{block.text}</p>;
                }
                if (block.type === 'image') {
                  return (
                    <figure key={i} className="study-detail__figure">
                      <img src={publicAsset(block.src ?? '')} alt={block.alt ?? ''} loading="lazy" />
                      {block.caption && <figcaption>{block.caption}</figcaption>}
                    </figure>
                  );
                }
                return null;
              })}
            </div>
          </article>
        </div>
      </div>
    </>
  );
}

export default StudyDetailPage;