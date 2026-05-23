import { useState, useEffect } from "react";
import { CgMenu, CgMoon } from "react-icons/cg";
import { MdOutlineWbSunny } from "react-icons/md";
import { FiX, FiGithub, FiLinkedin } from "react-icons/fi";
import { SiArtstation } from "react-icons/si";
import Portfolio from "./components/Portfolio";
import ProjectDetail from "./components/ProjectDetail";
import Contact from "./components/Contact";
import Resume from "./components/Resume";
import FeaturedProjects from "./components/FeaturedProjects";
import Footer from "./components/Footer";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import type { Language } from "./context/LanguageContext";

type ViewType = "home" | "portfolio" | "project-detail" | "contact" | "resume";

type ThemeProps = {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
};

function parseHash(): { view: ViewType; projectId: string | null } {
  const hash = window.location.hash.slice(1);
  if (hash.startsWith("project/")) {
    return { view: "project-detail", projectId: hash.slice(8) };
  }
  const validViews: ViewType[] = ["home", "portfolio", "resume", "contact"];
  if (validViews.includes(hash as ViewType)) {
    return { view: hash as ViewType, projectId: null };
  }
  return { view: "home", projectId: null };
}

function NavBar({
  darkMode,
  setDarkMode,
  onNavigate,
}: ThemeProps & { onNavigate: (view: ViewType) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, lang, setLang } = useLanguage();

  const LANGS: { id: Language; label: string }[] = [
    { id: "en", label: "EN" },
    { id: "my", label: "MY" },
    { id: "zh", label: "中文" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-[100] border-b border-[var(--border)] bg-[rgba(10,14,39,0.95)] backdrop-blur-[10px] transition-all duration-300 ease-in-out [.light-mode_&]:bg-[rgba(255,255,255,0.95)]">
        <div className="mx-auto flex h-16 w-full max-w-[1400px] items-center justify-between gap-8 px-8">
          <button
            className="cursor-pointer rounded-lg border-none bg-transparent p-2 text-[var(--text-h)] transition-all duration-300 ease-in-out hover:bg-[var(--accent-bg)] hover:text-[var(--primary-purple)]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <CgMenu size={28} />
          </button>

          <div className="flex flex-1 justify-center gap-8">
            {(["home", "portfolio", "resume", "contact"] as ViewType[]).map((view) => (
              <button
                key={view}
                onClick={() => onNavigate(view)}
                className="relative rounded-lg border-none bg-transparent px-4 py-2 text-base font-medium text-[var(--text)] transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[linear-gradient(90deg,var(--primary-purple),var(--primary-blue),var(--primary-yellow))] after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
              >
                {t(`nav.${view}`)}
              </button>
            ))}
          </div>

          <div className="w-10" />
        </div>
      </nav>

      {/* Side drawer */}
      {menuOpen && (
        <>
          <div
            className="fixed inset-0 z-[150] bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="fixed left-0 top-0 z-[200] flex h-full w-[280px] flex-col border-r border-[var(--card-border)] bg-[rgba(10,14,39,0.98)] shadow-[4px_0_30px_rgba(0,0,0,0.4)] [.light-mode_&]:bg-[rgba(255,255,255,0.98)]">
            <div className="flex items-center justify-between border-b border-[var(--card-border)] px-6 py-5">
              <span className="text-lg font-semibold text-[var(--text-h)]">{t("menu.title")}</span>
              <button
                className="cursor-pointer rounded-lg border-none bg-transparent p-2 text-[var(--text-h)] transition-all duration-200 hover:bg-[var(--accent-bg)] hover:text-[var(--primary-purple)]"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Theme */}
            <div className="flex flex-col gap-1 px-4 py-5">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-[var(--primary-cyan)]">{t("menu.theme")}</p>
              <button
                className="flex cursor-pointer items-center gap-3 rounded-lg border-none bg-transparent px-4 py-3 text-left text-base text-[var(--text)] transition-all duration-200 hover:bg-[var(--accent-bg)] hover:text-[var(--primary-purple)]"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <MdOutlineWbSunny size={20} /> : <CgMoon size={20} />}
                <span>{darkMode ? t("menu.lightMode") : t("menu.darkMode")}</span>
              </button>
            </div>

            <div className="mx-4 border-t border-[var(--card-border)]" />

            {/* Language */}
            <div className="flex flex-col gap-1 px-4 py-5">
              <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-[var(--primary-cyan)]">{t("menu.language")}</p>
              <div className="flex gap-2 px-2">
                {LANGS.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setLang(id)}
                    className={`flex-1 cursor-pointer rounded-lg py-2.5 text-sm font-bold transition-all duration-200 ${
                      lang === id
                        ? "bg-[var(--primary-purple)] text-white shadow-[0_2px_8px_rgba(124,58,237,0.4)]"
                        : "border border-[var(--card-border)] bg-transparent text-[var(--text)] hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mx-4 border-t border-[var(--card-border)]" />

            {/* Socials */}
            <div className="flex flex-col gap-1 px-4 py-5">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-[var(--primary-cyan)]">{t("menu.socials")}</p>
              <a
                href="https://www.linkedin.com/in/sawsan-abdullatif-842514406/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-[var(--text)] no-underline transition-all duration-200 hover:bg-[var(--accent-bg)] hover:text-[var(--primary-purple)]"
              >
                <FiLinkedin size={20} />
                <span>LinkedIn</span>
              </a>
              <a
                href="https://github.com/Reinylo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-[var(--text)] no-underline transition-all duration-200 hover:bg-[var(--accent-bg)] hover:text-[var(--primary-purple)]"
              >
                <FiGithub size={20} />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.artstation.com/sawsan_lo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-4 py-3 text-base text-[var(--text)] no-underline transition-all duration-200 hover:bg-[var(--accent-bg)] hover:text-[var(--primary-purple)]"
              >
                <SiArtstation size={20} />
                <span>ArtStation</span>
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}

interface HeaderProps {
  onNavigate: (view: ViewType) => void;
  onSelectProject: (id: string) => void;
}

function Header({ onNavigate, onSelectProject }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <>
      <header className="relative flex min-h-[calc(120vh-4rem)] items-center justify-center overflow-hidden px-8 py-16">
        <video
          src="src/assets/projects/3D/turntable.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-30 brightness-50"
        />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(124,58,237,0.2)_0%,rgba(59,130,246,0.15)_50%,rgba(10,14,39,0.6)_100%)]" />
        <div className="grid w-full max-w-[1400px] grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 relative z-[2]">
          <div className="z-[2] text-left">
            <h1 className="mb-4 text-[2.5rem] font-bold leading-[1.2] text-[var(--text-h)] md:text-[3.5rem]">
              {t("hero.title").split("Sawsan's Portfolio").length > 1 ? (
                <>
                  {t("hero.title").split("Sawsan")[0]}
                  <span className="gradient-text">
                    {t("hero.title").includes("Sawsan's Portfolio")
                      ? "Sawsan's Portfolio"
                      : t("hero.title").includes("Sawsan")
                      ? t("hero.title").split("Sawsan").slice(1).join("Sawsan")
                      : ""}
                  </span>
                </>
              ) : (
                <span className="gradient-text">{t("hero.title")}</span>
              )}
            </h1>
            <p className="mb-4 text-2xl text-[var(--primary-cyan)]">{t("hero.subtitle")}</p>
            <p className="mb-8 text-[1.1rem] leading-[1.6] text-[var(--text)]">{t("hero.desc")}</p>
            <button
              onClick={() => onNavigate("portfolio")}
              className="relative cursor-pointer overflow-hidden rounded-lg border-none bg-[var(--primary-purple)] px-10 py-4 text-base font-semibold text-white shadow-[0_4px_15px_rgba(124,58,237,0.4)] transition-all duration-300 ease-in-out before:absolute before:left-[-100%] before:top-0 before:h-full before:w-full before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.25),transparent)] before:transition-[left] before:duration-500 before:ease-in-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_4px_25px_rgba(124,58,237,0.6)] hover:before:left-[100%]"
            >
              {t("hero.cta")}
            </button>
          </div>

          <div className="relative z-[1] h-[400px]">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>
        </div>
      </header>
      <FeaturedProjects onNavigate={onNavigate} onSelectProject={onSelectProject} />
    </>
  );
}

function AppContent() {
  const [darkMode, setDarkMode] = useState(true);
  const initial = parseHash();
  const [currentView, setCurrentView] = useState<ViewType>(initial.view);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initial.projectId);

  const handleNavigate = (view: ViewType) => {
    setCurrentView(view);
    window.location.hash = view === "home" ? "" : view;
  };

  const handleSelectProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentView("project-detail");
    window.location.hash = `project/${id}`;
  };

  const handleBack = () => {
    setCurrentView("portfolio");
    window.location.hash = "portfolio";
  };

  useEffect(() => {
    const onHashChange = () => {
      const { view, projectId } = parseHash();
      setCurrentView(view);
      if (projectId) setSelectedProjectId(projectId);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col transition-[background] duration-300 ease-in-out ${
        darkMode ? "app dark-mode" : "app light-mode"
      }`}
    >
      <NavBar darkMode={darkMode} setDarkMode={setDarkMode} onNavigate={handleNavigate} />

      <main className="flex-1">
        {currentView === "home" && (
          <Header onNavigate={handleNavigate} onSelectProject={handleSelectProject} />
        )}
        {currentView === "portfolio" && (
          <Portfolio onSelectProject={handleSelectProject} />
        )}
        {currentView === "project-detail" && selectedProjectId && (
          <ProjectDetail projectId={selectedProjectId} onBack={handleBack} />
        )}
        {currentView === "contact" && <Contact />}
        {currentView === "resume" && <Resume />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
