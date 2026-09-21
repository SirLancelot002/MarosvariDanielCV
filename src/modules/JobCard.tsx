import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Job } from '../types/job';
import { publicAsset } from '../utils/asset';
import { formatJobPeriod } from '../utils/date';
import { hexToRgbSpaceString, shiftHexToward } from '../utils/color';
import BorderGlow from './BorderGlow';
import JobLevel from './JobLevel';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
import calendarLogoImg from '../assets/calendarlogo.png';
import cityLogoImg from '../assets/citylogo.png';
import './JobCard.css';

interface JobCardProps {
  job: Job;
}

function JobCard({ job }: JobCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const content = job.translations[lang];
  const quality = useAdaptiveQuality();
  const accentColor = job.color ?? '#61dca3';
  const darkAccentColor = shiftHexToward(accentColor, '#0000ff', 0.35);
  const lightAccentColor = shiftHexToward(accentColor, '#ffffff', 0.35);

  const cardInner = (
    <Link to={`/experience/${job.id}`} className="job-card">
      {job.headerSrc && (
        <div className="job-card__header-image">
          <img src={publicAsset(job.headerSrc)} alt="" loading="lazy" />
        </div>
      )}

      <div className="job-card__content">
        <div className="job-card__level-wrap">
          <JobLevel level={job.seniority} text={content.seniorityLabel} className="job-card__level" />
        </div>

        <h2 className="job-card__title">{content.title}</h2>

        {content.employer && job.employerSrc ? (
          <span
            className="job-card__employer job-card__employer--link"
            style={{ color: accentColor }}
            role="link"
            tabIndex={0}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              window.open(job.employerSrc, '_blank', 'noopener,noreferrer');
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                event.stopPropagation();
                window.open(job.employerSrc, '_blank', 'noopener,noreferrer');
              }
            }}
          >
            <img src={cityLogoImg} alt="" className="personal-data-icon" />
            {content.employer}
          </span>
        ) : (
          content.employer && (
            <p className="job-card__employer" style={{ color: accentColor }}>
              <img src={cityLogoImg} alt="" className="personal-data-icon" />
              {content.employer}
            </p>
          )
        )}

        <p className="job-card__period">
          <img src={calendarLogoImg} alt="" className="personal-data-icon" />{' '}
          {formatJobPeriod(job.startDate, job.endDate, lang)}
        </p>

        {content.tags && content.tags.length > 0 && (
          <ul className="job-card__tags">
            {content.tags.map((tag) => (
              <li key={tag} className="job-card__tag">{tag}</li>
            ))}
          </ul>
        )}

        <p className="job-card__description">{content.shortDescription}</p>
      </div>
    </Link>
  );

  return (
    <div className="job-card-shell">
      <div className="job-card-backplate" aria-hidden="true" />
      <div className="job-card-center-vignette" aria-hidden="true" />

      {quality === 'low' ? (
        cardInner
      ) : (
        <div className="job-card-border-wrap">
          <BorderGlow
            edgeSensitivity={45}
            glowColor={hexToRgbSpaceString(accentColor)}
            backgroundColor="#000000a1"
            borderRadius={20}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated
            colors={[darkAccentColor, accentColor, lightAccentColor]}
          >
            {cardInner}
          </BorderGlow>
        </div>
      )}
    </div>
  );
}

export default JobCard;