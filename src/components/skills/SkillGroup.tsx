import React, { useState } from 'react';
import SkillBar from './SkillBar';
import type { Skill } from '../../data/skills';
import { FiChevronDown, FiCode, FiServer, FiLayout, FiDatabase, FiTool, FiCpu } from 'react-icons/fi';

const GROUP_ICONS: Record<string, React.ElementType> = {
    'AI & Agents': FiCpu,
    'Languages': FiCode,
    'Backend / Architecture': FiServer,
    'Frontend': FiLayout,
    'Databases': FiDatabase,
    'Tools & Testing': FiTool,
};

type Props = { group: string; items: Skill[] };

const SkillGroup: React.FC<Props> = ({ group, items }) => {
    const [expanded, setExpanded] = useState(true);
    const Icon = GROUP_ICONS[group] || FiCode;
    const maxYears = Math.max(...items.map(i => i.years));
    const isAi = group === 'AI & Agents';

    return (
        <div
            className={`glass rounded-2xl overflow-hidden ${
                isAi
                    ? 'border-[color-mix(in_srgb,var(--accent)_55%,transparent)]'
                    : ''
            }`}
        >
            <button
                aria-expanded={expanded}
                onClick={() => setExpanded(s => !s)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--glass-strong)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-400"
            >
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isAi
                        ? 'bg-[var(--accent)] text-[var(--on-accent)]'
                        : 'bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-[var(--accent)]'
                }`}>
                    <Icon size={16} />
                </span>
                <div className="flex-1 text-left">
                    <h4 className="font-display font-semibold text-sm">{group}</h4>
                    <p className="text-xs text-[var(--muted)]">{items.length} skills &middot; up to {maxYears} yrs</p>
                </div>
                <FiChevronDown
                    size={16}
                    className="text-[var(--muted)] transition-transform duration-300 flex-shrink-0"
                    style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
            </button>

            <div
                className="grid overflow-hidden"
                style={{
                    gridTemplateRows: expanded ? '1fr' : '0fr',
                    transition: 'grid-template-rows 450ms cubic-bezier(0.45, 0, 0.55, 1)',
                }}
            >
                <div className="overflow-hidden">
                    <div className="px-4 py-3 space-y-3">
                        {items.map((s, i) => (
                            <div
                                key={s.name}
                                style={{
                                    opacity: expanded ? 1 : 0,
                                    transform: expanded ? 'translateY(0)' : 'translateY(-6px)',
                                    transition: 'opacity 380ms cubic-bezier(0.45, 0, 0.55, 1), transform 380ms cubic-bezier(0.45, 0, 0.55, 1)',
                                    transitionDelay: expanded ? `${i * 35}ms` : '0ms',
                                }}
                            >
                                <SkillBar name={s.name} years={s.years} maxYears={maxYears} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillGroup;
