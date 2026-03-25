import React, { useState } from 'react';
import SkillBar from './SkillBar';
import type { Skill } from '../../data/skills';
import { FiChevronDown, FiCode, FiServer, FiLayout, FiDatabase, FiTool } from 'react-icons/fi';

const GROUP_ICONS: Record<string, React.ElementType> = {
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

    return (
        <div className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-800/30">
            <button
                aria-expanded={expanded}
                onClick={() => setExpanded(s => !s)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-slate-800/60 hover:bg-gray-100 dark:hover:bg-slate-700/60 transition-colors"
            >
                <span className="w-8 h-8 rounded-lg bg-teal-500/10 dark:bg-teal-500/15 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-teal-500" />
                </span>
                <div className="flex-1 text-left">
                    <h4 className="font-semibold text-sm">{group}</h4>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{items.length} skills &middot; up to {maxYears} yrs</p>
                </div>
                <FiChevronDown
                    size={16}
                    className="text-gray-400 transition-transform duration-300 flex-shrink-0"
                    style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
            </button>

            <div
                className="grid overflow-hidden"
                style={{
                    gridTemplateRows: expanded ? '1fr' : '0fr',
                    transition: 'grid-template-rows 320ms ease',
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
                                    transition: 'opacity 240ms ease, transform 240ms ease',
                                    transitionDelay: expanded ? `${i * 35}ms` : '0ms',
                                }}
                            >
                                <SkillBar name={s.name} years={s.years} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillGroup;
