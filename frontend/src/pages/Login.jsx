import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { login } from '../redux/slices/authSlice';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            const from = location.state?.from?.pathname || '/';
            // Preserve the state if it exists (e.g., product data for AR Try-On)
            const state = location.state?.from?.state || {};
            navigate(from, { state, replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Login attempt:', formData);
        dispatch(login(formData))
            .unwrap()
            .then(() => {
                // navigate('/'); // handled in useEffect or by auth state change
            })
            .catch((err) => {
                console.error('Failed to login:', err);
                // toast.error(err);
            });
    };

    return (
        <div className="bg-background-dark text-slate-100 min-h-screen flex overflow-hidden">
            {/* Left Panel - Silhouette & Scan Animation */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-luxury-charcoal items-center justify-center overflow-hidden border-r border-primary/10">
                <div className="absolute inset-0 opacity-20 wireframe-grid"></div>
                <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                    <div className="relative w-3/4 max-w-md aspect-[3/4] flex items-center justify-center overflow-hidden">
                        {/* Silhouette Gradient Background */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(198,167,94,0.08)_0%,_transparent_70%)]"></div>

                        <img
                            alt="Fashion Silhouette"
                            className="w-full h-full object-cover mix-blend-luminosity opacity-30 scale-110"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxO7So6fHq0PuB2DBfgiiIg2Kx9YU35zZQpneZHPzygsa27ZBhV8RVuhtm-hX_i6ElSYgnSiar52VRlFh8XcipFD-cfQWHtRdrrQlIgTHWtUPCR9R_vAvzymls7b4F_ylv4EASyQCMQRa1QyvgNSD2g4Xpk4BUbyDDRm557Me1lZJ5pr-CWYhg-39fkE3w_PYGVqQcVoo4BvME0nVhCBkIfD0pCMVsbWti-QhqtkAFyngdDjs5IuGatt8HIyQBe3qx9Dn-HXCwCx6s"
                        />

                        {/* Scan Line Animation */}
                        <div className="scan-line absolute w-full z-20 animate-scan"></div>

                        {/* Decorative Borders */}
                        <div className="absolute inset-4 border border-primary/20 rounded-2xl"></div>
                        <div className="absolute inset-0 border border-primary/10 rounded-full scale-110"></div>
                    </div>

                    <div className="mt-12 text-center relative z-20">
                        <h2 className="text-4xl font-bold tracking-tighter mb-2 text-white font-display">
                            Elegance. <span className="text-primary italic font-luxury">Encoded.</span>
                        </h2>
                        <p className="text-slate-500 font-light tracking-[0.3em] uppercase text-xs">
                            The Pinnacle of Digital Wardrobe Intelligence
                        </p>
                    </div>
                </div>

                {/* Tier Badge */}
                <div className="absolute bottom-10 left-10 flex items-center gap-3 glass-card px-5 py-2.5 rounded-full border border-primary/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                    <span className="text-[10px] font-semibold text-primary tracking-widest uppercase">StyleSync Gold Tier</span>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-background-dark">
                {/* Background Glows */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>

                <div className="w-full max-w-md space-y-8 z-10">
                    <div className="text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-10">
                            <div className="w-11 h-11 border border-primary/40 bg-primary/10 rounded flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                                <span className="material-icons text-primary font-light text-2xl">fingerprint</span>
                            </div>
                            <h1 className="text-3xl font-bold tracking-tighter text-white font-luxury">
                                Style<span className="text-primary italic">Sync</span>
                            </h1>
                        </div>
                        <h2 className="text-2xl font-medium text-white font-display">Authentication</h2>
                        <p className="text-slate-500 mt-2 font-light text-sm">Please verify your credentials to access the atelier.</p>
                    </div>

                    <div className="glass-card p-10 rounded-2xl shadow-2xl border border-primary/20">
                        {error && (
                            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3">
                                <span className="material-icons text-red-500 text-xl">error_outline</span>
                                <p className="text-red-400 text-xs font-medium">{error}</p>
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-[10px] font-bold text-primary/60 uppercase tracking-[0.2em] mb-3" htmlFor="email">
                                    Client Identity
                                </label>
                                <div className="relative group">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-primary transition-colors">
                                        <span className="material-icons text-base">mail</span>
                                    </span>
                                    <input
                                        className="block w-full pl-11 pr-4 py-3.5 bg-black/40 border border-white/10 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-slate-700 text-white text-sm"
                                        id="email"
                                        type="email"
                                        placeholder="concierge@stylesync.luxury"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-center mb-3">
                                    <label className="block text-[10px] font-bold text-primary/60 uppercase tracking-[0.2em]" htmlFor="password">
                                        Encryption Key
                                    </label>
                                    <Link to="#" className="text-[10px] font-bold text-primary/40 hover:text-primary transition-colors uppercase tracking-widest">
                                        Recovery
                                    </Link>
                                </div>



                                <div className="relative group">
                                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-500 group-focus-within:text-primary transition-colors">
                                        <span className="material-icons text-base">lock</span>
                                    </span>
                                    <input
                                        className="block w-full pl-11 pr-10 py-3.5 bg-black/40 border border-white/10 rounded-lg focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder-slate-700 text-white text-sm"
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-white transition-colors focus:outline-none"
                                    >
                                        <span className="material-icons text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-white/10 bg-black text-primary focus:ring-primary cursor-pointer"
                                />
                                <label htmlFor="remember-me" className="ml-3 block text-xs text-slate-400 font-light">
                                    Maintain session for 30 days
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-transparent border border-primary hover:bg-primary hover:text-black text-primary font-bold py-4 rounded-lg transition-all duration-300 transform active:scale-95 shadow-gold uppercase tracking-widest text-xs"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="mt-10">
                            <div className="relative flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/5"></div>
                                </div>
                                <span className="relative px-4 text-[10px] font-bold text-slate-600 uppercase bg-[#141417] tracking-widest">Login with Google</span>
                            </div>

                            <div className="mt-8">
                                <button
                                    type="button"
                                    className="w-full flex items-center justify-center gap-3 py-3 border border-white/5 rounded-lg hover:border-primary/30 hover:bg-white/[0.02] transition-all group"
                                    onClick={() => window.alert("Google Login Integration Pending")}
                                >
                                    <img
                                        alt="Google"
                                        className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAaQ0FLV97F1clYh3sn5l6iV01HJBdvsCEP2XGmJPIjhfiOFbN6wIS--AAdDzyjHlwknHkxPqho2op5ox8sIAVyWapbeS4XsaLau7jPDaY6x8VGaXQQosX6kgEkIR_9pvmcKPuWWdY19sPd9Q_RSuVORQ8LBrQ8tP_nYc_rbITrFRYaxi494yJnV93rbuXQGxypS-F9USsnkH5A_2zch1pv5OdAG_mFzHsPMezwYl6jJOEN-kKO-Fj-TAThOmzznwgjctAhymLgILQA"
                                    />
                                    <span className="text-xs font-medium text-slate-400 group-hover:text-white transition-colors">Continue with Google</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-slate-600 text-[11px] tracking-wide">
                        Prospective Client?
                        <Link to="/signup" className="text-primary font-bold hover:text-primary-hover transition-colors ml-1 uppercase">
                            Request Access
                        </Link>
                    </p>
                </div>

                {/* Footer Links */}
                <div className="absolute bottom-0 right-0 p-8 flex gap-8 text-slate-700 hidden sm:flex">
                    <span className="text-[9px] tracking-[0.3em] uppercase cursor-pointer hover:text-primary transition-colors">Privacy Codex</span>
                    <span className="text-[9px] tracking-[0.3em] uppercase cursor-pointer hover:text-primary transition-colors">Global Terms</span>
                </div>
            </div>
        </div>
    );
}
