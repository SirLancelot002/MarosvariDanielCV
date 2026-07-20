import TextType from './modules/TextType';
import PillNav from './modules/PillNav';
import { useTranslation } from 'react-i18next';
import logo from './assets/vscode.svg';
import Lightning from './modules/Lightning';
import ProfileCard from './modules/ProfileCard'
import avatarImg from './assets/avatar.png';
import iconPatternImg from './assets/iconpattern.png';
import './App.css'

function App() {
  const { t } = useTranslation();

  return (
    <>
      <div className="lightning-bg">
        <Lightning
          hue={260}
          xOffset={0}
          speed={1}
          intensity={1}
          size={1}
        />
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
        /></main>

      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: t("nav.main"), href: 'MarosvariDanielCV/' },
          { label: t("nav.time"), href: 'MarosvariDanielCV/timeline' },
          { label: t("nav.studies"), href: 'MarosvariDanielCV/studies' },
          { label: t("nav.projects"), href: 'MarosvariDanielCV/projects' }
        ]}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        initialLoadAnimation
      />

      <div className="profile-card-outer">
        <div className="profile-card-inner">
          <ProfileCard
            name="Marosvári Dániel"
            title="Software Engineer"
            handle="SirLancelot002"
            status="Online"
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
    </>
  )
}

export default App
