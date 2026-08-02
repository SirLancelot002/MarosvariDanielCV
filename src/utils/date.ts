export function formatStudyPeriod(startDate: string, endDate: string | undefined, lang: 'en' | 'hu'): string {
  const startYear = new Date(startDate).getFullYear();

  if (!endDate) {
    return lang === 'hu' ? `${startYear} - jelenleg` : `${startYear} - Present`;
  }

  const endYear = new Date(endDate).getFullYear();
  return `${startYear} - ${endYear}`;
}