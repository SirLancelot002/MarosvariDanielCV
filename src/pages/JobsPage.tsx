import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
import Galaxy from '../modules/Galaxy';
import JobCard from '../modules/JobCard';
import RevealOnScroll from '../modules/RevealOnScroll';
import { jobs } from '../data/loadJobs';
import SpecularButton from '../modules/SpecularButton';
import Magnet from '../modules/Magnet';
//import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
import './JobsPage.css';

function JobsPage() {
    const { t } = useTranslation();
    //const quality = useAdaptiveQuality();

    return (
        <>
            <div className="studies-bg-fixed jobs-page-bg">
                <Galaxy
                    mouseRepulsion
                    mouseInteraction
                    density={1}
                    glowIntensity={0.3}
                    saturation={0}
                    hueShift={140}
                    twinkleIntensity={0.3}
                    rotationSpeed={0.03}
                    repulsionStrength={2}
                    autoCenterRepulsion={0}
                    starSpeed={0.5}
                    speed={1}
                />
            </div>
            <div className="studies-content-layer">
                <main className="hero-section studies-hero-section">
                    <TextType
                        as="h1"
                        className="projects-text-type"
                        text={[t("experience.title1"), t("experience.title2"), t("experience.title3")]}
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
                    {jobs.map((job, index) => {
                        const isOdd = index % 2 === 0;
                        return (
                            <RevealOnScroll key={job.id} className="studies-list__row-wrapper">
                                <div className="row studies-list__row">
                                    {isOdd ? (
                                        <>
                                            <div className="col-12 col-xl-5">
                                                <JobCard job={job} />
                                            </div>
                                            <div className="col-xl-7 d-none d-xl-block" />
                                        </>
                                    ) : (
                                        <>
                                            <div className="col-xl-7 d-none d-xl-block" />
                                            <div className="col-12 col-xl-5">
                                                <JobCard job={job} />
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
                                textColor="#f5f5f5" lineColor="#3664c9" baseColor="#4d4d4d" intensity={1}
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

export default JobsPage;