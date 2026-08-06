import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Project } from '../types/project';
import { publicAsset } from '../utils/asset';
import { formatProjectDuration } from '../utils/date';
import GlareHover from '../modules/GlareHover';
import calendarLogoImg from '../assets/calendarlogo.png';
import gradHatLogo from '../assets/gradhatlogo.webp';
import xLogo from '../assets/xlogo.webp';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const { i18n, t } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const content = project.translations[lang];

  return (
    <GlareHover
      width="100%"
      height="auto"
      background="transparent"
      borderColor="transparent"
      borderRadius="20px"
      glareColor="#ffffff"
      glareOpacity={0.3}
      glareAngle={-30}
      glareSize={300}
      transitionDuration={800}
      playOnce={false}
      style={{ placeItems: 'stretch' }}
    >
      <Link to={`/projects/${project.id}`} className="project-card">
        {project.headerSrc && (
          <div className="project-card__header-image">
            <img src={publicAsset(project.headerSrc)} alt="" loading="lazy" />
          </div>
        )}

        <div className="project-card__content">
          <div className="project-card__level" aria-label={`Level ${project.level} of 5`}>
            <p>
              <span className="project-card__level-label">{t("projects.difficulty")}:</span>
              {Array.from({ length: 5 }, (_, i) => (
                <img
                  key={i}
                  src={i < project.level ? gradHatLogo : xLogo}
                  alt=""
                  className="project-card__level-icon"
                />
              ))}
            </p>
          </div>

          <h3 className="project-card__title">{content.title}</h3>

          {content.role && <p className="project-card__role">{content.role}</p>}

          <p className="project-card__period">
            <img src={calendarLogoImg} alt="" className="personal-data-icon" />{' '}
            {formatProjectDuration(project.startDate, project.endDate, lang)}
          </p>

          <p className="project-card__description">{content.shortDescription}</p>
        </div>
      </Link>
    </GlareHover>
  );
}

export default ProjectCard;