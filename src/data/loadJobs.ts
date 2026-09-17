import type { Job } from '../types/job';

const modules = import.meta.glob('./jobs/*.json', { eager: true });

const unsortedJobs: Job[] = Object.values(modules).map(
  (mod) => (mod as { default: Job }).default
);

// Latest first, oldest last — sorted by start date.
export const jobs: Job[] = [...unsortedJobs].sort(
  (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
);