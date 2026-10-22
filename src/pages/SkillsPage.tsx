import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
import { GridScan } from '../modules/GridScanV2';
import SkillTableView from '../modules/SkillTableView';
import RevealOnScroll from '../modules/RevealOnScroll';
import { skillTables } from '../data/loadSkills';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
import './SkillsPage.css';

function SkillsPage() {
  const { t } = useTranslation();
  const quality = useAdaptiveQuality();

  const gridDpr = quality === 'high' ? undefined : quality === 'medium' ? 1 : 0.6;
  const gridGlow = quality === 'high' ? 0.6 : quality === 'medium' ? 0.4 : 0.2;
  const gridReflection = quality === 'high' ? 0.35 : quality === 'medium' ? 0.2 : 0;
  const gridPoints = quality !== 'low';

  return (
    <>
      <div className="studies-bg-fixed skills-page-bg">
        <GridScan
          linesColor="#4d4757"
          scanColor="#5eead4"
          cells={6}
          depth={3}
          scanDuration={3.2}
          scanDelay={0.8}
          clickEffect="ping"
          lineThickness={1}
          lineStyle="solid"
          depthFade={0.6}
          shading={0.7}
          reflection={gridReflection}
          points={gridPoints}
          scanDirection="forward"
          scanWidth={1}
          trail={0.9}
          glow={gridGlow}
          parallax={1}
          autoScan
          interactive
          enableWebcam={false}
          showPreview
          intro
          lightMode={false}
          dpr={gridDpr}
        />
      </div>
      <div className="studies-content-layer">
        <main className="hero-section studies-hero-section">
          <TextType
            as="h1"
            className="projects-text-type"
            text={[t("skills.title1"), t("skills.title2"), t("skills.title3")]}
            typingSpeed={75}
            pauseDuration={2500}
            showCursor
            cursorCharacter="_"
            deletingSpeed={50}
            variableSpeed={{ min: 60, max: 120 }}
            cursorBlinkDuration={0.5}
          />
        </main>

        <NavBar />

        <div className="container mt-5 skills-list">
          {skillTables.map((table) => (
            <RevealOnScroll key={table.id}>
              <SkillTableView table={table} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </>
  );
}

export default SkillsPage;