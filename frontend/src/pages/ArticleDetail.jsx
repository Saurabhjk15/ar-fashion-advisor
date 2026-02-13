import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';

// Mock Data for Articles (Ideally this would come from an API/CMS)
const articles = {
    'evolution-smart-fabrics': {
        title: "The Evolution of Smart Fabrics",
        subtitle: "Innovation in textiles has transcended mere aesthetics.",
        author: "Elena Vance",
        date: "October 24, 2026",
        readTime: "12 Min Read",
        heroImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        content: [
            { type: 'paragraph', text: "Innovation in textiles has transcended mere aesthetics. We are entering an era where the fibers we wear are as computationally capable as the devices we carry. The fusion of nanotechnology and haute couture is not just a trend; it is the fundamental redefinition of our second skin.", dropCap: true },
            { type: 'paragraph', text: "StyleSync AI has tracked a 140% increase in the integration of conductive silver yarns within luxury knitwear over the past quarter. These aren't the rigid wearable tech prototypes of a decade ago. Today’s smart fabrics possess the drape of silk and the breathability of linen, while silently monitoring biometric data and responding to ambient environmental shifts." },
            { type: 'heading', text: "Computational Couture" },
            { type: 'quote', text: "\"The fabric of the future doesn't just cover the body; it understands it.\"" },
            { type: 'paragraph', text: "Consider the 'Liquid Light' series debuting in the upcoming Spring/Summer collections. Utilizing photo-reactive polymers, these garments shift opacity and color intensity based on the wearer's heart rate—a visual symphony of biological feedback and artistic expression." },
            { type: 'image', src: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5LGq8eHXpKkgI_AwOCV3G1Y5Yz90yPEjId75rzpAxD8dwEyY2ONO1veIpiSmUT1fuKl96QEKcuhHdvDZoCWnV-hV_N-S2maVxn8feNiWdw5oFCkXK3C4n-yKxG4oB9TdXyH0fa9J-S8s3JNKve6p9fnWr7v9LzqF3vv6I7J_1zFvl2KrvbNGlgjrvNUe1oSikOGebfDGBhtkou1yO1MunDtZdqseWR-dEhhzG_V3eKp4g_c0OwXtjJLNEKXozaU1UyGrIVcUNtoC1", alt: "Fabric Detail" },
            { type: 'paragraph', text: "Beyond the visual, the thermal properties of these textiles are revolutionary. Phase-change materials (PCMs) embedded within the micro-structure of the weave can absorb, store, and release heat, maintaining a constant micro-climate against the skin regardless of external temperature fluctuations." },
            { type: 'paragraph', text: "As we look toward 2027, the focus shifts toward sustainability. Bio-digital weaving techniques are allowing us to \"grow\" smart interfaces using mycelium and lab-grown silk, ensuring that the high-tech garments of tomorrow leave no trace on the planet of today." }
        ],
        stats: {
            adoption: "82%",
            durability: "9.4/10",
            prediction: "StyleSync AI predicts smart fabrics will become the standard for 70% of luxury outerwear by 2028."
        },
        related: [
            { id: 'structured-metallic-fibers', title: "Structured Metallic Fibers", category: "Innovation", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCTstN1WPxrN9uq8CJoMfJiY-p-Lib-oKefd4MgUhpao5LqDnzlk6Dr8ZboMfWsSsWJiB5K0J4KS_0o8hkAhkTGVNLgaS4JcNBlTJCrOvJhDqj-ma4ld7GT95UufYZdNbhchHj0QSsBmjXtH8eMJEdgwcdRKYQNyx7AtKfaqRI1kGaLf4wVbXQOP4YSxY4qhaQY2qReMalHDpkERAGyN0cGkAlasI90jOecInTZ-HsruE9n_dqf3DKBxJK9x4SLIw8K9swNoiQQXT0F" },
            { id: 'cryo-luxury-textures', title: "Cryo-Luxury Textures", category: "Seasonal", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKp8JByZlBi5B5sDl-_KKnFRkEIWwK-D8N2Ru6Hiy43TMEhZOkjCQJvsSKVNeDpe2eiWeMUOJMswx0OH5onpJswnpWpBDUVv80mBk8YGYbudi5xuG_ikHRdByTnULAYw5pvabdHpN28D9loOn7CuxsC9uRG4qWcF7TmF2ZO9O1qP4igb9gO6LCXbBZldKBghea4tm-PPF9YXSz0z8SQyljz8NSyPNdWz0UO-hAC9c35K3zTiYNELk46d0ISIUtyIJ5yZU3hjtj2U4o" }
        ]
    },
    'quiet-luxury-2026': {
        title: "Quiet Luxury in 2026",
        subtitle: "The art of understated elegance.",
        author: "Julian Thorne",
        date: "November 02, 2026",
        readTime: "8 Min Read",
        heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5LGq8eHXpKkgI_AwOCV3G1Y5Yz90yPEjId75rzpAxD8dwEyY2ONO1veIpiSmUT1fuKl96QEKcuhHdvDZoCWnV-hV_N-S2maVxn8feNiWdw5oFCkXK3C4n-yKxG4oB9TdXyH0fa9J-S8s3JNKve6p9fnWr7v9LzqF3vv6I7J_1zFvl2KrvbNGlgjrvNUe1oSikOGebfDGBhtkou1yO1MunDtZdqseWR-dEhhzG_V3eKp4g_c0OwXtjJLNEKXozaU1UyGrIVcUNtoC1",
        content: [
            { type: 'paragraph', text: "In a world of constant digital noise, silence is the new luxury. The trends for 2026 are moving away from logos and loud patterns towards impeccable tailoring and premium materials that speak for themselves.", dropCap: true },
            { type: 'heading', text: "The Return of Tailoring" },
            { type: 'paragraph', text: "We are seeing a resurgence of bespoke tailoring, but with a modern twist. The fits are looser, more relaxed, yet structured enough to command authority." }
        ],
        stats: {
            adoption: "65%",
            durability: "9.8/10",
            prediction: "Minimalist aesthetics will dominate 60% of high-end collections."
        },
        related: []
    },
    'bio-digital-weaving': {
        title: "Bio-Digital Weaving Techniques",
        subtitle: "Evaluating nature's code for sustainable luxury.",
        author: "Dr. Aris Thorne",
        date: "November 15, 2026",
        readTime: "10 Min Read",
        heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjb5ZfZc1DpRVRc74LCMdZsNTUJxBQVFbV1vomro4n0qDnnhB1utPZVvYP1m5afMTmLJwRva8KAeLC-XKZSuJb2QuVScTbpoDtLcEaWOStoo2DUdww5tW2wtjMciSkh00vl08WwKfqbS7l5QBAVHwomDKva3l6sg8d_ndHK0dtT9Nsx9OHwkHbRWoTE6P_5V03B-RHTAbeDymPewyPAhdzQnmjcJcwxsIYkz5oxgs8258g2MaqrP_b_JfpYPtpdxUcceiKoHJB759M",
        content: [
            { type: 'paragraph', text: "Nature has always been the ultimate designer. Now, with bio-digital interfaces, we are collaborating with biological systems to grow garments that breathe, adapt, and eventually return to the earth without a trace.", dropCap: true }
        ],
        stats: {
            adoption: "15%",
            durability: "7.2/10",
            prediction: "Bio-grown textiles will replace 30% of synthetic fibers by 2030."
        },
        related: []
    },
    'algorithm-derived-urbanism': {
        title: "Algorithm-Derived Urbanism",
        subtitle: "Street style designed by collective intelligence.",
        author: "Marcus Chen",
        date: "November 28, 2026",
        readTime: "9 Min Read",
        heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8JQDRiYp7MMMOXeZ-zLQYJw-OEzgTulGRb-g2Oe2SepUvZIT5SHhlZDQmbt6MTvG4Js2pmd_WeIzPZ5TbdIiV2nNzXQVFfvgSaF3UXlSir1hlO4lHAMJPPQ6veiCrnz31Cetpg37_D4It8rLgJTXGWjKtvNLv1kxdysBU_itzcc-YrGXLvOrGCkFa6Dh2Tl88yo3fhsO0KkbtLK8Gyy5tggA-7pXX-jlCIFqTadYY_DF6Gl2fFGb0KgrB1P6QTYo3kPMG6HbtIfY2",
        content: [
            { type: 'paragraph', text: "The streets have always been the runway. But what happens when the runway is generated by an algorithm trained on millions of street style images? We get a feedback loop of creativity that accelerates trend cycles to the speed of light.", dropCap: true }
        ],
        stats: {
            adoption: "95%",
            durability: "8.5/10",
            prediction: "AI-generated streetwear drops will outpace traditional release calendars by 400%."
        },
        related: []
    }
};

export default function ArticleDetail() {
    const { slug } = useParams();
    // Default content (The design provided)
    const defaultContent = articles['evolution-smart-fabrics'];

    // Get specific title if available, otherwise use default
    const currentTitle = articles[slug]?.title || defaultContent.title;

    // Merge: Use default content for everything BUT the title
    const article = { ...defaultContent, title: currentTitle };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    return (
        <div className="bg-background-dark text-slate-100 font-display min-h-screen">
            {/* Hero Section */}
            <header className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
                <img
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    src={article.heroImage}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
                <div className="relative container mx-auto px-8 max-w-5xl text-center pt-20">
                    <div className="mb-6 flex flex-col items-center gap-4">
                        <span className="text-primary tracking-[0.4em] text-[10px] font-bold uppercase py-1 px-3 border border-primary/30 rounded-full">Deep Dive</span>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold leading-[1.1] tracking-tight mb-8 text-white">
                            {article.title}
                        </h1>
                        <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-primary font-bold">
                            <span>By {article.author}</span>
                            <span className="w-1 h-1 bg-primary/40 rounded-full"></span>
                            <span className="text-slate-400">{article.date}</span>
                            <span className="w-1 h-1 bg-primary/40 rounded-full"></span>
                            <span className="text-slate-400">{article.readTime}</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-8 max-w-7xl py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Content */}
                    <article className="lg:col-span-8">
                        <div className="space-y-8 text-lg leading-relaxed text-slate-300 font-light">
                            {article.content.map((block, index) => {
                                if (block.type === 'paragraph') {
                                    return (
                                        <p key={index} className={block.dropCap ? "first-letter:text-6xl first-letter:font-serif first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:mt-2 first-letter:float-left first-letter:leading-none" : ""}>
                                            {block.text}
                                        </p>
                                    );
                                } else if (block.type === 'heading') {
                                    return (
                                        <h2 key={index} className="text-3xl font-serif text-white pt-8 pb-4">
                                            {block.text}
                                        </h2>
                                    );
                                } else if (block.type === 'quote') {
                                    return (
                                        <div key={index} className="my-12 border-l-2 border-primary pl-8 italic text-2xl font-serif text-white">
                                            {block.text}
                                        </div>
                                    );
                                } else if (block.type === 'image') {
                                    return (
                                        <img key={index} alt={block.alt} className="w-full h-[500px] object-cover rounded-sm my-16 border border-white/5" src={block.src} />
                                    );
                                }
                                return null;
                            })}
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        {/* AI Perspective Card */}
                        <div className="bg-surface-card/80 backdrop-blur-md border border-primary/15 p-8 rounded-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="material-icons text-primary">insights</span>
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white">AI Perspective</h3>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-500 mb-2">
                                        <span>Market Adoption</span>
                                        <span className="text-primary">{article.stats.adoption}</span>
                                    </div>
                                    <div className="w-full h-px bg-white/10 relative">
                                        <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: article.stats.adoption }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-500 mb-2">
                                        <span>Durability Index</span>
                                        <span className="text-primary">{article.stats.durability}</span>
                                    </div>
                                    <div className="w-full h-px bg-white/10 relative">
                                        <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: '94%' }}></div>
                                    </div>
                                </div>
                                <p className="text-xs text-slate-400 font-light leading-relaxed mt-4">
                                    {article.stats.prediction}
                                </p>
                            </div>
                        </div>

                        {/* Related Trends */}
                        {article.related.length > 0 && (
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-white mb-8">Related Trends</h3>
                                <div className="space-y-6">
                                    {article.related.map((item, idx) => (
                                        <Link key={idx} to="#" className="group flex gap-4 items-center">
                                            <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-sm border border-white/10">
                                                <img alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={item.image} />
                                            </div>
                                            <div>
                                                <span className="text-[9px] text-primary uppercase font-bold tracking-widest">{item.category}</span>
                                                <h4 className="text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors text-white">{item.title}</h4>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </main>

            {/* Bottom CTA */}
            <section className="py-32 text-center bg-background-dark border-t border-white/5">
                <div className="max-w-2xl mx-auto px-8">
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-8 italic">Your Digital Double</h2>
                    <p className="text-slate-400 font-light mb-12">
                        Experience the precision of StyleSync. Our proprietary body scan technology creates a 1:1 digital twin to test the latest in smart fabric innovations.
                    </p>
                    <Link to="/body-scan" className="bg-primary text-background-dark font-bold uppercase tracking-[0.3em] px-14 py-6 text-xs hover:bg-white hover:scale-105 transition-all shadow-xl shadow-primary/10 inline-block">
                        Start Body Scan
                    </Link>
                    <div className="mt-8 flex items-center justify-center gap-4 text-[9px] uppercase tracking-widest text-slate-600 font-bold">
                        <span className="material-icons text-sm">lock</span>
                        <span>Secure Biometric Analysis</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
