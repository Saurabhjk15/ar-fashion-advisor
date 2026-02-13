import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { signup } from '../redux/slices/authSlice';

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        terms: false,
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, error, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        const newFormData = { ...formData, [e.target.id]: value };
        setFormData(newFormData);

        // Real-time validation for confirm password
        if (e.target.id === 'confirmPassword' || e.target.id === 'password') {
            if (e.target.id === 'confirmPassword' && value !== formData.password) {
                setPasswordError("Passwords do not match");
            } else if (e.target.id === 'password' && formData.confirmPassword && value !== formData.confirmPassword) {
                setPasswordError("Passwords do not match");
            } else {
                setPasswordError("");
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords must match to proceed");
            return;
        }
        console.log('Signup attempt:', formData);
        dispatch(signup(formData));
    };

    return (
        <div className="bg-background-dark font-sans text-luxury-cream min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top,_#1a1a1a_0%,_#050505_100%)]">
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://lh3.googleusercontent.com/aida-public/AB6AXuCULcr9cIwE_kyAGrPW1y_CL_DXNF_XwGdpwI1SpNfaOIBH22iGnRH2TvDwd0reRS5Ih1wxU52mzFNdFEPKPHgNJ4glZJGcaTiIaXcd5EO_Nm-s70HX8tOrmqLWZ48fpt_NLAeuAy8QFYoq3UONADQkCRlMiZLEWnDBxtf084khB0KIrcMZMMO3YlareiqqPm4WYNfhQrbnN42PaNnSHIPGHcDth_vxckpOYifmM7NH0nvB62EQjdhdfCpEppqkiCwnZL3kLyyUKum9')]"></div>
                <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[140px]"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[140px]"></div>
            </div>

            <main className="relative z-10 w-full max-w-[520px] px-6 py-12">
                <div className="bg-surface-card/60 backdrop-blur-2xl border border-primary/20 rounded-2xl p-10 md:p-12 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">

                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center mb-8">
                            <div className="w-14 h-14 border border-primary flex items-center justify-center rounded-sm bg-transparent">
                                <span className="material-icons text-primary text-3xl font-light">flare</span>
                            </div>
                        </div>
                        <h1 className="font-display text-4xl font-medium tracking-tight mb-3 text-white">
                            Style<span className="text-primary font-luxury italic">Sync</span>
                        </h1>
                        <div className="flex items-center justify-center gap-4">
                            <div className="h-[1px] w-8 bg-primary/30"></div>
                            <p className="text-primary/70 text-[10px] font-medium uppercase tracking-[0.4em]">Private Registration</p>
                            <div className="h-[1px] w-8 bg-primary/30"></div>
                        </div>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg flex items-center gap-3">
                            <span className="material-icons text-red-500 text-xl">error_outline</span>
                            <p className="text-red-400 text-xs font-medium">{error}</p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-primary/80 tracking-[0.2em] uppercase ml-1" htmlFor="name">Full Name</label>
                            <div className="relative group">
                                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 text-lg font-light group-focus-within:text-primary transition-colors">person</span>
                                <input
                                    className="w-full bg-black/40 border border-white/5 rounded-lg py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-white/20 text-white"
                                    id="name"
                                    type="text"
                                    placeholder="JULIAN ARCHER"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-primary/80 tracking-[0.2em] uppercase ml-1" htmlFor="email">Email Address</label>
                            <div className="relative group">
                                <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 text-lg font-light group-focus-within:text-primary transition-colors">mail</span>
                                <input
                                    className="w-full bg-black/40 border border-white/5 rounded-lg py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-white/20 text-white"
                                    id="email"
                                    type="email"
                                    placeholder="ARCHER@ATELIER.COM"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-primary/80 tracking-[0.2em] uppercase ml-1" htmlFor="password">Password</label>
                                <div className="relative group">
                                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 text-lg font-light group-focus-within:text-primary transition-colors">lock</span>
                                    <input
                                        className="w-full bg-black/40 border border-white/5 rounded-lg py-3.5 pl-12 pr-10 text-sm focus:outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-white/20 text-white"
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
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors focus:outline-none"
                                    >
                                        <span className="material-icons text-lg">{showPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-primary/80 tracking-[0.2em] uppercase ml-1" htmlFor="confirmPassword">Confirm</label>
                                <div className="relative group">
                                    <span className="material-icons absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 text-lg font-light group-focus-within:text-primary transition-colors">shield</span>
                                    <input
                                        className={`w-full bg-black/40 border ${passwordError ? 'border-red-500/50' : 'border-white/5'} rounded-lg py-3.5 pl-12 pr-10 text-sm focus:outline-none focus:border-primary focus:ring-0 transition-all placeholder:text-white/20 text-white`}
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors focus:outline-none"
                                    >
                                        <span className="material-icons text-lg">{showConfirmPassword ? 'visibility_off' : 'visibility'}</span>
                                    </button>
                                </div>
                                {passwordError && (
                                    <p className="text-[10px] text-red-500 font-medium tracking-wide mt-1 ml-1 flex items-center gap-1">
                                        <span className="material-icons text-[10px]">error</span>
                                        {passwordError}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-start gap-3 py-2">
                            <div className="relative flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-white/10 bg-black text-primary focus:ring-primary focus:ring-offset-black"
                                    checked={formData.terms}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <label htmlFor="terms" className="text-[11px] text-white/40 leading-relaxed cursor-pointer select-none">
                                I accept the <Link to="#" className="text-primary hover:text-primary-hover transition-colors">Membership Terms</Link> and <Link to="#" className="text-primary hover:text-primary-hover transition-colors">Privacy Protocol</Link>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary-hover text-luxury-cream font-semibold py-4 rounded-lg shadow-xl shadow-primary/10 transition-all active:scale-[0.99] mt-6 uppercase tracking-[0.25em] text-[11px] h-14"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="relative my-10 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <span className="relative px-6 bg-[#161619] text-[9px] text-white/30 uppercase tracking-[0.3em]">Signup with Google</span>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <button
                            type="button"
                            className="flex items-center justify-center gap-3 border border-white/5 hover:border-primary/30 rounded-lg py-3 transition-all bg-white/[0.02] group"
                            onClick={() => window.alert("Google Signup Integration Pending")}
                        >
                            <img
                                alt="Google"
                                className="w-4 h-4 opacity-60 grayscale group-hover:grayscale-0 transition-all"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWuqFGv93-2o5zowYI35XjMq5fI5jCzgXSFG2IVuIBOHGjQWNVK-r6c-YEbImswsTwNnts9mFTSYVQPtZO8JkkweuF5EDGuMPfEM5eRayM86oCEORv6Xm8UqhO192BOZOMuH4Kgf-B5T9NultPiPGQIhTd6QMgRtX3LEE2I0K9FJg-tnHzjajDFS14vFV6unuf6LR3tEFohkHildOwYecHT8uV7FISSMOrbfiAyLG1EDy2pQc3WLnPbTsWLmiG1yIR7cx9VYdo85r0"
                            />
                            <span className="text-[10px] font-medium uppercase tracking-widest text-white/50 group-hover:text-white transition-colors">Continue with Google</span>
                        </button>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-[11px] text-white/30 tracking-wide">
                            ALREADY A MEMBER?
                            <Link to="/login" className="text-primary font-bold hover:text-primary-hover transition-colors ml-2 tracking-widest uppercase">
                                LOG IN
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-10 flex justify-center items-center gap-8 opacity-30">
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-[14px] text-primary">auto_awesome</span>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-white">Bespoke AI Architecture</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="material-icons text-[14px] text-primary">lock_open</span>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-medium text-white">End-to-End Encryption</span>
                    </div>
                </div>
            </main>

            {/* Floating Side Images (Desktop) */}
            <div className="fixed top-1/2 -translate-y-1/2 left-12 opacity-[0.07] pointer-events-none hidden 2xl:block">
                <img alt="Fashion visual" className="w-64 h-96 object-cover rounded-sm grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCluf1EBQmCjo8xsKuTjidoPRlv7Sf2amIiZtqXZ33CPp1jjzJ73CVV2DzueR6SmucatXObPxeKOk36XmIhCh6MFMhcAaquosWmC2ghn2-vw2PUieOheDODkU28_QX5kzjk3D1S9U5aW5DEshklvoZxdQ8QNOum1om8VtFpbOVPvXF4llcK2tUjKaARTWdJWSClPqR-aBgcyXiu7LrY3Jaq7yHHxylimm_MsTHLp237WhqYUw0RQhW83EbD5p5PQHy9NYwen-Yq-FyD" />
            </div>
            <div className="fixed top-1/2 -translate-y-1/2 right-12 opacity-[0.07] pointer-events-none hidden 2xl:block">
                <img alt="Fashion visual" className="w-64 h-96 object-cover rounded-sm grayscale" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAuGxUlo0UyZmd0xZxN0wAVsVU5W-3xCc8XhDl2EigqeySSi1zZIE51RaODr5yOSouMCF-4jT0zs_1cDmcBx_CZvqxP1JqUJ_CyBCwsj6tI4lyIsBLmF_U7xm4zsmCk90Tga5OEdn0lkhvwvrPh8e-deURfkY__iY-Y_4YymLH0jJONOAHX5tZSjwlKGxgGvlxoCtXWFrz5vB1wEOhQtLGukAThOdmnw3eCIZN6CGrsXUqR_updEWwZI6jWOlsZlsL4zScmfBLtUWS" />
            </div>
        </div>
    );
}
