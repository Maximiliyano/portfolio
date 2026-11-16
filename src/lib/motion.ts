export const EASE_IN_OUT = [0.45, 0, 0.55, 1] as const;

const readPref = (): string | null => {
    try {
        return window.localStorage.getItem('motion');
    } catch {
        return null;
    }
};

export const prefersReducedMotion = (): boolean => {
    const pref = readPref();
    if (pref === 'full') return false;
    if (pref === 'reduced') return true;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const setMotion = (mode: 'full' | 'reduced') => {
    try {
        window.localStorage.setItem('motion', mode);
    } catch {
        /* ignore */
    }
    window.location.reload();
};
