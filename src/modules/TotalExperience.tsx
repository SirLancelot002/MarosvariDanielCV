import { useTranslation } from 'react-i18next';
import { jobs } from '../data/loadJobs';
import { calculateTotalExperience } from '../utils/experience';
import CountUp from './CountUp';
import calendarLogoImg from '../assets/calendarlogo.png';
import './TotalExperience.css';

function TotalExperience() {
  const { t } = useTranslation();
  const { years, months } = calculateTotalExperience(jobs);

  return (
    <div className="total-experience">
      <img src={calendarLogoImg} alt="" className="total-experience__icon" />
        <p>{t("experience.total")}:</p>
      <span className="total-experience__text">
        {years > 0 && (
          <span className="total-experience__segment">
            {t("experience.years")}:{' '}
            <CountUp
              from={0}
              to={years}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
              delay={0.5}
            />
          </span>
        )}
        {months > 0 && (
          <span className="total-experience__segment">
            {t("experience.months")}:{' '}
            <CountUp
              from={0}
              to={months}
              separator=","
              direction="up"
              duration={1}
              className="count-up-text"
              delay={0.5}
            />
          </span>
        )}
      </span>
    </div>
  );
}

export default TotalExperience;