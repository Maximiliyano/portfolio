import site from '../data/site';
import skills from '../data/skills';
import projects from '../data/projects';
import experience from '../data/experience';
import personalProjects from '../data/personalProjects';
import { aiCapabilities } from '../data/ai';

export type Tone = 'plain' | 'dim' | 'accent' | 'ok' | 'err';
export type Line = { text: string; tone?: Tone; href?: string };
export type Result = { lines: Line[]; clear?: boolean; open?: string };

export const COMMAND_NAMES = ['help', 'whoami', 'skills', 'projects', 'experience', 'contact', 'open', 'clear'] as const;

export const SUGGESTIONS = ['help', 'whoami', 'skills --ai', 'projects', 'open deed'];

const pad = (s: string, n: number) => s.padEnd(n, ' ');

const help = (): Result => ({
    lines: [
        { text: 'available commands:', tone: 'accent' },
        { text: `  ${pad('whoami', 14)} who I am` },
        { text: `  ${pad('skills', 14)} tech stack  (try: skills --ai)` },
        { text: `  ${pad('projects', 14)} things I built  (try: projects --client)` },
        { text: `  ${pad('experience', 14)} where I worked` },
        { text: `  ${pad('open <name>', 14)} open a project: deed, images, portfolio` },
        { text: `  ${pad('contact', 14)} get in touch` },
        { text: `  ${pad('clear', 14)} clear the screen` },
    ],
});

const whoami = (): Result => ({
    lines: [
        { text: site.name, tone: 'accent' },
        { text: site.title },
        { text: site.coverletter, tone: 'dim' },
        { text: site.openToOpportunities ? 'status: open to opportunities' : 'status: employed', tone: 'ok' },
    ],
});

const skillsCmd = (args: string[]): Result => {
    const aiOnly = args.includes('--ai');
    if (aiOnly) {
        return {
            lines: [
                { text: 'ai capabilities:', tone: 'accent' },
                ...aiCapabilities.map(c => ({ text: `  - ${c.title}: ${c.tags.join(', ')}` })),
            ],
        };
    }
    return {
        lines: [
            ...skills.filter(g => g.group !== 'AI & Agents').flatMap(g => [
                { text: `${g.group}:`, tone: 'accent' as const },
                { text: `  ${g.items.map(i => i.name).join(', ')}` },
            ]),
            { text: 'AI: run `skills --ai`', tone: 'dim' as const },
        ],
    };
};

const projectsCmd = (args: string[]): Result => {
    if (args.includes('--client')) {
        return {
            lines: [
                { text: 'client work:', tone: 'accent' },
                ...projects.map(p => ({ text: `  ${pad(p.company.name, 18)} ${p.title}` })),
            ],
        };
    }
    return {
        lines: [
            { text: 'built by me:', tone: 'accent' },
            ...personalProjects.flatMap(p => [
                { text: `  ${pad(p.id, 22)} ${p.tagline}${p.status === 'planned' ? '  [planned]' : ''}` },
                ...(p.liveUrl ? [{ text: `  ${pad('', 22)} ${p.liveUrl}`, tone: 'dim' as const, href: p.liveUrl }] : []),
            ]),
            { text: '', tone: 'dim' },
            { text: 'tip: projects --client lists client engagements', tone: 'dim' },
        ],
    };
};

const experienceCmd = (): Result => ({
    lines: experience.map(e => ({
        text: `${pad(`${e.start} - ${e.end ?? 'Present'}`, 22)} ${e.role} @ ${e.company.name}`,
    })),
});

const contact = (): Result => ({
    lines: [
        { text: `github    ${site.github}`, href: site.github },
        { text: `linkedin  ${site.linkedin}`, href: site.linkedin },
        { text: `email     ${site.email}`, href: `mailto:${site.email}` },
    ],
});

const open = (args: string[]): Result => {
    const query = args[0]?.toLowerCase();
    if (!query) return { lines: [{ text: 'usage: open <name>   e.g. open deed', tone: 'err' }] };
    const match = personalProjects.find(p => p.id.includes(query) || p.title.toLowerCase().includes(query));
    if (!match) {
        return { lines: [{ text: `open: no project matching "${query}". try: ${personalProjects.map(p => p.id).join(', ')}`, tone: 'err' }] };
    }
    const target = match.liveUrl ?? match.repoUrl;
    if (!target) {
        return { lines: [{ text: `${match.title} is planned and not public yet. check back soon.`, tone: 'dim' }] };
    }
    return { lines: [{ text: `opening ${match.title} -> ${target}`, tone: 'ok', href: target }], open: target };
};

export const runCommand = (raw: string): Result => {
    const [cmd, ...args] = raw.trim().split(/\s+/);
    if (!cmd) return { lines: [] };

    switch (cmd.toLowerCase()) {
        case 'help': case '?': return help();
        case 'whoami': case 'about': return whoami();
        case 'skills': return skillsCmd(args);
        case 'projects': case 'ls': return projectsCmd(args);
        case 'experience': case 'exp': return experienceCmd();
        case 'contact': return contact();
        case 'open': return open(args);
        case 'clear': case 'cls': return { lines: [], clear: true };
        case 'sudo': return { lines: [{ text: 'nice try. but I am glad you want to hire me: run `contact`.', tone: 'ok' }] };
        default:
            return { lines: [{ text: `${cmd}: command not found. type "help" to list commands.`, tone: 'err' }] };
    }
};

export const complete = (partial: string): string | null => {
    const trimmed = partial.trimStart();
    if (!trimmed || trimmed.includes(' ')) return null;
    const matches = COMMAND_NAMES.filter(c => c.startsWith(trimmed.toLowerCase()));
    return matches.length === 1 ? matches[0] : null;
};
