import React from 'react';
import about from '../../data/about';
import { CollapsibleSection } from '../layout/CollapsibleSection';

const images = about.items.flatMap(item => item.images ?? []);

export const AboutSection: React.FC = () => (
    <CollapsibleSection id="about" title="Outside work">
        <p className="max-w-2xl text-[var(--muted)] leading-relaxed">{about.intro}</p>

        <div className={`mt-6 grid gap-10 ${images.length > 0 ? 'lg:grid-cols-[1fr_minmax(0,24rem)]' : ''}`}>
            <dl className="grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-1 content-start">
                {about.items.map(item => (
                    <div key={item.title} className="border-t border-[var(--border-strong)] pt-3">
                        <dt className="font-display font-semibold">{item.title}</dt>
                        <dd className="mt-1 text-sm text-[var(--muted)] leading-relaxed">{item.text}</dd>
                    </div>
                ))}
            </dl>

            {images.length > 0 && (
                <ul className={`grid gap-4 content-start ${images.length > 1 ? 'sm:grid-cols-2 lg:grid-cols-1' : ''}`}>
                    {images.map(img => {
                        const picture = (
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                className="aspect-[16/10] w-full rounded-xl border border-[var(--border)] object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                            />
                        );
                        return (
                            <li key={img.src}>
                                <figure>
                                    <div className="overflow-hidden rounded-xl">
                                        {img.href ? (
                                            <a href={img.href} target="_blank" rel="noopener noreferrer" className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400">
                                                {picture}
                                            </a>
                                        ) : picture}
                                    </div>
                                    <figcaption className="mt-2 text-xs text-[var(--muted)]">{img.alt}</figcaption>
                                </figure>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    </CollapsibleSection>
);

export default AboutSection;
