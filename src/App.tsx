import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import './App.css';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const StudiesPage = lazy(() => import('./pages/StudiesPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const TimeLinePage = lazy(() => import('./pages/TimeLinePage'));
const StudyDetailPage = lazy(() => import('./pages/StudyDetailPage'));
const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/studies" element={<StudiesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/timeline" element={<TimeLinePage />} />
          <Route path="/studies/:id" element={<StudyDetailPage />} />
          <Route path="/projects/:id" element={<ProjectDetailPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;