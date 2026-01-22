import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import this
import { Award, Target, Eye, Quote, ArrowLeft } from 'lucide-react'; // Added ArrowLeft

const AboutUs = () => {
    const navigate = useNavigate(); // Initialize navigation

    const leadership = [
        {
            name: "Amb. Dr. Blessing Jibuike",
            role: "Life Matron",
            image: "/images/lifeMatron.jpeg",
            bio: "A guiding light for El-Olam, ensuring the heart of our mission remains focused on compassionate care."
        },
        {
            name: "Amb. Dr. Mrs. Grace Edward",
            role: "Founder",
            image: "/images/founder.jpeg",
            bio: "A visionary leader dedicated to transforming the lives of neurodiverse children through specialized rehabilitation."
        },
        {
            name: "Mr. Emmanuel Leo-Aba",
            role: "Executive Director",
            image: "/images/director.jpeg",
            bio: "Driving the strategic growth and operational excellence of El-Olam for over a decade."
        },
        {
            name: "Mr. Akinpelu Oluwatayo Emmanuel",
            role: "Administrative Officer",
            image: "/images/adminOfficer.jpeg",
            bio: "Managing the day-to-day coordination to ensure every child and parent receives seamless support."
        }
    ];

    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden pt-20">

            {/* --- Navigation Back Button --- */}
            <div className="fixed top-24 left-6 z-[60]">
                <button
                    onClick={() => navigate(-1)} // Takes user back one step in history
                    className="group flex items-center gap-2 bg-white/90 backdrop-blur-md p-3 rounded-full shadow-xl border border-slate-100 hover:bg-sky-500 transition-all duration-300 active:scale-90"
                    title="Go Back"
                >
                    <ArrowLeft size={24} className="text-slate-600 group-hover:text-white transition-colors" />
                    <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:pr-2 transition-all duration-500 font-bold text-white whitespace-nowrap">
                        Go Back
                    </span>
                </button>
            </div>

            {/* --- Cinematic Hero --- */}
            <section className="relative h-[60vh] flex items-center justify-center bg-slate-900 text-white overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    <img
                        src="/images/Gemini_Generated_Image_n21a2on21a2on21a.png"
                        alt="Facility Background"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900"></div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-500/30 px-4 py-2 rounded-full text-sky-400 text-xs font-black uppercase tracking-widest mb-6"
                    >
                        <Award size={16} /> Est. 2014
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-4xl md:text-7xl font-black mb-4 leading-tight"
                    >
                        10+ Years of <br/> <span className="text-sky-500">Transforming Lives</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-medium"
                    >
                        Since 2014, El-Olam Special Home has been a sanctuary of hope, providing world-class rehabilitation for children with special needs.
                    </motion.p>
                </div>
            </section>

            {/* --- Mission & Vision --- */}
            <section className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <motion.div {...fadeInUp} className="bg-slate-50 p-10 rounded-[3rem] border-b-4 border-sky-500 shadow-sm">
                        <div className="w-14 h-14 bg-sky-500 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-sky-500/20">
                            <Target size={28} />
                        </div>
                        <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Our Mission</h2>
                        <p className="text-slate-600 leading-relaxed font-medium">
                            To provide compassionate care and specialized rehabilitation for children with neurodiverse needs, fostering an inclusive environment where every child is empowered to achieve their full potential.
                        </p>
                    </motion.div>

                    <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="bg-slate-900 p-10 rounded-[3rem] text-white shadow-2xl">
                        <div className="w-14 h-14 bg-white text-slate-900 rounded-2xl flex items-center justify-center mb-6">
                            <Eye size={28} />
                        </div>
                        <h2 className="text-3xl font-black mb-4 tracking-tight">Our Vision</h2>
                        <p className="text-slate-400 leading-relaxed font-medium">
                            To be a leading center in Africa, recognized for excellence in neurodiverse care, creating a world where every special needs child is seen, heard, and celebrated.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* --- Leadership Section --- */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-6 text-center">
                    <motion.div {...fadeInUp} className="mb-20">
                        <h2 className="text-sky-500 font-black uppercase text-xs tracking-[0.3em] mb-3">Our Pillar of Strength</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Dedicated Leadership</h3>
                        <div className="w-20 h-1.5 bg-sky-500 mx-auto mt-6 rounded-full"></div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {leadership.map((member, index) => (
                            <motion.div
                                key={index}
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                className="relative group text-center"
                            >
                                <div className="relative mb-6 mx-auto w-56 h-72 rounded-[2rem] overflow-hidden shadow-2xl bg-slate-100">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x400?text=Leadership'; }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                                    <div className="absolute bottom-4 left-0 right-0 px-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-xs font-medium italic">"{member.bio}"</p>
                                    </div>
                                </div>
                                <h4 className="text-xl font-black text-slate-900 leading-tight mb-1 px-2">{member.name}</h4>
                                <p className="text-sky-500 font-black uppercase text-[10px] tracking-widest mb-4">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- 10 Year Statement --- */}
            <section className="py-24 bg-sky-500">
                <div className="container mx-auto px-6 text-center text-white">
                    <motion.div {...fadeInUp} className="max-w-3xl mx-auto">
                        <Quote className="text-white/30 mx-auto mb-8" size={60} />
                        <h3 className="text-2xl md:text-4xl font-black leading-tight mb-8">
                            "Ten years is not just a milestone; it's thousands of smiles, hundreds of breakthroughs, and an unwavering commitment to love."
                        </h3>
                        <div className="w-24 h-1 bg-white/30 mx-auto rounded-full"></div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default AboutUs;