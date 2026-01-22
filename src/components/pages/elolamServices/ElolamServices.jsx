import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Brain, MessageSquare, BookOpen,
    Heart, Activity, ShieldCheck, Zap
} from 'lucide-react';

const ElolamServices = () => {
    const navigate = useNavigate();

    const services = [
        {
            title: "Cognitive Development",
            desc: "Specialized brain-training exercises to enhance memory, attention, and problem-solving skills for neurodiverse learners.",
            icon: <Brain className="text-purple-500" size={32} />,
            color: "bg-purple-50"
        },
        {
            title: "Speech Therapy",
            desc: "Comprehensive support for communication challenges, helping children find their voice and express themselves clearly.",
            icon: <MessageSquare className="text-blue-500" size={32} />,
            color: "bg-blue-50"
        },
        {
            title: "Educational Rehab",
            desc: "Customized learning plans that bridge the gap between traditional education and special needs requirements.",
            icon: <BookOpen className="text-emerald-500" size={32} />,
            color: "bg-emerald-50"
        },
        {
            title: "Compassionate Care",
            desc: "24/7 residential and day-care services focused on hygiene, nutrition, and emotional well-being.",
            icon: <Heart className="text-red-500" size={32} />,
            color: "bg-red-50"
        },
        {
            title: "Physiotherapy",
            desc: "Physical rehabilitation to improve motor skills, balance, and physical independence through fun exercises.",
            icon: <Activity className="text-orange-500" size={32} />,
            color: "bg-orange-50"
        },
        {
            title: "Vocational Skills",
            desc: "Training in practical life skills to prepare our older wards for a future of independence and employment.",
            icon: <Zap className="text-amber-500" size={32} />,
            color: "bg-amber-50"
        }
    ];

    // Array of your random images from public/images
    const galleryImages = [
        "/images/Service1.jpeg",
        "/images/Service2.jpeg",
        "/images/Service3.jpeg",
        "/images/Service4.jpeg",
        "/images/Service5.jpeg",
        "/images/Service6.jpeg",
        "/images/Service7.jpeg",
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans pt-20">
            {/* --- Back Button --- */}
            <div className="fixed top-24 left-6 z-50">
                <button
                    onClick={() => navigate(-1)}
                    className="p-3 bg-white shadow-lg rounded-full hover:bg-sky-500 hover:text-white transition-all active:scale-90"
                >
                    <ArrowLeft size={24} />
                </button>
            </div>

            {/* --- Header Section --- */}
            <section className="py-20 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-3xl mx-auto"
                >
                    <h2 className="text-sky-500 font-black uppercase text-xs tracking-[0.4em] mb-4">What We Do</h2>
                    <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
                        Comprehensive Care <br/> For Every Child
                    </h1>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed">
                        At El-Olam, we don't just provide care; we provide a pathway to independence through scientifically backed therapies and a loving environment.
                    </p>
                </motion.div>
            </section>

            {/* --- Services Grid --- */}
            <section className="pb-24 px-6 container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-300"
                        >
                            <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-black text-slate-800 mb-4">{service.title}</h3>
                            <p className="text-slate-500 font-medium leading-relaxed text-sm italic">
                                "{service.desc}"
                            </p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* --- Blended Image Gallery --- */}
            <section className="bg-slate-900 py-24 px-6">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                        <div className="max-w-xl">
                            <h3 className="text-white text-3xl md:text-5xl font-black mb-4 tracking-tight">Life at El-Olam</h3>
                            <p className="text-slate-400 font-medium">A glimpse into the daily joy, breakthroughs, and activities within our facility.</p>
                        </div>
                        <div className="h-1 w-24 bg-sky-500 rounded-full mb-4"></div>
                    </div>

                    <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                        {galleryImages.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative group overflow-hidden rounded-[2rem] bg-slate-800 shadow-2xl cursor-zoom-in"
                            >
                                <img
                                    src={img}
                                    alt="Facility activity"
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Activity+Photo' }}
                                />
                                <div className="absolute inset-0 bg-sky-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Call to Action --- */}
            <section className="py-24 px-6 text-center">
                <div className="bg-sky-500 rounded-[3rem] p-12 md:p-20 text-white shadow-2xl shadow-sky-500/30 max-w-5xl mx-auto overflow-hidden relative">
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black mb-6">Ready to join the family?</h2>
                        <p className="text-sky-100 text-lg mb-10 max-w-xl mx-auto font-medium">
                            Whether you need more information about our curriculum or want to schedule a visit, we are here for you.
                        </p>
                        <button className="bg-white text-sky-500 px-10 py-4 rounded-full font-black hover:bg-slate-100 transition-all uppercase text-xs tracking-widest">
                            Contact Our Team
                        </button>
                    </div>
                    {/* Decorative Circle */}
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                </div>
            </section>
        </div>
    );
};

export default ElolamServices;