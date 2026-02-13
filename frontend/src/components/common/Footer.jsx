import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-background-dark border-t border-white/5 py-16 font-display">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
                        <span className="material-icons text-background-dark text-xs font-bold">flare</span>
                    </div>
                    <span className="text-lg font-bold tracking-tighter uppercase italic text-white font-luxury">StyleSync</span>
                </div>
                <div className="flex gap-6 text-slate-500 text-sm flex-wrap justify-center md:items-center">
                    <Link to="/" className="hover:text-primary-hover transition-colors">Home</Link>
                    <Link to="/body-scan" className="hover:text-primary-hover transition-colors">Body Scan</Link>
                    <Link to="/recommendations" className="hover:text-primary-hover transition-colors">AI Stylist</Link>
                    <Link to="/saved-outfits" className="hover:text-primary-hover transition-colors">Wardrobe</Link>
                    <Link to="/contact" className="hover:text-primary-hover transition-colors">Contact</Link>
                </div>
                <div className="flex gap-4">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary text-slate-400 hover:text-primary transition-all group">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M18,5A1.5,1.5 0 0,1 19.5,6.5A1.5,1.5 0 0,1 18,8A1.5,1.5 0 0,1 16.5,6.5A1.5,1.5 0 0,1 18,5Z" />
                        </svg>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary text-slate-400 hover:text-primary transition-all group">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-primary text-slate-400 hover:text-primary transition-all group">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/5 text-center">
                <p className="text-[10px] text-slate-600 uppercase tracking-widest">© 2026 StyleSync AI Technologies. All measurements encrypted.</p>
            </div>
        </footer>
    );
}
