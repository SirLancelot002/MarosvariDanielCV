import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
import LightPillar from '../modules/LightPillar';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
//import BorderGlow from '../modules/BorderGlow';
//import GradientText from '../modules/GradientText';

import StudyCard from '../modules/StudyCard';
import RevealOnScroll from '../modules/RevealOnScroll';
import studiesData from '../data/studies.json';
import type { Study } from '../types/study';

const studies = studiesData as Study[];

function StudiesPage() {
  const { t } = useTranslation();
  const quality = useAdaptiveQuality();

  return (
    <>
      <div className="studies-bg-fixed">
        <LightPillar
          topColor="#5227FF"
          bottomColor="#FF9FFC"
          intensity={1}
          rotationSpeed={0.3}
          glowAmount={0.002}
          pillarWidth={10}
          pillarHeight={1}
          noiseIntensity={0}
          pillarRotation={25}
          interactive={false}
          mixBlendMode="screen"
          quality={quality}
        />
      </div>
      <div className="studies-content-layer">
        <main className="hero-section studies-hero-section">
          <TextType
            as="h1"
            text={[t("studies.title1"), t("studies.title2"), t("studies.title3")]}
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

        <div className="container mt-5 studies-content-container">
          <div className="container mt-5 studies-list">
            {studies.map((study, index) => {
              const isOdd = index % 2 === 0; // 1st card (index 0) = "odd" = left side
              return (
                <RevealOnScroll key={study.id} className="studies-list__row-wrapper">
                  <div className="row studies-list__row">
                    {isOdd ? (
                      <>
                        <div className="col-12 col-xl-5">
                          <StudyCard study={study} />
                        </div>
                        <div className="col-xl-7 d-none d-xl-block" />
                      </>
                    ) : (
                      <>
                        <div className="col-xl-7 d-none d-xl-block" />
                        <div className="col-12 col-xl-5">
                          <StudyCard study={study} />
                        </div>
                      </>
                    )}
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default StudiesPage;