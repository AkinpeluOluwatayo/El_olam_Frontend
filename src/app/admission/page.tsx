"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ClipboardCheck, UserCheck, GraduationCap, CheckCircle } from "lucide-react";

const admissionSteps = [
    {
        step: "01",
        icon: ClipboardCheck,
        title: "Online Registration & Assessment Form",
        description:
            "Begin by completing our online registration form and paying the non-refundable registration and assessment fee. This secures your slot in our intake queue and initiates your child's file.",
    },
    {
        step: "02",
        icon: UserCheck,
        title: "Physical Assessment Appointment",
        description:
            "Following registration, our team will contact you within 5–7 working days to schedule a physical assessment at our center. Our multidisciplinary team evaluates your child's needs and strengths.",
    },
    {
        step: "03",
        icon: GraduationCap,
        title: "Care Plan & Placement Decision",
        description:
            "Based on the assessment, our team develops a tailored care and therapy plan, and determines the appropriate placement — boarding or day student — best suited to your child's needs and family circumstances.",
    },
    {
        step: "04",
        icon: CheckCircle,
        title: "Enrollment Confirmation & Onboarding",
        description:
            "Once placement is agreed, you'll receive your enrollment pack with all documentation, fees schedule, and orientation details. Your child's journey at El-Olam officially begins.",
    },
];

const systemFeatures = [
    {
        system: "Day Student",
        description:
            "Children attend the center during school hours, receiving therapy, education, and skills training before returning home in the evening. Ideal for families who want to remain closely involved in day-to-day care.",
        highlights: [
            "Morning to afternoon schedule",
            "Full therapy program included",
            "Daily parent communication",
            "Transport support available",
        ],
    },
    {
        system: "Boarding",
        description:
            "Children reside at the El-Olam facility in a structured, nurturing residential environment. Boarding is recommended for children requiring intensive support or whose families are located further away.",
        highlights: [
            "24/7 supervised residential care",
            "Structured daily therapy routine",
            "Safe, sensory-designed dormitories",
            "Regular family visit schedules",
        ],
    },
];

export default function AdmissionPage() {
    return (
        <div>
            <Header />
            <main>
                {/* Hero */}
                <section className="relative bg-brand-primary text-white overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sky/10 rounded-full translate-x-48 -translate-y-24" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full -translate-x-24 translate-y-16" />
                    </div>
                    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-28">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-sky mb-6">
                            Admissions
                        </p>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight mb-6 max-w-3xl">
                            Begin your child&apos;s journey with El-Olam.
                        </h1>
                        <p className="text-base sm:text-lg text-sky-100 leading-relaxed max-w-2xl mb-10">
                            We offer both Boarding and Day Student placements. Our structured
                            admissions process ensures every child is thoroughly assessed and
                            enrolled into the program that best supports their unique needs.
                        </p>
                        <a
                            href="https://wa.me/2348122646941"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-400 text-white px-8 py-4 rounded-sm text-xs font-bold uppercase tracking-widest shadow-xl transition-all"
                        >
                            <MessageCircle className="size-4" />
                            Chat With Us on WhatsApp
                        </a>
                    </div>
                </section>

                {/* Boarding vs Day System */}
                <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-24">
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">
                        Our Systems
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl text-brand-primary mb-12 max-w-2xl leading-tight">
                        Two pathways. One mission.
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {systemFeatures.map((s) => (
                            <div
                                key={s.system}
                                className="border border-stone-200 p-8 hover:border-brand-sky hover:shadow-md transition-all bg-white"
                            >
                                <h3 className="font-serif text-2xl text-brand-primary mb-3">
                                    {s.system}
                                </h3>
                                <p className="text-stone-600 text-sm leading-relaxed mb-6">
                                    {s.description}
                                </p>
                                <ul className="space-y-2">
                                    {s.highlights.map((h) => (
                                        <li key={h} className="flex items-center gap-2 text-sm text-stone-700">
                                            <CheckCircle className="size-4 text-brand-primary flex-none" />
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Admission Process Timeline */}
                <section className="bg-white border-y border-stone-200 py-16 md:py-24">
                    <div className="max-w-4xl mx-auto px-6 sm:px-8">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">
                            Admission Process
                        </p>
                        <h2 className="font-serif text-3xl md:text-4xl text-brand-primary mb-12 leading-tight">
                            Four clear steps to enrollment.
                        </h2>
                        <div className="space-y-0">
                            {admissionSteps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={step.step}
                                        className="flex gap-6 md:gap-8 pb-12 last:pb-0 relative"
                                    >
                                        {index < admissionSteps.length - 1 && (
                                            <div className="absolute left-5 top-12 bottom-0 w-px bg-brand-sky/30" />
                                        )}
                                        <div className="flex-none size-10 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-bold z-10">
                                            {step.step}
                                        </div>
                                        <div className="pt-1.5">
                                            <div className="flex items-center gap-3 mb-2">
                                                <Icon className="size-5 text-brand-primary" />
                                                <h3 className="font-serif text-xl text-brand-primary">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="text-stone-600 text-sm leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Important Note on Non-Refundable Fee */}
                <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12">
                    <div className="bg-sky-50 border border-brand-sky/30 p-6 rounded-sm">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-primary mb-2">
                            Please Note
                        </p>
                        <p className="text-stone-700 text-sm leading-relaxed">
                            The registration and assessment fee paid at Step 1 is{" "}
                            <strong>non-refundable</strong>. It covers the administrative and clinical
                            cost of processing your child&apos;s application and conducting the initial
                            assessment. We encourage all families to review the admissions process
                            in full before applying. If you have any questions, please reach out to
                            our team on WhatsApp before proceeding.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section className="bg-brand-primary text-white relative overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-sky/10 rounded-full" />
                        <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-brand-accent/10 rounded-full" />
                    </div>
                    <div className="relative max-w-5xl mx-auto px-6 sm:px-8 py-16 md:py-20 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl mb-4">
                            Ready to take the first step?
                        </h2>
                        <p className="text-sky-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                            Our admissions team is available via WhatsApp to answer your questions,
                            guide you through the form, and help you understand if El-Olam is the
                            right place for your child.
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
                                href="/donate"
                                className="border-2 border-white/60 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-primary transition-colors rounded-sm"
                            >
                                Support Our Mission
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
