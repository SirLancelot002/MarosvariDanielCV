import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
import LightPillar from '../modules/LightPillar';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
import BorderGlow from '../modules/BorderGlow';
import GradientText from '../modules/GradientText';

import gradhatlogo from '../assets/gradhatlogo.webp';

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
          <BorderGlow
            edgeSensitivity={45}
            glowColor="40 80 80"
            backgroundColor="#120f17e5"
            borderRadius={28}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated
            colors={['#7400ff', '#f550a5', '#06B6D4']}
          >
            <div style={{ padding: '2em' }}>
              <h2><GradientText colors={["#3300ff", "#ff77fb", "#97c0cf"]} animationSpeed={8} showBorder className="custom-class">{t("studies.aboutPage")}</GradientText></h2>
              <div className="row electric-panel-row">
                <div className="col-sm-12 col-md-6 personal-data-block">
                  <p>{t("studies.aboutPage.description")}</p>
                </div>
                <div className="col-sm-12 col-md-6 personal-data-block">
                  <img src={gradhatlogo} alt="Graduation Hat Logo" className="" />
                </div>
              </div>
            </div>
          </BorderGlow>
        </div>
      </div>
    </>
  );
}

export default StudiesPage;