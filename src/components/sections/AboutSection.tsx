import React from 'react';
import about from '../../data/about';
import { CollapsibleSection } from '../layout/CollapsibleSection';

export const AboutSection: React.FC = () => (
    <CollapsibleSection id="about" title="Outside work">
        <p className="max-w-2xl text-[var(--muted)] leading-relaxed">{about.intro}</p>
        <dl className="mt-6 grid gap-x-12 gap-y-6 sm:grid-cols-2">
            {about.items.map(item => (
                <div key={item.title} className="border-t border-[var(--border-strong)] pt-3">
                    <dt className="font-display font-semibold">{item.title}</dt>
                    <dd className="mt-1 text-sm text-[var(--muted)] leading-relaxed">{item.text}</dd>
                </div>
            ))}
        </dl>
    </CollapsibleSection>
);

export default AboutSection;
