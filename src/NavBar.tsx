import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PillNav from './modules/PillNav';
import logo from './assets/vscode.svg';
import './NavBar.css';

function NavBar() {
  const { t } = useTranslation();
  const location = useLocation();

  return (
    <div className="navbar-shell">
      <PillNav
        logo={logo}
        logoAlt="Company Logo"
        items={[
          { label: t("nav.main"), href: '/' },
          { label: t("nav.time"), href: '/timeline' },
          { label: t("nav.studies"), href: '/studies' },
          { label: t("nav.projects"), href: '/projects' }
        ]}
        activeHref={location.pathname}
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        initialLoadAnimation
      />
    </div>
  );
}

export default NavBar;