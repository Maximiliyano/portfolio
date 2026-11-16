export type Mode = 'network' | 'neural' | 'rain' | 'grid' | 'wave' | 'flow' | 'orbit' | 'converge';
export const MODES: readonly Mode[] = ['network', 'neural', 'rain', 'grid', 'wave', 'flow', 'orbit', 'converge'];
export type Link = [number, number];
export type Point = { x: number; y: number };
export type Dims = { W: number; H: number; mobile: boolean };

export type Formation = {
    slots: number;
    dim: number;
    links: Link[];
    freeLinks: boolean;
    proximity: number;
    pulses: boolean;
    core: boolean;
    target: (i: number, t: number, energy: number) => Point;
};

export const SECTION_MODE: Record<string, Mode> = {
    hero: 'network',
    experience: 'flow',
    ai: 'neural',
    terminal: 'rain',
    built: 'grid',
    projects: 'wave',
    domains: 'network',
    skills: 'orbit',
    about: 'network',
    cta: 'converge',
};

export const SECTION_IDS = Object.keys(SECTION_MODE);

const base: Formation = {
    slots: 0,
    dim: 1,
    links: [],
    freeLinks: false,
    proximity: 0,
    pulses: false,
    core: false,
    target: () => ({ x: 0, y: 0 }),
};

const neural = (d: Dims): Formation => {
    const counts = d.mobile ? [3, 4, 5, 4, 3] : [4, 6, 7, 6, 4];
    const pts: Point[] = [];
    const starts: number[] = [];
    counts.forEach((c, li) => {
        starts.push(pts.length);
        const x = d.W * (0.12 + (li * 0.76) / (counts.length - 1));
        for (let r = 0; r < c; r++) {
            pts.push({ x, y: d.H * (0.16 + 0.68 * (c === 1 ? 0.5 : r / (c - 1))) });
        }
    });
    const links: Link[] = [];
    for (let li = 0; li < counts.length - 1; li++) {
        for (let a = 0; a < counts[li]; a++) {
            for (let b = 0; b < counts[li + 1]; b++) links.push([starts[li] + a, starts[li + 1] + b]);
        }
    }
    return {
        ...base,
        slots: pts.length,
        dim: 0.3,
        links,
        pulses: true,
        target: (i, t) => ({ x: pts[i].x + Math.sin(t * 0.7 + i) * 4, y: pts[i].y + Math.cos(t * 0.6 + i * 1.3) * 4 }),
    };
};

const grid = (d: Dims): Formation => {
    const cols = d.mobile ? 5 : 9;
    const rows = d.mobile ? 7 : 5;
    const links: Link[] = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const i = r * cols + c;
            if (c < cols - 1) links.push([i, i + 1]);
            if (r < rows - 1) links.push([i, i + cols]);
        }
    }
    return {
        ...base,
        slots: cols * rows,
        dim: 0.3,
        links,
        target: (i, t) => {
            const r = Math.floor(i / cols);
            const c = i % cols;
            return {
                x: d.W * (0.06 + (0.88 * c) / (cols - 1)) + Math.sin(t * 0.5 + i) * 2,
                y: d.H * (0.14 + (0.76 * r) / (rows - 1)) + Math.cos(t * 0.5 + i) * 2,
            };
        },
    };
};

const wave = (d: Dims): Formation => {
    const rows = 3;
    const m = d.mobile ? 10 : 18;
    const links: Link[] = [];
    for (let r = 0; r < rows; r++) {
        for (let k = 0; k < m - 1; k++) links.push([r * m + k, r * m + k + 1]);
    }
    return {
        ...base,
        slots: rows * m,
        dim: 0.3,
        links,
        target: (i, t, energy) => {
            const r = Math.floor(i / m);
            const k = i % m;
            const x = d.W * (k / (m - 1));
            return { x, y: d.H * (0.28 + r * 0.22) + Math.sin(x * 0.007 + t * 1.1 + r * 1.9) * d.H * 0.07 * (1 + energy * 1.5) };
        },
    };
};

const flow = (d: Dims): Formation => {
    const lanes = d.mobile ? 4 : 7;
    const per = d.mobile ? 7 : 11;
    const span = d.H + 80;
    const links: Link[] = [];
    for (let l = 0; l < lanes; l++) {
        for (let k = 0; k < per - 1; k++) links.push([l * per + k, l * per + k + 1]);
    }
    return {
        ...base,
        slots: lanes * per,
        dim: 0.3,
        links,
        target: (i, t) => {
            const lane = Math.floor(i / per);
            const k = i % per;
            const speed = 34 + (lane % 3) * 22;
            return {
                x: d.W * (0.08 + (0.84 * lane) / (lanes - 1)) + Math.sin(t * 0.8 + lane) * 3,
                y: (((k / per) * span + t * speed + lane * 57) % span) - 40,
            };
        },
    };
};

const orbit = (d: Dims): Formation => {
    const counts = d.mobile ? [6, 9, 12] : [8, 12, 16, 20];
    const meta: { r: number; k: number; c: number }[] = [];
    const links: Link[] = [];
    counts.forEach((c, r) => {
        const start = meta.length;
        for (let k = 0; k < c; k++) meta.push({ r, k, c });
        for (let k = 0; k < c; k++) links.push([start + k, start + ((k + 1) % c)]);
    });
    const radius = Math.min(d.W * 0.46, 620);
    return {
        ...base,
        slots: meta.length,
        dim: 0.3,
        links,
        core: true,
        target: (i, t) => {
            const m = meta[i];
            const rx = radius * (0.28 + m.r * 0.24);
            const a = (m.k / m.c) * Math.PI * 2 + t * (0.28 - m.r * 0.05) * (m.r % 2 ? 1 : -1);
            return { x: d.W / 2 + Math.cos(a) * rx, y: d.H / 2 + Math.sin(a) * rx * 0.52 };
        },
    };
};

const converge = (d: Dims, n: number): Formation => {
    const slots = Math.min(n, 110);
    const R = Math.min(d.W, d.H) * 0.46;
    const sx = Math.min(1.4, (d.W / 2 - 24) / R);
    return {
        ...base,
        slots,
        dim: 1,
        proximity: (R / Math.sqrt(slots)) * 2.8,
        target: (i, t) => {
            const r = R * Math.sqrt((i + 0.5) / slots) * (1 + 0.04 * Math.sin(t * 1.2));
            const a = i * 2.39996 + t * 0.15;
            return { x: d.W / 2 + Math.cos(a) * r * sx, y: d.H / 2 + Math.sin(a) * r * 0.9 };
        },
    };
};

export const buildFormation = (mode: Mode, d: Dims, n: number): Formation => {
    switch (mode) {
        case 'neural': return neural(d);
        case 'grid': return grid(d);
        case 'wave': return wave(d);
        case 'flow': return flow(d);
        case 'orbit': return orbit(d);
        case 'converge': return converge(d, n);
        case 'rain': return { ...base, dim: 0.25 };
        default: return { ...base, freeLinks: true };
    }
};
