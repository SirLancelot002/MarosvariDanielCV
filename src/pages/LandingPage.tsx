import { useTranslation } from 'react-i18next';

import TextType from '../modules/TextType';
import Lightning from '../modules/Lightning';
import ProfileCard from '../modules/ProfileCard';
import ElectricBorder from '../modules/ElectricBorder';
import GradientText from '../modules/GradientText';
import Ballpit from '../modules/Ballpit';
import SpecularButton from '../modules/SpecularButton';
import LogoLoop from '../modules/LogoLoop';
import ShinyText from '../modules/ShinyText';
import NavBar from '../NavBar';

import avatarImg from '../assets/avatar.png';
import iconPatternImg from '../assets/iconpattern.png';
import cityLogoImg from '../assets/citylogo.png';
import calendarLogoImg from '../assets/calendarlogo.png';
import cakeLogoImg from '../assets/cakelogo.png';
import maleLogoImg from '../assets/malelogo.png';
import mailLogoImg from '../assets/maillogo.png';
import gitlogoImg from '../assets/gitlogo.webp';
import reactbitslogoImg from '../assets/reactbitslogo.png';
import visualstudiologo from '../assets/visualstudiocodelogo.webp';
import typescriptlogo from '../assets/typescriptlogo.webp';
import reactlogo from '../assets/reactlogo.webp';
import bmelogo from '../assets/bmelogo.webp';
import petriklogo from '../assets/petriklogo.webp';
import cslogo from '../assets/cslogo.webp';
import pythonlogo from '../assets/pythonlogo.webp';
import sqllogo from '../assets/sqllogo.webp';
import javalogo from '../assets/javalogo.webp';
import haskelllogo from '../assets/haskelllogo.webp';

const BIRTH_YEAR = 2003;
const imageLoopLogos = [
  { src: gitlogoImg, alt: "My Github Profile", href: "https://github.com/SirLancelot002" },
  { src: reactbitslogoImg, alt: "React Bits", href: "https://reactbits.dev" },
  { src: visualstudiologo, alt: "Visual Studio Code", href: "https://code.visualstudio.com" },
  { src: typescriptlogo, alt: "TypeScript", href: "https://www.typescriptlang.org" },
  { src: reactlogo, alt: "React", href: "https://react.dev" },
  { src: bmelogo, alt: "BME", href: "https://www.bme.hu" },
  { src: petriklogo, alt: "Petrik Lajos Kéttanítás nyelvű szakgimnázium", href: "https://petrik.hu" },
  { src: cslogo, alt: "C#", href: "https://dotnet.microsoft.com/en-us/languages/csharp" },
  { src: pythonlogo, alt: "Python", href: "https://www.python.org" },
  { src: sqllogo, alt: "SQL", href: "https://www.mysql.com" },
  { src: javalogo, alt: "Java", href: "https://www.java.com" },
  { src: haskelllogo, alt: "Haskell", href: "https://www.haskell.org" }
];

function getAge(): string {
  const currentYear = new Date().getFullYear();
  const age = currentYear - BIRTH_YEAR;
  return `${age - 1}-${age}`;
}

