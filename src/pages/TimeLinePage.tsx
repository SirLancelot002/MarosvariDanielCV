import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
import TimeLine from '../modules/TimeLine';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
import WebThreads from '../modules/WebThreads';

function TimeLinePage() {
    const { t } = useTranslation();
    const quality = useAdaptiveQuality();
    var threadCount = 6;
    var speed = 0.2;
    var glow = 0.02;

    switch (quality) {
    case 'low':
      threadCount = 3;
      speed = 0.05;
      glow = 0.04;
      break;
    case 'medium':
      threadCount = 6;
      speed = 0.2;
      glow = 0.02;
      break;
    case 'high':
      threadCount = 8;
      speed = 0.2;
      glow = 0.015;
      break;
  }

    return (
        <>
            <div className="studies-bg-fixed">
                <WebThreads
                    color1="#0000ff"
                    color2="#ff00ff"
                    color3="#ffffff"
                    speed={speed}
                    threadCount={threadCount}
                    frequency={5}
                    spread={0.18}
                    taper={1}
                    position={0.5}
                    fanMode="center"
                    glow={glow}
                    falloff={0.6}
                    thickness={1.1}
                    brightness={0.5}
                    opacity={1}
                    mirror
                    shimmer
                    grain={false}
                    grainIntensity={0.05}
                    mouseInteraction={true}
                    mouseStrength={0.6}
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