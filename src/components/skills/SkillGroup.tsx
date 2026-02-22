import React, { useState, useMemo } from 'react';
import SkillBar from './SkillBar';

import type { Skill } from '../../data/skills';

import { FaChevronCircleDown, FaChevronCircleRight } from 'react-icons/fa';

type Props = { group: string; items: Skill[] };

export const SkillGroup: React.FC<Props> = ({ group, items }) => {
    const [expanded, setExpanded] = useState(true);

    const visibleItems = useMemo(() => (expanded ? items : items.slice(0)), [expanded, items]);

    return (
        <>
            <div className="flex items-center gap-2">
                <button
                    aria-expanded={expanded}
                    onClick={() => setExpanded((s) => !s)}
                    className="text-sm text-teal-600 hover:underline gap-2"
                >
                    {!expanded ? <FaChevronCircleRight /> : <FaChevronCircleDown />}
                </button>

                <h4 className="text-md font-semibold">{group}</h4>
            </div>

            {expanded && (
                <div className={`skill-list ${expanded ? 'skill-list-expanded' : ''} overflow-hidden transition-[max-height] duration-500`} style={{ maxHeight: expanded ? `${items.length * 56}px` : `${visibleItems.length * 56}px` }}>
                    <div className="space-y-2 pt-1">
                        {visibleItems.map((s) => (
                            <div key={s.name} className="skill-list-item">
                                <SkillBar name={s.name} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default SkillGroup;
