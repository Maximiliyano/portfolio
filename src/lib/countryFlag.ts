const COUNTRY_NAMES: Record<string, string> = {
    US: 'United States',
    UA: 'Ukraine',
    NO: 'Norway',
    UK: 'United Kingdom',
    AE: 'United Arab Emirates',
    DE: 'Germany',
    FR: 'France',
    PL: 'Poland',
    NL: 'Netherlands',
    SE: 'Sweden',
    FI: 'Finland',
    DK: 'Denmark',
    CA: 'Canada',
    CH: 'Switzerland',
};

const ISO_ALIASES: Record<string, string> = {
    UK: 'gb',
};

const toCdnCode = (iso2: string): string => {
    const upper = iso2.toUpperCase();
    return (ISO_ALIASES[upper] ?? upper).toLowerCase();
};

export const flagEmoji = (iso2: string): string => {
    if (!iso2 || iso2.length !== 2) return '';
    const base = 0x1F1E6;
    const a = iso2.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
    const b = iso2.toUpperCase().charCodeAt(1) - 'A'.charCodeAt(0);
    if (a < 0 || a > 25 || b < 0 || b > 25) return '';
    return String.fromCodePoint(base + a, base + b);
};

export const countryName = (iso2: string): string =>
    COUNTRY_NAMES[iso2?.toUpperCase()] ?? iso2?.toUpperCase() ?? '';

export const flagUrl = (iso2: string, width: 20 | 40 | 80 = 40): string => {
    if (!iso2 || iso2.length !== 2) return '';
    return `https://flagcdn.com/w${width}/${toCdnCode(iso2)}.png`;
};

export const flagSrcSet = (iso2: string, width: 20 | 40 | 80 = 40): string => {
    if (!iso2 || iso2.length !== 2) return '';
    const lo = toCdnCode(iso2);
    return `https://flagcdn.com/w${width}/${lo}.png 1x, https://flagcdn.com/w${width * 2}/${lo}.png 2x`;
};
