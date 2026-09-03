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
  /** 0 = hugs the line, 1+ = pushed further out because it overlaps a longer event's lane. */
  lane: number;
  /** Offset/height (relative to `top`/`height` above) of the true, un-stretched start/end - used to draw
   *  the on-spine ribbon at the event's real duration even when the box itself was padded up to
   *  MIN_EVENT_HEIGHT for label spacing. */
  spineTop: number;
  spineHeight: number;
}

export interface TimelineLayout {
  items: TimelineLayoutItem[];
  containerHeight: number;
}

// Bigger values spread the line out more; smaller values keep the page shorter.
const PX_PER_DAY = 0.55;
const MIN_EVENT_HEIGHT = 120;
// Two boxes closer than this (in px) are treated as overlapping for lane purposes, giving a little breathing room.
const LANE_OVERLAP_BUFFER = 10;
const PADDING_TOP = 60;
const PADDING_BOTTOM = 120;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Maps events onto a shared, real (non-stretched) vertical time axis - newest at the top, oldest at
 * the bottom - so overlapping studies/projects/jobs keep their true relative timing. Same-side events
 * that genuinely overlap in time are resolved horizontally instead: longer events claim the inner lane
 * (closest to the line) first, shorter overlapping ones are assigned an outer lane so every event stays
 * independently hoverable. The CSS turns `lane` into an actual pixel offset sized off the current
 * (responsive) label width, so titles in different lanes never overlap on any screen size.
 */
export function computeTimelineLayout(events: TimelineLayoutInput[]): TimelineLayout {
  if (events.length === 0) {
    return { items: [], containerHeight: PADDING_TOP + PADDING_BOTTOM };
  }

  const maxTime = Math.max(Date.now(), ...events.map((event) => event.end));
  const mapTime = (time: number) => PADDING_TOP + ((maxTime - time) / DAY_MS) * PX_PER_DAY;

  const boxes = events.map((event) => {
    const trueTop = mapTime(event.end);
    const trueBottom = mapTime(event.start);
    let top = trueTop;
    let bottom = trueBottom;
    if (bottom - top < MIN_EVENT_HEIGHT) {
      const mid = (top + bottom) / 2;
      top = mid - MIN_EVENT_HEIGHT / 2;
      bottom = mid + MIN_EVENT_HEIGHT / 2;
    }
    return {
      id: event.id,
      side: event.side,
      top,
      bottom,
      duration: event.end - event.start,
      // Un-stretched span, expressed relative to the (possibly padded) box's own top.
      spineTop: trueTop - top,
      spineHeight: trueBottom - trueTop,
    };
  });

  let containerHeight = PADDING_TOP + PADDING_BOTTOM;
  const laneById = new Map<string, number>();

  (['left', 'right'] as const).forEach((side) => {
    // Longest-first greedy interval coloring: the longest event in a cluster always wins lane 0.
    const sideBoxes = boxes.filter((box) => box.side === side).sort((a, b) => b.duration - a.duration);
    const lanes: { top: number; bottom: number }[][] = [];

    for (const box of sideBoxes) {
      let laneIndex = lanes.findIndex(
        (lane) =>
          !lane.some(
            (occupied) => box.top < occupied.bottom + LANE_OVERLAP_BUFFER && occupied.top < box.bottom + LANE_OVERLAP_BUFFER
          )
      );
      if (laneIndex === -1) {
        laneIndex = lanes.length;
        lanes.push([]);
      }
      lanes[laneIndex].push(box);
      laneById.set(box.id, laneIndex);
      containerHeight = Math.max(containerHeight, box.bottom + PADDING_BOTTOM);
    }
  });

  const items = boxes.map((box) => ({
    id: box.id,
    side: box.side,
    top: box.top,
    height: box.bottom - box.top,
    lane: laneById.get(box.id) ?? 0,
    spineTop: box.spineTop,
    spineHeight: box.spineHeight,
  }));

  return { items, containerHeight };
}
