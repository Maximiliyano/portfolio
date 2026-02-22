import React from 'react';
import type { ExperienceItem } from '../../data/experience';

type Props = { item: ExperienceItem };

export const TimelineItem: React.FC<Props> = ({ item }) => {
    return (
        <div className="mb-6">
            <div className="flex items-baseline justify-between">
                <div>
                    <h4 className="font-semibold">{item.role} — {item.company}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300">{item.start} {item.end ? `— ${item.end}` : ''} {item.location ? `· ${item.location}` : ''}</p>
                </div>
            </div>
            <ul className="mt-2 list-disc pl-5 text-sm text-gray-700 dark:text-gray-200">
                {item.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                ))}
            </ul>
        </div>
    );
};

export default TimelineItem;
