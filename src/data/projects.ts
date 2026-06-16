import type { DomainId } from './domains';

export type Project = {
    id: string;
    title: string;
    start: string;
    end?: string;
    company: string;
    companyLogo: string;
    country: string;
    clientType: string;
    domains: DomainId[];
    teamSize?: number;
    summary: string;
    role: string;
    tech: string[];
    responsibilities: string[];
    images: string[];
};

export const projects: Project[] = [
    {
        id: 'medical-device-management-system',
        images: ['https://www.advamed.org/wp-content/uploads/2021/05/medical-device-safety-quality.jpg'],
        title: 'Medical Device Management System',
        start: 'Apr 2026',
        end: 'Present',
        company: 'EPAM',
        companyLogo: 'https://www.epam.com/etc/designs/epam-core/favicon/favicon-32x32.png',
        country: 'NL',
        clientType: 'Medical Device Manufacturer',
        domains: ['healthcare'],
        teamSize: 10,
        summary: 'The project was about patient monitoring platform and associated applications. Installed in hospitals and supporting beds to ensure patient health safety with on-premise infrastructure using AWS Cloud, Postgres and SQL Server with backward compatibility.',
        role: 'Full-Stack .NET Engineer',
        tech: ['.NET Framework 4.8', 'WCF', 'Amazon Web Services', 'EC2', 'Postgres', 'SQL Server', 'Azure DevOps', 'Claude', 'Codemie'],
        responsibilities: [
            'Performed migration from MSSQL implementation to the PostgreSQL with backward compatibility',
            'Supported application installation process within integration for infrastructure operations',
            'Demo sharing of implemented functionality to align on tech requirement and resolve project challenges',
            'Developed PowerShell and SQL scripts to automate deployement and configuration processes'
        ]
    },
    {
        id: 'transport-and-schedule-system',
        images: ['https://www.visitoslo.com/contentassets/1f51fc42aed2470295163ec421a54be3/ruter_buss-og-trikk_1.jpg'],
        title: 'Public Transport and Schedule System',
        start: 'Feb 2026',
        end: 'Apr 2026',
        company: 'Coherent Solutions',
        companyLogo: 'https://www.coherentsolutions.com/hubfs/favicon-96x96.png',
        country: 'CA',
        clientType: 'Public Transport Operator',
        domains: ['transportation', 'ai-ml'],
        teamSize: 8,
        summary: "The project focuses on developing and modernizing a platform, replacing an existing on-premise solution with a cloud-based architecture. The system supports vehicle and operator scheduling, route planning, timetables, blocking, runcutting, and rostering.",
        role: "Full-Stack .NET Developer",
        tech: ['.NET Core', 'Azure Cloud Services', 'SQL Server', 'Claude', 'StoredProcedures', 'Triggers', 'Dapper', 'BitBucket', 'SonarQube', 'Angular'],
        responsibilities: [
            'Designed and implemented RESTful APIs for seamless frontend integration and external system communication',
            'AI driven development using skills, plugins, MCP server integrations',
            'Developed unit tests to ensure code reliability and participated in peer code reviews to maintain high-quality standards',
            'Performed bug fixing, tracing, and provided setup and support across a microservices architecture',
            'Managed API development and created direct stored procedures for SQL database communication, including table and relationship design',
            'Led feature architecture design and backend implementation to ensure scalable and efficient solutions',
            'Conducted refactoring activities to enhance solution quality, directly influencing team planning and breaking down epics into actionable tasks'
        ]
    },
    {
        id: 'ai-agents-platform',
        images: ['https://www.ovaledge.com/hubfs/Ovaledge%20Banner%20Blog%20-%202026-02-04T174419.165.png'],
        title: 'AI Agents Platform',
        start: 'Sep 2025',
        end: 'Feb 2026',
        company: 'DataArt',
        companyLogo: 'https://www.dataart.com/favicon.ico',
        country: 'US',
        clientType: 'Artificial Intelligence',
        domains: ['ai-ml'],
        teamSize: 6,
        summary: "Developed a scalable AI-driven platform focused on orchestrating intelligent agents to support investment workflows and decision-making processes. The system emphasized modular architecture, high performance, and seamless integration with existing enterprise tools.",
        role: "Full-Stack .NET Engineer",
        tech: ['.NET Core', '.NET Aspire', 'Microsoft Orleans', 'Semantic Kernel', 'Model Context Protocol (MCP)'],
        responsibilities: [
            'Designed and implemented multi-agent workflows for automated research, analysis, and review processes using LLM-powered agents',
            'Built context-aware pipelines using Model Context Protocol (MCP) and Semantic Kernel to manage prompt orchestration, memory, and tool usage',
            'Developed agent coordination and state management using Microsoft Orleans for distributed, scalable execution',
            'Integrated AI agents with internal investment management systems to enable real-time data retrieval and decision support'
        ]
    },
    {
        id: 'performance-review',
        images: ['https://en.neobrain.io/wp-content/uploads/2024/07/62f12fab150fef4f54f1d881_People%20review.webp'],
        title: 'Performance Review Website',
        start: 'Dec 2024',
        end: 'Sep 2025',
        company: 'DataArt',
        companyLogo: 'https://www.dataart.com/favicon.ico',
        country: 'UK',
        clientType: 'Investment Management',
        domains: ['hr-enterprise', 'fintech'],
        teamSize: 5,
        summary:
            'Platform for multi-role feedback tracking integrated with internal investment management systems.',
        role: 'Full-Stack .NET Developer',
        tech: ['.NET Core', 'ASP.NET Web API', 'React', 'Azure', 'Terraform', 'OAuth 2.0'],
        responsibilities: [
            'Built end-to-end review workflow with multi-role access and feedback tracking',
            'Troubleshot system issues using Application Insights',
            'Integrated with internal investment management systems',
            'Improved project list rendering by 50% through caching and API optimization'
        ]
    },
    {
        id: 'asset-market-management',
        images: ['https://cdn.sanity.io/images/uqxwe2qj/production/20577ef16f6c2443c2b43c7e36beef98db3e3661-1086x612.png?q=80&auto=format&fit=clip&dpr=2&w=1086'],
        title: 'Comprehensive Asset Market Management',
        start: 'Sep 2024',
        end: 'Sep 2025',
        company: 'DataArt',
        companyLogo: 'https://www.dataart.com/favicon.ico',
        country: 'UK',
        clientType: 'Private Equity',
        domains: ['fintech'],
        teamSize: 7,
        summary:
            'Platform to manage projects, funds and companies with meeting agenda tracking for private equity operations.',
        role: 'Full-Stack .NET Developer',
        tech: ['.NET Framework', 'NServiceBus', 'EventStore', 'RavenDB', 'Knockout.js', 'React'],
        responsibilities: [
            'Optimised deployments and Octopus-based processes',
            'Analyzed logs across VMs to extract system insights',
            'Refactored validation models and Razor views',
            'Led sprint planning and technical design sessions'
        ]
    },
    {
        id: 'video-monitoring',
        images: ['https://cached.imagescaler.hbpl.co.uk/resize/scaleWidth/1272/cached.offlinehbpl.hbpl.co.uk/news/OMP/cctvintheworkplace_tcm27-105318.jpg'],
        title: 'Video Monitoring System',
        start: 'May 2024',
        end: 'Aug 2024',
        company: 'DataArt',
        companyLogo: 'https://www.dataart.com/favicon.ico',
        country: 'AE',
        clientType: 'Security / Surveillance',
        domains: ['security-iot'],
        teamSize: 4,
        summary:
            'Offline-capable system for configuring and monitoring network-connected cameras with role-based permissions.',
        role: '.NET Developer',
        tech: ['.NET Core', 'ASP.NET Web API', 'MediaMTX', 'Serilog', 'xUnit', 'React Native'],
        responsibilities: [
            'Implemented secure camera configuration logic and local proxy services',
            'Developed and tested HTTP client layer with xUnit',
            'Designed YAML configuration processing service',
            'Managed manual CI/CD deployments to client servers'
        ]
    },
    {
        id: 'vessel-traffic-management',
        images: ['https://www.vissim.no/wp-content/uploads/2023/06/AdobeStock_396145001-scaled.jpeg'],
        title: 'Vessel Traffic Management System (VISSIM)',
        start: 'Aug 2022',
        end: 'Dec 2022',
        company: 'Vector Software',
        companyLogo: 'https://vector-software.com/wp-content/uploads/2023/07/cropped-favicon-32x32.png',
        country: 'NO',
        clientType: 'Maritime Operations',
        domains: ['maritime'],
        teamSize: 12,
        summary: 'The project was a distributed offshore system comprising multiple interrelated components that allowed consumers to control each element separately and view its coordinates on a world map. This allowed consumers to track vessels in real-time, predict emergencies, detect oil spills, manage ports, track personnel, monitor events on oil rigs, and monitor offshore wind.',
        role: 'Automation QA Engineer',
        tech: ['.NET Core', 'SQL Server', 'NUnit3', 'RestSharp', 'Angular', 'Azure', 'elasticSearch', 'Fidler', 'Postman', 'Test Automation'],
        responsibilities: [
            'Developed automatic tests (Unit, E2E, Integration, UI)',
            'Maintained nightly test runs and fixed failures',
            'Coordinated tasks and refactored code for stability'
        ]
    }
];

export default projects;
