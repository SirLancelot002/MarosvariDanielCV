import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Study } from '../types/study';
import { publicAsset } from '../utils/asset';
import { formatStudyPeriod } from '../utils/date';
import GlareHover from '../modules/GlareHover';
import EqfLevel from './EqfLevel';
import './StudyCard.css';

import calendarLogoImg from '../assets/calendarlogo.png';

interface StudyCardProps {
  study: Study;
}

function StudyCard({ study }: StudyCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const content = study.translations[lang];

  return (
    <GlareHover
      className="study-card-shell"
      width="100%"
      height="auto"
      background="transparent"
      borderColor="transparent"
      borderRadius="20px"
      glareColor="#ffffff"
      glareOpacity={0.6}
      glareAngle={-30}
      glareSize={300}
      transitionDuration={800}
      playOnce={false}
      style={{ placeItems: 'stretch' }}
    >
      <Link to={`/studies/${study.id}`} className="study-card">
        {study.headerSrc && (
          <div className="study-card__header-image">
            <img src={publicAsset(study.headerSrc)} alt="" loading="lazy" />
          </div>
        )}

        <div className="study-card__content">
          <div className="study-card__level">
            <EqfLevel level={study.level} />
          </div>

          <h3 className="study-card__title">{content.title}</h3>

          {content.facility && <p className="study-card__facility">{content.facility}</p>}

          <p className="study-card__period">
            <img src={calendarLogoImg} alt="" className="personal-data-icon" /> {formatStudyPeriod(study.startDate, study.endDate, lang)}
          </p>

          <p className="study-card__description">{content.shortDescription}</p>
        </div>
      </Link>
    </GlareHover>
  );
}

export default StudyCard;