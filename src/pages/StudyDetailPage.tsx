import { useParams, Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import studiesData from '../data/studies.json';
import type { Study } from '../types/study';
import { publicAsset } from '../utils/asset';
import './StudyDetailPage.css';

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
      <NavBar />
      <div className="container mt-5 study-detail">
        <Link to="/studies" className="study-detail__back">
          &larr; {t("studies.backToList")}
        </Link>

        <h1 className="study-detail__title">{content.title}</h1>

        <div className="study-detail__level" aria-label={`Level ${study.level} of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={`study-detail__dot ${i < study.level ? 'is-filled' : ''}`} />
          ))}
        </div>

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
      </div>
    </>
  );
}

export default StudyDetailPage;