"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { useState } from "react";
import {
    Search,
    ChevronDown,
    MessageCircle,
    HelpCircle,
    Building2,
    ClipboardList,
    Stethoscope,
    HeartHandshake,
    ShieldCheck,
} from "lucide-react";

type FAQItem = {
    question: string;
    answer: string;
    category: string;
};

const faqCategories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "general", label: "General & Location", icon: Building2 },
    { id: "admission", label: "Admission & Transport", icon: ClipboardList },
    { id: "care", label: "Programs & Rehabilitation", icon: Stethoscope },
    { id: "support", label: "Donations & Sponsorship", icon: HeartHandshake },
    { id: "boarding", label: "Boarding & Facilities", icon: ShieldCheck },
];

const faqs: FAQItem[] = [
    // General & Location
    {
        category: "general",
        question: "What is El-Olam Special Home & Rehabilitation Center?",
        answer:
            "El-Olam Special Home & Rehabilitation Center is a leading non-profit rehabilitation facility in Nigeria dedicated to providing comprehensive care, occupational therapy, speech therapy, physiotherapy, disability rehabilitation, and special education for individuals and children with special needs.",
    },
    {
        category: "general",
        question: "Where is El-Olam located, and do you serve clients outside Ogun and Lagos?",
        answer:
            "Our primary center is located in Mowe, Ogun State, strategically accessible from Lagos and South-West Nigeria. We welcome clients from all 36 states across Nigeria and provide dedicated boarding and transport arrangements for out-of-state families.",
    },
    {
        category: "general",
        question: "How many operational hubs does El-Olam run?",
        answer:
            "El-Olam operates 3 active hubs spanning Lagos and Ogun State, delivering specialized rehabilitation, community outreach, and school integration programs.",
    },

    // Admission & Transport
    {
        category: "admission",
        question: "How do I apply for admission at El-Olam?",
        answer:
            "Admission begins by filling out our online registration and assessment form and paying the non-refundable registration and assessment fee. Once completed, our admissions clinical team schedules a comprehensive physical assessment appointment.",
    },
    {
        category: "admission",
        question: "Is the registration and assessment fee refundable?",
        answer:
            "No, the registration and assessment fee is non-refundable. It covers the clinical evaluation, administrative processing, and multidisciplinary assessment of your child's tailored care plan.",
    },
    {
        category: "admission",
        question: "Do you offer airport pick-up services for families coming from outside Lagos?",
        answer:
            "Yes! We provide seamless airport pick-up services from Murtala Muhammed International Airport (MMIA) in Lagos for out-of-state and international families coming to our center for residential care.",
    },

    // Programs & Rehabilitation
    {
        category: "care",
        question: "What rehabilitation programs and therapies do you offer?",
        answer:
            "We offer a full spectrum of evidence-based care including Occupational Therapy, Speech and Language Therapy, Physiotherapy, Mobility & Assistive Devices, Vocational Skills Training, Disability Rehabilitation, and Special Education Advocacy.",
    },
    {
        category: "care",
        question: "What is the difference between the Day Student and Boarding systems?",
        answer:
            "Day Students attend our center during school hours for daily therapy and education, returning home each evening. Boarding students reside 24/7 in our secure, sensory-designed residential facility with full-time supervision, structured therapy routines, and specialized meals.",
    },
    {
        category: "care",
        question: "Do you partner with mainstream schools for inclusive education?",
        answer:
            "Yes, we partner with over 10 mainstream schools across Ogun and Lagos State to facilitate inclusive classroom integration, train educators, and supply adaptive learning aids for children with special needs.",
    },

    // Donations & Sponsorship
    {
        category: "support",
        question: "How can I sponsor a child at El-Olam?",
        answer:
            "You can sponsor a child through our monthly sponsorship program (N50,000 / $45 per month). Your monthly sponsorship directly funds diagnostic care, therapy sessions, adaptive learning kits, and residential care for a child in need.",
    },
    {
        category: "support",
        question: "Are one-time donations accepted, and how are funds utilized?",
        answer:
            "Yes! One-time and recurring donations of any amount are warmly welcomed. All funds are transparently deployed toward subsidized therapy sessions, assistive devices, special education grants, and facility maintenance.",
    },
    {
        category: "support",
        question: "Can corporate organizations partner with El-Olam for CSR initiatives?",
        answer:
            "Absolutely. We partner with corporate institutions, foundations, and community groups for corporate social responsibility (CSR) programs, equipment donations, and special education scholarship sponsorships.",
    },

    // Boarding & Facilities
    {
        category: "boarding",
        question: "What safety and security measures are in place in the boarding facility?",
        answer:
            "Our residential facility features 24/7 security, trained caregiver staff, round-the-clock medical supervision, sensory-designed dormitories, emergency response protocols, and strict visitor verification procedures.",
    },
    {
        category: "boarding",
        question: "Can parents visit their children residing in the boarding center?",
        answer:
            "Yes, we encourage active family involvement. We maintain structured family visit schedules and provide regular clinical progress reports and video calls for long-distance parents.",
    },
];

