import type { Study } from '../types/study';
import type { Project } from '../types/project';
import type { Job } from '../types/job';
import type { TimelineSide } from '../utils/timelineLayout';
import studiesData from './studies.json';
import { projects } from './loadProjects';
import { jobs } from './loadJobs';

const studies = studiesData as Study[];

export type TimelineKind = 'study' | 'project' | 'job';

export interface TimelineEvent {
  id: string;
  kind: TimelineKind;
  side: TimelineSide;
  color: string;
  start: number; // ms epoch
  end: number;   // ms epoch (now if still ongoing)
  ongoing: boolean;
  study?: Study;
  project?: Project;
  job?: Job;
}

// Studies don't carry their own color, so cycle through a small violet palette instead.
const STUDY_COLORS = ['#7c4dff', '#a67dff', '#5227FF', '#9c6bff', '#8a63ff'];
const DEFAULT_PROJECT_COLOR = '#61dca3';
// Jobs default to an ocean blue unless the entry provides its own color.
const DEFAULT_JOB_COLOR = '#1b6ca8';

function toTime(date: string | undefined, fallback: number): number {
  if (!date) return fallback;
  const time = new Date(date).getTime();
  return Number.isNaN(time) ? fallback : time;
}

function buildTimelineEvents(): TimelineEvent[] {
  const now = Date.now();

  const studyEvents: TimelineEvent[] = studies.map((study, index) => ({
    id: `study-${study.id}`,
    kind: 'study',
    side: 'left',
    color: STUDY_COLORS[index % STUDY_COLORS.length],
    start: toTime(study.startDate, now),
    end: toTime(study.endDate, now),
    ongoing: !study.endDate,
    study,
  }));

  const projectEvents: TimelineEvent[] = projects.map((project) => ({
    id: `project-${project.id}`,
    kind: 'project',
    side: 'right',
    color: project.color ?? DEFAULT_PROJECT_COLOR,
    start: toTime(project.startDate, now),
    end: toTime(project.endDate, now),
    ongoing: !project.endDate,
    project,
  }));

  const jobEvents: TimelineEvent[] = jobs.map((job) => ({
    id: `job-${job.id}`,
    kind: 'job',
    side: 'left',
    color: job.color ?? DEFAULT_JOB_COLOR,
    start: toTime(job.startDate, now),
    end: toTime(job.endDate, now),
    ongoing: !job.endDate,
    job,
  }));

  return [...studyEvents, ...jobEvents, ...projectEvents].sort((a, b) => b.end - a.end);
}

export const timelineEvents: TimelineEvent[] = buildTimelineEvents();
