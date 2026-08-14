import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
//import useAdaptiveQuality from '../hooks/useAdaptiveQuality';

function TimeLinePage() {
    const { t } = useTranslation();
    //const quality = useAdaptiveQuality();

    return (
        <>
            <div className="studies-bg-fixed">
                
            </div>
            <div className="studies-content-layer">
                <main className="hero-section studies-hero-section">
                    <TextType
                        as="h1"
                        className="text-type--hero"
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

export default TimeLinePage;