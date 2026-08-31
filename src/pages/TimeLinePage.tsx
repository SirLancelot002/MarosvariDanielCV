import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
import LightPillar from '../modules/LightPillar';
import TimeLine from '../modules/TimeLine';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';

function TimeLinePage() {
    const { t } = useTranslation();
    const quality = useAdaptiveQuality();

    return (
        <>
            <div className="studies-bg-fixed">
                <LightPillar
                    topColor="#FFD166"
                    bottomColor="#118AB2"
                    intensity={1}
                    rotationSpeed={0.3}
                    glowAmount={0.002}
                    pillarWidth={7.5}
                    pillarHeight={1.2}
                    noiseIntensity={0}
                    pillarRotation={315}
                    interactive={false}
                    mixBlendMode="screen"
                    quality={quality}
                />
            </div>
            <div className="studies-content-layer">
                <main className="hero-section studies-hero-section">
                    <TextType
                        as="h1"
                        className="text-type--hero"
                        text={[t("timeline.title1"), t("timeline.title2"), t("timeline.title3")]}
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
                    <TimeLine />
                </div>
            </div>
        </>
    );
}

export default TimeLinePage;