import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Study } from '../types/study';
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
      <div className="study-card__level" aria-label={`Level ${study.level} of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`study-card__dot ${i < study.level ? 'is-filled' : ''}`} />
        ))}
      </div>
      <h3 className="study-card__title">{t.title}</h3>
      <p className="study-card__description">{t.shortDescription}</p>
    </Link>
  );
}

export default StudyCard;