import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Job } from '../types/job';
import { publicAsset } from '../utils/asset';
import { formatProjectDuration } from '../utils/date';
import { hexToRgbSpaceString } from '../utils/color';
import BorderGlow from './BorderGlow';
import DifficultyLevel from './DifficultyLevel';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
import calendarLogoImg from '../assets/calendarlogo.png';
import './JobCard.css';

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const content = job.translations[lang];
  const quality = useAdaptiveQuality();
  const accentColor = job.color ?? '#a67dff';

  const cardInner = (
    <Link
      to={`/experience/${job.id}`}
      className="job-card"
      style={{ '--job-accent': accentColor } as React.CSSProperties}
    >
      {job.headerSrc && (
        <div className="job-card__header-image">
          <img src={publicAsset(job.headerSrc)} alt="" loading="lazy" />
        </div>
      )}

      <div className="job-card__content">
        <DifficultyLevel level={job.level} className="job-card__level" />

        <h3 className="job-card__title">{content.title}</h3>

        {content.employer && <p className="job-card__role">{content.employer}</p>}

        <p className="job-card__period">
          <img src={calendarLogoImg} alt="" className="personal-data-icon" />{' '}
          {formatProjectDuration(job.startDate, job.endDate, lang)}
        </p>

        <p className="job-card__description">{content.shortDescription}</p>
      </div>
    </Link>
  );

  // On low graphics quality, skip the BorderGlow effect entirely — plain card only.
  if (quality === 'low') {
    return cardInner;
  }

  return (
    <BorderGlow
      edgeSensitivity={45}
      glowColor={hexToRgbSpaceString(accentColor)}
      backgroundColor="transparent"
      borderRadius={20}
      glowRadius={40}
      glowIntensity={1}
      coneSpread={25}
      animated
      colors={[accentColor, accentColor, accentColor]}
    >
      {cardInner}
    </BorderGlow>
  );
}

export default JobCard;