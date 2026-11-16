import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CollapsibleSection } from '../layout/CollapsibleSection';
import { SUGGESTIONS, complete, runCommand, type Line, type Tone } from '../../lib/terminalCommands';
import site from '../../data/site';

type Entry = { id: number; cmd: string | null; lines: Line[] };

const PROMPT = `${site.handle}@portfolio:~$`;

const TONE_CLASS: Record<Tone, string> = {
    plain: 'text-[var(--text)]',
    dim: 'text-[var(--muted)]',
    accent: 'text-[var(--accent)] font-semibold',
    ok: 'text-emerald-400',
    err: 'text-rose-400',
};

const BOOT: Entry[] = [
    {
        id: 0,
        cmd: null,
        lines: [
            { text: `welcome. I am ${site.name}.`, tone: 'accent' },
            { text: 'this terminal is scripted and runs fully in your browser. type "help" or tap a command below.', tone: 'dim' },
        ],
    },
    { id: 1, cmd: 'skills --ai', lines: runCommand('skills --ai').lines },
];

export const TerminalSection: React.FC = () => {
    const [entries, setEntries] = useState<Entry[]>(BOOT);
    const [value, setValue] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [cursor, setCursor] = useState<number | null>(null);
    const nextId = useRef(2);
    const inputRef = useRef<HTMLInputElement>(null);
    const logRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = logRef.current;
        if (el) el.scrollTop = el.scrollHeight;
    }, [entries]);

    const submit = useCallback((raw: string) => {
        const cmd = raw.trim();
        if (!cmd) return;
        const result = runCommand(cmd);
        setHistory(h => [...h, cmd]);
        setCursor(null);
        setValue('');
        if (result.clear) {
            setEntries([]);
            return;
        }
        setEntries(prev => [...prev, { id: nextId.current++, cmd, lines: result.lines }]);
        if (result.open) window.open(result.open, '_blank', 'noopener,noreferrer');
    }, []);

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            submit(value);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (history.length === 0) return;
            const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
            setCursor(next);
            setValue(history[next]);
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (cursor === null) return;
            const next = cursor + 1;
            if (next >= history.length) {
                setCursor(null);
                setValue('');
            } else {
                setCursor(next);
                setValue(history[next]);
            }
        } else if (e.key === 'Tab') {
            const completed = complete(value);
            if (completed) {
                e.preventDefault();
                setValue(completed + ' ');
            }
        } else if (e.key === 'l' && e.ctrlKey) {
            e.preventDefault();
            setEntries([]);
        }
    };

    const renderLine = (line: Line, i: number) => {
        const cls = `${TONE_CLASS[line.tone ?? 'plain']} whitespace-pre-wrap break-words`;
        const style = { animation: `line-in 220ms ease-out ${Math.min(i, 14) * 25}ms both` };
        if (line.href) {
            return (
                <div key={i} className={cls} style={style}>
                    <a href={line.href} target={line.href.startsWith('mailto:') ? undefined : '_blank'} rel="noopener noreferrer" className="underline decoration-dotted underline-offset-4 hover:text-[var(--accent)]">
                        {line.text}
                    </a>
                </div>
            );
        }
        return <div key={i} className={cls} style={style}>{line.text || ' '}</div>;
    };

    return (
        <CollapsibleSection
            id="terminal"
            title="Ask my terminal"
            meta={<span className="font-mono text-xs text-[var(--muted)]">no backend · no API key</span>}
        >
            <div className="glass terminal-surface rounded-2xl overflow-hidden shadow-[0_24px_80px_-32px_color-mix(in_srgb,var(--accent)_45%,transparent)]">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--border)] bg-[var(--glass)]">
                    <span className="w-3 h-3 rounded-full bg-rose-400/90" aria-hidden="true" />
                    <span className="w-3 h-3 rounded-full bg-amber-300/90" aria-hidden="true" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/90" aria-hidden="true" />
                    <span className="ml-3 font-mono text-xs text-[var(--muted)]">{site.handle} — zsh — 80×24</span>
                </div>

                <div
                    className="p-4 font-mono text-[0.8rem] sm:text-sm leading-relaxed cursor-text"
                    onClick={() => inputRef.current?.focus({ preventScroll: true })}
                >
                    <div
                        ref={logRef}
                        role="log"
                        aria-live="polite"
                        aria-label="Terminal output"
                        data-lenis-prevent
                        className="h-64 sm:h-72 overflow-y-auto pr-2 space-y-3"
                    >
                        {entries.map(entry => (
                            <div key={entry.id}>
                                {entry.cmd !== null && (
                                    <div className="text-[var(--text)]">
                                        <span className="text-[var(--accent)]">{PROMPT}</span> {entry.cmd}
                                    </div>
                                )}
                                <div className="mt-1 space-y-0.5">
                                    {entry.lines.map(renderLine)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <label className="mt-3 flex items-center gap-2 border-t border-[var(--border)] pt-3">
                        <span className="text-[var(--accent)] shrink-0">{PROMPT}</span>
                        <input
                            ref={inputRef}
                            value={value}
                            onChange={e => { setValue(e.target.value); setCursor(null); }}
                            onKeyDown={onKeyDown}
                            spellCheck={false}
                            autoCapitalize="off"
                            autoComplete="off"
                            autoCorrect="off"
                            aria-label="Terminal command input"
                            placeholder="type a command…"
                            className="flex-1 min-w-0 bg-transparent outline-none caret-[var(--accent)] placeholder:text-[var(--muted)]/60"
                        />
                    </label>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {SUGGESTIONS.map(s => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => submit(s)}
                                className="chip hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </CollapsibleSection>
    );
};

export default TerminalSection;
