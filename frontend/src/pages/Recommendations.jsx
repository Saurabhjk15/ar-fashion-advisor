import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

export default function Recommendations() {
    const location = useLocation();
    const navigate = useNavigate();

    const { bodyType = 'rectangle', skinTone = 'medium', occasion = 'casual' } = location.state || {};

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterCategory, setFilterCategory] = useState('all');

    const [savedIds, setSavedIds] = useState(new Set());

    // Custom Outfit State
    const [showUploadModal, setShowUploadModal] = useState(false);
    const [customOutfit, setCustomOutfit] = useState({
        image: null,
        preview: null,
        name: '',
        category: 'top',
        description: ''
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCustomOutfit(prev => ({ ...prev, image: file, preview: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCustomTryOn = () => {
        if (!customOutfit.preview) return;
        const product = {
            _id: 'custom-' + Date.now(),
            name: customOutfit.name || 'Custom Piece',
            category: customOutfit.category,
            imageUrl: customOutfit.preview,
            price: { amount: 0 },
            description: customOutfit.description || 'User uploaded item',
            isCustom: true
        };
        navigate('/ar-tryon', { state: { product, bodyType, skinTone, occasion } });
    };

    const categories = [
        { id: 'all', label: 'All', icon: 'auto_awesome' },
        { id: 'top', label: 'Tops', icon: 'checkroom' },
        { id: 'bottom', label: 'Bottoms', icon: 'trousers' },
        { id: 'dress', label: 'Dresses', icon: 'woman' },
        { id: 'outerwear', label: 'Outerwear', icon: 'iron' },
        { id: 'accessory', label: 'Accessories', icon: 'diamond' },
    ];

    useEffect(() => {
        fetchRecommendations();
        loadSavedOutfits();
    }, [bodyType, skinTone, occasion]);

    const fetchRecommendations = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({ bodyType, skinTone, occasion });
            const response = await api.get(`/products/recommend?${params}`);
            if (response.data.success) {
                setProducts(response.data.data);
            }
        } catch (err) {
            console.warn('API unavailable, using demo data');
            setProducts(getDemoProducts(bodyType, skinTone, occasion));
        } finally {
            setLoading(false);
        }
    };

    const loadSavedOutfits = () => {
        try {
            const saved = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
            setSavedIds(new Set(saved.map(o => o._id || o.name)));
        } catch { }
    };

    const { isAuthenticated } = useSelector((state) => state.auth);

    const toggleSave = (product) => {
        if (!isAuthenticated) {
            navigate('/login', { state: { from: location } });
            return;
        }

        const saved = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
        const id = product._id || product.name;
        if (savedIds.has(id)) {
            const filtered = saved.filter(o => (o._id || o.name) !== id);
            localStorage.setItem('savedOutfits', JSON.stringify(filtered));
            setSavedIds(prev => { const n = new Set(prev); n.delete(id); return n; });
            toast.success('Removed from Wardrobe');
        } else {
            saved.push(product);
            localStorage.setItem('savedOutfits', JSON.stringify(saved));
            setSavedIds(prev => new Set(prev).add(id));
            toast.success('Added to Wardrobe', {
                style: {
                    background: '#1a1a1a',
                    color: '#d4af37',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                },
                iconTheme: {
                    primary: '#d4af37',
                    secondary: '#000',
                },
            });
        }
    };

    const filteredProducts = filterCategory === 'all'
        ? products
        : products.filter(p => p.category === filterCategory);

    return (
        <div className="min-h-screen bg-background-dark font-display text-slate-100">
            <main className="max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-12 lg:pt-40 lg:pb-16">
                {/* Header */}
                <header className="mb-12 lg:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="h-px w-10 bg-primary"></span>
                            <span className="text-primary uppercase tracking-[0.3em] text-[10px] font-bold">The Luxury Edit</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white">
                            Styles for <span className="text-primary font-medium capitalize">{bodyType} • {occasion}</span>
                        </h1>
                        <p className="text-slate-400 mt-6 max-w-2xl font-light leading-relaxed">
                            Elevated selections curated by our proprietary AI, synthesized with your silhouette geometry ({bodyType}) and {occasion} environment standards.
                        </p>
                    </div>
                </header>

                {/* Filters */}
                <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                        <div className="flex bg-surface-card border border-white/5 rounded-full p-1 w-fit">
                            {categories.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setFilterCategory(cat.id)}
                                    className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap ${filterCategory === cat.id ? 'bg-primary text-black shadow-gold' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
                                >
                                    <span className="mr-2 hidden sm:inline">{cat.icon === 'trousers' ? '👖' : cat.id === 'all' ? '✨' : cat.id === 'top' ? '👕' : cat.id === 'dress' ? '👗' : cat.id === 'outerwear' ? '🧥' : '💎'}</span>
                                    {cat.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={() => setShowUploadModal(true)}
                        className="bg-white/5 border border-primary/30 text-primary hover:bg-primary hover:text-black px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all shadow-lg flex items-center gap-2 shrink-0 md:ml-auto"
                    >
                        <span className="material-icons text-sm">add_a_photo</span>
                        Add Your Own
                    </button>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
                        <p className="text-slate-400 tracking-widest uppercase text-xs">Curating your collection...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-20">
                        <span className="material-icons text-6xl text-slate-700 mb-6">search_off</span>
                        <h3 className="text-xl font-bold mb-2">No styles found in this category</h3>
                        <button onClick={() => setFilterCategory('all')} className="text-primary text-xs uppercase tracking-widest underline">Reset Filters</button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                        {filteredProducts.map((product, idx) => (
                            <div key={product._id || idx} className="group relative bg-surface-card rounded-xl overflow-hidden border border-primary/20 flex flex-col transition-all duration-700 hover:shadow-2xl hover:shadow-black/50">
                                <div className="relative h-[30rem] overflow-hidden">
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                        onError={(e) => e.target.src = 'https://via.placeholder.com/600x800?text=StyleSync+Image'}
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-primary text-black px-4 py-1.5 rounded-full text-[10px] font-black tracking-tighter flex items-center gap-1.5 shadow-xl">
                                            <span className="material-icons text-xs">auto_awesome</span>
                                            {product.matchPercentage || '95'}% MATCH
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => toggleSave(product)}
                                        className={`absolute top-6 right-6 w-11 h-11 rounded-full backdrop-blur-md flex items-center justify-center transition-colors ${savedIds.has(product._id || product.name) ? 'bg-primary text-black' : 'bg-black/60 text-white hover:text-primary'}`}
                                    >
                                        <span className="material-icons text-xl">{savedIds.has(product._id || product.name) ? 'favorite' : 'favorite_border'}</span>
                                    </button>
                                </div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <p className="text-primary text-[10px] uppercase tracking-[0.2em] font-bold mb-1">StyleSync Selection</p>
                                            <h3 className="text-2xl font-medium tracking-tight text-white mb-2 line-clamp-1">{product.name}</h3>
                                        </div>
                                        <span className="text-xl font-light text-primary whitespace-nowrap">${product.price?.amount || product.price || '—'}</span>
                                    </div>
                                    <div className="mt-6 p-4 rounded-lg bg-black/40 border border-white/5">
                                        <p className="text-[10px] text-primary uppercase tracking-widest font-bold flex items-center gap-2 mb-2">
                                            <span className="material-icons text-[16px]">psychology</span> AI Insight
                                        </p>
                                        <p className="text-sm text-slate-400 leading-relaxed font-light italic line-clamp-3">
                                            {product.description}
                                        </p>
                                    </div>
                                    <div className="mt-auto pt-8">
                                        <button
                                            onClick={() => {
                                                if (!isAuthenticated) {
                                                    navigate('/login', { state: { from: location } });
                                                } else {
                                                    navigate('/ar-tryon', { state: { product, bodyType, skinTone, occasion } });
                                                }
                                            }}
                                            className="w-full bg-transparent border border-primary text-primary py-4 rounded-lg font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-primary hover:text-black transition-all duration-300 flex items-center justify-center gap-3"
                                        >
                                            <span className="material-icons text-lg">view_in_ar</span> Virtual Try On
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>


            {/* Upload Modal */}
            {showUploadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className="bg-[#1a1a1a] border border-primary/20 rounded-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center">
                            <h3 className="text-xl font-serif text-[#C6A75E]">Add Custom Piece</h3>
                            <button onClick={() => setShowUploadModal(false)} className="text-white/50 hover:text-white">
                                <span className="material-icons">close</span>
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto space-y-6">
                            {/* Image Upload */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-slate-400">Garment Photo</label>
                                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 flex flex-col items-center justify-center bg-white/5 hover:border-primary/50 transition-colors relative group">
                                    {customOutfit.preview ? (
                                        <img src={customOutfit.preview} alt="Preview" className="h-48 object-contain" />
                                    ) : (
                                        <>
                                            <span className="material-icons text-4xl text-white/20 group-hover:text-primary/50 mb-2">cloud_upload</span>
                                            <span className="text-xs text-slate-500">Click to upload image</span>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-slate-400">Name</label>
                                    <input
                                        type="text"
                                        value={customOutfit.name}
                                        onChange={e => setCustomOutfit(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="e.g. My Blue Shirt"
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-primary font-bold">Category *</label>
                                    <select
                                        value={customOutfit.category}
                                        onChange={e => setCustomOutfit(prev => ({ ...prev, category: e.target.value }))}
                                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all appearance-none"
                                    >
                                        <option value="top">Top / Shirt</option>
                                        <option value="bottom">Bottom / Pants</option>
                                        <option value="dress">Dress</option>
                                        <option value="outerwear">Outerwear / Jacket</option>
                                    </select>
                                    <p className="text-[9px] text-slate-500">Crucial for AR placement stability.</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest text-slate-400">Notes (Optional)</label>
                                <textarea
                                    value={customOutfit.description}
                                    onChange={e => setCustomOutfit(prev => ({ ...prev, description: e.target.value }))}
                                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-primary/50 outline-none transition-all h-20 resize-none"
                                />
                            </div>
                        </div>

                        <div className="p-6 border-t border-white/5 bg-black/20">
                            <button
                                onClick={handleCustomTryOn}
                                disabled={!customOutfit.preview}
                                className="w-full bg-primary text-black font-bold py-4 rounded-lg uppercase tracking-[0.2em] text-xs hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-gold"
                            >
                                Visualize in AR
                            </button>
                        </div>
                    </div>
                </div>
            )}



        </div>
    );
}

// Demo products used when backend/DB not available
function getDemoProducts(bodyType, skinTone, occasion) {
    const allProducts = [
        {
            _id: 'd1', name: 'Classic White Button-Down', category: 'top',
            imageUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400',
            bodyTypes: ['rectangle', 'hourglass', 'inverted-triangle'],
            skinTones: ['fair', 'light', 'medium', 'olive', 'brown', 'dark'],
            occasions: ['formal', 'office', 'casual', 'date'],
            style: 'classic', description: 'Timeless white shirt for any occasion. Sharp collar detailing frames the face while the structured cotton maintains a crisp professional silhouette throughout the day.',
            price: { amount: 39.99 },
        },
        {
            _id: 'd2', name: 'Navy V-Neck Blouse', category: 'top',
            imageUrl: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400',
            bodyTypes: ['apple', 'pear', 'hourglass'],
            skinTones: ['fair', 'light', 'medium'],
            occasions: ['office', 'casual', 'date'],
            style: 'classic', description: 'V-neck elongates the torso and draws the eye vertically. The fluid fabric drapes elegantly over curves without clinging, offering both comfort and sophistication.',
            price: { amount: 34.99 },
        },
        {
            _id: 'd3', name: 'Emerald Wrap Dress', category: 'dress',
            imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400',
            bodyTypes: ['hourglass', 'pear', 'apple'],
            skinTones: ['medium', 'olive', 'brown', 'dark'],
            occasions: ['date', 'party', 'wedding', 'office'],
            style: 'classic', description: 'Universally flattering wrap silhouette accentuates the waist. The deep emerald hue provides a regal contrast to warmer skin tones, perfect for evening events.',
            price: { amount: 64.99 },
        },
        {
            _id: 'd4', name: 'High-Waist Wide Leg Trousers', category: 'bottom',
            imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
            bodyTypes: ['pear', 'hourglass', 'apple'],
            skinTones: ['fair', 'light', 'medium', 'olive', 'brown', 'dark'],
            occasions: ['office', 'formal', 'casual'],
            style: 'classic', description: 'High waist elongates the legs while the wide cut creates a balanced, statuesque silhouette. Pair with tucked-in tops to emphasize the waistline.',
            price: { amount: 49.99 },
        },
        {
            _id: 'd5', name: 'Dark Slim-Fit Jeans', category: 'bottom',
            imageUrl: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
            bodyTypes: ['rectangle', 'hourglass', 'inverted-triangle'],
            skinTones: ['fair', 'light', 'medium', 'olive', 'brown', 'dark'],
            occasions: ['casual', 'date', 'party'],
            style: 'casual', description: 'A versatile staple, these dark wash jeans offer a sleek, streamlined look. The stretch denim conforms to your shape while maintaining structure.',
            price: { amount: 54.99 },
        },
        {
            _id: 'd6', name: 'Structured Charcoal Blazer', category: 'outerwear',
            imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
            bodyTypes: ['rectangle', 'pear', 'apple'],
            skinTones: ['fair', 'light', 'medium', 'olive', 'brown', 'dark'],
            occasions: ['formal', 'office', 'date'],
            style: 'formal', description: 'Adds immediate authority and definition. The structured shoulders balance hip width, creating a powerful inverted triangle visual.',
            price: { amount: 89.99 },
        },
        {
            _id: 'd7', name: 'Black Leather Jacket', category: 'outerwear',
            imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
            bodyTypes: ['rectangle', 'hourglass', 'inverted-triangle', 'pear', 'apple'],
            skinTones: ['fair', 'light', 'medium', 'olive', 'brown', 'dark'],
            occasions: ['casual', 'party', 'date'],
            style: 'streetwear', description: 'Universal statement piece that adds edge to any outfit. The cropped cut highlights the waist, making it perfect for layering over dresses.',
            price: { amount: 99.99 },
        },
        {
            _id: 'd8', name: 'Floral Maxi Dress', category: 'dress',
            imageUrl: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400',
            bodyTypes: ['pear', 'hourglass', 'rectangle'],
            skinTones: ['fair', 'light', 'medium'],
            occasions: ['casual', 'beach', 'date', 'wedding'],
            style: 'bohemian', description: 'Flowing romantic silhouette with a print that adds visual interest. The maxi length elongates the frame while offering breezy comfort.',
            price: { amount: 54.99 },
        },
        {
            _id: 'd9', name: 'Coral Peplum Top', category: 'top',
            imageUrl: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=400',
            bodyTypes: ['rectangle', 'inverted-triangle'],
            skinTones: ['medium', 'olive', 'brown'],
            occasions: ['casual', 'date', 'party'],
            style: 'trendy', description: 'Peplum flare creates the illusion of hips, balancing broader shoulders or a straighter waist. The coral hue adds vibrant energy.',
            price: { amount: 29.99 },
        },
        {
            _id: 'd10', name: 'Camel Trench Coat', category: 'outerwear',
            imageUrl: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400',
            bodyTypes: ['hourglass', 'rectangle', 'inverted-triangle'],
            skinTones: ['fair', 'light', 'medium', 'olive'],
            occasions: ['formal', 'office', 'casual'],
            style: 'classic', description: 'The belted waist creates an instant hourglass figure. A timeless investment piece that elevates even the simplest outfit.',
            price: { amount: 119.99 },
        },
        {
            _id: 'd11', name: 'Little Black Shift Dress', category: 'dress',
            imageUrl: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400',
            bodyTypes: ['rectangle', 'apple', 'inverted-triangle'],
            skinTones: ['fair', 'light', 'medium', 'olive', 'brown', 'dark'],
            occasions: ['party', 'formal', 'date', 'office'],
            style: 'classic', description: 'The ultimate LBD. Its shift silhouette skims over the body without clinging, offering sophisticated ease for any event.',
            price: { amount: 59.99 },
        },
        {
            _id: 'd12', name: 'Gold Statement Necklace', category: 'accessory',
            imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
            bodyTypes: ['rectangle', 'pear', 'apple', 'hourglass', 'inverted-triangle'],
            skinTones: ['medium', 'olive', 'brown', 'dark'],
            occasions: ['party', 'wedding', 'date', 'formal'],
            style: 'trendy', description: 'Draws attention upwards to the face. Gold tones beautifully complement warmer skin complexions and add a touch of luxury.',
            price: { amount: 29.99 },
        },
    ];

    // Score and filter logic
    return allProducts
        .filter(p => {
            if (!p.bodyTypes.includes(bodyType)) return false;
            if (occasion && !p.occasions.includes(occasion)) return false;
            return true;
        })
        .map(p => {
            let score = 1;
            let max = 1;
            if (skinTone) { max++; if (p.skinTones.includes(skinTone)) score++; }
            return { ...p, matchScore: score, maxScore: max, matchPercentage: Math.round((score / max) * 100) };
        })
        .sort((a, b) => b.matchPercentage - a.matchPercentage);
}