export default function FAQPage() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const filteredFAQs = faqs.filter((faq) => {
        const matchesCategory =
            selectedCategory === "all" || faq.category === selectedCategory;
        const matchesSearch =
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const toggleFAQ = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-brand-surface min-h-screen">
            <Header />
            <main>
                {/* Hero Header */}
                <section className="relative bg-brand-primary text-white overflow-hidden py-16 md:py-24">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sky/10 rounded-full translate-x-48 -translate-y-24" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full -translate-x-24 translate-y-16" />
                    </div>
                    <div className="relative max-w-5xl mx-auto px-6 sm:px-8 text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-sky mb-4">
                            Help Center & Knowledge Base
                        </p>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-base sm:text-lg text-sky-100 max-w-2xl mx-auto leading-relaxed mb-8">
                            Find clear answers regarding our admission process, residential boarding,
                            therapies, nationwide transport, and sponsorship opportunities at El-Olam.
                        </p>

                        {/* Search Bar */}
                        <div className="max-w-xl mx-auto relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-stone-400" />
                            <input
                                type="text"
                                placeholder="Search questions (e.g. admission, boarding, fees)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-sm bg-white text-stone-900 placeholder-stone-400 text-sm shadow-xl outline-none focus:ring-2 focus:ring-brand-sky"
                            />
                        </div>
                    </div>
                </section>

                {/* Category Tabs */}
                <section className="max-w-7xl mx-auto px-6 sm:px-8 py-8 border-b border-stone-200">
                    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
                        {faqCategories.map((cat) => {
                            const Icon = cat.icon;
                            const isActive = selectedCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    type="button"
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${isActive
                                            ? "bg-brand-primary text-white shadow-md"
                                            : "bg-white text-stone-600 border border-stone-200 hover:border-brand-sky hover:text-brand-primary"
                                        }`}
                                >
                                    <Icon className="size-4" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* FAQ List Accordion */}
                <section className="max-w-4xl mx-auto px-6 sm:px-8 py-16 md:py-20">
                    {filteredFAQs.length === 0 ? (
                        <div className="text-center py-16 bg-white border border-stone-200 p-8 rounded-sm">
                            <HelpCircle className="size-12 text-stone-300 mx-auto mb-4" />
                            <h3 className="font-serif text-xl text-brand-primary mb-2">
                                No matching questions found
                            </h3>
                            <p className="text-stone-500 text-sm mb-6">
                                Try searching for another term or contact our team directly on WhatsApp.
                            </p>
                            <a
                                href="https://wa.me/2348122646941"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-widest transition-all"
                            >
                                <MessageCircle className="size-4" />
                                Chat on WhatsApp
                            </a>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {filteredFAQs.map((faq, index) => {
                                const isOpen = openIndex === index;
                                return (
                                    <div
                                        key={faq.question}
                                        className="border border-stone-200 bg-white rounded-sm overflow-hidden transition-all hover:border-brand-sky/60"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => toggleFAQ(index)}
                                            className="w-full px-6 py-5 flex items-center justify-between text-left gap-4"
                                        >
                                            <span className="font-serif text-lg text-brand-primary font-medium">
                                                {faq.question}
                                            </span>
                                            <ChevronDown
                                                className={`size-5 text-brand-primary flex-none transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                                                    }`}
                                            />
                                        </button>

                                        {isOpen && (
                                            <div className="px-6 pb-6 pt-2 text-stone-600 text-sm leading-relaxed border-t border-stone-100">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Bottom Contact Banner */}
                <section className="bg-sky-50 border-t border-brand-sky/20 py-16 px-6 sm:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-3">
                            Still Have Questions?
                        </p>
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-primary mb-4">
                            Our team is here to help your family.
                        </h2>
                        <p className="text-stone-600 max-w-xl mx-auto text-sm leading-relaxed mb-8">
                            Reach out to our clinical and admissions support team for personal guidance,
                            facility visits, or custom rehabilitation inquiries.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href="https://wa.me/2348122646941"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest shadow-lg transition-all rounded-sm"
                            >
                                <MessageCircle className="size-4" />
                                Chat on WhatsApp
                            </a>
                            <Link
                                href="/admission"
                                className="bg-brand-primary hover:bg-sky-950 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest shadow-lg transition-all rounded-sm"
                            >
                                Start Admission
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
