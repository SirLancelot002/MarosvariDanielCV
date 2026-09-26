import { projects } from '../data/loadProjects';
import { jobs } from '../data/loadJobs';
import studiesData from '../data/studies.json';
import { skillTables } from '../data/loadSkills';
import type { Study } from '../types/study';

const studies = studiesData as Study[];

export interface ResolvedSkillLink {
  href: string;
  label: string;
  isAnchor: boolean; // true = same-page scroll to another table, false = route navigation
}

export function resolveSkillLink(raw: string, lang: 'en' | 'hu'): ResolvedSkillLink | null {
  const [type, id] = raw.split(':');
  if (!type || !id) return null;

  switch (type) {
    case 'project': {
      const project = projects.find(p => p.id === id);
      if (!project) return null;
      return { href: `/projects/${id}`, label: project.translations[lang].title, isAnchor: false };
    }
    case 'job': {
      const job = jobs.find(j => j.id === id);
      if (!job) return null;
      return { href: `/experience/${id}`, label: job.translations[lang].title, isAnchor: false };
    }
    case 'study': {
      const study = studies.find(s => s.id === id);
      if (!study) return null;
      return { href: `/studies/${id}`, label: study.translations[lang].title, isAnchor: false };
    }
    case 'table': {
      const table = skillTables.find(t => t.id === id);
      if (!table) return null;
      return { href: `#skill-table-${id}`, label: table.translations[lang].title, isAnchor: true };
    }
    default:
      return null;
  }
}