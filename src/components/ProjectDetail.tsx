import { useState, useEffect } from "react";
import { projects } from "../data/projects";
import { IoArrowBack } from "react-icons/io5";
import { FiTarget, FiAlertCircle, FiChevronLeft, FiChevronRight, FiPlay, FiMonitor, FiBox, FiX, FiMaximize2, FiGlobe } from "react-icons/fi";
import RuffleEmbed from "./RuffleEmbed";
import { useLanguage } from "../context/LanguageContext";

interface ProjectDetailProps {
    projectId: string;
    onBack: () => void;
}

export default function ProjectDetail({ projectId, onBack }: ProjectDetailProps) {
    const { t } = useLanguage();
    const [heroIndex, setHeroIndex] = useState(0);
    const [sketchfabOpen, setSketchfabOpen] = useState(false);
    const project = projects.find((p) => p.id === projectId);

    const images = project?.gallery?.images ?? [];

    useEffect(() => { setHeroIndex(0); }, [projectId]);

    // Close modal on Escape
    useEffect(() => {
        if (!sketchfabOpen) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setSketchfabOpen(false); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [sketchfabOpen]);

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
        project.websiteUrl
            ? { type: "website" as const, src: project.websiteUrl }
            : project.swfUrl
            ? { type: "swf" as const, src: project.swfUrl }
            : { type: "image" as const, src: project.thumbnail },
        ...images.map((src) => ({ type: "image" as const, src })),
        ...(project.gallery?.videos ?? []).map((src) => ({ type: "video" as const, src })),
    ];
    const currentHero = heroMedia[heroIndex];

    const swfBase = project.swfUrl
        ? new URL(project.swfUrl.substring(0, project.swfUrl.lastIndexOf("/") + 1), window.location.href).href
        : undefined;

    const hasGallery = (images.length > 0) || !!project.gallery?.sketchfabUrl;

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

                {/* ── Hero carousel ── */}
                <div className={`relative mb-8 ${currentHero.type === "swf" ? "" : "overflow-hidden rounded-2xl shadow-[0_10px_40px_rgba(124,58,237,0.2)]"}`}>
                    {currentHero.type === "website" ? (
                        <div className="flex flex-col overflow-hidden rounded-2xl border border-[var(--card-border)]">
                            {/* Browser chrome */}
                            <div className="flex items-center gap-2 border-b border-[var(--card-border)] bg-[var(--card-bg)] px-4 py-2.5">
                                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                                <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
                                <span className="h-3 w-3 rounded-full bg-green-400/70" />
                                <div className="mx-3 flex flex-1 items-center gap-2 rounded-md border border-[var(--card-border)] bg-[rgba(255,255,255,0.04)] px-3 py-1">
                                    <FiGlobe size={12} className="shrink-0 text-[var(--text)]/40" />
                                    <span className="truncate text-xs text-[var(--text)]/50">{currentHero.src}</span>
                                </div>
                                <a
                                    href={currentHero.src}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex shrink-0 items-center justify-center rounded-md border border-[var(--card-border)] p-1.5 text-[var(--text)]/40 transition-all duration-200 hover:border-[var(--primary-purple)]/50 hover:text-[var(--primary-purple)]"
                                    title="Open in new tab"
                                >
                                    <FiMaximize2 size={12} />
                                </a>
                            </div>
                            <div className="overflow-hidden" style={{ height: "560px" }}>
                                <iframe
                                    src={currentHero.src}
                                    title={project.title}
                                    style={{ width: "125%", height: "700px", border: "none", transform: "scale(0.8)", transformOrigin: "top left" }}
                                    allow="fullscreen"
                                />
                            </div>
                        </div>
                    ) : currentHero.type === "swf" ? (
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

                {/* ── Thumbnail strip ── */}
                {heroMedia.length > 1 && (
                    <div className="mb-8 flex gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:h-[4px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[var(--primary-purple)] [&::-webkit-scrollbar-track]:bg-[var(--card-border)]">
                        {heroMedia.map((media, idx) => (
                            <button
                                key={idx}
                                onClick={() => setHeroIndex(idx)}
                                className={`relative shrink-0 h-16 w-24 cursor-pointer overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                                    heroIndex === idx
                                        ? "border-[var(--primary-purple)] shadow-[0_0_0_2px_rgba(124,58,237,0.3)]"
                                        : "border-[var(--card-border)] opacity-60 hover:opacity-100 hover:border-[var(--primary-purple)]/50"
                                }`}
                            >
                                {media.type === "image" ? (
                                    <img src={media.src} alt={`Slide ${idx + 1}`} className="h-full w-full object-cover" />
                                ) : media.type === "video" ? (
                                    <>
                                        <video src={media.src} className="h-full w-full object-cover" muted preload="metadata" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                                            <FiPlay size={16} className="text-white" />
                                        </div>
                                    </>
                                ) : media.type === "website" ? (
                                    <div className="flex h-full w-full items-center justify-center bg-[rgba(124,58,237,0.2)]">
                                        <FiGlobe size={18} className="text-[var(--primary-purple)]" />
                                    </div>
                                ) : (
                                    <div className="flex h-full w-full items-center justify-center bg-[rgba(124,58,237,0.2)]">
                                        <FiMonitor size={18} className="text-[var(--primary-purple)]" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                )}

                {/* ── Title ── */}
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
                    {/* Description */}
                    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                        <h3 className="mb-4 text-left text-[1.2rem] font-semibold text-[var(--primary-yellow)]">{t("project.description")}</h3>
                        <p className="mb-4 text-left leading-[1.8] text-[var(--text)]">{project.description}</p>
                        <p className="text-left leading-[1.8] text-[var(--text)]">{project.details}</p>
                    </div>

                    {/* Objectives */}
                    {project.objectives && project.objectives.length > 0 && (
                        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                            <h3 className="mb-5 flex items-center gap-3 text-left text-[1.2rem] font-semibold text-[var(--primary-yellow)]">
                                <FiTarget size={20} />
                                {t("project.objectives")}
                            </h3>
                            <ul className="m-0 list-none p-0">
                                {project.objectives.map((obj, i) => (
                                    <li key={i} className="relative mb-3 pl-6 text-left leading-[1.7] text-[var(--text)] before:absolute before:left-0 before:font-semibold before:text-[var(--primary-purple)] before:content-['\2192'] last:mb-0">
                                        {obj}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Tools */}
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

                    {/* ── Gallery (images + 3D model tile) ── */}
                    {hasGallery && (
                        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                            <h3 className="mb-5 text-left text-[1.2rem] font-semibold text-[var(--primary-yellow)]">{t("project.gallery")}</h3>
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                                {images.map((src, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setHeroIndex(1 + i);
                                            window.scrollTo({ top: 0, behavior: "smooth" });
                                        }}
                                        className="group relative overflow-hidden rounded-xl border border-[var(--card-border)] transition-all duration-200 hover:border-[var(--primary-purple)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.25)]"
                                        style={{ paddingTop: "66.67%" }}
                                    >
                                        <img
                                            src={src}
                                            alt={`Gallery ${i + 1}`}
                                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </button>
                                ))}

                                {/* Sketchfab tile */}
                                {project.gallery?.sketchfabUrl && (
                                    <button
                                        onClick={() => setSketchfabOpen(true)}
                                        className="group relative overflow-hidden rounded-xl border border-[var(--card-border)] bg-[linear-gradient(135deg,rgba(124,58,237,0.12),rgba(59,130,246,0.12))] transition-all duration-200 hover:border-[var(--primary-purple)] hover:shadow-[0_4px_16px_rgba(124,58,237,0.3)]"
                                        style={{ paddingTop: "66.67%" }}
                                    >
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgba(124,58,237,0.2)] text-[var(--primary-purple)] transition-all duration-200 group-hover:scale-110 group-hover:bg-[rgba(124,58,237,0.35)]">
                                                <FiBox size={22} />
                                            </div>
                                            <span className="text-xs font-semibold text-[var(--text-h)]">{t("project.model3d")}</span>
                                            <div className="flex items-center gap-1 text-[0.7rem] text-[var(--text)]/50">
                                                <FiMaximize2 size={10} />
                                                <span>Click to expand</span>
                                            </div>
                                        </div>
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Limitations */}
                    {project.limitations && project.limitations.length > 0 && (
                        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                            <h3 className="mb-5 flex items-center gap-3 text-left text-[1.2rem] font-semibold text-[var(--primary-yellow)]">
                                <FiAlertCircle size={20} />
                                {t("project.limitations")}
                            </h3>
                            <ul className="m-0 list-none p-0">
                                {project.limitations.map((lim, i) => (
                                    <li key={i} className="relative mb-3 pl-6 text-left leading-[1.7] text-[var(--text)] before:absolute before:left-0 before:font-semibold before:text-[var(--primary-yellow)] before:content-['\2022'] last:mb-0">
                                        {lim}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Documentation */}
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
                </div>
            </div>

            {/* ── Sketchfab expanded modal ── */}
            {sketchfabOpen && project.gallery?.sketchfabUrl && (
                <div
                    className="fixed inset-0 z-[500] flex items-center justify-center bg-black/85 backdrop-blur-sm"
                    onClick={() => setSketchfabOpen(false)}
                >
                    <div
                        className="relative mx-4 w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header bar */}
                        <div className="mb-3 flex items-center justify-between">
                            <span className="flex items-center gap-2 text-sm font-semibold text-white/80">
                                <FiBox size={16} />
                                {t("project.model3d")}
                            </span>
                            <button
                                onClick={() => setSketchfabOpen(false)}
                                className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all duration-200 hover:bg-white/20"
                                aria-label="Close"
                            >
                                <FiX size={18} />
                            </button>
                        </div>
                        {/* iframe */}
                        <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)]" style={{ paddingTop: "56.25%" }}>
                            <iframe
                                title={project.title}
                                src={project.gallery.sketchfabUrl}
                                allowFullScreen
                                allow="autoplay; fullscreen; xr-spatial-tracking"
                                className="absolute left-0 top-0 h-full w-full border-0"
                            />
                        </div>
                        <p className="mt-2 text-center text-xs text-white/40">Press Esc or click outside to close</p>
                    </div>
                </div>
            )}
        </section>
    );
}
