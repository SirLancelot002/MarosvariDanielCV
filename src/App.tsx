import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import './App.css';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const StudiesPage = lazy(() => import('./pages/StudiesPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/studies" element={<StudiesPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;