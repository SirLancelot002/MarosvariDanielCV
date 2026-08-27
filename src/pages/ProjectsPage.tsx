import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
import LetterGlitch from '../modules/LetterGlitch';
import ProjectCard from '../modules/ProjectCard';
import RevealOnScroll from '../modules/RevealOnScroll';
import { projects } from '../data/loadProjects';
import Magnet from '../modules/Magnet';
import SpecularButton from '../modules/SpecularButton';
import './ProjectsPage.css';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';

function ProjectsPage() {
  const { t } = useTranslation();
  const quality = useAdaptiveQuality();

  // Larger letters mean fewer of them on screen, which is cheaper to render.
  let letterSizeRem = 1;

  switch (quality) {
    case 'low':
      letterSizeRem = 2;
      break;
    case 'medium':
      letterSizeRem = 1.5;
      break;
    case 'high':
      letterSizeRem = 1.2;
      break;
  }

  return (
    <>
      <div className="studies-bg-fixed projects-page-bg">
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'stretch',
          background: '#000000'
        }}>
          <div className="projects-glitch-stage">
            <LetterGlitch
              glitchSpeed={1}
              centerVignette={false}
              outerVignette={false}
              smooth
              letterSizeRem={letterSizeRem}
              glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
            />
          </div>
        </div>
      </div>
      <div className="studies-content-layer">
        <main className="hero-section studies-hero-section">
          <TextType
            as="h1"
            className="projects-text-type"
            text={[t("projects.title1"), t("projects.title2"), t("projects.title3")]}
            typingSpeed={75}
            pauseDuration={2500}
            showCursor
            cursorCharacter="_"
            deletingSpeed={50}
            variableSpeed={{ min: 60, max: 120 }}
            cursorBlinkDuration={0.5}
          />
        </main>

        <NavBar />

        <div className="container mt-5 studies-list">
          {projects.map((project, index) => {
            const isOdd = index % 2 === 0;
            return (
              <RevealOnScroll key={project.id} className="studies-list__row-wrapper">
                <div className="row studies-list__row">
                  {isOdd ? (
                    <>
                      <div className="col-12 col-xl-5">
                        <ProjectCard project={project} />
                      </div>
                      <div className="col-xl-7 d-none d-xl-block" />
                    </>
                  ) : (
                    <>
                      <div className="col-xl-7 d-none d-xl-block" />
                      <div className="col-12 col-xl-5">
                        <ProjectCard project={project} />
                      </div>
                    </>
                  )}
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
        <div className="magnet-button-container">
          <Magnet
            wrapperClassName="projects-magnet-vignette"
            padding={{ left: 250, right: 250, top: 100, bottom: 40 }}
            disabled={false}
            magnetStrength={1}
          >
            <div className="specular-button-shell p-0">
              <SpecularButton
                size="md" radius={18} tint="#ffffff" tintOpacity={0} blur={24}
                textColor="#f5f5f5" lineColor="#61dca3" baseColor="#4d4d4d" intensity={1}
                shineSize={14} shineFade={36} thickness={1} speed={0.35}
                followMouse proximity={250}
                onClick={() => {
                  window.location.href = 'mailto:marosvaridaniel7@gmail.com';
                }}>
                {t("impressed")}
              </SpecularButton>
            </div>
          </Magnet>
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;