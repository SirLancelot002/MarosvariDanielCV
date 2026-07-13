import { useState } from 'react'
import reactLogo from './assets/react.svg'
import TextType from './modules/TextType';
import './App.css'

function App() {
  return (
    <><h1>
      <TextType 
        text={["Marosvári Dániel CV site", "Look around!", "Interactive and responsive"]}
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
