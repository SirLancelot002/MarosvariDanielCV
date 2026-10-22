import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
import TimeLine from '../modules/TimeLine';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
import WebThreads from '../modules/WebThreadsV2';

function TimeLinePage() {
    const { t } = useTranslation();
    const quality = useAdaptiveQuality();
    let threadCount = 6;
    let speed = 0.2;
    let glow = 0.02;
    let dpr: number | undefined;
    let shimmer = false;

    switch (quality) {
        case 'low':
            threadCount = 3;
            speed = 0.05;
            glow = 0.04;
            dpr = 0.6;
            break;
        case 'medium':
            dpr = 1;
            break;
        case 'high':
            threadCount = 8;
            glow = 0.015;
            shimmer = true;
            break;
    }
    return (
        <>
            <div className="studies-bg-fixed">
                <WebThreads
                    colors={["#0000ff", "#ff00ff"]}
                    coreColor="#FFFFFF"
                    threadCount={threadCount}
                    spread={0.18}
                    lightMode={false}
                    speed={speed}
                    frequency={5}
                    taper={1}
                    position={0.5}
                    pinch={0.5}
                    nodes={1}
                    angle={0}
                    glow={glow}
                    falloff={0.6}
                    thickness={1.1}
                    brightness={0.6}
                    opacity={1}
                    depth={0}
                    pulses={0}
                    mirror
                    shimmer={shimmer}
                    fade={0}
                    grain={0}
                    intro
                    mouseInteraction
                    mouseStrength={0.5}
                    pulseOnClick
                    paused={false}
                    dpr={dpr}
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