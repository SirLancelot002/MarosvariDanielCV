import { useMemo, useState } from 'react';
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

type SortKey = 'name' | 'rating' | 'links';

function SkillTableView({ table }: SkillTableViewProps) {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const content = table.translations[lang];
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' } | null>(null);

  const rows = useMemo(() => {
    if (!sort) return table.skills;
    const factor = sort.dir === 'asc' ? 1 : -1;
    return [...table.skills].sort((a, b) => {
      switch (sort.key) {
        case 'name':
          return factor * a.translations[lang].name.localeCompare(b.translations[lang].name, lang);
        case 'rating':
          return factor * (a.rating - b.rating);
        default:
          return factor * ((a.links?.length ?? 0) - (b.links?.length ?? 0));
      }
    });
  }, [table.skills, sort, lang]);

  const toggleSort = (key: SortKey) => {
    const firstDir = key === 'name' ? 'asc' : 'desc';
    setSort((prev) =>
      prev?.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: firstDir }
    );
  };

  const sortableHeader = (key: SortKey, label: string) => {
    const active = sort?.key === key;
    return (
      <th aria-sort={active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : undefined}>
        <button type="button" className="skills-table__sort" onClick={() => toggleSort(key)}>
          {label}
          <span className="skills-table__sort-icon" aria-hidden="true">
            {active ? (sort.dir === 'asc' ? '▲' : '▼') : '-'}
          </span>
        </button>
      </th>
    );
  };

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
              {sortableHeader('name', t("skills.columnSkill"))}
              {sortableHeader('rating', t("skills.columnRating"))}
              <th>{t("skills.columnComment")}</th>
              {sortableHeader('links', t("skills.columnLinks"))}
            </tr>
          </thead>
          <tbody>
            {rows.map((skill) => {
              const rowContent = skill.translations[lang];

              return (
                <tr key={skill.translations.en.name}>
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