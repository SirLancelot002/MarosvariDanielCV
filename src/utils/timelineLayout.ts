export type TimelineSide = 'left' | 'right';

export interface TimelineLayoutInput {
  id: string;
  side: TimelineSide;
  start: number; // ms epoch
  end: number;   // ms epoch
}

export interface TimelineLayoutItem {
  id: string;
  side: TimelineSide;
  top: number;
  height: number;
}

export interface TimelineLayout {
  items: TimelineLayoutItem[];
  containerHeight: number;
}

// Bigger values spread the line out more; smaller values keep the page shorter.
const PX_PER_DAY = 0.55;
const MIN_EVENT_HEIGHT = 140;
const GAP_BETWEEN_EVENTS = 32;
const PADDING_TOP = 60;
const PADDING_BOTTOM = 120;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Maps events onto a shared vertical time axis (newest at the top), then
 * nudges same-side events apart so short/overlapping ones never collide.
 */
export function computeTimelineLayout(events: TimelineLayoutInput[]): TimelineLayout {
  if (events.length === 0) {
    return { items: [], containerHeight: PADDING_TOP + PADDING_BOTTOM };
  }

  const maxTime = Math.max(Date.now(), ...events.map((event) => event.end));
  const mapTime = (time: number) => PADDING_TOP + ((maxTime - time) / DAY_MS) * PX_PER_DAY;

  const boxes = events.map((event) => {
    let top = mapTime(event.end);
    let bottom = mapTime(event.start);
    if (bottom - top < MIN_EVENT_HEIGHT) {
      const mid = (top + bottom) / 2;
      top = mid - MIN_EVENT_HEIGHT / 2;
      bottom = mid + MIN_EVENT_HEIGHT / 2;
    }
    return { id: event.id, side: event.side, top, bottom };
  });

  let containerHeight = PADDING_TOP + PADDING_BOTTOM;

  (['left', 'right'] as const).forEach((side) => {
    const sideBoxes = boxes.filter((box) => box.side === side).sort((a, b) => a.top - b.top);
    let prevBottom = -Infinity;
    for (const box of sideBoxes) {
      if (box.top < prevBottom + GAP_BETWEEN_EVENTS) {
        const shift = prevBottom + GAP_BETWEEN_EVENTS - box.top;
        box.top += shift;
        box.bottom += shift;
      }
      prevBottom = box.bottom;
      containerHeight = Math.max(containerHeight, box.bottom + PADDING_BOTTOM);
    }
  });

  const items = boxes.map((box) => ({
    id: box.id,
    side: box.side,
    top: box.top,
    height: box.bottom - box.top,
  }));

  return { items, containerHeight };
}
