import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiGithub } from "react-icons/fi";
import { SiArtstation } from "react-icons/si";
import logo from "../assets/logo.png";
import { useLanguage } from "../context/LanguageContext";

type ViewType = "home" | "portfolio" | "project-detail" | "contact" | "resume";

interface FooterProps {
    onNavigate: (view: ViewType) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
    const { t } = useLanguage();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="mt-16 border-t border-[var(--card-border)] bg-[var(--footer-bg)] px-8 pb-8 pt-16">
            <div className="mx-auto mb-12 grid max-w-[1400px] grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-12">
                <div className="text-left">
                    <div>
                        <div className="mb-4 flex gap-4">
                            <img src={logo} alt="Sawsan Logo" className="h-8 w-8 rounded-sm" />
                            <h3 className="font-semibold">Sawsan</h3>
                        </div>
                        <p className="mb-4 text-[0.9rem] text-[var(--primary-cyan)]">{t("footer.tagline")}</p>
                    </div>
                    <p className="max-w-[300px] text-[0.95rem] leading-[1.6] text-[var(--text)]">
                        {t("footer.desc")}
                    </p>
                </div>

                <div>
                    <h2 className="text-left font-semibold mb-4">{t("footer.nav")}</h2>
                    <nav className="flex flex-col gap-3">
                        {(["home", "portfolio", "resume", "contact"] as ViewType[]).map((view) => (
                            <button
                                key={view}
                                onClick={() => onNavigate(view)}
                                className="relative w-fit border-none bg-transparent py-1 text-left text-[0.95rem] text-[var(--text)] transition-all duration-300 ease-in-out after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[var(--primary-purple)] after:transition-all after:duration-300 after:ease-in-out hover:text-[var(--primary-purple)] hover:after:w-full"
                            >
                                {t(`nav.${view}`)}
                            </button>
                        ))}
                    </nav>
                </div>

                <div>
                    <h2 className="text-left font-semibold mb-6">{t("footer.contactInfo")}</h2>
                    <div className="flex flex-col gap-4">
                        <a href="mailto:sawsan.48lo@gmail.com" className="flex items-center gap-3 text-[0.95rem] text-[var(--text)] no-underline transition-all duration-300 ease-in-out hover:translate-x-1 hover:text-[var(--primary-cyan)]">
                            <FiMail size={18} />
                            <span>sawsan.48lo@gmail.com</span>
                        </a>
                        <a href="tel:+60178323764" className="flex items-center gap-3 text-[0.95rem] text-[var(--text)] no-underline transition-all duration-300 ease-in-out hover:translate-x-1 hover:text-[var(--primary-cyan)]">
                            <FiPhone size={18} />
                            <span>+60 178323764</span>
                        </a>
                        <div className="flex items-center gap-3 text-[0.95rem] text-[var(--text)] transition-all duration-300 ease-in-out hover:translate-x-1 hover:text-[var(--primary-cyan)]">
                            <FiMapPin size={18} />
                            <span>Kuala Lumpur, Malaysia</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-left font-semibold mb-4">{t("footer.follow")}</h2>
                    <div className="footer-social flex flex-row gap-4">
                        <a href="https://www.linkedin.com/in/sawsan-abdullatif-842514406/" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text)] no-underline transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)] hover:shadow-[0_8px_15px_rgba(124,58,237,0.3)]" aria-label="LinkedIn">
                            <FiLinkedin size={20} />
                        </a>
                        <a href="https://github.com/Reinylo" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text)] no-underline transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)] hover:shadow-[0_8px_15px_rgba(124,58,237,0.3)]" aria-label="GitHub">
                            <FiGithub size={20} />
                        </a>
                        <a href="https://www.artstation.com/sawsan_lo" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[var(--text)] no-underline transition-all duration-300 ease-in-out hover:-translate-y-1 hover:border-[var(--primary-purple)] hover:text-[var(--primary-purple)] hover:shadow-[0_8px_15px_rgba(124,58,237,0.3)]" aria-label="ArtStation">
                            <SiArtstation size={20} />
                        </a>
                    </div>
                </div>
            </div>

            <small className="flex items-center justify-center gap-4 border-t border-[var(--card-border)] pt-8 text-center text-[0.9rem] text-[var(--text)]">
                &copy; {currentYear} Sawsan Al-Rabeei. {t("footer.copyright")}
            </small>
        </footer>
    );
}
