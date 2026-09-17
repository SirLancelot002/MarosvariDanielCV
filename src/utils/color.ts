export function hexToRgbSpaceString(hex: string): string {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean;
  const r = parseInt(full.slice(0, 2), 16) || 0;
  const g = parseInt(full.slice(2, 4), 16) || 0;
  const b = parseInt(full.slice(4, 6), 16) || 0;
  return `${r} ${g} ${b}`;
}

export function shiftHexToward(sourceHex: string, targetHex: string, amount: number): string {
  const toChannels = (hex: string) => {
    const clean = hex.replace('#', '');
    const full = clean.length === 3
      ? clean.split('').map(c => c + c).join('')
      : clean;
    return [0, 2, 4].map(offset => parseInt(full.slice(offset, offset + 2), 16) || 0);
  };
  const sourceChannels = toChannels(sourceHex);
  const targetChannels = toChannels(targetHex);
  const clampedAmount = Math.min(1, Math.max(0, amount));
  const shifted = sourceChannels.map((channel, index) => Math.round(channel + (targetChannels[index] - channel) * clampedAmount));

  return `#${shifted.map(channel => channel.toString(16).padStart(2, '0')).join('')}`;
}