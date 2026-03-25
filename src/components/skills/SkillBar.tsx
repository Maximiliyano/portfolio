import React from 'react';

type Props = { name: string; years: number };

export const SkillBar: React.FC<Props> = ({ name, years }) => (
    <div className="flex items-center justify-between py-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{name}</span>
        <span className="text-xs font-medium text-gray-400 dark:text-gray-500 tabular-nums">
            {years} {years === 1 ? 'yr' : 'yrs'}
        </span>
    </div>
);

export default SkillBar;
