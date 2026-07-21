import TextType from './modules/TextType';
import PillNav from './modules/PillNav';
import { useTranslation } from 'react-i18next';
import logo from './assets/vscode.svg';
import Lightning from './modules/Lightning';
import ProfileCard from './modules/ProfileCard'
import avatarImg from './assets/avatar.png';
import iconPatternImg from './assets/iconpattern.png';
import ElectricBorder from './modules/ElectricBorder';

import './App.css'

const BIRTH_YEAR = 2003;

function getAge(): string {
  const currentYear = new Date().getFullYear();
  const age = currentYear - BIRTH_YEAR;
  return `${age - 1}-${age}`;
}

function App() {
  const { t } = useTranslation();

  return (
    <>
      <div className="page-upper">
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
        <ElectricBorder
          color="#a67dff"
          speed={1}
          chaos={0.12}
          borderRadius={16}
          style={{ borderRadius: 16 }}>
          <div className="row electric-panel-row">
            <div className="col-sm-12 col-md-6 personal-data-block">
              <h3>{t("personalData.title")}</h3>
              <p>{t("personalData.location")}: {t("personalData.location.value")}</p>
              <p>{t("personalData.birthyear")}: 2003</p>
              <p>{t("personalData.age")}: {getAge()}</p>
              <p>{t("personalData.gender")}: {t("personalData.gender.value")}</p>
              <p>E-mail: marosvaridaniel7@gmail.com</p>
            </div>
            <div className="col-sm-12 col-md-6 personal-data-block">
              <h3>{t("personalDescription.title")}</h3>
              <p>{t("personalDescription.description")}</p>
            </div>
          </div>
        </ElectricBorder>
      </div>
    </>
  )
}

export default App
