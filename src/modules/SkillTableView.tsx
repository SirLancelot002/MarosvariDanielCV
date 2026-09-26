import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { SkillTable } from '../types/skill';
import { publicAsset } from '../utils/asset';
import { resolveSkillLink } from '../utils/skillLinks';
import SkillRating from './SkillRating';
import './SkillTableView.css';

interface SkillTableViewProps {
  table: SkillTable;
}

function SkillTableView({ table }: SkillTableViewProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const content = table.translations[lang];

  return (
    <div className="skills-table-card" id={`skill-table-${table.id}`}>
      <div className="skills-table-card__header">
        {table.icon && (
          <img src={publicAsset(table.icon)} alt="" className="skills-table-card__icon" />
        )}
        <h2 className="skills-table-card__title">{content.title}</h2>
      </div>

      <div className="skills-table-card__scroll">
        <table className="skills-table">
          <thead>
            <tr>
              <th className="skills-table__col-icon" />
              <th>{t("skills.columnSkill")}</th>
              <th>{t("skills.columnRating")}</th>
              <th>{t("skills.columnComment")}</th>
              <th>{t("skills.columnLinks")}</th>
            </tr>
          </thead>
          <tbody>
            {table.skills.map((skill, i) => {
              const rowContent = skill.translations[lang];

              return (
                <tr key={i}>
                  <td className="skills-table__col-icon">
                    {skill.icon && (
                      <img src={publicAsset(skill.icon)} alt="" className="skills-table__icon" />
                    )}
                  </td>

                  <td className="skills-table__name">{rowContent.name}</td>

                  <td>
                    <SkillRating rating={skill.rating} />
                  </td>

                  <td className="skills-table__comment">{rowContent.comment ?? ''}</td>

                  <td>
                    {skill.links && skill.links.length > 0 && (
                      <div className="skills-table__links">
                        {skill.links.map((raw, idx) => {
                          const resolved = resolveSkillLink(raw, lang);

                          if (!resolved) {
                            return null;
                          }

                          if (resolved.isAnchor) {
                            return (
                              <a
                                key={idx}
                                href={resolved.href}
                                className="skills-table__link"
                                onClick={(e) => {
                                  e.preventDefault();
                                  const target = document.querySelector(resolved.href);
                                  if (target) {
                                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                  }
                                }}
                              >
                                {resolved.label}
                              </a>
                            );
                          }

                          return (
                            <Link key={idx} to={resolved.href} className="skills-table__link">
                              {resolved.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SkillTableView;