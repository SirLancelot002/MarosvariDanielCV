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
const JobsPage = lazy(() => import('./pages/JobsPage'));
const JobDetailPage = lazy(() => import('./pages/JobDetailPage'));
const HobbiesPage = lazy(() => import('./pages/HobbiesPage'));
const HobbyDetailPage = lazy(() => import('./pages/HobbyDetailPage'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));

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
          <Route path="/experience" element={<JobsPage />} />
          <Route path="/experience/:id" element={<JobDetailPage />} />
          <Route path="/hobbies" element={<HobbiesPage />} />
          <Route path="/hobbies/:id" element={<HobbyDetailPage />} />
          <Route path="/skills" element={<SkillsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
