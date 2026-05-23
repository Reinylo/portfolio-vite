import { FiArrowRight } from "react-icons/fi";
import { projects } from "../data/projects";
import { useLanguage } from "../context/LanguageContext";

type ViewType = "home" | "portfolio" | "project-detail" | "contact" | "resume";

interface FeaturedProjectsProps {
    onNavigate: (view: ViewType) => void;
    onSelectProject: (id: string) => void;
}

export default function FeaturedProjects({ onNavigate, onSelectProject }: FeaturedProjectsProps) {
    const { t } = useLanguage();
    const featured = projects.slice(0, 3);

    return (
        <section className="bg-[linear-gradient(180deg,transparent_0%,rgba(124,58,237,0.03)_50%,transparent_100%)] px-8 py-16">
            <div className="mx-auto max-w-[1400px]">
                <h2 className="mb-6 text-center text-[2.5rem] text-[var(--text-h)]">{t("featured.title")}</h2>
                <p className="mb-12 text-center text-[1.1rem] text-[var(--text)]">{t("featured.subtitle")}</p>

                <div className="mb-12 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-10">
                    {featured.map((project) => (
                        <div
                            key={project.id}
                            className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] transition-all duration-300 ease-in-out hover:-translate-y-3 hover:border-[var(--primary-purple)] hover:shadow-[0_25px_50px_rgba(124,58,237,0.4)]"
                            onClick={() => onSelectProject(project.id)}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="relative w-full overflow-hidden bg-[linear-gradient(135deg,rgba(124,58,237,0.2),rgba(59,130,246,0.2))] pt-[66.67%]">
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="absolute left-0 top-0 h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                                />
                                <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.7)] opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100">
                                    <span className="rounded-[2rem] bg-[linear-gradient(135deg,var(--primary-purple),var(--primary-blue))] px-6 py-3 font-semibold text-white">
                                        {t("featured.viewProject")}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col p-6 text-left">
                                <h3 className="mb-2 text-[1.25rem] font-semibold text-[var(--text-h)]">{project.title}</h3>
                                <p className="mb-3 text-[0.8rem] font-semibold uppercase text-[var(--primary-cyan)]">
                                    {t(`cat.${project.category}`)}
                                </p>
                                <p className="flex-1 text-[0.9rem] leading-6 text-[var(--text)]">{project.abstract}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-center">
                    <button
                        className="flex items-center gap-3 rounded-lg border-none bg-[var(--primary-purple)] px-10 py-4 text-base font-semibold text-white shadow-[0_4px_15px_rgba(124,58,237,0.4)] transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_4px_25px_rgba(124,58,237,0.6)]"
                        onClick={() => onNavigate("portfolio")}
                    >
                        {t("featured.viewAll")}
                        <FiArrowRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}
