"use client";

import Link from "next/link";
import { Logo } from "@/components/Header";
import { useState } from "react";
import { Send, Facebook, Instagram } from "lucide-react";

const footerLinks = {
    Organization: [
        { label: "About Us", href: "/about" },
        { label: "Leadership", href: "/about#leadership" },
        { label: "Annual Report", href: "/about#report" },
        { label: "Partners", href: "/about#partners" },
    ],
    Programs: [
        { label: "Therapeutic Services", href: "/programs#therapy" },
        { label: "Assistive Technology", href: "/programs#assistive-tech" },
        { label: "Special Ed Advocacy", href: "/programs#education" },
        { label: "Outreach Clinics", href: "/programs#clinics" },
    ],
    "Get Involved": [
        { label: "Sponsor a Child", href: "/sponsor-a-child" },
        { label: "Donate", href: "/donate" },
        { label: "Volunteer", href: "/get-involved#volunteer" },
        { label: "Corporate Partnerships", href: "/get-involved#corporate" },
    ],
};

export function Footer() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.trim()) {
            setSubmitted(true);
        }
    };

    return (
        <footer className="border-t border-stone-200 py-20 px-8 bg-brand-surface">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-12">
                {/* Brand column */}
                <div className="max-w-xs">
                    <div className="mb-6">
                        <Logo size="sm" />
                    </div>
                    <p className="text-stone-500 text-sm leading-relaxed mb-6">
                        El-Olam Special Home &amp; Rehabilitation Center is a registered
                        non-profit dedicated to unlocking the potential of children with
                        disabilities across Nigeria.
                    </p>
                    <div className="space-y-1 text-sm text-stone-500 mb-6">
                        <p>📍 Ogun State, Nigeria</p>
                        <p>📧 elolamspecialandrehabilitation@gmail.com</p>
                        <p>📞 08122646941</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <a
                            href="https://www.facebook.com/share/19MPc74HK5/?mibextid=LQQJ4d"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center size-10 bg-stone-100 text-stone-700 rounded-full hover:bg-brand-primary hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            title="Facebook"
                            aria-label="Visit our Facebook page"
                        >
                            <Facebook className="size-5" />
                        </a>
                        <a
                            href="https://www.instagram.com/el_olamspecialhome?igsh=amRtZHB1OHB0em9p&utm_source=qr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center size-10 bg-stone-100 text-stone-700 rounded-full hover:bg-brand-primary hover:text-white transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                            title="Instagram"
                            aria-label="Visit our Instagram profile"
                        >
                            <Instagram className="size-5" />
                        </a>
                    </div>
                </div>

                {/* Navigation columns */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-10 md:gap-16">
                    {Object.entries(footerLinks).map(([heading, links]) => (
                        <div key={heading}>
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6">
                                {heading}
                            </h3>
                            <ul className="space-y-4 text-sm font-medium text-stone-600">
                                {links.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-brand-primary transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Newsletter */}
                <div className="lg:min-w-[240px]">
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-6">
                        Stay Updated
                    </h3>
                    <p className="text-sm text-stone-500 mb-4 leading-relaxed">
                        Get news on children&apos;s rehabilitation, therapy updates, and ways to
                        help.
                    </p>
                    {submitted ? (
                        <div className="bg-sky-50 border border-brand-sky text-brand-primary px-4 py-3 text-sm rounded-sm">
                            ✓ Thank you for subscribing!
                        </div>
                    ) : (
                        <form className="flex" onSubmit={handleSubmit}>
                            <label htmlFor="newsletter-email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="newsletter-email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                                required
                                className="bg-stone-100 border border-stone-200 px-4 py-2.5 text-sm w-full outline-none focus:ring-2 focus:ring-brand-sky focus:border-transparent"
                            />
                            <button
                                type="submit"
                                className="bg-brand-primary text-white px-4 py-2.5 text-xs font-bold hover:bg-sky-950 transition-colors flex items-center gap-1.5"
                            >
                                <Send className="size-3" />
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-stone-100 flex flex-col md:flex-row gap-4 md:justify-between md:items-center text-[10px] uppercase tracking-widest text-stone-400 font-bold">
                <span>© {new Date().getFullYear()} El-Olam Special Home &amp; Rehabilitation Center</span>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-brand-primary transition-colors">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-brand-primary transition-colors">
                        Terms of Service
                    </a>
                    <a href="#" className="hover:text-brand-primary transition-colors">
                        Charity Registration
                    </a>
                </div>
            </div>
        </footer>
    );
}
