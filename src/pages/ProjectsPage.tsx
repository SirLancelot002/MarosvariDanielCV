import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
import LetterGlitch from '../modules/LetterGlitch';
import ProjectCard from '../modules/ProjectCard';
import RevealOnScroll from '../modules/RevealOnScroll';
import { projects } from '../data/loadProjects';

function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="studies-bg-fixed">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
        />
      </div>
      <div className="studies-content-layer">
        <main className="hero-section studies-hero-section">
          <TextType
            as="h1"
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
      </div>
    </>
  );
}

export default ProjectsPage;