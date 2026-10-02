import './SkillRating.css';

interface SkillRatingProps {
  rating: number; // 0-5
  className?: string;
}

function SkillRating({ rating, className = '' }: SkillRatingProps) {
  const clamped = Math.max(0, Math.min(5, Math.round(rating)));

  return (
    <span className={`skill-rating ${className}`} aria-label={`${clamped} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`skill-rating__dot ${i < clamped ? 'is-filled' : ''}`} />
      ))}
    </span>
  );
}

export default SkillRating;