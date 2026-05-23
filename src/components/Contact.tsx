import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub, FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";
import { SiArtstation } from "react-icons/si";
import { useLanguage } from "../context/LanguageContext";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xwvzbvoy";

type FormStatus = "idle" | "sending" | "success" | "error";

const inputClass =
    "rounded-xl border border-[var(--card-border)] bg-[rgba(255,255,255,0.03)] px-4 py-3 text-base text-[var(--text)] transition-all duration-300 placeholder:text-[var(--text)]/50 focus:border-[var(--primary-purple)] focus:bg-[rgba(124,58,237,0.05)] focus:shadow-[0_0_0_3px_rgba(124,58,237,0.15)] focus:outline-none";

export default function Contact() {
    const { t } = useLanguage();
    const [status, setStatus] = useState<FormStatus>("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const res = await fetch(FORMSPREE_ENDPOINT, {
                method: "POST",
                body: new FormData(e.currentTarget),
                headers: { Accept: "application/json" },
            });

            if (res.ok) {
                setStatus("success");
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

    return (
        <section
            id="contact"
            className="min-h-screen bg-[linear-gradient(180deg,rgba(124,58,237,0.05)_0%,rgba(59,130,246,0.05)_50%,transparent_100%)] px-8 py-16"
        >
            <div className="mx-auto max-w-[1100px]">
                <div className="mb-16 text-center">
                    <h2 className="mb-6 text-[2.5rem] font-bold text-[var(--text-h)]">{t("contact.title")}</h2>
                    <p className="mx-auto max-w-[500px] text-[1.1rem] leading-[1.7] text-[var(--text)]">
                        {t("contact.subtitle")}
                    </p>
                    <div className="mx-auto mt-6 h-[3px] w-16 rounded-full bg-[linear-gradient(90deg,var(--primary-purple),var(--primary-cyan))]" />
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.6fr]">
                    {/* Left — contact info + socials */}
                    <div className="flex flex-col gap-6">
                        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                            <h3 className="mb-6 text-[1.1rem] font-semibold text-[var(--text-h)]">{t("contact.info")}</h3>
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(124,58,237,0.15)] text-[var(--primary-purple)]">
                                        <FiMail size={20} />
                                    </div>
                                    <div>
                                        <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider opacity-50 text-[var(--text)]">{t("contact.emailLabel")}</p>
                                        <a href="mailto:sawsan.48lo@gmail.com" className="text-[var(--text-h)] no-underline transition-colors duration-200 hover:text-[var(--primary-cyan)]">
                                            sawsan.48lo@gmail.com
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(124,58,237,0.15)] text-[var(--primary-purple)]">
                                        <FiPhone size={20} />
                                    </div>
                                    <div>
                                        <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider opacity-50 text-[var(--text)]">{t("contact.phoneLabel")}</p>
                                        <a href="tel:+60178323764" className="text-[var(--text-h)] no-underline transition-colors duration-200 hover:text-[var(--primary-cyan)]">
                                            +60 178 323 764
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[rgba(124,58,237,0.15)] text-[var(--primary-purple)]">
                                        <FiMapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="mb-0.5 text-xs font-semibold uppercase tracking-wider opacity-50 text-[var(--text)]">{t("contact.locationLabel")}</p>
                                        <span className="text-[var(--text-h)]">Kuala Lumpur, Malaysia</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                            <h3 className="mb-5 text-[1.1rem] font-semibold text-[var(--text-h)]">{t("contact.follow")}</h3>
                            <div className="flex flex-col gap-3">
                                <a href="https://www.linkedin.com/in/sawsan-abdullatif-842514406/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-[var(--card-border)] px-5 py-3.5 text-[var(--text)] no-underline transition-all duration-300 hover:border-[var(--primary-purple)] hover:bg-[rgba(124,58,237,0.05)] hover:text-[var(--primary-purple)] hover:shadow-[0_4px_15px_rgba(124,58,237,0.15)]">
                                    <FiLinkedin size={20} />
                                    <span className="font-medium">LinkedIn</span>
                                </a>
                                <a href="https://github.com/Reinylo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-[var(--card-border)] px-5 py-3.5 text-[var(--text)] no-underline transition-all duration-300 hover:border-[var(--primary-purple)] hover:bg-[rgba(124,58,237,0.05)] hover:text-[var(--primary-purple)] hover:shadow-[0_4px_15px_rgba(124,58,237,0.15)]">
                                    <FiGithub size={20} />
                                    <span className="font-medium">GitHub</span>
                                </a>
                                <a href="https://www.artstation.com/sawsan_lo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-[var(--card-border)] px-5 py-3.5 text-[var(--text)] no-underline transition-all duration-300 hover:border-[var(--primary-purple)] hover:bg-[rgba(124,58,237,0.05)] hover:text-[var(--primary-purple)] hover:shadow-[0_4px_15px_rgba(124,58,237,0.15)]">
                                    <SiArtstation size={20} />
                                    <span className="font-medium">ArtStation</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right — form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-8">
                        <h3 className="mb-2 text-[1.2rem] font-semibold text-[var(--text-h)]">{t("contact.send")}</h3>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[var(--text-h)]" htmlFor="name">{t("contact.name")}</label>
                                <input className={inputClass} type="text" id="name" name="name" placeholder={t("contact.namePh")} required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-[var(--text-h)]" htmlFor="email">{t("contact.email")}</label>
                                <input className={inputClass} type="email" id="email" name="email" placeholder={t("contact.emailPh")} required />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-[var(--text-h)]" htmlFor="subject">{t("contact.subject")}</label>
                            <input className={inputClass} type="text" id="subject" name="subject" placeholder={t("contact.subjectPh")} />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-semibold text-[var(--text-h)]" htmlFor="message">{t("contact.message")}</label>
                            <textarea className={`resize-y ${inputClass}`} id="message" name="message" placeholder={t("contact.messagePh")} rows={7} required />
                        </div>

                        {status === "success" && (
                            <div className="flex items-center gap-3 rounded-xl border border-green-500/30 bg-green-500/10 px-5 py-4 text-green-400">
                                <FiCheck size={20} />
                                <span className="font-medium">{t("contact.successMsg")}</span>
                            </div>
                        )}

                        {status === "error" && (
                            <div className="flex items-center gap-3 rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-400">
                                <FiAlertCircle size={20} />
                                <span className="font-medium">{t("contact.errorMsg")}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === "sending" || status === "success"}
                            className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-xl border-none bg-[var(--primary-purple)] px-8 py-4 text-base font-semibold text-white shadow-[0_4px_15px_rgba(124,58,237,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-110 hover:shadow-[0_4px_25px_rgba(124,58,237,0.6)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:brightness-100"
                        >
                            <FiSend size={18} />
                            {status === "sending" ? t("contact.sending") : status === "success" ? t("contact.sent") : t("contact.submit")}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
