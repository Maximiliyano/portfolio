const MONTHS: Record<string, number> = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

export type Range = { start: Date; end: Date };

export const parseMonth = (s: string, fallbackToday = false): Date => {
    const trimmed = s.trim();
    if (/^present$/i.test(trimmed) || (fallbackToday && !trimmed)) {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    }
    const [monRaw, yearRaw] = trimmed.split(/\s+/);
    const month = MONTHS[monRaw.slice(0, 3).toLowerCase()];
    const year = Number(yearRaw);
    if (month === undefined || !Number.isFinite(year)) {
        throw new Error(`Cannot parse month string: "${s}"`);
    }
    return new Date(year, month, 1);
};

export const mergeRanges = (ranges: Range[]): Range[] => {
    if (ranges.length <= 1) return [...ranges];
    const sorted = [...ranges].sort((a, b) => a.start.getTime() - b.start.getTime());
    const merged: Range[] = [sorted[0]];
    for (let i = 1; i < sorted.length; i++) {
        const last = merged[merged.length - 1];
        const cur = sorted[i];
        if (cur.start.getTime() <= last.end.getTime()) {
            if (cur.end.getTime() > last.end.getTime()) last.end = cur.end;
        } else {
            merged.push(cur);
        }
    }
    return merged;
};

const monthsBetween = (start: Date, end: Date): number => {
    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();
    return Math.max(0, years * 12 + months + 1);
};

export const totalMonths = (ranges: Range[]): number =>
    mergeRanges(ranges).reduce((sum, r) => sum + monthsBetween(r.start, r.end), 0);

export const formatYearsMonths = (months: number): string => {
    if (months <= 0) return '0mo';
    const y = Math.floor(months / 12);
    const m = months % 12;
    if (y && m) return `${y}y ${m}mo`;
    if (y) return `${y}y`;
    return `${m}mo`;
};

export const rangeFrom = (start: string, end: string | undefined): Range => ({
    start: parseMonth(start),
    end: parseMonth(end ?? 'Present'),
});

export const formatPeriod = (start: string, end: string | undefined): string => {
    const r = rangeFrom(start, end);
    const months = monthsBetween(r.start, r.end);
    const endLabel = end && !/^present$/i.test(end) ? end : 'Present';
    return `${start} – ${endLabel} · ${formatYearsMonths(months)}`;
};
