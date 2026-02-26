import React, { useState } from 'react';
import SkillBar from './SkillBar';
import type { Skill } from '../../data/skills';
import { FiChevronDown } from 'react-icons/fi';

type Props = { group: string; items: Skill[] };

const SkillGroup: React.FC<Props> = ({ group, items }) => {
    const [expanded, setExpanded] = useState(true);

    return (
        <div className="border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden">
            <button
                aria-expanded={expanded}
                onClick={() => setExpanded(s => !s)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-slate-800/60 hover:bg-gray-100 dark:hover:bg-slate-700/60 transition-colors"
            >
                <h4 className="font-semibold text-sm">{group}</h4>
                <FiChevronDown
                    size={16}
                    className="text-gray-400 transition-transform duration-300"
                    style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
                />
            </button>

            {/* grid 0fr → 1fr gives a perfect height animation without measuring */}
            <div
                className="grid overflow-hidden"
                style={{
                    gridTemplateRows: expanded ? '1fr' : '0fr',
                    transition: 'grid-template-rows 320ms ease',
                }}
            >
                <div className="overflow-hidden">
                    <div className="px-3 py-2 space-y-1.5">
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
                                <SkillBar name={s.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SkillGroup;
