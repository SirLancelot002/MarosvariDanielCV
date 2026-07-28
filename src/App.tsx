import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './pages/LandingPage';
import StudiesPage from './pages/StudiesPage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/studies" element={<StudiesPage />} />
      </Route>
    </Routes>
  );
}

export default App;