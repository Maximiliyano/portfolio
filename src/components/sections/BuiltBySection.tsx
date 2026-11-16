import React from 'react';
import personalProjects from '../../data/personalProjects';
import { CollapsibleSection } from '../layout/CollapsibleSection';
import { BuiltCard } from '../projects/BuiltCard';

export const BuiltBySection: React.FC = () => (
    <CollapsibleSection
        id="built"
        reveal={false}
        title="Built by me"
        meta={<span className="text-xs text-[var(--muted)]">{personalProjects.filter(p => p.status !== 'planned').length} live · {personalProjects.filter(p => p.status === 'planned').length} planned</span>}
    >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6 pb-2">
            {personalProjects.map((p, i) => <BuiltCard key={p.id} project={p} index={i} />)}
        </div>
    </CollapsibleSection>
);

export default BuiltBySection;
