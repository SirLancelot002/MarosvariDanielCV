export function formatStudyPeriod(startDate: string, endDate: string | undefined, lang: 'en' | 'hu'): string {
  const startYear = new Date(startDate).getFullYear();

  if (!endDate) {
    return lang === 'hu' ? `${startYear} - jelenleg` : `${startYear} - Present`;
  }

  const endYear = new Date(endDate).getFullYear();
  if (startYear === endYear) {
    return `${startYear}`;
  }

  return `${startYear} - ${endYear}`;
}

export function formatProjectDuration(
  startDate: string,
  endDate: string | undefined,
  lang: 'en' | 'hu'
): string {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date(); // ongoing = up to today

  let months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());
  if (months < 1) months = 1; // avoid showing "0 months" for short projects

  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  const parts: string[] = [];
  if (lang === 'hu') {
    if (years > 0) parts.push(`${years} év`);
    if (remMonths > 0) parts.push(`${remMonths} hónap`);
  } else {
    if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
    if (remMonths > 0) parts.push(`${remMonths} month${remMonths > 1 ? 's' : ''}`);
  }

  return parts.join(' ');
}

export function formatJobPeriod(
  startDate: string,
  endDate: string | undefined,
  lang: 'en' | 'hu'
): string {
  const locale = lang === 'hu' ? 'hu-HU' : 'en-US';
  const formatMonth = (date: string) => new Date(date).toLocaleDateString(locale, {
    month: 'short',
    year: 'numeric',
  });
  const end = endDate ? formatMonth(endDate) : lang === 'hu' ? 'jelenleg' : 'Present';

  return `${formatMonth(startDate)} - ${end} (${formatProjectDuration(startDate, endDate, lang)})`;
}