interface WeightedItem {
  weight?: number;
}

/**
 * Given a section's items, returns one Bootstrap column class string per item,
 * simulating how they'd wrap across 12-column rows based on their `weight`.
 * Works for any item shape that carries an optional `weight` (Project or Job blocks).
 */
export function getBlockColumnClasses(items: WeightedItem[]): string[] {
  const weights = items.map(item => {
    const w = item.weight ?? 12;
    return Math.min(12, Math.max(1, w));
  });

  const lines: number[][] = [];
  let currentLine: number[] = [];
  let currentSum = 0;

  weights.forEach((w, idx) => {
    if (currentLine.length > 0 && currentSum + w > 12) {
      lines.push(currentLine);
      currentLine = [];
      currentSum = 0;
    }
    currentLine.push(idx);
    currentSum += w;
  });
  if (currentLine.length > 0) lines.push(currentLine);

  const effectiveWeights = [...weights];
  const lastLine = lines[lines.length - 1];
  if (lastLine && lastLine.length === 1) {
    const idx = lastLine[0];
    if (effectiveWeights[idx] < 12) {
      effectiveWeights[idx] = 12;
    }
  }

  return effectiveWeights.map(w => `col-12 col-md-${w}`);
}