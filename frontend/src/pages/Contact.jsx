import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'Personal Styling Concierge',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            toast.error('Please fill in all required fields.', {
                style: {
                    background: '#1a1a1a',
                    color: '#ff4b4b',
                    border: '1px solid rgba(255, 75, 75, 0.3)',
                }
            });
            return;
        }

        // Success Popup
        toast.success("Our team will reach out to you in 24 hours and solve your query as soon as possible.", {
            duration: 5000,
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

        // Reset form
        setFormData({
            name: '',
            email: '',
            type: 'Personal Styling Concierge',
            message: ''
        });
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background-dark text-slate-100 font-display">
            {/* Left Side: Editorial Content */}
            <section className="relative w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center overflow-hidden">
                <img
                    alt="High fashion editorial"
                    className="absolute inset-0 w-full h-full object-cover object-right grayscale-[20%] brightness-[40%]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHyWu0L-8dTHDUfLGMzXbvIY0f1aUK6WDKoUjpTQI813ewlHdRLp_u7Mj9T-x5P527m6kxkodgkWLvhXzChBZmCDh79lkyYYGoeTn4Vvij27DQu1sTIHXL1h2miGOJuAYfKnWbX8VR7QQ_hCqf3KSDu29knrf16krISTHQXP6KNpg9SNdADttq5zWlBrriuPcsE-1yXmZ9VsuVI1_sotkAbeCk1nnY9wu11WqCvnrjig2mHPpWOI9Ca6ajYLqHA2rCdBgRpG2VVyah"
                />
                <div className="relative z-10 w-full px-12 md:px-24 flex flex-col space-y-12">
                    <div className="space-y-4">
                        <h1 className="text-5xl md:text-7xl font-extralight text-white tracking-tight leading-tight font-luxury">
                            Get in <br /><span className="text-primary italic">Touch</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl font-light max-w-sm">
                            Concierge support for your digital style journey.
                        </p>
                    </div>

                    <div className="pt-8">
                        <div className="flex items-start space-x-4">
                            <span className="material-icons text-primary">email</span>
                            <a className="text-lg font-light text-white hover:text-primary transition-colors underline underline-offset-8 decoration-primary/30" href="mailto:concierge@stylesync.ai">concierge@stylesync.ai</a>
                        </div>
                    </div>
                </div>
                {/* Accent line decoration */}
                <div className="absolute bottom-12 left-0 w-32 h-px bg-primary/40"></div>
            </section>

            {/* Right Side: Contact Form */}
            <section className="w-full md:w-1/2 flex items-center justify-center bg-background-dark p-8 md:p-24 relative overflow-hidden">
                {/* Decorative Background Element */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

                <div className="w-full max-w-lg relative z-10 pt-20 md:pt-0"> {/* Added padding top for mobile if needed, though split screen handles it */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-light mb-4 text-white font-luxury">Inquiry Concierge</h2>
                        <div className="h-1 w-20 bg-primary"></div>
                    </div>
                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* Name Field */}
                        <div className="relative">
                            <label className="text-xs uppercase tracking-widest text-primary/80 font-medium mb-2 block">Your Full Name</label>
                            <input
                                className="w-full bg-transparent border-0 border-b border-primary/40 focus:ring-0 focus:border-primary py-3 transition-all placeholder:text-gray-600 dark:placeholder:text-gray-400 font-light text-white"
                                placeholder="Alexander McQueen"
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Email Field */}
                        <div className="relative">
                            <label className="text-xs uppercase tracking-widest text-primary/80 font-medium mb-2 block">Professional Email</label>
                            <input
                                className="w-full bg-transparent border-0 border-b border-primary/40 focus:ring-0 focus:border-primary py-3 transition-all placeholder:text-gray-600 dark:placeholder:text-gray-400 font-light text-white"
                                placeholder="alex@example.com"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        {/* Inquiry Type Dropdown */}
                        <div className="relative">
                            <label className="text-xs uppercase tracking-widest text-primary/80 font-medium mb-2 block">Inquiry Type</label>
                            <select
                                className="w-full bg-transparent border-0 border-b border-primary/40 focus:ring-0 focus:border-primary py-3 transition-all appearance-none font-light text-white"
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                            >
                                <option className="bg-background-dark">Personal Styling Concierge</option>
                                <option className="bg-background-dark">Technical AI Support</option>
                                <option className="bg-background-dark">Partnership Opportunities</option>
                                <option className="bg-background-dark">VIP Membership Access</option>
                            </select>
                            <span className="material-icons absolute right-0 bottom-3 text-primary pointer-events-none">expand_more</span>
                        </div>
                        {/* Message Field */}
                        <div className="relative">
                            <label className="text-xs uppercase tracking-widest text-primary/80 font-medium mb-2 block">How can our concierge assist you?</label>
                            <textarea
                                className="w-full bg-transparent border border-primary/40 focus:ring-1 focus:ring-primary focus:border-primary p-4 rounded-lg transition-all placeholder:text-gray-600 dark:placeholder:text-gray-400 font-light resize-none text-white"
                                placeholder="Describe your vision or requirement..."
                                rows="4"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                        {/* Submit Button */}
                        <div className="pt-4">
                            <button className="w-full bg-primary text-black font-semibold py-5 rounded tracking-[0.2em] uppercase text-sm hover:brightness-110 transition-all flex items-center justify-center group shadow-xl shadow-primary/10" type="submit">
                                Send Message
                                <span className="material-icons ml-2 text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </button>
                        </div>
                        <p className="text-center text-xs text-gray-500 uppercase tracking-widest mt-8">
                            Our concierge team responds within 24 hours.
                        </p>
                    </form>
                </div>
            </section>
        </div>
    );
}
