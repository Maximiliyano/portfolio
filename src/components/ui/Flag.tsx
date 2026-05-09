import React from 'react';
import { countryName, flagSrcSet, flagUrl } from '../../lib/countryFlag';

type Props = {
    code: string;
    size?: 'sm' | 'md';
    className?: string;
    title?: string;
};

const SIZE_PX: Record<NonNullable<Props['size']>, { w: number; h: number; cdn: 20 | 40 }> = {
    sm: { w: 16, h: 12, cdn: 20 },
    md: { w: 20, h: 15, cdn: 40 },
};

export const Flag: React.FC<Props> = ({ code, size = 'sm', className = '', title }) => {
    if (!code) return null;
    const { w, h, cdn } = SIZE_PX[size];
    const alt = countryName(code);
    return (
        <img
            src={flagUrl(code, cdn)}
            srcSet={flagSrcSet(code, cdn)}
            width={w}
            height={h}
            alt={alt}
            title={title ?? alt}
            loading="lazy"
            decoding="async"
            className={`inline-block rounded-[2px] ring-1 ring-black/10 dark:ring-white/15 align-[-2px] ${className}`}
        />
    );
};

export default Flag;
