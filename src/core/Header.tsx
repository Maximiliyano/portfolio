import ResumeButton from '../components/ui/ResumeButton';
import logo from '../assets/favicon.ico';

export const Header = () => {
    return (
        <header
            className="fixed top-0 left-0 w-full backdrop-blur-md flex items-center justify-center shadow z-50"
            style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}
        >
            <div className="flex justify-between items-center w-full max-w-6xl px-4 py-3">
                <a href="/" aria-label="Portfolio Logo" className="flex items-center gap-2">
                    <img src={logo} alt="Logo" className="w-6 h-6 dark:border dark:border-white" />
                    <span className="font-semibold">Portfolio</span>
                </a>

                <a href='#projects' className="text-sm">Projects</a>
                <a href='#experience' className="text-sm">Experience</a>
                <a href='#skills' className="text-sm">Skills</a>

                <ResumeButton />
            </div>
        </header>
    );
};