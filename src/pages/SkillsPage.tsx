import { useTranslation } from 'react-i18next';
import NavBar from '../NavBar';
import TextType from '../modules/TextType';
import { GridScan } from '../modules/GridScan';
import SkillTableView from '../modules/SkillTableView';
import RevealOnScroll from '../modules/RevealOnScroll';
import { skillTables } from '../data/loadSkills';
import useAdaptiveQuality from '../hooks/useAdaptiveQuality';
import './SkillsPage.css';

function SkillsPage() {
  const { t } = useTranslation();
  const quality = useAdaptiveQuality();

  const postEnabled = quality !== 'low';
  const bloomIntensity = quality === 'high' ? 0.6 : quality === 'medium' ? 0.35 : 0;
  const chromaticAberration = quality === 'high' ? 0.002 : quality === 'medium' ? 0.001 : 0;
  const noiseIntensity = quality === 'high' ? 0.01 : quality === 'medium' ? 0.005 : 0;
  const lineJitter = quality === 'high' ? 0.1 : quality === 'medium' ? 0.05 : 0;
  const scanGlow = quality === 'high' ? 0.5 : quality === 'medium' ? 0.3 : 0.15;
  const scanSoftness = quality === 'high' ? 2 : quality === 'medium' ? 1.5 : 1;

  return (
    <>
      <div className="studies-bg-fixed skills-page-bg">
          <GridScan
          sensitivity={0.55}
          lineThickness={1}
          linesColor="#2F293A"
          gridScale={0.1}
          scanColor="#9d94f0"
          scanOpacity={0.4}
          enablePost={postEnabled}
          bloomIntensity={bloomIntensity}
          chromaticAberration={chromaticAberration}
          noiseIntensity={noiseIntensity}
          lineJitter={lineJitter}
          scanGlow={scanGlow}
          scanSoftness={scanSoftness}
          enableWebcam={false}
          showPreview={false}
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