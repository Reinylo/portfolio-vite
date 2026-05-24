import { useState } from "react";
import { projects, type ProjectCategory } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

const CATEGORY_IDS: Array<ProjectCategory | "all"> = [
    "all", "3d-art", "graphic-design", "vector-illustration",
    "multimedia-apps", "web-development", "UI Design", "programming",
];

interface PortfolioProps {
    onSelectProject: (id: string) => void;
}

export default function Portfolio({ onSelectProject }: PortfolioProps) {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");

    const categories = CATEGORY_IDS.map((id) => ({ id, label: t(`cat.${id}`) }));

    const filteredProjects =
        activeCategory === "all"
            ? projects
            : projects.filter((p) => p.category === activeCategory);

    return (
        <section
            id="portfolio"
            className="min-h-screen bg-[linear-gradient(180deg,rgba(124,58,237,0.05)_0%,rgba(59,130,246,0.05)_50%,transparent_100%)] px-8 py-16"
        >
            <div className="mx-auto max-w-[1400px]">
                <h2 className="mb-4 text-center text-5xl text-[var(--text-h)]">{t("portfolio.title")}</h2>
                <p className="mb-12 text-center text-[1.2rem] text-[var(--text)]">{t("portfolio.subtitle")}</p>

                <div className="mb-16 flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:h-[5px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--primary-purple)] [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[var(--card-border)]">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            className={`flex-none rounded-[2rem] border px-6 py-3 text-base font-small transition-all duration-300 ease-in-out ${activeCategory === category.id
                                    ? "border-[var(--primary-purple)] bg-[var(--primary-purple)] text-white shadow-[0_4px_12px_rgba(124,58,237,0.35)]"
                                    : "border-[var(--card-border)] bg-transparent text-[var(--text)] hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)]"
                                }`}
                            onClick={() => setActiveCategory(category.id as ProjectCategory | "all")}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-[repeat(auto-fill,minmax(420px,1fr))] gap-8">
                    <div className="col-span-full mb-4 flex items-center justify-between">
                        <h1 className="text-lg capitalize">{t(`cat.${activeCategory}`)}</h1>
                        <h4>{filteredProjects.length} {t("portfolio.projects")}</h4>
                    </div>
                    {filteredProjects.map((project) => (
                        <button
                            key={project.id}
                            className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] text-left transition-all duration-300 ease-in-out hover:-translate-y-2 hover:border-[var(--primary-purple)] hover:shadow-[0_20px_40px_rgba(124,58,237,0.3)]"
                            onClick={() => onSelectProject(project.id)}
                            role="link"
                        >
                            <div className="relative w-full overflow-hidden bg-[linear-gradient(135deg,rgba(124,58,237,0.2),rgba(59,130,246,0.2))] pt-[58%]">
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />
                                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.7)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                    <span className="rounded-[2rem] bg-[linear-gradient(135deg,var(--primary-purple),var(--primary-blue))] px-6 py-3 text-[0.95rem] font-semibold text-white">
                                        {t("portfolio.viewDetails")}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col p-6">
                                <h3 className="mb-2 text-left text-[1.3rem] font-semibold text-[var(--text-h)]">{project.title}</h3>
                                <p className="mb-3 text-left text-[0.85rem] font-semibold uppercase text-[var(--primary-cyan)]">
                                    {t(`cat.${project.category}`)}
                                </p>
                                <p className="mb-4 flex-1 text-left text-[0.95rem] leading-6 text-[var(--text)]">{project.abstract}</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {project.tools.slice(0, 4).map((tool) => (
                                        <span key={tool} className="rounded-full border border-[var(--card-border)] px-2.5 py-0.5 text-[0.75rem] font-medium text-[var(--text)]/70">
                                            {tool}
                                        </span>
                                    ))}
                                    {project.tools.length > 4 && (
                                        <span className="rounded-full border border-[var(--card-border)] px-2.5 py-0.5 text-[0.75rem] font-medium text-[var(--text)]/40">
                                            +{project.tools.length - 4}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
