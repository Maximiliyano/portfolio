import React from 'react';
import { useInView } from '../../hooks/useInView';

type Props = { name: string };

export const SkillBar: React.FC<Props> = ({ name }) => {
    const { ref } = useInView();

    return (
        <div ref={ref as any} className="mb-3">
            <div className="flex justify-between items-center text-sm mb-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition px-2 py-1">
                <span className="font-medium">{name}</span>
            </div>
        </div>
    );
};

export default SkillBar;
