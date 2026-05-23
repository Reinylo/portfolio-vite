import { useState, useEffect } from "react";
import { projects } from "../data/projects";
import { IoArrowBack } from "react-icons/io5";
import { FiTarget, FiAlertCircle, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import RuffleEmbed from "./RuffleEmbed";
import { useLanguage } from "../context/LanguageContext";

interface ProjectDetailProps {
    projectId: string;
    onBack: () => void;
}

export default function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
    const { t } = useLanguage();
    const [heroIndex, setHeroIndex] = useState(0);
    const project = projects.find((p) => p.id === projectId);

    const images = project?.gallery?.images ?? [];

    useEffect(() => { setHeroIndex(0); }, [projectId]);

    if (!project) {
        return (
            <section className="min-h-screen bg-[linear-gradient(180deg,rgba(124,58,237,0.05)_0%,transparent_100%)] px-8 py-16">
                <div className="mx-auto max-w-[1000px]">
                    <p>Project not found</p>
                </div>
            </section>
        );
    }

    const heroMedia = [
        project.swfUrl
            ? { type: "swf" as const, src: project.swfUrl }
            : { type: "image" as const, src: project.thumbnail },
        ...images.map((src) => ({ type: "image" as const, src })),
        ...(project.gallery?.videos ?? []).map((src) => ({ type: "video" as const, src })),
    ];
    const currentHero = heroMedia[heroIndex];

    // Absolute base URL so Ruffle can resolve relative paths inside the SWF (e.g. translation.xml).
    const swfBase = project.swfUrl
        ? new URL(project.swfUrl.substring(0, project.swfUrl.lastIndexOf("/") + 1), window.location.href).href
        : undefined;

    return (
        <section className="min-h-screen bg-[linear-gradient(180deg,rgba(124,58,237,0.05)_0%,transparent_100%)] px-8 py-16">
            <div className="mx-auto max-w-[1000px]">
                <button
                    className="mb-8 flex cursor-pointer items-center gap-2 rounded-lg border border-[var(--card-border)] bg-transparent px-6 py-3 text-base text-[var(--text)] transition-all duration-300 ease-in-out hover:border-[var(--primary-purple)] hover:bg-[var(--card-bg)] hover:text-[var(--primary-purple)]"
                    onClick={onBack}
                    aria-label="Back to portfolio"
                >
                    <IoArrowBack size={24} />
                    <span>{t("project.back")}</span>
                </button>

                <div className={`relative mb-8 ${currentHero.type !== "swf" ? "overflow-hidden rounded-2xl shadow-[0_10px_40px_rgba(124,58,237,0.2)]" : ""}`}>
                    {currentHero.type === "swf" ? (
                        <div className="mx-auto" style={{ zoom: 1.25, width: "88%", aspectRatio: "712 / 400" }}>
                            <RuffleEmbed
                                src={currentHero.src}
                                base={swfBase}
                                width="100%"
                                height="100%"
                                preventFullscreen
                            />
                        </div>
                    ) : currentHero.type === "image" ? (
                        <img
                            src={currentHero.src}
                            alt={project.title}
                            className="block h-auto min-h-[350px] w-full object-cover"
                        />
                    ) : (
                        <video
                            src={currentHero.src}
                            autoPlay
                            loop
                            muted
                            playsInline
                            controls
                            className="block min-h-[350px] w-full object-cover"
                        />
                    )}

                    {heroMedia.length > 1 && (
                        <>
                            <button
                                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[var(--primary-purple)] bg-[var(--primary-purple)] text-white shadow-[0_4px_20px_rgba(124,58,237,0.7)] transition-all duration-200 hover:scale-110 hover:brightness-125"
                                onClick={() => setHeroIndex((i) => (i - 1 + heroMedia.length) % heroMedia.length)}
                                aria-label="Previous"
                            >
                                <FiChevronLeft size={20} strokeWidth={2.5} />
                            </button>
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[var(--primary-purple)] bg-[var(--primary-purple)] text-white shadow-[0_4px_20px_rgba(124,58,237,0.7)] transition-all duration-200 hover:scale-110 hover:brightness-125"
                                onClick={() => setHeroIndex((i) => (i + 1) % heroMedia.length)}
                                aria-label="Next"
                            >
                                <FiChevronRight size={20} strokeWidth={2.5} />
                            </button>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
                                {heroIndex + 1} / {heroMedia.length}
                            </div>
                        </>
                    )}
                </div>

                <div className="mb-6 text-left flex flex-col gap-4">
                    <h1 className="mb-2 text-[2.5rem] text-[var(--text-h)]">{project.title}</h1>
                    <div className="flex items-center gap-4">
                        <p className="text-md font-semibold uppercase tracking-widest text-[var(--primary-cyan)]">
                            {project.category.replace(/-/g, " ")}
                        </p>
                        <p className="text-md font-semibold text-[var(--text)]">{t("project.year")} - {project.year}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                        <h3 className="mb-4 text-left text-[1.2rem] font-semibold text-[var(--primary-yellow)]">{t("project.description")}</h3>
                        <p className="mb-4 text-left leading-[1.8] text-[var(--text)]">{project.description}</p>
                        <p className="text-left leading-[1.8] text-[var(--text)]">{project.details}</p>
                    </div>

                    {project.objectives && project.objectives.length > 0 && (
                        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                            <h3 className="mb-5 flex items-center gap-3 text-left text-[1.2rem] font-semibold text-[var(--primary-yellow)]">
                                <FiTarget size={20} />
                                {t("project.objectives")}
                            </h3>
                            <ul className="m-0 list-none p-0">
                                {project.objectives.map((obj, i) => (
                                    <li
                                        key={i}
                                        className="relative mb-3 pl-6 text-left leading-[1.7] text-[var(--text)] before:absolute before:left-0 before:font-semibold before:text-[var(--primary-purple)] before:content-['\2192'] last:mb-0"
                                    >
                                        {obj}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                        <h3 className="mb-5 text-left text-[1.2rem] font-semibold text-[var(--primary-yellow)]">{t("project.tools")}</h3>
                        <div className="flex flex-wrap gap-3 text-left">
                            {project.tools.map((tool) => (
                                <span
                                    key={tool}
                                    className="rounded-[2rem] border border-[var(--primary-purple)] px-4 py-2 text-[0.9rem] font-medium text-[var(--text-h)] transition-all duration-300 ease-in-out hover:bg-[var(--primary-purple)] hover:text-white"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>
                    </div>

                    {project.limitations && project.limitations.length > 0 && (
                        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                            <h3 className="mb-5 flex items-center gap-3 text-left text-[1.2rem] font-semibold text-[var(--primary-yellow)]">
                                <FiAlertCircle size={20} />
                                {t("project.limitations")}
                            </h3>
                            <ul className="m-0 list-none p-0">
                                {project.limitations.map((lim, i) => (
                                    <li
                                        key={i}
                                        className="relative mb-3 pl-6 text-left leading-[1.7] text-[var(--text)] before:absolute before:left-0 before:font-semibold before:text-[var(--primary-yellow)] before:content-['\2022'] last:mb-0"
                                    >
                                        {lim}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {project.documentationPdf && (
                        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                            <h3 className="mb-5 text-left text-[1.2rem] font-semibold text-[var(--primary-yellow)]">{t("project.docs")}</h3>
                            <iframe
                                src={`${project.documentationPdf}#zoom=90`}
                                title="Project Documentation"
                                className="h-[520px] w-full rounded-xl border border-[var(--card-border)]"
                            />
                        </div>
                    )}

                    {project.gallery?.sketchfabUrl && (
                        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                            <h3 className="mb-6 text-left text-[1.2rem] font-semibold text-[var(--primary-yellow)]">{t("project.model3d")}</h3>
                            <div className="relative overflow-hidden rounded-xl border border-[var(--card-border)]" style={{ paddingTop: "56.25%" }}>
                                <iframe
                                    title={project.title}
                                    src={project.gallery.sketchfabUrl}
                                    allowFullScreen
                                    allow="autoplay; fullscreen; xr-spatial-tracking"
                                    className="absolute left-0 top-0 h-full w-full border-0"
                                />
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}
