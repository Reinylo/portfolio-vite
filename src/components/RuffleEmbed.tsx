import { useEffect, useRef } from "react";

/** Swap this for a self-hosted path (e.g. "/ruffle/ruffle.js") when ready. */
const RUFFLE_CDN = "https://unpkg.com/@ruffle-rs/ruffle";

// Module-level singleton — all component instances share one script load.
let ruffleReady: Promise<void> | null = null;

function loadRuffle(): Promise<void> {
    if (ruffleReady) return ruffleReady;

    // Already initialised by an external script tag or a previous load.
    if (typeof window.RufflePlayer?.newest === "function") {
        ruffleReady = Promise.resolve();
        return ruffleReady;
    }

    ruffleReady = new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = RUFFLE_CDN;
        script.onload = () => resolve();
        script.onerror = () =>
            reject(new Error(`Ruffle: failed to load script from ${RUFFLE_CDN}`));
        document.head.appendChild(script);
    });

    return ruffleReady;
}

interface RuffleEmbedProps {
    /** Path to the .swf file. */
    src: string;
    /** Base URL for resolving relative paths inside the SWF (e.g. XML loads). */
    base?: string;
    width?: number | string;
    height?: number | string;
    /** Flash variables (FlashVars). Pass a stable reference or useMemo to avoid needless re-mounts. */
    parameters?: Record<string, string | number | boolean>;
    quality?: "low" | "medium" | "high" | "best" | "auto";
    backgroundColor?: string;
    autoplay?: "on" | "off" | "auto";
    /** Block ActionScript Stage.displayState FULL_SCREEN so the player stays embedded. */
    preventFullscreen?: boolean;
    className?: string;
}

export default function RuffleEmbed({
    src,
    base,
    width = 800,
    height = 600,
    parameters,
    quality = "high",
    backgroundColor,
    autoplay = "on",
    preventFullscreen = false,
    className,
}: RuffleEmbedProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Serialise parameters so object-identity changes don't trigger needless re-mounts.
    const paramsKey = parameters !== undefined ? JSON.stringify(parameters) : undefined;

    useEffect(() => {
        let cancelled = false;
        let player: RufflePlayerElement | null = null;
        let observer: MutationObserver | null = null;
        const container = containerRef.current;

        loadRuffle()
            .then(() => {
                if (cancelled || !container) return;

                const handle = window.RufflePlayer?.newest();
                if (!handle) {
                    console.error("Ruffle: RufflePlayer is not available after script load.");
                    return;
                }

                player = handle.createPlayer();

                // Force the custom element to fill its container — prevents white-bar gap.
                player.style.cssText = "display: block; width: 100%; height: 100%;";

                if (preventFullscreen) {
                    // Reject so Ruffle's internal state knows fullscreen was denied
                    // (resolving would cause Ruffle to apply its own CSS fullscreen).
                    player.requestFullscreen = () =>
                        Promise.reject(new DOMException("Fullscreen disabled", "NotAllowedError"));

                    // Belt-and-suspenders: revert any position:fixed CSS Ruffle applies anyway.
                    const contained = "display: block; width: 100%; height: 100%;";
                    observer = new MutationObserver(() => {
                        if (!player) return;
                        if (player.style.position === "fixed" || player.style.zIndex !== "") {
                            player.style.cssText = contained;
                        }
                    });
                    observer.observe(player, { attributes: true, attributeFilter: ["style"] });
                }

                container.appendChild(player);

                return player.load({
                    url: src,
                    base,
                    parameters: paramsKey
                        ? (JSON.parse(paramsKey) as Record<string, string | number | boolean>)
                        : undefined,
                    quality,
                    backgroundColor,
                    autoplay,
                });
            })
            .catch((err: unknown) => {
                if (!cancelled) {
                    console.error(
                        "Ruffle:",
                        err instanceof Error ? err.message : String(err),
                    );
                }
            });

        return () => {
            cancelled = true;
            observer?.disconnect();
            player?.remove();
        };
    }, [src, base, quality, backgroundColor, autoplay, paramsKey, preventFullscreen]);

    return (
        <div
            ref={containerRef}
            style={{ width, height }}
            className={className}
        />
    );
}
