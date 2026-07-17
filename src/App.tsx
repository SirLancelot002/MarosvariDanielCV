import TextType from './modules/TextType';
import PillNav from './modules/PillNav';
import { useTranslation } from 'react-i18next';
import logo from './assets/vscode.svg';
import './App.css'

function App() {
  const { t } = useTranslation();

  return (
    <>
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
          { label: 'Main', href: 'MarosvariDanielCV/' },
          { label: 'Time Line', href: 'MarosvariDanielCV/timeline' },
          { label: 'Studies', href: 'MarosvariDanielCV/studies' },
          { label: 'Projects', href: 'MarosvariDanielCV/projects' }
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
    </>
  )
}

export default App
