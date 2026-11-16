import { useEffect, useRef } from 'react';
import ScrollVideo from './ScrollVideo';
import { prefersReducedMotion } from '../../lib/motion';
import { MODES, SECTION_IDS, SECTION_MODE, buildFormation, type Formation, type Mode } from '../../lib/bgModes';

type Particle = { x: number; y: number; z: number; ph: number; sp: number };
type Rgb = [number, number, number];
type RainColumn = { x: number; y: number; speed: number; tail: number; glyphs: string[] };
type Pulse = { e: number; ph: number; sp: number };

const WORLD = 1.7;
const POINTER_RADIUS = 170;
const CELL = 20;
const GLYPHS = '01{}[]<>/=+*;:#$&';

const PALETTE = {
    dark: { a: [34, 211, 238] as Rgb, b: [139, 92, 246] as Rgb, c: [52, 211, 153] as Rgb },
    light: { a: [8, 145, 178] as Rgb, b: [124, 58, 237] as Rgb, c: [5, 150, 105] as Rgb },
};

const clamp01 = (n: number) => Math.min(1, Math.max(0, n));
const wrap = (n: number, m: number) => ((n % m) + m) % m;
const mix = (a: Rgb, b: Rgb, t: number): Rgb => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];

const modeColor = (mode: Mode, pal: typeof PALETTE.dark, progress: number): Rgb => {
    switch (mode) {
        case 'neural': return mix(pal.a, pal.b, 0.65);
        case 'rain': return pal.c;
        case 'grid': return pal.a;
        case 'wave': return mix(pal.a, pal.b, 0.3);
        case 'flow': return mix(pal.a, pal.c, 0.5);
        case 'orbit': return pal.b;
        case 'converge': return mix(pal.a, pal.b, 0.5);
        default: return mix(pal.a, pal.b, progress);
    }
};

const randomGlyphs = () => Array.from({ length: 32 }, () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)]);

