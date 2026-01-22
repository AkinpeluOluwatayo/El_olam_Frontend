import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import {
    Menu, X, ArrowRight, Heart, Users, Clock, Award,
    Stethoscope, MessageSquare, Briefcase, Activity,
    Brain, ShieldCheck, Phone, MapPin, ChevronDown, User, Lock
} from 'lucide-react';

const LandingPage = () => {
    const [isOpen, setIsOpen] = useState(false); // Mobile Menu Toggle
    const [dropdownOpen, setDropdownOpen] = useState(false); // Desktop Dropdown
    const [mobilePortalOpen, setMobilePortalOpen] = useState(false); // Mobile Portal Toggle
    const dropdownRef = useRef(null);

    // Close desktop dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const textSlides = [
        {
            title: "Building a Brighter Future Together",
            desc: "Providing compassionate care and specialized rehabilitation for children with neurodiverse needs."
        },
        {
            title: "Nurturing Every Unique Potential",
            desc: "Our specialized physiotherapy and speech programs are tailored for individual progress and success."
        },
        {
            title: "Building Bridges to Independence",
            desc: "Creating an inclusive environment where every child is empowered to reach their full potential."
        }
    ];

    const stats = [
        { icon: <Award className="text-white" size={20} />, label: "Years Experience", value: "10+", color: "bg-sky-500" },
        { icon: <Users className="text-white" size={20} />, label: "Lives Impacted", value: "500+", color: "bg-slate-800" },
        { icon: <Clock className="text-white" size={20} />, label: "Care", value: "24/7", color: "bg-sky-600" },
        { icon: <Heart className="text-white" size={20} />, label: "Inclusion", value: "100%", color: "bg-sky-400" },
    ];

    const services = [
        { title: "Physiotherapy", description: "Tailored physical exercises to improve mobility and physical strength.", icon: <Activity size={24} /> },
        { title: "Speech Therapy", description: "Communication support to help every child find their unique voice.", icon: <MessageSquare size={24} /> },
        { title: "Vocational Training", description: "Practical life skills focused on future independence and employment.", icon: <Briefcase size={24} /> },
        { title: "Occupational Therapy", description: "Developing daily living skills through targeted therapeutic activities.", icon: <Stethoscope size={24} /> },
        { title: "Cognitive Development", description: "Brain-building exercises designed for neurodiverse learning patterns.", icon: <Brain size={24} /> },
        { title: "Residential Care", description: "A safe, premium, and loving home-away-from-home environment.", icon: <ShieldCheck size={24} /> },
    ];

    return (
        <div className="min-h-screen font-sans bg-slate-50 overflow-x-hidden">
            {/* --- Navigation --- */}
            <nav className="fixed w-full z-[100] bg-white/95 backdrop-blur-md border-b border-sky-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex-shrink-0 flex items-center gap-3">
                            <img src="/images/elolamLogo.png" alt="Logo" className="h-10 w-auto object-contain" />
                            <span className="text-xs sm:text-sm lg:text-base font-black text-slate-800 leading-tight uppercase tracking-tight">
                                El-Olam Special Home <br className="sm:hidden" /> & Rehabilitation Center
                            </span>
                        </div>

                        {/* Desktop Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/AboutUs" className="text-slate-600 hover:text-sky-600 font-bold text-sm transition-colors">About Us</Link>
                            <Link to="/ElolamServices" className="text-slate-600 hover:text-sky-600 font-bold text-sm transition-colors">Services</Link>

                            <div className="relative" ref={dropdownRef}>
                                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 bg-sky-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg shadow-sky-100 active:scale-95 hover:bg-sky-700 transition-all">
                                    Portals <ChevronDown size={16} className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl border border-sky-50 overflow-hidden py-1">
                                        <Link to="/login" className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-sky-50 border-b border-slate-50 transition-colors">
                                            <User size={14} className="text-sky-500" /> <span className="font-bold text-xs">Parent Login</span>
                                        </Link>
                                        <Link to="/admin-login" className="flex items-center gap-3 px-4 py-2.5 text-slate-700 hover:bg-sky-50 transition-colors">
                                            <Lock size={14} className="text-sky-500" /> <span className="font-bold text-xs">Admin Login</span>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Mobile Menu Icon */}
                        <div className="md:hidden">
                            <button onClick={() => setIsOpen(!isOpen)} className="text-sky-600 p-2">
                                {isOpen ? <X size={28}/> : <Menu size={28}/>}
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Mobile View Dropdown --- */}
                {isOpen && (
                    <div className="md:hidden bg-white border-t border-sky-50 shadow-2xl absolute w-full left-0 p-6 flex flex-col space-y-4 animate-in slide-in-from-top duration-300">
                        <Link to="/AboutUs" className="text-lg font-bold text-slate-700 border-b border-slate-50 pb-2" onClick={() => setIsOpen(false)}>About Us</Link>
                        <Link to="/ElolamServices" className="text-lg font-bold text-slate-700 border-b border-slate-50 pb-2" onClick={() => setIsOpen(false)}>Services</Link>

                        {/* Mobile Portals Accordion */}
                        <div className="flex flex-col">
                            <button
                                onClick={() => setMobilePortalOpen(!mobilePortalOpen)}
                                className="flex justify-between items-center text-lg font-bold text-sky-600 py-2"
                            >
                                Portals <ChevronDown size={20} className={`transition-transform ${mobilePortalOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {mobilePortalOpen && (
                                <div className="flex flex-col pl-4 space-y-3 mt-2 animate-in fade-in slide-in-from-left-2">
                                    <Link to="/login" className="flex items-center gap-3 text-slate-600 font-bold py-2" onClick={() => setIsOpen(false)}>
                                        <User size={18} className="text-sky-500"/> Parent Login
                                    </Link>
                                    <Link to="/admin-login" className="flex items-center gap-3 text-slate-600 font-bold py-2" onClick={() => setIsOpen(false)}>
                                        <Lock size={18} className="text-sky-500"/> Admin Login
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* --- Hero Section (FIXED TRANSITIONS) --- */}
            <section id="home" className="h-[80vh] relative flex items-center bg-cover bg-center" style={{ backgroundImage: `url('/images/Gemini_Generated_Image_n21a2on21a2on21a.png')` }}>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent"></div>
                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    <Swiper
                        modules={[Autoplay, Pagination, EffectFade]}
                        effect="fade"
                        fadeEffect={{ crossFade: true }} // Prevents text clashing during transition
                        speed={1000} // Smoother transition duration
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        className="w-full"
                    >
                        {textSlides.map((slide, index) => (
                            <SwiperSlide key={index}>
                                <div className="max-w-2xl lg:max-w-3xl py-10">
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-[1.1] drop-shadow-xl transition-all duration-700">
                                        {slide.title}
                                    </h1>
                                    <p className="text-base md:text-lg lg:text-xl text-sky-50 mb-8 max-w-xl leading-relaxed font-medium transition-all duration-700 delay-100">
                                        {slide.desc}
                                    </p>
                                    <button className="bg-sky-500 text-white px-8 py-3.5 rounded-full font-black flex items-center gap-2 uppercase text-[11px] tracking-widest shadow-xl shadow-sky-500/30 active:scale-95 transition-transform">
                                        Explore More <ArrowRight size={18}/>
                                    </button>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>

            {/* --- Stats --- */}
            <section className="relative -mt-10 z-20 container mx-auto px-4 lg:px-20 max-w-6xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <div key={i} className={`${stat.color} p-5 md:p-6 rounded-3xl shadow-xl flex flex-col items-center transform hover:-translate-y-1 transition-transform duration-300`}>
                            <div className="mb-3 p-2 bg-white/20 rounded-xl backdrop-blur-sm">{stat.icon}</div>
                            <h3 className="text-2xl md:text-3xl font-black text-white">{stat.value}</h3>
                            <p className="text-[10px] font-bold text-sky-100 uppercase tracking-widest mt-1 text-center">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Services --- */}
            <section id="services" className="py-20 bg-gradient-to-b from-slate-50 to-sky-50/50">
                <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-sky-600 font-black uppercase text-[10px] tracking-[0.4em] mb-3">Our Expertise</h2>
                        <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Specialized Care Services</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto">
                        {services.map((s, i) => (
                            <div key={i} className="group p-8 rounded-[2rem] bg-white border border-sky-50 hover:border-sky-200 hover:shadow-xl transition-all duration-500">
                                <div className="mb-6 w-12 h-12 bg-sky-600 rounded-2xl flex items-center justify-center text-white">{s.icon}</div>
                                <h4 className="text-xl font-black mb-3 text-slate-800 tracking-tight">{s.title}</h4>
                                <p className="text-slate-500 leading-relaxed text-sm font-medium">{s.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Why Choose Us --- */}
            <section className="py-20 bg-slate-900 relative overflow-hidden">
                <div className="container mx-auto px-6 lg:px-12 relative z-10 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-sky-400 font-black uppercase text-[10px] tracking-[0.4em] mb-3">Why El-Olam?</h2>
                            <h3 className="text-3xl md:text-5xl font-black text-white mb-6">We Believe in Every Child's <span className="text-sky-500">Journey.</span></h3>
                            <div className="space-y-5">
                                {[
                                    { t: "Expert Staff", d: "Highly trained therapists with a passion for neurodiversity." },
                                    { t: "Tailored Programs", d: "Every child receives a personalized rehabilitation path." },
                                    { t: "Safe Environment", d: "A sensory-designed setting for security and comfort." }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center"><ArrowRight size={12} className="text-white"/></div>
                                        <div><h5 className="text-white font-bold">{item.t}</h5><p className="text-slate-400 text-sm">{item.d}</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-[3rem] overflow-hidden border-4 border-slate-800 shadow-2xl">
                            <img src="/images/Gemini_Generated_Image_n21a2on21a2on21a.png" alt="Facility" className="w-full h-full object-cover"/>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Footer --- */}
            <footer id="contact" className="bg-slate-950 text-slate-400 pt-20 pb-10">
                <div className="container mx-auto px-6 lg:px-12 max-w-6xl text-center md:text-left">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                        <div>
                            <img src="/images/elolamLogo.png" alt="Logo" className="h-8 mb-6 brightness-200 mx-auto md:mx-0" />
                            <h4 className="text-white font-black text-lg mb-4 leading-tight uppercase tracking-tight">El-Olam Special Home</h4>
                            <p className="text-sm font-medium max-w-xs mx-auto md:mx-0">Nurturing environments where special needs children flourish.</p>
                        </div>
                        <div className="flex flex-col md:items-end">
                            <h4 className="text-white font-black uppercase text-[10px] tracking-widest mb-6 text-sky-500">Contact</h4>
                            <div className="space-y-4 text-sm font-medium">
                                <p className="flex items-center gap-3 md:flex-row-reverse"><MapPin size={18} className="text-sky-500"/> Lagos & Ogun State</p>
                                <p className="flex items-center gap-3 md:flex-row-reverse"><Phone size={18} className="text-sky-500"/> +234 813 797 3130</p>
                            </div>
                        </div>
                    </div>
                    <div className="border-t border-slate-900 pt-8 text-center text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600">
                        <p>© {new Date().getFullYear()} El-Olam Center. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;