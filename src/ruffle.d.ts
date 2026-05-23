// Ambient type declarations for the Ruffle Flash Player emulator runtime API.
// Ruffle sets window.RufflePlayer after its script is loaded.

interface RuffleLoadOptions {
    url?: string;
    data?: ArrayBuffer | Uint8Array;
    /** Flash variables — passed as query string or key/value map. */
    parameters?: string | Record<string, string | number | boolean>;
    quality?: "low" | "medium" | "high" | "best" | "auto";
    backgroundColor?: string | null;
    autoplay?: "on" | "off" | "auto";
    unmuteOverlay?: "visible" | "hidden";
    allowScriptAccess?: boolean;
    base?: string;
}

interface RufflePlayerElement extends HTMLElement {
    load(options: RuffleLoadOptions | string): Promise<void>;
    play(): void;
    pause(): void;
    remove(): void;
    isPlaying: boolean;
    readyState: number;
}

interface RuffleHandle {
    createPlayer(): RufflePlayerElement;
}

interface RufflePublicAPI {
    newest(): RuffleHandle | null;
    config: Partial<RuffleLoadOptions>;
}

interface Window {
    RufflePlayer?: RufflePublicAPI;
}
