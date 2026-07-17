import TextType from './modules/TextType';
import { useTranslation } from 'react-i18next';
import './App.css'

function App() {
  const { t } = useTranslation();

  return (
    <><h1>
      <TextType 
        text={[t("hero.greeting"), t("hero.look"), t("hero.description")]}
        typingSpeed={75}
        pauseDuration={2500}
        showCursor
        cursorCharacter="_"
        deletingSpeed={50}
        variableSpeed={{ min: 60, max: 120 }}
        cursorBlinkDuration={0.5}
      /></h1>
    </>
  )
}

export default App
