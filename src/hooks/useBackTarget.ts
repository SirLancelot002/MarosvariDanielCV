import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Resolves where a detail page's back button should go: the page the user came from
// (passed via router state) when it's not the default overview, otherwise the overview.
export function useBackTarget(defaultPath: string, defaultLabelKey: string) {
  const location = useLocation();
  const { t } = useTranslation();
  const from = (location.state as { from?: string } | null)?.from;

  if (from && from !== defaultPath) {
    return { to: from, label: t('nav.back') };
  }
  return { to: defaultPath, label: t(defaultLabelKey) };
}
