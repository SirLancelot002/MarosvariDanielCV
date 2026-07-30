import { useTranslation } from 'react-i18next';
//import ElectricBorder from '../modules/ElectricBorder';
//import GradientText from '../modules/GradientText';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
import LightPillar from '../modules/LightPillar';

function StudiesPage() {
  const { t } = useTranslation();

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
          quality="high"
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

        </div>
      </div>
    </>
  );
}

export default StudiesPage;