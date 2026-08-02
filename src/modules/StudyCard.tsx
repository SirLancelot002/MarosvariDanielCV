import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Study } from '../types/study';
import { publicAsset } from '../utils/asset';
import { formatStudyPeriod } from '../utils/date';
import gradHatLogo from '../assets/gradhatlogo.webp';
import xLogo from '../assets/xlogo.webp';
import './StudyCard.css';

interface StudyCardProps {
  study: Study;
}

function StudyCard({ study }: StudyCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const t = study.translations[lang];

  return (
    <Link to={`/studies/${study.id}`} className="study-card">
      {study.headerSrc && (
        <div className="study-card__header-image">
          <img src={publicAsset(study.headerSrc)} alt="" loading="lazy" />
        </div>
      )}

      <div className="study-card__content">
        <div className="study-card__level" aria-label={`Level ${study.level} of 5`}>
          {Array.from({ length: 5 }, (_, i) => (
            <img
              key={i}
              src={i < study.level ? gradHatLogo : xLogo}
              alt=""
              className="study-card__level-icon"
            />
          ))}
        </div>

        <h3 className="study-card__title">{t.title}</h3>

        {t.facility && <p className="study-card__facility">{t.facility}</p>}

        <p className="study-card__period">{formatStudyPeriod(study.startDate, study.endDate, lang)}</p>

        <p className="study-card__description">{t.shortDescription}</p>
      </div>
    </Link>
  );
}

export default StudyCard;