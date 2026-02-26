import { ContactLinks } from "../components/ui/ContactLinks";
import site from "../data/site";

export const Footer = () => {
    return (
        <footer className="fixed bottom-0 left-0 w-full flex items-center justify-center shadow-md z-50" style={{ backgroundColor: 'var(--surface)', color: 'var(--text)', borderTop: '4px solid #0EA5A4' }}>
            <div className="w-full max-w-6xl px-4 py-2 flex items-center justify-between">
                <p className="text-sm hidden sm:block">© 2026 {site.name}. All rights reserved.</p>
                <div className="sm:hidden w-full flex justify-center">
                    <ContactLinks iconSize="lg" />
                </div>
                <div className="hidden sm:block">
                    <ContactLinks showLabel={true} />
                </div>
            </div>
        </footer>
    );
};