function LandingPage() {
  const { t } = useTranslation();

  return (
    <>
      <div className="page-upper">
        <div className="lightning-bg">
          <Lightning hue={260} xOffset={0} speed={1} intensity={1} size={1} />
        </div>
        <main className="hero-section">
          <TextType
            as="h1"
            text={[t("hero.greeting"), t("hero.look"), t("hero.description")]}
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

        <div className="profile-card-outer">
          <div className="profile-card-inner">
            <ProfileCard
              name="Marosvári Dániel"
              title={t("profileCard.job")}
              handle="SirLancelot002"
              status={t("profileCard.online")}
              contactText={t("profileCard.contact")}
              avatarUrl={avatarImg}
              showUserInfo
              enableTilt={true}
              enableMobileTilt
              onContactClick={() => {
                window.location.href = 'mailto:marosvaridaniel7@gmail.com';
              }}
              behindGlowColor="rgba(125, 190, 255, 0.67)"
              iconUrl={iconPatternImg}
              behindGlowEnabled
              innerGradient="linear-gradient(145deg,#60496e8c 0%,#71C4FF44 100%)"
            />
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <ElectricBorder color="#a67dff" speed={1} chaos={0.12} borderRadius={16} style={{ borderRadius: 16 }}>
          <div className="row electric-panel-row">
            <div className="col-sm-12 col-md-6 personal-data-block">
              <h3><GradientText colors={["#3300ff", "#ff77fb", "#97c0cf"]} animationSpeed={8} showBorder className="custom-class">{t("personalData.title")}</GradientText></h3>
              <p className="personal-data-row"><img src={cityLogoImg} alt="" className="personal-data-icon" /><span>{t("personalData.location")}: {t("personalData.location.value")}</span></p>
              <p className="personal-data-row"><img src={calendarLogoImg} alt="" className="personal-data-icon" /><span>{t("personalData.birthyear")}: {BIRTH_YEAR}</span></p>
              <p className="personal-data-row"><img src={cakeLogoImg} alt="" className="personal-data-icon" /><span>{t("personalData.age")}: {getAge()}</span></p>
              <p className="personal-data-row"><img src={maleLogoImg} alt="" className="personal-data-icon" /><span>{t("personalData.gender")}: {t("personalData.gender.value")}</span></p>
              <p className="personal-data-row"><img src={mailLogoImg} alt="" className="personal-data-icon" /><span>E-mail: marosvaridaniel7@gmail.com</span></p>
            </div>
            <div className="col-sm-12 col-md-6 personal-data-block">
              <h3><GradientText colors={["#3300ff", "#ff77fb", "#97c0cf"]} animationSpeed={8} showBorder className="custom-class">{t("personalDescription.title")}</GradientText></h3>
              <p>{t("personalDescription.description")}</p>
            </div>
          </div>
        </ElectricBorder>
      </div>

      <div id="ballpit-section">
        <Ballpit count={75} gravity={0.3} friction={0.9975} wallBounce={0.95} followCursor />
      </div>

      <div id="website-description-section" className="container">
        <ElectricBorder color="#a67dff" speed={1} chaos={0.12} borderRadius={16} style={{ borderRadius: 16 }}>
          <div className="row electric-panel-row">
            <div className="col-sm-12 personal-data-block">
              <h3><GradientText colors={["#3300ff", "#ff77fb", "#97c0cf"]} animationSpeed={8} showBorder className="custom-class">{t("siteDescription.title")}</GradientText></h3>
              <p><b>
                <ShinyText
                  text={t("siteDescription.description")}
                  speed={2} delay={0} color="#b5b5b5" shineColor="#ffffff"
                  spread={120} direction="left" yoyo={false} pauseOnHover={false} disabled={false}
                />
              </b></p>
            </div>
          </div>
        </ElectricBorder>
      </div>

      <div className="specular-button-shell">
        <SpecularButton
          size="md" radius={18} tint="#ffffff" tintOpacity={0} blur={24}
          textColor="#f5f5f5" lineColor="#cc00ff" baseColor="#525252" intensity={1}
          shineSize={14} shineFade={36} thickness={1} speed={0.35}
          followMouse proximity={250}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          {t("nav.backtoTheTop")}
        </SpecularButton>
      </div>

      <div className="logo-loop-rail">
        <div className="logo-loop-rail__inner">
          <LogoLoop
            logos={imageLoopLogos} speed={100} direction="left" logoHeight={60} gap={60}
            hoverSpeed={0} scaleOnHover fadeOut fadeOutColor="#000000"
            ariaLabel={t("siteDescription.relevantLinks")}
          />
        </div>
      </div>
    </>
  )
}

export default LandingPage