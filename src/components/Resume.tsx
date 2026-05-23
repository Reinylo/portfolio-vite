import { useState } from "react";
import {
    FiDownload, FiBriefcase, FiCode, FiBook, FiGlobe,
    FiMail, FiPhone, FiMapPin, FiAward, FiStar,
} from "react-icons/fi";
import cvPdf from "../assets/projects/pdfs/CV.pdf?url";
import { useLanguage } from "../context/LanguageContext";

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({ value, label, sub }: { value: string; label: string; sub: string }) {
    return (
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-5 text-center transition-all duration-300 hover:border-[var(--primary-purple)]/50 hover:shadow-[0_4px_20px_rgba(124,58,237,0.12)]">
            <div className="text-2xl font-bold text-[var(--primary-purple)]">{value}</div>
            <div className="mt-1 text-sm font-semibold text-[var(--text-h)]">{label}</div>
            <div className="mt-0.5 text-xs text-[var(--text)]/50">{sub}</div>
        </div>
    );
}

type SkillCategory = "design" | "code" | "tool";

function SkillTag({ label, category }: { label: string; category: SkillCategory }) {
    const hoverColors: Record<SkillCategory, string> = {
        design: "border-[var(--primary-cyan)] hover:bg-[var(--primary-cyan)]",
        code:   "border-[var(--primary-purple)] hover:bg-[var(--primary-purple)]",
        tool:   "border-[var(--primary-yellow)] hover:bg-[var(--primary-yellow)]",
    };
    return (
        <span className={`cursor-default rounded-full border px-3.5 py-1.5 text-sm font-medium text-[var(--text-h)] transition-all duration-200 hover:text-white ${hoverColors[category]}`}>
            {label}
        </span>
    );
}

function SkillGroup({
    icon, title, category, skills,
}: {
    icon: React.ReactNode;
    title: string;
    category: SkillCategory;
    skills: string[];
}) {
    const accent: Record<SkillCategory, string> = {
        design: "text-[var(--primary-cyan)]",
        code:   "text-[var(--primary-purple)]",
        tool:   "text-[var(--primary-yellow)]",
    };
    return (
        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-7">
            <h3 className={`mb-5 flex items-center gap-2.5 text-[1rem] font-semibold ${accent[category]}`}>
                {icon}
                {title}
            </h3>
            <div className="flex flex-wrap gap-2.5">
                {skills.map((s) => <SkillTag key={s} label={s} category={category} />)}
            </div>
        </div>
    );
}

function TimelineEntry({
    role, company, period, location, bullets,
}: {
    role: string;
    company: string;
    period: string;
    location?: string;
    bullets: string[];
}) {
    return (
        <div className="group relative pb-10 pl-10 last:pb-0">
            {/* dot */}
            <div className="absolute left-[-7px] top-[5px] h-3.5 w-3.5 rounded-full border-2 border-[var(--primary-purple)] bg-[var(--card-bg)] ring-4 ring-[var(--primary-purple)]/10 transition-all duration-300 group-hover:bg-[var(--primary-purple)] group-hover:ring-[var(--primary-purple)]/25" />
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-[1.05rem] font-semibold text-[var(--text-h)]">{role}</h3>
                <span className="shrink-0 rounded-full bg-[rgba(124,58,237,0.12)] px-3 py-0.5 text-xs font-semibold text-[var(--primary-purple)]">
                    {period}
                </span>
            </div>
            <p className="mb-3 text-sm font-medium text-[var(--primary-cyan)]">
                {company}{location ? ` · ${location}` : ""}
            </p>
            <ul className="space-y-2">
                {bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[0.9rem] leading-[1.75] text-[var(--text)]">
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary-cyan)]" />
                        {b}
                    </li>
                ))}
            </ul>
        </div>
    );
}

