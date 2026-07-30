import { useTranslation } from 'react-i18next';
//import ElectricBorder from '../modules/ElectricBorder';
//import GradientText from '../modules/GradientText';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';

function StudiesPage() {
  const { t } = useTranslation();

  return (
    <>
    <main className="hero-section">
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
    <div className="container mt-5">
      
    </div>
    </>
  );
}

export default StudiesPage;