import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { useState, useEffect } from 'react';
import React from 'react';

export default function Home() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setShowProfileMenu(false);
  };

  return (
    <div className="font-display selection:bg-primary selection:text-background-dark bg-background-dark text-slate-100 min-h-screen">
      {/* Custom Navbar for Home Page */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-background-dark/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
              <span className="material-icons text-background-dark text-xl font-bold">flare</span>
            </div>
            <span className="text-2xl font-bold tracking-tighter uppercase italic text-white font-luxury">StyleSync</span>
          </div>
          <div className="hidden md:flex items-center gap-10">
            <Link to="/trends" className="text-sm font-medium hover:text-primary-hover transition-colors tracking-widest uppercase">Trends</Link>
            <Link to="/saved-outfits" className="text-sm font-medium hover:text-primary-hover transition-colors tracking-widest uppercase">Wardrobe</Link>
            <Link to="/about" className="text-sm font-medium hover:text-primary-hover transition-colors tracking-widest uppercase">About</Link>
            <Link to="/recommendations" className="text-sm font-medium hover:text-primary-hover transition-colors tracking-widest uppercase">Collection</Link>
            {isAuthenticated && (
              <Link to="/body-scan" className="text-sm font-medium hover:text-primary-hover transition-colors tracking-widest uppercase">Body Scan</Link>
            )}
          </div>
          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  onBlur={() => setTimeout(() => setShowProfileMenu(false), 200)}
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
            ) : (
              <Link to="/login" className="text-sm font-medium border border-primary/40 px-6 py-2 rounded-lg hover:bg-primary/10 hover:border-primary-hover transition-all tracking-widest uppercase text-primary">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-36 pb-32 overflow-hidden">
        <div className="absolute inset-0 wireframe-grid opacity-30"></div>
        <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-bold uppercase tracking-[0.2em] mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Next-Gen AI Stylist
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] tracking-tight text-white">
              Your Personal <br />
              <span className="text-primary italic font-luxury">AI Fashion</span> <br />
              Stylist
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-lg leading-relaxed font-light">
              Precision body scanning meets generative AI to curate your perfect wardrobe. Experience the absolute peak of personalized luxury.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link to="/body-scan" className="bg-primary text-black font-bold py-5 px-10 rounded-lg glow-gold hover:bg-primary-hover hover:scale-105 transition-all flex items-center justify-center gap-3 tracking-widest uppercase">
                Start Body Scan
                <span className="material-icons">sensors</span>
              </Link>
              <Link to="/recommendations" className="bg-transparent border border-white/20 text-white font-bold py-5 px-10 rounded-lg hover:bg-white/5 hover:border-primary/50 transition-colors flex items-center justify-center gap-3 tracking-widest uppercase">
                Explore Looks
              </Link>
            </div>
            <div className="flex items-center gap-8 pt-8 border-t border-white/10 w-fit">
              <div>
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Active Users</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">Fit Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-[10px] uppercase tracking-widest text-slate-500">AI Concierge</div>
              </div>
            </div>
          </div>
          <div className="relative h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent z-10"></div>
            <div className="relative w-full h-full group">
              <img alt="Futuristic Digital Silhouette" className="w-full h-full object-contain mix-blend-screen opacity-70 sepia-[0.3] brightness-125 transition-all duration-700 group-hover:scale-[1.02]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDYZfbPHQzbBkW8zP-2038y40BonxvxWwSHYApmNx34Lq2B4F-PY_31g0sQZXE518botD7WzRkEj3GQEofy-FK-Hx4hLkQJOAwYrtFv8fGaY8B4nykDWaVcq6ldYCvntZlwOLOFiYDwd8OZx9Jysm9JoPnldmhrcsPMD8pAQ18s0ZOLJRv5uBJzGWw7OBRWf7Eq01w2g1a7f4QSc17H62INY4k3oF_5kz6LxQDWEA-6YL32WUbKAU_V8KuAeDQTjsl4uQYvz6bYMEo5" />
              <div className="absolute inset-0 bg-primary/5 blur-[100px] -z-10 rounded-full"></div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="scan-line w-full absolute top-0 animate-scan"></div>
              </div>
              <div className="absolute top-1/4 right-0 glass-card p-4 rounded-lg border-l-4 border-l-primary">
                <div className="text-[10px] text-primary font-bold uppercase tracking-tighter">Proportion Scan</div>
                <div className="text-lg font-mono text-white">184.2cm</div>
              </div>
              <div className="absolute bottom-1/3 left-0 glass-card p-4 rounded-lg border-l-4 border-l-primary/60">
                <div className="text-[10px] text-primary font-bold uppercase tracking-tighter">Skin Tone</div>
                <div className="text-lg font-mono text-white">#E2B49A</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fade & Divider */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background-dark to-transparent z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-30"></div>
      </section>

      {/* The Process Section */}
      <section className="py-24 relative bg-surface-card/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h2 className="text-primary text-sm font-bold uppercase tracking-[0.3em] mb-4">The Process</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Elegance Redefined by Data</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-card p-10 rounded-xl group hover:border-primary/50 transition-all duration-500">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary transition-colors">
                <span className="material-icons text-primary group-hover:text-black text-3xl">accessibility_new</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Digital Silhouette</h4>
              <p className="text-slate-400 leading-relaxed">
                Create your precise 3D body map in seconds using our patented volumetric scanning technology. Privacy guaranteed.
              </p>
              <div className="mt-8 flex items-center text-primary text-xs font-bold uppercase tracking-widest group-hover:text-primary-hover group-hover:gap-2 transition-all">
                Learn More <span className="material-icons text-sm">arrow_forward</span>
              </div>
            </div>
            <div className="glass-card p-10 rounded-xl group hover:border-primary/50 transition-all duration-500">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary transition-colors">
                <span className="material-icons text-primary group-hover:text-black text-3xl">psychology</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">AI Analysis</h4>
              <p className="text-slate-400 leading-relaxed">
                Our algorithm determines your skeletal proportions, muscle distribution, and seasonal color palette with great accuracy.
              </p>
              <div className="mt-8 flex items-center text-primary text-xs font-bold uppercase tracking-widest group-hover:text-primary-hover group-hover:gap-2 transition-all">
                Algorithm Details <span className="material-icons text-sm">arrow_forward</span>
              </div>
            </div>
            <div className="glass-card p-10 rounded-xl group hover:border-primary/50 transition-all duration-500">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-8 border border-primary/20 group-hover:bg-primary transition-colors">
                <span className="material-icons text-primary group-hover:text-black text-3xl">auto_fix_high</span>
              </div>
              <h4 className="text-2xl font-bold text-white mb-4">Curated Looks</h4>
              <p className="text-slate-400 leading-relaxed">
                Receive bespoke outfit recommendations tailored to your unique frame and upcoming social calendar effortlessly.
              </p>
              <div className="mt-8 flex items-center text-primary text-xs font-bold uppercase tracking-widest group-hover:text-primary-hover group-hover:gap-2 transition-all">
                View Sample Styles <span className="material-icons text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 overflow-hidden bg-background-dark">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="h-64 rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-colors">
                <img alt="Luxury Streetwear" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSmWxI1bFdio7vzvPb7u-ImJx14GHsWSps9_T4_92p84H7dKgCaVP8M8_5hPuakVNYGbkZAQCOhqVeY0c1keZXRrNzeNW616Tq9rUWdSATWZgfHprnx6lZwy4iBi20TK1_yIFJEjkGzaph__eAPu_XibXf_Q7F908Wf-dDfp5ZaV_pqk1I0dUncPiD4LO__gXp7ruIO74bb314LcfBqDc6PM4loNlZaigulvVmZyvlSt27m1tr5k4veyw85zPvdLMCOR90iWsOFAqR" />
              </div>
              <div className="h-80 rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-colors">
                <img alt="Modern Aesthetic" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtM0Hc907opYy74TqOjtlY1G_DdJtYjc_aF2pT8SCCx2V0BEFrqCCmVQoswlMmK4w_ahxTgoS5hlbc8g_8PEao3Hb-6RJSVRzuivh7a1rJB-0murNhqFi79G9yu0vX6XGYiky9HP2vSsAzbxnrS9NnBVpFAwVA8LM4ug3BBZGQw4bZovVLPLEbD3zHgjjDxx76AvIHCSAIq6K9Oo5ZGhlJ4bmGCMWt04xq1a0ipbd7yndACWq3sX_tQAFsRaY1sQgXLLzaikua7slR" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-80 rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-colors">
                <img alt="Digital Fashion" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1HYk25Uaczk5y75qCqAXfforEGDdf-9wsHnx1uzHYvkzslUAJ-lqWGCk2RT7F9XM8vyunMWx5lLvYXx-rNhb0BAzuk6L9lCkCQOjJa_eUGVmo8yiAKKdvY0JlOacr7NgUKHJwY_Q0Ff3sVGjCYIpDoYgRyKSVgaC9maXhjECftmPuWtTJgAaLXurHCYfWchKEFoKe7pdbocTitaDFA1e8qqbiu712bphs4ilQAIhr6UIgPzpTwEvjP6TGViIsLzfBY5enQ26uoCz9" />
              </div>
              <div className="h-64 rounded-xl overflow-hidden border border-white/5 hover:border-primary/30 transition-colors">
                <img alt="Classic Luxury" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDIWuYN6LF4H9f3Lp-rqJzNMURKRX8cMT3RamdrWkmxuW0yVaiRYmUZeC2dkBdv7T1TLSvqjIB2fb4VdZFp7fcRpMEcp9yu4QlpB_UiJyFt1HzHgtlpczqPLUhTdd0zvtsMOlBVKhJlMmsYlP0TUrSm_h0t-yP1fFO_PXdlk3YnmOVWs5X6X1dkalxLZEbmp6HPQopUobOWLpkEMxvZHQFZkmIS6H7Rhtyjf1hEM5dRw5Dp7JIiNEyhXS4g1KY6_FNks-JsYoSkHCGk" />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">The intersection of <span className="text-primary italic font-luxury">Couture</span> and <span className="text-primary-hover italic font-luxury">Computation</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              StyleSync isn't just an app; it's a digital atelier. We've partnered with the world's leading fashion houses to translate their design language into a data-driven experience that respects your individuality.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-4 text-white hover:text-primary-hover transition-colors">
                <span className="material-icons text-primary">check_circle</span>
                Real-time virtual try-on
              </li>
              <li className="flex items-center gap-4 text-white hover:text-primary-hover transition-colors">
                <span className="material-icons text-primary">check_circle</span>
                Sustainable wardrobe optimization
              </li>
              <li className="flex items-center gap-4 text-white hover:text-primary-hover transition-colors">
                <span className="material-icons text-primary">check_circle</span>
                Exclusive early access to drops
              </li>
            </ul>
            <div className="pt-4">
              <Link to="/recommendations" className="border-b-2 border-primary text-primary font-bold pb-2 hover:pb-4 hover:text-primary-hover hover:border-primary-hover transition-all tracking-[0.2em] uppercase">
                Experience the Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Removed (Using Global Footer) */}
    </div>
  );
}
