export type Project = {
    id: string;
    title: string;
    period: string;
    company: string;
    companyLogo: string;
    summary: string;
    role: string;
    tech: string[];
    responsibilities: string[];
    images: string[];
    links?: { demo?: string; repo?: string };
};

export const projects: Project[] = [
    {
        id: 'performance-review',
        images: ['https://plprojects.co.uk/wp-content/uploads/2025/04/PL-Projects-Why-You-Should-Be-Conducting-Post-Project-Reviews-1024x538.jpg'],
        title: 'Performance Review Website',
        period: 'Dec 2024 - Sep 2025',
        company: 'DataArt',
        companyLogo: 'https://www.dataart.com/favicon.ico',
        summary:
            'Platform for multi-role feedback tracking integrated with internal investment management systems.',
        role: 'Full-Stack .NET Developer',
        tech: ['.NET Core', 'ASP.NET Web API', 'React', 'Azure', 'Terraform', 'OAuth 2.0'],
        responsibilities: [
            'Built end-to-end review workflow with multi-role access and feedback tracking',
            'Troubleshot system issues using Application Insights',
            'Integrated with internal investment management systems',
            'Improved project list rendering by 50% through caching and API optimization'
        ],
        links: {}
    },
    {
        id: 'asset-market-management',
        images: ['https://w.wallhaven.cc/full/95/wallhaven-95kopk.jpg'],
        title: 'Comprehensive Asset Market Management',
        period: 'Sep 2024 - Sep 2025',
        company: 'DataArt',
        companyLogo: 'https://www.dataart.com/favicon.ico',
        summary:
            'Platform to manage projects, funds and companies with meeting agenda tracking for private equity operations.',
        role: 'Full-Stack .NET Developer',
        tech: ['.NET Framework', 'NServiceBus', 'EventStore', 'RavenDB', 'Knockout.js', 'React'],
        responsibilities: [
            'Optimised deployments and Octopus-based processes',
            'Analyzed logs across VMs to extract system insights',
            'Refactored validation models and Razor views',
            'Led sprint planning and technical design sessions'
        ],
        links: {}
    },
    {
        id: 'video-monitoring',
        images: ['https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/1272/cached.offlinehbpl.hbpl.co.uk/news/OMP/cctvintheworkplace_tcm27-105318.jpg'],
        title: 'Video Monitoring System',
        period: 'May 2024 - Aug 2024',
        company: 'DataArt',
        companyLogo: 'https://www.dataart.com/favicon.ico',
        summary:
            'Offline-capable system for configuring and monitoring network-connected cameras with role-based permissions.',
        role: '.NET Developer',
        tech: ['.NET Core', 'ASP.NET Web API', 'MediaMTX', 'Serilog', 'xUnit', 'React Native'],
        responsibilities: [
            'Implemented secure camera configuration logic and local proxy services',
            'Developed and tested HTTP client layer with xUnit',
            'Designed YAML configuration processing service',
            'Managed manual CI/CD deployments to client servers'
        ],
        links: {}
    },
    {
        id: 'vessel-traffic-management',
        images: ['https://www.vissim.no/wp-content/uploads/2023/06/AdobeStock_396145001-scaled.jpeg'],
        title: 'Vessel Traffic Management System (VISSIM)',
        period: 'Aug 2022 - Dec 2022',
        company: 'Vector Software',
        companyLogo: 'https://vector-software.com/wp-content/uploads/2023/07/cropped-favicon-32x32.png',
        summary:
            'Distributed offshore system for real-time vessel tracking, emergency prediction and event monitoring for oil rigs and ports.',
        role: 'Automation QA Engineer',
        tech: ['.NET Core', 'ASP.NET Web API', 'MediaMTX', 'xUnit', 'React Native', 'Serilog'],
        responsibilities: [
            'Developed automatic tests (Unit, E2E, Integration, UI)',
            'Maintained nightly test runs and fixed failures',
            'Coordinated tasks and refactored code for stability'
        ],
        links: {}
    }
];

export default projects;
