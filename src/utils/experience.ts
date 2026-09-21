import type { Job } from '../types/job';

export interface ExperienceTotal {
  years: number;
  months: number;
}

/**
 * Sums total work experience across all jobs, in whole months, then converts
 * to years + remaining months. Each job's duration is counted independently
 * (no overlap merging) — if two jobs' date ranges overlap, that overlap gets
 * counted twice.
 */
export function calculateTotalExperience(jobs: Job[]): ExperienceTotal {
  const totalMonths = jobs.reduce((sum, job) => {
    const start = new Date(job.startDate);
    const end = job.endDate ? new Date(job.endDate) : new Date();

    let months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    if (months < 1) months = 1;

    return sum + months;
  }, 0);

  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12
  };
}