import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function SavedOutfits() {
    const navigate = useNavigate();
    const [savedOutfits, setSavedOutfits] = useState([]);

    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            loadSaved();
        } else {
            setSavedOutfits([]); // Hide items if not logged in
        }
    }, [isAuthenticated]);

    const loadSaved = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
            setSavedOutfits(saved);
        } catch {
            setSavedOutfits([]);
        }
    };

    const removeOutfit = (id) => {
        const filtered = savedOutfits.filter(o => (o._id || o.name) !== id);
        localStorage.setItem('savedOutfits', JSON.stringify(filtered));
        setSavedOutfits(filtered);
    };

    const clearAll = () => {
        localStorage.setItem('savedOutfits', JSON.stringify([]));
        setSavedOutfits([]);
    };

    // Calculate total worth (mock logic if needed)
    const totalWorth = savedOutfits.reduce((acc, item) => {
        const price = parseFloat(item.price?.amount || item.price || 0);
        return acc + (isNaN(price) ? 0 : price);
    }, 0).toFixed(2);

    return (
        <div className="min-h-screen bg-background-dark font-display text-slate-100">
            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-12 lg:pt-40 lg:pb-16">

                {/* Header */}
                <header className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
                    <div>
                        <nav className="flex text-[10px] uppercase tracking-[0.3em] text-primary/60 mb-6 font-luxury">
                            <span>Account</span>
                            <span className="mx-3">/</span>
                            <span className="text-primary">Digital Closet</span>
                        </nav>
                        <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight uppercase">Your Closet</h1>
                        <p className="text-slate-500 max-w-xl text-sm leading-relaxed tracking-wide">
                            {isAuthenticated
                                ? "Curated ensembles synchronized with your unique body geometry and aesthetic DNA."
                                : "Sign in to view your curated ensembles and synchronized wardrobe."}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        {savedOutfits.length > 0 && isAuthenticated && (
                            <button
                                onClick={clearAll}
                                className="px-6 py-4 border border-white/10 text-white hover:border-red-500 hover:text-red-500 transition-all flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]"
                            >
                                <span className="material-icons text-sm">delete_outline</span> Clear
                            </button>
                        )}
                        <button
                            onClick={() => {
                                if (isAuthenticated) {
                                    navigate('/recommendations');
                                } else {
                                    navigate('/login', { state: { from: { pathname: '/saved-outfits' } } });
                                }
                            }}
                            className="px-8 py-4 bg-primary text-black hover:bg-white transition-all flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] shadow-gold"
                        >
                            <span className="material-icons text-sm">add</span> New Outfit
                        </button>
                    </div>
                </header>

                {/* Dashboard Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/5 mb-16 rounded-lg overflow-hidden">
                    <div className="bg-background-dark p-8">
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-2 font-luxury">Saved Looks</p>
                        <p className="text-4xl font-bold text-white">{savedOutfits.length}</p>
                    </div>
                    <div className="bg-background-dark p-8">
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-2 font-luxury">Style Score</p>
                        <p className="text-4xl font-bold text-primary">94%</p>
                    </div>
                    <div className="bg-background-dark p-8">
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-2 font-luxury">Seasonal Match</p>
                        <p className="text-4xl font-bold text-white uppercase tracking-tighter">Autumn</p>
                    </div>
                    <div className="bg-background-dark p-8">
                        <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mb-2 font-luxury">Closet Worth</p>
                        <p className="text-4xl font-bold text-primary">${totalWorth}</p>
                    </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {savedOutfits.length === 0 ? (
                        <div className="md:col-span-full group relative overflow-hidden border border-dashed border-primary/20 flex flex-col items-center justify-center p-20 text-center bg-surface-card/40 hover:border-primary/60 transition-colors rounded-xl">
                            <div className="mb-10 relative">
                                <div className="w-28 h-28 bg-primary/5 flex items-center justify-center mb-4 rounded-full">
                                    <span className="material-icons text-6xl text-primary/20">checkroom</span>
                                </div>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-widest font-luxury">Closet Empty</h4>
                            <p className="text-xs text-slate-500 mb-10 max-w-[220px] mx-auto leading-relaxed tracking-wide uppercase">
                                Sync your digital silhouette to unlock AI-personalized fit architectural recommendations.
                            </p>
                            <Link to="/body-scan" className="px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary transition-all">
                                Initialize Body Scan
                            </Link>
                        </div>
                    ) : (
                        savedOutfits.map((outfit, idx) => (
                            <div key={outfit._id || idx} className="group relative bg-surface-card rounded-xl overflow-hidden border border-white/5 transition-all duration-500 hover:border-primary/50 hover:shadow-2xl">
                                <div className="aspect-[3/4] overflow-hidden relative">
                                    <img
                                        src={outfit.imageUrl}
                                        alt={outfit.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=StyleSync'; }}
                                    />
                                    <div className="absolute top-6 left-6 bg-black/90 backdrop-blur-md px-4 py-1.5 border border-primary/40 rounded-full">
                                        <span className="text-[9px] text-primary uppercase tracking-[0.2em] font-bold font-luxury capitalize">{outfit.category}</span>
                                    </div>

                                    {/* Hover Actions Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center gap-6 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-[4px]">
                                        <button
                                            onClick={() => navigate('/ar-tryon', { state: { product: outfit } })}
                                            className="w-14 h-14 bg-primary text-black flex items-center justify-center hover:bg-white transition-colors rounded-full"
                                            title="Virtual Try-On"
                                        >
                                            <span className="material-icons">view_in_ar</span>
                                        </button>
                                        <button
                                            onClick={() => removeOutfit(outfit._id || outfit.name)}
                                            className="w-14 h-14 bg-white text-black flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors rounded-full"
                                            title="Remove from Closet"
                                        >
                                            <span className="material-icons">delete_outline</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-white tracking-tight uppercase mb-1 line-clamp-1">{outfit.name}</h3>
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-luxury">Added Recently</p>
                                        </div>
                                        <span className="text-primary font-light">${outfit.price?.amount || outfit.price || '—'}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => navigate('/ar-tryon', { state: { product: outfit } })}
                                            className="py-3.5 bg-transparent border border-primary/30 text-primary text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-primary/10 transition-all"
                                        >
                                            Try On
                                        </button>
                                        <button className="py-3.5 bg-primary border border-primary text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:border-white transition-all">
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
