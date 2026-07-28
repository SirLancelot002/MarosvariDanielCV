import { useTranslation } from 'react-i18next';
import ElectricBorder from '../modules/ElectricBorder';
import GradientText from '../modules/GradientText';

function StudiesPage() {
  const { t } = useTranslation();

  return (
    <div className="container mt-5">
      <ElectricBorder color="#a67dff" speed={1} chaos={0.12} borderRadius={16} style={{ borderRadius: 16 }}>
        <div className="row electric-panel-row">
          <div className="col-sm-12 personal-data-block">
            <h3>
              <GradientText colors={["#3300ff", "#ff77fb", "#97c0cf"]} animationSpeed={8} showBorder className="custom-class">
                {t("studies.title")}
              </GradientText>
            </h3>
            <p>{t("studies.placeholder")}</p>
          </div>
        </div>
      </ElectricBorder>
    </div>
  );
}

export default StudiesPage;