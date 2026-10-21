import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { Hobby } from '../types/hobby';
import { publicAsset } from '../utils/asset';
import { hexToHslSpaceString, shiftHexToward } from '../utils/color';
import BorderGlow from './BorderGlow';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
import './HobbyCard.css';

interface HobbyCardProps {
  hobby: Hobby;
}

function HobbyCard({ hobby }: HobbyCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const content = hobby.translations[lang];
  const quality = useAdaptiveQuality();
  const accentColor = hobby.color ?? '#61dca3';
  const darkAccentColor = shiftHexToward(accentColor, '#00f0ff', 0.35);
  const lightAccentColor = shiftHexToward(accentColor, '#ffffff', 0.35);

  const cardInner = (
    <Link to={`/hobbies/${hobby.id}`} className="hobby-card">
      <img className="hobby-card__banner" src={publicAsset(hobby.bannerSrc)} alt="" loading="lazy" />
      <div className="hobby-card__overlay" aria-hidden="true" />
      <div className="hobby-card__content">
        <h2 className="hobby-card__title">{content.title}</h2>

        {content.tags && content.tags.length > 0 && (
          <ul className="hobby-card__tags">
            {content.tags.map((tag) => (
              <li key={tag} className="hobby-card__tag">{tag}</li>
            ))}
          </ul>
        )}

        <p className="hobby-card__description">{content.shortDescription}</p>
      </div>
    </Link>
  );

  return (
    <div className="hobby-card-shell">
      {quality === 'low' ? (
        cardInner
      ) : (
        <div className="hobby-card-border-wrap">
          <BorderGlow
            edgeSensitivity={45}
            glowColor={hexToHslSpaceString(accentColor)}
            backgroundColor="#000000"
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

export default HobbyCard;
