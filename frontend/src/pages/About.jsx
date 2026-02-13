import { Link } from 'react-router-dom';

export default function About() {
    return (
        <div className="bg-background-dark text-slate-100 font-display">
            {/* Hero Section */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        className="w-full h-full object-cover opacity-60 scale-105"
                        alt="Cinematic high-fashion model posing in elegant studio lighting"
                        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1887&auto=format&fit=crop"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0d]/40 to-[#0b0b0d]"></div>
                </div>
                <div className="relative z-10 text-center px-4 max-w-5xl pt-20">
                    <span className="text-primary font-bold tracking-[0.5em] uppercase text-sm mb-6 block">The Digital Renaissance</span>
                    <h1 className="text-6xl md:text-8xl font-extrabold text-white mb-8 tracking-tight leading-none font-luxury">
                        Where Fashion Meets <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#c6a65d] via-[#e5d1a1] to-[#c6a65d]">Intelligence</span>
                    </h1>
                    <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                        Redefining the boundaries of personal style through millimeter-accurate AI analysis and the artistry of high-fashion curation.
                    </p>
                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <Link to="/body-scan" className="bg-primary hover:bg-[#b09352] text-background-dark px-10 py-4 rounded-lg font-bold tracking-widest transition-all transform hover:scale-105">
                            START STYLE SCAN
                        </Link>
                        <Link to="/recommendations" className="text-white hover:text-primary px-10 py-4 rounded-lg font-bold tracking-widest flex items-center gap-2 group">
                            EXPLORE THE TECH
                            <span className="material-icons text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Our Mission */}
            <section className="py-24 md:py-32 px-8 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-20 items-center">
                    <div className="relative group">
                        <div className="relative z-10 rounded-xl overflow-hidden border border-primary/20">
                            <img
                                className="w-full aspect-[4/5] object-cover grayscale brightness-75 transition duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                alt="Abstract aesthetic image of digital fabric patterns scanning"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwQVwvznHT_ngb_rOPVdfZzqdHalx5PXMVfL8wdBj1m5J-VHmsg2aJdPIkkxZkxqnGvt51lLEc4QmEh-mWiG_RewtG9jJvMJ0ZfgPbI9IdorsD91LCUZ7qJuCebLHZ2x-luLXLkzIcu96-f2yVsVu1OgQfH4zZoeXjh59caue2HKosPVYTgyjpj-BTE9EwK8UBbR9nlBeXXyTdAufRywxup10kpeKqMKoXo_-I-w-W0-VDJo4a4zRiWVcntaSXM24J8G3FuT3jmUkT"
                            />
                            {/* Scanning Graphic Effect */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="absolute w-full top-1/4 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_#c6a65d] animate-[bounce_4s_infinite]"></div>
                                <div className="absolute w-full top-3/4 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_15px_#c6a65d] animate-[bounce_3s_infinite_reverse]"></div>
                            </div>
                        </div>
                        {/* Decorative Gold Corner */}
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b-2 border-l-2 border-primary opacity-40"></div>
                    </div>
                    <div className="space-y-8">
                        <div className="w-12 h-1 bg-primary"></div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-luxury">Bridging the Gap Between <span className="text-primary italic">Humanity and Precision</span></h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            At StyleSync, we believe that style is a language, and AI is the ultimate translator. Our mission is to democratize the luxury atelier experience, making bespoke precision available to every individual through cutting-edge neural networks.
                        </p>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            We don't just measure bodies; we understand movement, preference, and the subtle nuances that make your aesthetic unique. It's the fusion of digital accuracy and artisanal vision.
                        </p>
                        <div className="pt-6 grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-3xl font-bold text-white mb-1">99.8%</div>
                                <div className="text-xs uppercase tracking-widest text-primary font-bold">Accuracy Rate</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white mb-1">2.4M</div>
                                <div className="text-xs uppercase tracking-widest text-primary font-bold">Style Profiles</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Powered by Precision */}
            <section className="bg-[#121115] py-24 px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4">Our Technology</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight font-luxury">Powered by Precision</h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-primary/5 backdrop-blur-md p-10 rounded-xl border-t-2 border-primary/40 group hover:border-primary transition-all duration-500">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                                <span className="material-icons text-primary text-3xl">accessibility_new</span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">Body Analysis</h4>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                Millimeter-accurate 3D scanning technology that maps your unique silhouette with 40,000+ data points for a perfect fit.
                            </p>
                            <Link to="/body-scan" className="text-primary text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all">
                                Deep Dive <span className="material-icons text-sm">east</span>
                            </Link>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-primary/5 backdrop-blur-md p-10 rounded-xl border-t-2 border-primary/40 group hover:border-primary transition-all duration-500">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                                <span className="material-icons text-primary text-3xl">psychology</span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">AI Personalization</h4>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                Our proprietary 'StyleMind' learns your aesthetic preferences over time, curating pieces that resonate with your personal brand.
                            </p>
                            <Link to="/recommendations" className="text-primary text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all">
                                Learn More <span className="material-icons text-sm">east</span>
                            </Link>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-primary/5 backdrop-blur-md p-10 rounded-xl border-t-2 border-primary/40 group hover:border-primary transition-all duration-500">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-8 group-hover:bg-primary/20 transition-colors">
                                <span className="material-icons text-primary text-3xl">visibility</span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-4">AR Try-On</h4>
                            <p className="text-slate-400 leading-relaxed mb-6">
                                Experience real-time fabric physics and lighting simulation. See how clothes move and drape on your digital twin.
                            </p>
                            <Link to="/ar-tryon" className="text-primary text-xs font-bold tracking-widest uppercase flex items-center gap-2 hover:gap-4 transition-all">
                                Try Demo <span className="material-icons text-sm">east</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Built for Confidence (Brand Story) */}
            <section className="py-32 px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-light italic text-white mb-12 leading-tight font-luxury">
                        "Style is a silent reflection of the soul. StyleSync is the mirror that captures its <span className="text-primary">perfect clarity</span>."
                    </h2>
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-[1px] bg-primary mb-8"></div>
                        <p className="text-slate-500 uppercase tracking-[0.4em] text-sm font-bold">The StyleSync Manifesto</p>
                        <div className="mt-12 space-y-6 text-slate-400 text-lg leading-loose">
                            <p>
                                Founded in the heart of the digital fashion revolution, StyleSync emerged from a simple question: why does shopping for the world's most beautiful garments still feel like a guessing game? We sought to eliminate the frustration of the 'wrong fit' and replace it with the confidence of 'perfection found.'
                            </p>
                            <p>
                                Our team of data scientists, fashion historians, and master tailors collaborated for three years to build an engine that doesn't just recognize patterns—it understands beauty. We are built for those who value time as much as texture.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 px-8 border-t border-primary/10">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                    {[
                        { icon: 'verified', title: 'Precision', desc: 'Unrivaled accuracy in every measurement.' },
                        { icon: 'fingerprint', title: 'Privacy', desc: 'Your data is yours, encrypted and secure.' },
                        { icon: 'groups', title: 'Inclusivity', desc: 'Designed for every body, every identity.' },
                        { icon: 'auto_awesome', title: 'Innovation', desc: 'Leading the future of digital fashion.' }
                    ].map((item, index) => (
                        <div key={index} className="text-center p-8 bg-background-dark border border-primary/5 hover:border-primary/40 transition-colors rounded-lg">
                            <span className="material-icons text-primary mb-4 text-4xl">{item.icon}</span>
                            <h5 className="text-white font-bold mb-2">{item.title}</h5>
                            <p className="text-slate-500 text-sm">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Privacy Focus */}
            <section className="py-24 px-8">
                <div className="max-w-6xl mx-auto rounded-3xl bg-gradient-to-br from-[#1A181C] to-background-dark border border-primary/20 overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                        <span className="material-icons text-[180px] text-primary">security</span>
                    </div>
                    <div className="p-12 md:p-20 relative z-10 flex flex-col md:flex-row items-center gap-12">
                        <div className="w-32 h-32 rounded-full border-2 border-primary/30 flex items-center justify-center shrink-0">
                            <span className="material-icons text-primary text-6xl">shield</span>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-4">Your Identity, Safeguarded.</h3>
                            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mb-8">
                                We treat your biometric data with the same reverence as the finest textiles. Every scan is encrypted using military-grade protocols and is never shared with third parties without your explicit consent.
                            </p>
                            <button className="flex items-center gap-3 text-primary font-bold tracking-widest text-xs uppercase hover:underline">
                                View our security protocols <span class="material-icons text-sm">launch</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-32 px-8 text-center relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <img className="w-full h-full object-cover grayscale" alt="Luxurious dark fabric textures and patterns" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCLe9YHUdGLrk9GVULc9BHoYHdr6t1U7bid85-FO-R0ER69N4j5yAVmfd4s4vK07vAIvbTecPVuHdgJ9iips99BvOzBRLFPJfpJGq9xrSWC4w261uB2N7BL8UtKrqcJItofT_e4zNKquDV-IhVZz-Lj1Qb7M6D6ontdhSB7MtuKurkMBQXldcyTCvTY_ZjlKIdrECDBvEHVxMjm8_Z9LuQzN2CfGhyZWVPYOtYVDOLxY4o_f64gfQAe_T_h_jVAhwH23dAXGD1LjmSa" />
                </div>
                <div className="relative z-10">
                    <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-10 tracking-tight font-luxury">Ready to Find Your <br /><span className="text-primary italic">Perfect Self?</span></h2>
                    <Link to="/body-scan" className="inline-block bg-primary hover:bg-[#b09352] text-background-dark px-16 py-6 rounded-full font-black tracking-[0.3em] transition-all transform hover:scale-110 shadow-2xl shadow-primary/20 uppercase">
                        START BODY SCAN
                    </Link>
                    <p className="mt-8 text-slate-500 font-medium tracking-widest text-xs">NO CHARGE FOR YOUR FIRST SCAN • NO OBLIGATION</p>
                </div>
            </section>
        </div>
    );
}
