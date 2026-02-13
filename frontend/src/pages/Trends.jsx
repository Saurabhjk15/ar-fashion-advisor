import { Link } from 'react-router-dom';

export default function Trends() {
    return (
        <div className="bg-background-dark text-slate-100 font-display min-h-screen">
            {/* Hero Section */}
            <header className="relative w-full h-[70vh] flex items-center overflow-hidden">
                <img
                    alt="Hero Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6zP1WnvWEN8w8RP68R7ZJkir37mpAQHQvJSM06GM6-3DgA3tgZZPgeFKYtDU22aj10DPfiPMfTcX68hoON3FtGZMrYCu2O9x9N5cVzi7Nj4J6Whw_nZ6fB1117zgW4S5HIdfSbliulxespqPNpr-YY6J09EfSg1WtFaI2I-PHeLmhZ41efiFCsEYUobt3W6gYKHKkVGZPCO2Fox_xdo-k9u-by2XVp92zRoWDlOWKTwpfp0UvRxQw0z-DugEGMQQQSrB7hVfMY8jK"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/60 to-transparent"></div>
                <div className="relative container mx-auto px-8 max-w-7xl pt-20"> {/* added pt-20 for navbar offset */}
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="h-px w-8 bg-primary"></span>
                            <span className="text-primary tracking-[0.3em] text-xs font-bold uppercase">AI Forecast 2026</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-extrabold leading-[0.9] tracking-tighter mb-6 uppercase font-luxury text-white">
                            Fashion <br /> <span className="text-primary/90">Trends</span> 2026
                        </h1>
                        <p className="text-lg text-slate-400 max-w-md font-light leading-relaxed">
                            The Future of Silhouettes curated by StyleSync AI. Discover the intersection of computational precision and artisanal luxury.
                        </p>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-8 max-w-7xl py-20 divide-y divide-primary/10">
                {/* AI Insights Dashboard */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-0 border border-primary/10 rounded-xl overflow-hidden mb-24 bg-surface-card/40">
                    <div className="p-8 border-r border-primary/10 flex flex-col justify-center">
                        <span className="text-primary font-bold text-3xl mb-1">68%</span>
                        <p className="text-xs uppercase tracking-widest text-slate-500 font-medium leading-tight">Hourglass profiles <br /> prefer tailored waists</p>
                    </div>
                    <div className="p-8 border-r border-primary/10 flex flex-col justify-center">
                        <span className="text-white font-bold text-3xl mb-1">+42%</span>
                        <p className="text-xs uppercase tracking-widest text-slate-500 font-medium leading-tight">Sustainability <br /> Score Increase</p>
                    </div>
                    <div className="p-8 border-r border-primary/10 flex flex-col justify-center">
                        <span className="text-primary font-bold text-3xl mb-1">2.4s</span>
                        <p className="text-xs uppercase tracking-widest text-slate-500 font-medium leading-tight">Average <br /> Style Recognition</p>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                        <span className="text-white font-bold text-3xl mb-1">9.8/10</span>
                        <p className="text-xs uppercase tracking-widest text-slate-500 font-medium leading-tight">Match Accuracy <br /> Precision Rating</p>
                    </div>
                </section>

                {/* Featured Section */}
                <section className="py-24">
                    <div className="flex items-end justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold uppercase tracking-tight text-white font-luxury">Featured Highlight</h2>
                            <div className="h-1 w-12 bg-primary mt-2"></div>
                        </div>
                    </div>
                    <div className="group relative bg-surface-card rounded-xl overflow-hidden border border-white/5 hover:shadow-[0_0_30px_rgba(198,167,94,0.15)] transition-all duration-500">
                        <div className="flex flex-col md:flex-row">
                            <div className="md:w-1/2 h-[400px] overflow-hidden">
                                <img
                                    alt="Structured Blazers"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTstN1WPxrN9uq8CJoMfJiY-p-Lib-oKefd4MgUhpao5LqDnzlk6Dr8ZboMfWsSsWJiB5K0J4KS_0o8hkAhkTGVNLgaS4JcNBlTJCrOvJhDqj-ma4ld7GT95UufYZdNbhchHj0QSsBmjXtH8eMJEdgwcdRKYQNyx7AtKfaqRI1kGaLf4wVbXQOP4YSxY4qhaQY2qReMalHDpkERAGyN0cGkAlasI90jOecInTZ-HsruE9n_dqf3DKBxJK9x4SLIw8K9swNoiQQXT0F"
                                />
                            </div>
                            <div className="md:w-1/2 p-12 flex flex-col justify-center relative">
                                <div className="absolute top-8 right-8 px-3 py-1 bg-primary text-background-dark text-[10px] font-black uppercase tracking-widest rounded-full">
                                    AI Analyzed
                                </div>
                                <h3 className="text-4xl font-bold mb-4 uppercase tracking-tighter text-white font-luxury">Structured Blazers</h3>
                                <p className="text-slate-400 mb-8 font-light leading-relaxed">
                                    A resurgence of sharp architectural lapels and metallic weave fibers. Our AI predicts a massive shift towards exaggerated shoulders as a symbol of digital empowerment in physical spaces.
                                </p>
                                <div className="flex gap-4">
                                    <Link to="/saved-outfits" className="border border-white/10 px-6 py-3 rounded text-xs font-bold uppercase tracking-widest hover:border-primary transition-colors text-white">
                                        View Gallery
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Categories Grid */}
                <section className="py-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Seasonal */}
                        <div className="relative group aspect-[4/5] rounded-xl overflow-hidden border border-white/5 hover:shadow-[0_0_20px_rgba(198,167,94,0.15)] transition-all duration-500">
                            <img
                                alt="Seasonal Trends"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKp8JByZlBi5B5sDl-_KKnFRkEIWwK-D8N2Ru6Hiy43TMEhZOkjCQJvsSKVNeDpe2eiWeMUOJMswx0OH5onpJswnpWpBDUVv80mBk8YGYbudi5xuG_ikHRdByTnULAYw5pvabdHpN28D9loOn7CuxsC9uRG4qWcF7TmF2ZO9O1qP4igb9gO6LCXbBZldKBghea4tm-PPF9YXSz0z8SQyljz8NSyPNdWz0UO-hAC9c35K3zTiYNELk46d0ISIUtyIJ5yZU3hjtj2U4o"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">Curation 01</span>
                                <h4 className="text-2xl font-bold uppercase tracking-tight text-white font-luxury">Seasonal Echoes</h4>
                                <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 pt-4">
                                    <Link to="/recommendations" className="text-xs font-bold uppercase tracking-widest border-b border-primary text-primary cursor-pointer">View Collection</Link>
                                </div>
                            </div>
                        </div>
                        {/* Body Type */}
                        <div className="relative group aspect-[4/5] rounded-xl overflow-hidden border border-white/5 hover:shadow-[0_0_20px_rgba(198,167,94,0.15)] transition-all duration-500">
                            <img
                                alt="Body Type Trends"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8f0Kh3oGvX95NgrEyFimzQoZRZ8HuJH7DwVr7p8AFO5QSTYuqyDG-y023CZINxNVNQhveYxDLYQrvSM3NN1yFj8tkHnjkWbbQw6KwK0lIbKDVHni73a9B-pwUWKL9ZH3Bn2m1eYnmKx_1eUCOyLTOZeudMoR1UoY2YOeJfLW8X8YJwq1qtfydwnK74rBYSkiVbonc_9tYsQp8RQ77axNN_i0zbhPfgpj-1DVrD06jIQXIYeGZIt9sRbebD-0FOW22OPzUwW3OfTQJ"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">Curation 02</span>
                                <h4 className="text-2xl font-bold uppercase tracking-tight text-white font-luxury">Anatomical Fit</h4>
                                <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 pt-4">
                                    <Link to="/ar-tryon" className="text-xs font-bold uppercase tracking-widest border-b border-primary text-primary cursor-pointer">Personalize View</Link>
                                </div>
                            </div>
                        </div>
                        {/* Color */}
                        <div className="relative group aspect-[4/5] rounded-xl overflow-hidden border border-white/5 hover:shadow-[0_0_20px_rgba(198,167,94,0.15)] transition-all duration-500">
                            <img
                                alt="Color Trends"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcP7GOZB6GuDBruuMkM6064cKpEWyfpIboZ7556E9bBdP0SKooJBj7qZW2L2ETXV_fPu6PfpEM7b4gaas_Pf0a6Bc6rhQVVQKpowiUOb0QU0KD9s3d7nC5B5KPoo0VZHctHyse3kmt2fT8nMNfBHZiESBkDX0gVmkz19qppTqNXcerwZEEtt4Fjj0fYj3na0Kz89B58WoLthOMazxzXegl9lZYptkvJZVLIXoWBEAHldJphXnGHkHedM0cUvUK8-Iv4OTezq3YqxPb"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8">
                                <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] mb-2 block">Curation 03</span>
                                <h4 className="text-2xl font-bold uppercase tracking-tight text-white font-luxury">Chromatic Shift</h4>
                                <div className="h-0 group-hover:h-12 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100 pt-4">
                                    <Link to="/trends/evolution-smart-fabrics" className="text-xs font-bold uppercase tracking-widest border-b border-primary text-primary cursor-pointer">Discover Palettes</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Articles Grid */}
                <section className="py-24">
                    <div className="flex items-center justify-between mb-12">
                        <h2 className="text-2xl font-bold uppercase tracking-widest text-white font-luxury">Deep Dives</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Article 1 */}
                        <article className="flex flex-col group">
                            <div className="aspect-video mb-6 overflow-hidden rounded-lg bg-surface-card border border-white/5">
                                <img
                                    alt="Cyber Chic"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAxm72_13ctr3flTpgerlUULsUNIKqll1UCL5xFuGiopq2mVf3cPtGT8P7zAP51HvM9XIpIe-xv7lhNhJ4EjaxZm7Fq-y6vjcyDhYa1GxWGkHsO7LiCybFUB_gOfEPvn2TBHXC2AmAhDFyPoa3nalHL3Xl3k8wZx6A32zFk8rJCg-ZZtgGv2L4SAfxSOWKjm976wgMX8aCtevGISAGy6An6uC0YjQlo-ptU5_rPWCI8C4jy_tyDix84Wu8czn0Cmfqg9_EQLHjJ0M3"
                                />
                            </div>
                            <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-2">Technology</span>
                            <h5 className="text-lg font-bold mb-4 leading-tight uppercase text-white group-hover:text-primary transition-colors">The Evolution of Smart Fabrics</h5>
                            <Link to="/trends/evolution-smart-fabrics" className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 border-primary/20 group-hover:border-primary pb-1 self-start transition-all cursor-pointer">Read More</Link>
                        </article>
                        {/* Article 2 */}
                        <article className="flex flex-col group">
                            <div className="aspect-video mb-6 overflow-hidden rounded-lg bg-surface-card border border-white/5">
                                <img
                                    alt="Luxury Minimalism"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5LGq8eHXpKkgI_AwOCV3G1Y5Yz90yPEjId75rzpAxD8dwEyY2ONO1veIpiSmUT1fuKl96QEKcuhHdvDZoCWnV-hV_N-S2maVxn8feNiWdw5oFCkXK3C4n-yKxG4oB9TdXyH0fa9J-S8s3JNKve6p9fnWr7v9LzqF3vv6I7J_1zFvl2KrvbNGlgjrvNUe1oSikOGebfDGBhtkou1yO1MunDtZdqseWR-dEhhzG_V3eKp4g_c0OwXtjJLNEKXozaU1UyGrIVcUNtoC1"
                                />
                            </div>
                            <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-2">Editorial</span>
                            <h5 className="text-lg font-bold mb-4 leading-tight uppercase text-white group-hover:text-primary transition-colors">Quiet Luxury in 2026</h5>
                            <Link to="/trends/quiet-luxury-2026" className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 border-primary/20 group-hover:border-primary pb-1 self-start transition-all cursor-pointer">Read More</Link>
                        </article>
                        {/* Article 3 */}
                        <article className="flex flex-col group">
                            <div className="aspect-video mb-6 overflow-hidden rounded-lg bg-surface-card border border-white/5">
                                <img
                                    alt="Sustainable Future"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjb5ZfZc1DpRVRc74LCMdZsNTUJxBQVFbV1vomro4n0qDnnhB1utPZVvYP1m5afMTmLJwRva8KAeLC-XKZSuJb2QuVScTbpoDtLcEaWOStoo2DUdww5tW2wtjMciSkh00vl08WwKfqbS7l5QBAVHwomDKva3l6sg8d_ndHK0dtT9Nsx9OHwkHbRWoTE6P_5V03B-RHTAbeDymPewyPAhdzQnmjcJcwxsIYkz5oxgs8258g2MaqrP_b_JfpYPtpdxUcceiKoHJB759M"
                                />
                            </div>
                            <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-2">Environment</span>
                            <h5 className="text-lg font-bold mb-4 leading-tight uppercase text-white group-hover:text-primary transition-colors">Bio-Digital Weaving Techniques</h5>
                            <Link to="/trends/bio-digital-weaving" className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 border-primary/20 group-hover:border-primary pb-1 self-start transition-all cursor-pointer">Read More</Link>
                        </article>
                        {/* Article 4 */}
                        <article className="flex flex-col group">
                            <div className="aspect-video mb-6 overflow-hidden rounded-lg bg-surface-card border border-white/5">
                                <img
                                    alt="Streetstyle AI"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8JQDRiYp7MMMOXeZ-zLQYJw-OEzgTulGRb-g2Oe2SepUvZIT5SHhlZDQmbt6MTvG4Js2pmd_WeIzPZ5TbdIiV2nNzXQVFfvgSaF3UXlSir1hlO4lHAMJPPQ6veiCrnz31Cetpg37_D4It8rLgJTXGWjKtvNLv1kxdysBU_itzcc-YrGXLvOrGCkFa6Dh2Tl88yo3fhsO0KkbtLK8Gyy5tggA-7pXX-jlCIFqTadYY_DF6Gl2fFGb0KgrB1P6QTYo3kPMG6HbtIfY2"
                                />
                            </div>
                            <span className="text-primary text-[10px] font-black uppercase tracking-widest mb-2">Street Culture</span>
                            <h5 className="text-lg font-bold mb-4 leading-tight uppercase text-white group-hover:text-primary transition-colors">Algorithm-Derived Urbanism</h5>
                            <Link to="/trends/algorithm-derived-urbanism" className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] border-b-2 border-primary/20 group-hover:border-primary pb-1 self-start transition-all cursor-pointer">Read More</Link>
                        </article>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-24 border-t border-primary/10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tighter text-white font-luxury">Your Perfect Fit Awaits</h2>
                        <p className="text-slate-400 mb-10 font-light">
                            Join 50,000+ luxury enthusiasts using StyleSync to define their signature look with biological precision.
                        </p>
                        <Link to="/body-scan" className="bg-primary text-background-dark font-black uppercase tracking-[0.3em] px-12 py-5 rounded-full text-sm hover:bg-white hover:scale-105 transition-all shadow-2xl shadow-primary/20 inline-block">
                            Start Body Scan
                        </Link>
                        <p className="mt-6 text-[10px] uppercase tracking-widest text-slate-600 font-bold">Encrypted & Private Analysis</p>
                    </div>
                </section>
            </main>
        </div>
    );
}