function LangBar({ lang, level, pct }: { lang: string; level: string; pct: number }) {
    return (
        <div className="rounded-xl border border-[var(--card-border)] bg-[rgba(124,58,237,0.03)] p-5 transition-all duration-300 hover:border-[var(--primary-purple)]/40">
            <div className="mb-2.5 flex justify-between text-sm">
                <span className="font-semibold text-[var(--text-h)]">{lang}</span>
                <span className="text-xs font-medium text-[var(--text)]/60">{level}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--card-border)]">
                <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--primary-purple),var(--primary-cyan))]"
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Resume() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState(0);

    const tabs: { icon: React.ReactNode; label: string }[] = [
        { icon: <FiBriefcase size={15} />, label: t("resume.tab.experience") },
        { icon: <FiCode     size={15} />, label: t("resume.tab.skills")     },
        { icon: <FiBook     size={15} />, label: t("resume.tab.education")  },
        { icon: <FiGlobe    size={15} />, label: t("resume.tab.languages")  },
    ];

    return (
        <section className="min-h-screen bg-[linear-gradient(180deg,rgba(59,130,246,0.05)_0%,rgba(124,58,237,0.05)_50%,transparent_100%)] px-8 py-16">
            <div className="mx-auto max-w-[900px]">

                {/* ── Header ── */}
                <div className="mb-10 text-center">
                    <div className="mb-4 inline-block rounded-full border border-[var(--primary-purple)]/30 bg-[rgba(124,58,237,0.08)] px-4 py-1 text-[0.7rem] font-bold uppercase tracking-widest text-[var(--primary-purple)]">
                        {t("resume.badge")}
                    </div>
                    <h1 className="mb-2 text-[2.8rem] font-bold text-[var(--text-h)]">Sawsan Al-Rabeei</h1>
                    <p className="mb-6 text-[1.05rem] text-[var(--text)]">{t("resume.subtitle")}</p>
                    <div className="mb-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-[var(--text)]">
                        <span className="flex items-center gap-1.5">
                            <FiMail size={13} className="text-[var(--primary-cyan)]" />
                            sawsan.48lo@gmail.com
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FiPhone size={13} className="text-[var(--primary-cyan)]" />
                            +60 178 323 764
                        </span>
                        <span className="flex items-center gap-1.5">
                            <FiMapPin size={13} className="text-[var(--primary-cyan)]" />
                            Kuala Lumpur, Malaysia
                        </span>
                    </div>
                    <a
                        href={cvPdf}
                        download="Sawsan_Al-Rabeei_CV.pdf"
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--primary-purple)] px-7 py-3 text-sm font-semibold text-white no-underline shadow-[0_4px_15px_rgba(124,58,237,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_6px_24px_rgba(124,58,237,0.55)]"
                    >
                        <FiDownload size={16} />
                        {t("resume.download")}
                    </a>
                </div>

                {/* ── Stats ── */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <StatCard value="3.55"   label={t("resume.stat.cgpa")}     sub={t("resume.stat.cgpaSub")}      />
                    <StatCard value="Year 2" label={t("resume.stat.year")}     sub={t("resume.stat.yearSub")}      />
                    <StatCard value="2+"     label={t("resume.stat.freelance")} sub={t("resume.stat.freelanceSub")} />
                    <StatCard value="3"      label={t("resume.stat.langs")}    sub={t("resume.stat.langsSub")}     />
                </div>

                {/* ── Summary ── */}
                <div className="mb-8 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-7">
                    <p className="leading-[1.9] text-[var(--text)]">{t("resume.summary")}</p>
                </div>

                {/* ── Tab bar ── */}
                <div className="mb-8 flex gap-1 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] p-1.5">
                    {tabs.map(({ icon, label }, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveTab(idx)}
                            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                                activeTab === idx
                                    ? "bg-[var(--primary-purple)] text-white shadow-[0_2px_12px_rgba(124,58,237,0.4)]"
                                    : "text-[var(--text)] hover:bg-[rgba(124,58,237,0.08)] hover:text-[var(--text-h)]"
                            }`}
                        >
                            {icon}
                            <span className="hidden sm:inline">{label}</span>
                        </button>
                    ))}
                </div>

                {/* ── Experience ── */}
                {activeTab === 0 && (
                    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                        <h2 className="mb-8 flex items-center gap-3 text-[1.15rem] font-semibold text-[var(--text-h)]">
                            <FiBriefcase className="text-[var(--primary-purple)]" size={20} />
                            {t("resume.exp.title")}
                        </h2>
                        <div className="relative border-l-2 border-[var(--primary-purple)]/25">
                            <TimelineEntry
                                role={t("resume.exp.role1")}
                                company={t("resume.exp.company1")}
                                period={t("resume.exp.period1")}
                                location={t("resume.exp.location1")}
                                bullets={[
                                    t("resume.exp.bullet1_1"),
                                    t("resume.exp.bullet1_2"),
                                ]}
                            />
                            <TimelineEntry
                                role={t("resume.exp.role2")}
                                company={t("resume.exp.company2")}
                                period={t("resume.exp.period2")}
                                bullets={[
                                    t("resume.exp.bullet2_1"),
                                    t("resume.exp.bullet2_2"),
                                    t("resume.exp.bullet2_3"),
                                ]}
                            />
                        </div>
                    </div>
                )}

                {/* ── Skills ── */}
                {activeTab === 1 && (
                    <div className="flex flex-col gap-5">
                        <SkillGroup
                            icon={<FiAward size={16} />}
                            title={t("resume.skills.design")}
                            category="design"
                            skills={["3ds Max", "Substance 3D Painter", "Marmoset Toolbag", "Photoshop", "Canva", "Illustrator", "Inkscape", "Adobe Animate"]}
                        />
                        <SkillGroup
                            icon={<FiCode size={16} />}
                            title={t("resume.skills.code")}
                            category="code"
                            skills={["Python", "C#", "VB.NET", "SQL", "R", "JavaScript", "HTML", "CSS"]}
                        />
                        <SkillGroup
                            icon={<FiStar size={16} />}
                            title={t("resume.skills.tools")}
                            category="tool"
                            skills={["React", "TypeScript", "Tailwind CSS", "Bun", "Docker", "GitHub"]}
                        />
                    </div>
                )}

                {/* ── Education ── */}
                {activeTab === 2 && (
                    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                        <h2 className="mb-8 flex items-center gap-3 text-[1.15rem] font-semibold text-[var(--text-h)]">
                            <FiBook className="text-[var(--primary-purple)]" size={20} />
                            {t("resume.edu.title")}
                        </h2>
                        <div className="relative border-l-2 border-[var(--primary-purple)]/25 pl-10">
                            <div className="absolute left-[-7px] top-[5px] h-3.5 w-3.5 rounded-full border-2 border-[var(--primary-purple)] bg-[var(--primary-purple)]" />
                            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                                <h3 className="text-[1.05rem] font-semibold text-[var(--text-h)]">
                                    {t("resume.edu.degree")}
                                </h3>
                                <span className="shrink-0 rounded-full bg-[rgba(124,58,237,0.12)] px-3 py-0.5 text-xs font-semibold text-[var(--primary-purple)]">
                                    2024 – Present
                                </span>
                            </div>
                            <p className="mb-5 text-sm font-medium text-[var(--primary-cyan)]">
                                Asia Pacific University (APU) · Kuala Lumpur
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="rounded-full bg-[rgba(124,58,237,0.15)] px-4 py-1.5 text-sm font-semibold text-[var(--primary-purple)]">
                                    {t("resume.edu.cgpaBadge")}
                                </span>
                                <span className="rounded-full bg-[rgba(6,182,212,0.12)] px-4 py-1.5 text-sm font-semibold text-[var(--primary-cyan)]">
                                    {t("resume.edu.yearBadge")}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ── Languages ── */}
                {activeTab === 3 && (
                    <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                        <h2 className="mb-8 flex items-center gap-3 text-[1.15rem] font-semibold text-[var(--text-h)]">
                            <FiGlobe className="text-[var(--primary-purple)]" size={20} />
                            {t("resume.langs.title")}
                        </h2>
                        <div className="flex flex-col gap-4">
                            <LangBar lang={t("resume.lang.arabic")}   level={t("resume.lang.arabicLevel")}   pct={100} />
                            <LangBar lang={t("resume.lang.english")}  level={t("resume.lang.englishLevel")}  pct={85}  />
                            <LangBar lang={t("resume.lang.japanese")} level={t("resume.lang.japaneseLevel")} pct={35}  />
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}