export const ScrollBackground = ({ video }: { video?: string }) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const wrapEl = wrapRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!wrapEl || !canvas || !ctx) return;

        const reduced = prefersReducedMotion();
        let W = 0;
        let H = 0;
        let particles: Particle[] = [];
        let px: number[] = [];
        let py: number[] = [];
        let lastTx: number[] = [];
        let lastTy: number[] = [];
        let lastKey: number[] = [];
        let rain: RainColumn[] = [];
        let pulses: Pulse[] = [];
        const cache = new Map<Mode, Formation>();

        let mode: Mode = 'network';
        let modeIndex = 0;
        let modeSince = 0;
        let linkAlpha = 1;
        let freeDim = 1;
        let rainAlpha = 0;
        let color: Rgb = PALETTE.dark.a;
        let scrollSmooth = window.scrollY;
        let lastSmooth = scrollSmooth;
        let energy = 0;
        let lastProgress = -1;
        let lastNow = 0;
        let frameCount = 0;
        let lastDetectScroll = -1e9;
        let frame = 0;
        const pointer = { x: 0, y: 0, active: false };

        const getForm = (m: Mode): Formation => {
            let f = cache.get(m);
            if (!f) {
                f = buildFormation(m, { W, H, mobile: W < 640 }, particles.length);
                cache.set(m, f);
            }
            return f;
        };

        const freeX = (p: Particle, t: number) => p.x + Math.sin(t * p.sp + p.ph) * 18 * p.z;
        const freeY = (p: Particle, t: number) => {
            const worldH = H * WORLD;
            return wrap(p.y * worldH - scrollSmooth * p.z * 0.4, worldH) - (worldH - H) / 2 + Math.cos(t * p.sp * 0.8 + p.ph) * 14 * p.z;
        };

        const makePulses = (f: Formation) => {
            pulses = f.pulses && f.links.length
                ? Array.from({ length: 16 }, () => ({ e: Math.floor(Math.random() * f.links.length), ph: Math.random(), sp: 0.25 + Math.random() * 0.4 }))
                : [];
        };

        const setMode = (m: Mode, now: number) => {
            mode = m;
            modeIndex = MODES.indexOf(m);
            modeSince = now;
            wrapEl.dataset.mode = m;
            makePulses(getForm(m));
        };

        const build = () => {
            W = window.innerWidth;
            H = window.innerHeight;
            const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.round(Math.min(90, Math.max(34, W / 17)) * WORLD);
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * W,
                y: Math.random(),
                z: 0.2 + Math.random() * 0.8,
                ph: Math.random() * Math.PI * 2,
                sp: 0.2 + Math.random() * 0.5,
            }));
            px = particles.map(p => freeX(p, 0));
            py = particles.map(p => freeY(p, 0));
            lastTx = [...px];
            lastTy = [...py];
            lastKey = particles.map(() => -1);

            const colW = W < 640 ? 26 : 34;
            rain = Array.from({ length: Math.ceil(W / colW) }, (_, i) => ({
                x: i * colW + 8,
                y: Math.random() * H,
                speed: 60 + Math.random() * 120,
                tail: 8 + Math.floor(Math.random() * 6),
                glyphs: randomGlyphs(),
            }));

            cache.clear();
            makePulses(getForm(mode));
        };

        const detect = (): Mode => {
            let found: Mode = 'network';
            let best = -Infinity;
            for (const id of SECTION_IDS) {
                const el = document.getElementById(id);
                if (!el) continue;
                const top = el.getBoundingClientRect().top;
                if (top <= H * 0.5 && top > best) {
                    best = top;
                    found = SECTION_MODE[id];
                }
            }
            if (window.scrollY + H >= document.documentElement.scrollHeight - 40) {
                found = SECTION_MODE[SECTION_IDS[SECTION_IDS.length - 1]];
            }
            return found;
        };

        const draw = (now: number) => {
            const t = now / 1000;
            const dt = Math.min(0.05, Math.max(0.001, (now - lastNow) / 1000));
            lastNow = now;
            frameCount++;

            scrollSmooth += (window.scrollY - scrollSmooth) * 0.1;
            energy += (Math.min(1, Math.abs(scrollSmooth - lastSmooth) / 40) - energy) * 0.08;
            lastSmooth = scrollSmooth;

            const max = document.documentElement.scrollHeight - H;
            const progress = max > 0 ? clamp01(scrollSmooth / max) : 0;
            if (Math.abs(progress - lastProgress) > 0.001) {
                wrapEl.style.setProperty('--scroll-p', progress.toFixed(4));
                lastProgress = progress;
            }

            if (!reduced && frameCount % 8 === 0 && (Math.abs(scrollSmooth - lastDetectScroll) > 2 || frameCount % 64 === 0)) {
                lastDetectScroll = scrollSmooth;
                const next = detect();
                if (next !== mode) setMode(next, now);
            }

            const form = getForm(mode);
            const slots = Math.min(form.slots, particles.length);

            const pal = document.documentElement.classList.contains('dark') ? PALETTE.dark : PALETTE.light;
            const target = modeColor(mode, pal, progress);
            const ck = 1 - Math.exp(-dt * 3);
            color = frameCount === 1
                ? target
                : [color[0] + (target[0] - color[0]) * ck, color[1] + (target[1] - color[1]) * ck, color[2] + (target[2] - color[2]) * ck];
            const rgb = `${Math.round(color[0])},${Math.round(color[1])},${Math.round(color[2])}`;

            const linkGoal = now - modeSince > 300 ? 1 : 0;
            linkAlpha += (linkGoal - linkAlpha) * (1 - Math.exp(-dt * (linkGoal ? 3 : 12)));
            freeDim += (form.dim - freeDim) * (1 - Math.exp(-dt * 3));
            rainAlpha += ((mode === 'rain' ? 1 : 0) - rainAlpha) * (1 - Math.exp(-dt * 2.5));

            ctx.clearRect(0, 0, W, H);

            if (rainAlpha > 0.01) {
                ctx.font = '13px "JetBrains Mono", ui-monospace, monospace';
                for (const col of rain) {
                    col.y += col.speed * dt * (1 + energy * 4);
                    if (col.y - col.tail * CELL > H) {
                        col.y = -Math.random() * H * 0.3;
                        col.speed = 60 + Math.random() * 120;
                    }
                    const head = Math.floor(col.y / CELL);
                    for (let k = 0; k < col.tail; k++) {
                        const row = head - k;
                        const y = row * CELL;
                        if (y < -CELL || y > H + CELL) continue;
                        const a = (k === 0 ? 0.9 : (1 - k / col.tail) * 0.5) * rainAlpha;
                        ctx.fillStyle = `rgba(${rgb},${a.toFixed(2)})`;
                        ctx.fillText(col.glyphs[wrap(row, col.glyphs.length)], col.x, y);
                    }
                }
            }

            const kSpring = 1 - Math.exp(-dt * 4.5);
            const xs: number[] = new Array(particles.length);
            const ys: number[] = new Array(particles.length);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                const inSlot = i < slots;
                let tx: number;
                let ty: number;
                if (inSlot) {
                    const pt = form.target(i, t, energy);
                    tx = pt.x;
                    ty = pt.y;
                } else {
                    tx = freeX(p, t);
                    ty = freeY(p, t);
                }
                const key = inSlot ? modeIndex : -1;
                if (key === lastKey[i] && Math.hypot(tx - lastTx[i], ty - lastTy[i]) > H * 0.5) {
                    px[i] = tx;
                    py[i] = ty;
                }
                lastKey[i] = key;
                lastTx[i] = tx;
                lastTy[i] = ty;
                px[i] += (tx - px[i]) * kSpring;
                py[i] += (ty - py[i]) * kSpring;

                let x = px[i];
                let y = py[i];
                if (pointer.active) {
                    const dx = pointer.x - x;
                    const dy = pointer.y - y;
                    const d = Math.hypot(dx, dy);
                    if (d < POINTER_RADIUS) {
                        const pull = (1 - d / POINTER_RADIUS) * (inSlot ? 0.025 : 0.06);
                        x += dx * pull;
                        y += dy * pull;
                    }
                }
                xs[i] = x;
                ys[i] = y;
            }

            const drawPointerLinks = (i: number) => {
                if (!pointer.active) return;
                const dx = pointer.x - xs[i];
                const dy = pointer.y - ys[i];
                const d = Math.hypot(dx, dy);
                if (d < POINTER_RADIUS) {
                    ctx.strokeStyle = `rgba(${rgb},${((1 - d / POINTER_RADIUS) * 0.5 * linkAlpha).toFixed(3)})`;
                    ctx.beginPath();
                    ctx.moveTo(xs[i], ys[i]);
                    ctx.lineTo(pointer.x, pointer.y);
                    ctx.stroke();
                }
            };

            const proximityLinks = (count: number, dist: number) => {
                const dist2 = dist * dist;
                for (let i = 0; i < count; i++) {
                    if (ys[i] < -40 || ys[i] > H + 40) continue;
                    for (let j = i + 1; j < count; j++) {
                        const dx = xs[i] - xs[j];
                        const dy = ys[i] - ys[j];
                        const d2 = dx * dx + dy * dy;
                        if (d2 > dist2) continue;
                        const depth = (particles[i].z + particles[j].z) / 2;
                        const alpha = (1 - Math.sqrt(d2) / dist) * 0.32 * (0.4 + depth * 0.6) * linkAlpha;
                        ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
                        ctx.beginPath();
                        ctx.moveTo(xs[i], ys[i]);
                        ctx.lineTo(xs[j], ys[j]);
                        ctx.stroke();
                    }
                    drawPointerLinks(i);
                }
            };

            ctx.lineWidth = 0.6 + energy * 0.9;
            if (form.freeLinks) {
                proximityLinks(particles.length, (W < 640 ? 90 : 115) + 90 * energy);
            } else if (form.proximity > 0) {
                proximityLinks(slots, form.proximity);
            }

            if (form.links.length) {
                ctx.lineWidth = 0.8;
                ctx.strokeStyle = `rgba(${rgb},${((pal === PALETTE.dark ? 0.16 : 0.1) * linkAlpha).toFixed(3)})`;
                ctx.beginPath();
                for (const [a, b] of form.links) {
                    if (a >= slots || b >= slots) continue;
                    if (Math.abs(ys[b] - ys[a]) > H * 0.45) continue;
                    ctx.moveTo(xs[a], ys[a]);
                    ctx.lineTo(xs[b], ys[b]);
                }
                ctx.stroke();
            }

            if (form.core && linkAlpha > 0.01) {
                const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.min(W, H) * 0.16);
                g.addColorStop(0, `rgba(${rgb},${(0.28 * linkAlpha).toFixed(3)})`);
                g.addColorStop(1, `rgba(${rgb},0)`);
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(W / 2, H / 2, Math.min(W, H) * 0.16, 0, Math.PI * 2);
                ctx.fill();
            }

            for (const pulse of pulses) {
                const [a, b] = form.links[pulse.e];
                if (a >= slots || b >= slots) continue;
                const u = (t * pulse.sp + pulse.ph) % 1;
                const x = xs[a] + (xs[b] - xs[a]) * u;
                const y = ys[a] + (ys[b] - ys[a]) * u;
                ctx.fillStyle = `rgba(${rgb},${(0.12 * linkAlpha).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(x, y, 7, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = `rgba(${rgb},${(0.95 * linkAlpha).toFixed(3)})`;
                ctx.beginPath();
                ctx.arc(x, y, 2.2, 0, Math.PI * 2);
                ctx.fill();
            }

            const structured = slots > 0 && !form.freeLinks && form.proximity === 0;
            for (let i = 0; i < particles.length; i++) {
                if (ys[i] < -10 || ys[i] > H + 10) continue;
                const z = particles[i].z;
                const inSlot = i < slots;
                const mul = inSlot ? 1 : freeDim;
                if (structured && inSlot) {
                    ctx.fillStyle = `rgba(${rgb},0.09)`;
                    ctx.beginPath();
                    ctx.arc(xs[i], ys[i], 9, 0, Math.PI * 2);
                    ctx.fill();
                } else if (z > 0.8) {
                    ctx.fillStyle = `rgba(${rgb},${(0.07 * mul).toFixed(3)})`;
                    ctx.beginPath();
                    ctx.arc(xs[i], ys[i], 9, 0, Math.PI * 2);
                    ctx.fill();
                }
                const r = structured && inSlot ? 1.8 + z * 1.4 : 0.9 + z * 1.6;
                const a = structured && inSlot ? 0.85 : (0.3 + z * 0.55) * mul;
                ctx.fillStyle = `rgba(${rgb},${a.toFixed(2)})`;
                ctx.beginPath();
                ctx.arc(xs[i], ys[i], r, 0, Math.PI * 2);
                ctx.fill();
            }
        };

        const loop = (now: number) => {
            draw(now);
            frame = requestAnimationFrame(loop);
        };

        const start = () => {
            cancelAnimationFrame(frame);
            if (reduced) draw(0);
            else frame = requestAnimationFrame(loop);
        };

        const onResize = () => {
            if (window.innerWidth === W && particles.length) {
                H = window.innerHeight;
                const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
                canvas.width = Math.round(W * dpr);
                canvas.height = Math.round(H * dpr);
                ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
                cache.clear();
                makePulses(getForm(mode));
            } else {
                build();
            }
            if (reduced) draw(0);
        };
        const onVisibility = () => {
            if (document.hidden) cancelAnimationFrame(frame);
            else start();
        };
        const onPointerMove = (e: PointerEvent) => {
            if (e.pointerType === 'touch') return;
            pointer.x = e.clientX;
            pointer.y = e.clientY;
            pointer.active = true;
        };
        const onPointerLeave = () => { pointer.active = false; };

        build();
        wrapEl.dataset.mode = mode;
        start();
        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', onVisibility);
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        document.documentElement.addEventListener('pointerleave', onPointerLeave);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onVisibility);
            window.removeEventListener('pointermove', onPointerMove);
            document.documentElement.removeEventListener('pointerleave', onPointerLeave);
        };
    }, []);

    return (
        <div ref={wrapRef} className="bg-ambient" aria-hidden="true">
            {video ? <ScrollVideo src={video} /> : null}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
    );
};

export default ScrollBackground;
