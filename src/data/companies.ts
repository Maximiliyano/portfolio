export type Company = {
    name: string;
    logo: string;
};

export const companies = {
    VectorSoftware: {
        name: 'Vector Software, Ltd.',
        logo: 'https://image-hosting-api.fly.dev/api/images/69fe3ebca82720e7cb288f5c.png'
    },
    DataArt: {
        name: 'DataArt Solutions, Inc.',
        logo: 'https://image-hosting-api.fly.dev/api/images/69fe378bd32fa239a62a5f54'
    },
    CoherentSolutions: {
        name: 'Coherent Solutions, Inc.',
        logo: 'https://image-hosting-api.fly.dev/api/images/69fe3774d32fa239a62a5f52.webp'
    },
    EPAM: {
        name: 'EPAM Systems, Inc.',
        logo: 'https://image-hosting-api.fly.dev/api/images/6aba47e46e1d706fb3a82479.png'
    },
} as const;