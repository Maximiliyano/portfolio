export const Header = () => {
    return (
        <header className="
            fixed top-0 left-0 w-full bg-gray/80 backdrop-blur-xl border-b border-white/10 text-black/80 flex items-center justify-center shadow-md z-50 gap-5"
        >
            <a href="/" aria-label="Portfolio Logo">
                <img src="src/assets/favicon.ico" alt="Logo" className="w-6 h-6" />
            </a>
        </header>
    );
};