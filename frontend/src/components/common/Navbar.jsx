import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useState, useEffect } from 'react';
import React from 'react';

export default function Navbar() {
    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const profileMenuRef = React.useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setShowProfileMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        setShowProfileMenu(false);
    };

    const navLinks = [
        { path: '/body-scan', label: 'Body Scan', icon: 'accessibility_new' },
        { path: '/recommendations', label: 'Stylist', icon: 'auto_awesome' },
        { path: '/saved-outfits', label: 'Closet', icon: 'checkroom' },
        { path: '/trends', label: 'Trends', icon: 'trending_up' },
        { path: '/about', label: 'About', icon: 'info' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent ${scrolled ? 'bg-background-dark/90 backdrop-blur-md border-primary/20 py-4' : 'bg-transparent py-6'}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group">
                        <div className="w-10 h-10 bg-primary/10 border border-primary/40 rounded-full flex items-center justify-center mr-3 group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
                            <span className="material-icons text-primary group-hover:text-background-dark transition-colors">diamond</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-[0.2em] font-display text-white uppercase leading-none">Style<span className="text-primary">Sync</span></span>
                            <span className="text-[9px] tracking-[0.4em] text-primary/60 uppercase font-light">Luxury AI</span>
                        </div>
                    </Link>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {isAuthenticated ? (
                            <>
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`group flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest transition-all hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-slate-400'}`}
                                    >
                                        <span className={`material-icons text-base transition-transform group-hover:-translate-y-0.5 ${location.pathname === link.path ? 'text-primary' : 'text-slate-600 group-hover:text-primary'}`}>{link.icon}</span>
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="h-4 w-px bg-white/10 mx-2"></div>

                                {/* User Profile Dropdown */}
                                <div className="relative" ref={profileMenuRef}>
                                    <button
                                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                                        className="flex items-center gap-3 group focus:outline-none"
                                    >
                                        <div className="text-right hidden lg:block">
                                            <p className="text-[10px] font-bold text-white uppercase tracking-wider group-hover:text-primary transition-colors">{user?.name || 'Client'}</p>
                                            <p className="text-[8px] text-primary/80 uppercase tracking-widest text-right">Elite Member</p>
                                        </div>
                                        <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-primary/50 group-hover:bg-primary/10 transition-all">
                                            <span className="material-icons text-slate-400 group-hover:text-primary text-lg">person</span>
                                        </div>
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className={`absolute right-0 mt-4 w-56 glass-card border border-primary/20 rounded-xl shadow-2xl transform transition-all duration-200 origin-top-right ${showProfileMenu ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'}`}>
                                        <div className="p-4 border-b border-white/5">
                                            <p className="text-xs text-white font-bold">{user?.name}</p>
                                            <p className="text-[10px] text-slate-400">{user?.email}</p>
                                        </div>
                                        <div className="py-2">
                                            <Link to="/saved-outfits" className="flex items-center gap-3 px-4 py-3 text-[11px] font-bold text-slate-300 hover:text-primary hover:bg-white/5 uppercase tracking-wider transition-colors">
                                                <span className="material-icons text-base">checkroom</span>
                                                My Closet
                                            </Link>
                                            <Link to="/body-scan" className="flex items-center gap-3 px-4 py-3 text-[11px] font-bold text-slate-300 hover:text-primary hover:bg-white/5 uppercase tracking-wider transition-colors">
                                                <span className="material-icons text-base">accessibility_new</span>
                                                Body Scan
                                            </Link>
                                        </div>
                                        <div className="border-t border-white/5 py-2">
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold text-red-400 hover:text-red-300 hover:bg-red-500/10 uppercase tracking-wider transition-colors text-left"
                                            >
                                                <span className="material-icons text-base">logout</span>
                                                Sign Out
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-6">
                                <Link
                                    to="/login"
                                    className="text-[11px] font-bold uppercase tracking-widest text-slate-300 hover:text-primary transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="px-6 py-2.5 bg-primary text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white transition-all shadow-gold rounded-sm"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
