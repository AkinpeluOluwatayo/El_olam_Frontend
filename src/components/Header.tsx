"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

export function Logo({ size = "md" }: { size?: "sm" | "md" }) {
    const logoWidth = size === "sm" ? 95 : 120;
    const logoHeight = size === "sm" ? 32 : 40;

    return (
        <Link
            href="/"
            className="flex items-center shrink-0"
            aria-label="El-Olam Special Home & Rehabilitation Center"
        >
            <Image
                src="/images/elolamLogo.png"
                alt="El-Olam Special Home & Rehabilitation Center"
                width={logoWidth}
                height={logoHeight}
                priority
                className="h-auto w-auto object-contain"
            />
        </Link>
    );
}

type NavItem = {
    label: string;
    to?: string;
    children?: {
        label: string;
        to: string;
    }[];
};

const navItems: NavItem[] = [
    {
        label: "Home",
        to: "/",
    },
    {
        label: "Who We Are",
        children: [
            {
                label: "About El-Olam",
                to: "/about",
            },
            {
                label: "Our Mission & Vision",
                to: "/about#mission",
            },
            {
                label: "Leadership & Staff",
                to: "/about#leadership",
            },
            {
                label: "Strategic Partners",
                to: "/about#partners",
            },
        ],
    },
    {
        label: "What We Do",
        children: [
            {
                label: "Therapeutic Services",
                to: "/what-we-do/therapeutic-services",
            },
            {
                label: "Occupational Therapy",
                to: "/what-we-do/occupational-therapy",
            },
            {
                label: "Speech Therapy",
                to: "/what-we-do/speech-therapy",
            },
            {
                label: "Self Care",
                to: "/what-we-do/self-care",
            },
            {
                label: "Vocational Trainings",
                to: "/what-we-do/vocational-training",
            },
            {
                label: "Special Ed Advocacy",
                to: "/what-we-do/special-ed-advocacy",
            },
        ],
    },
    {
        label: "Admission",
        to: "/admission",
    },
    {
        label: "Resources",
        children: [
            {
                label: "Publications & Reports",
                to: "/resources",
            },
            {
                label: "Gallery",
                to: "/gallery",
            },
            {
                label: "FAQs",
                to: "/resources#faqs",
            },
        ],
    },
    {
        label: "Get Involved",
        children: [
            {
                label: "Sponsor a Child",
                to: "/sponsor-a-child",
            },
            {
                label: "Donate",
                to: "/donate",
            },
            {
                label: "Volunteer",
                to: "/get-involved#volunteer",
            },
            {
                label: "Corporate Partnerships",
                to: "/get-involved#corporate",
            },
            {
                label: "Monthly Giving",
                to: "/get-involved#monthly",
            },
        ],
    },
];

function NavDropdown({ item }: { item: NavItem }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                type="button"
                className="flex items-center gap-1 py-2 text-stone-700 transition-colors hover:text-brand-primary"
            >
                {item.label}

                <ChevronDown
                    className={`size-3 transition-transform ${open ? "rotate-180" : ""
                        }`}
                />
            </button>

            {open && item.children && (
                <div className="absolute left-0 top-full z-50 min-w-[240px] pt-2">
                    <div className="border-t-2 border-brand-sky bg-white py-2 shadow-xl">
                        {item.children.map((child) => (
                            <Link
                                key={child.to}
                                href={child.to}
                                className="block px-5 py-3 text-[12px] font-semibold uppercase tracking-wide text-stone-700 transition-colors hover:bg-sky-50 hover:text-brand-primary"
                            >
                                {child.label}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
    const [expanded, setExpanded] = useState<string | null>(null);

    return (
        <div className="fixed inset-0 z-50 flex flex-col bg-brand-primary text-white">
            {/* Mobile menu header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <Logo size="sm" />

                <button
                    onClick={onClose}
                    type="button"
                    aria-label="Close menu"
                    className="rounded-full p-2 transition-colors hover:bg-white/10"
                >
                    <X className="size-6 text-white" />
                </button>
            </div>

            {/* Mobile navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-6 py-6">
                {navItems.map((item) => (
                    <div key={item.label}>
                        {item.children ? (
                            <>
                                <button
                                    type="button"
                                    className="flex w-full items-center justify-between py-3 text-left text-sm font-semibold uppercase tracking-wide text-white/80 hover:text-white"
                                    onClick={() =>
                                        setExpanded(
                                            expanded === item.label
                                                ? null
                                                : item.label
                                        )
                                    }
                                >
                                    {item.label}

                                    <ChevronDown
                                        className={`size-4 transition-transform ${expanded === item.label
                                            ? "rotate-180"
                                            : ""
                                            }`}
                                    />
                                </button>

                                {expanded === item.label && (
                                    <div className="space-y-2 pb-3 pl-4">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.to}
                                                href={child.to}
                                                onClick={onClose}
                                                className="block py-2 text-[13px] text-sky-200 transition-colors hover:text-white"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link
                                href={item.to || "/"}
                                onClick={onClose}
                                className="block py-3 text-sm font-semibold uppercase tracking-wide text-white/80 hover:text-white"
                            >
                                {item.label}
                            </Link>
                        )}
                    </div>
                ))}
            </nav>

            {/* Mobile CTA buttons */}
            <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-6">
                <Link
                    href="/sponsor-a-child"
                    onClick={onClose}
                    className="rounded-sm border-2 border-white py-3 text-center text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-brand-primary"
                >
                    Sponsor a Child
                </Link>

                <Link
                    href="/donate"
                    onClick={onClose}
                    className="rounded-sm bg-brand-accent py-3 text-center text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:brightness-110"
                >
                    Donate Now
                </Link>
            </div>
        </div>
    );
}

export function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <header className="sticky top-0 z-40 border-b border-stone-200/50 bg-brand-surface/95 shadow-sm backdrop-blur-sm">
                <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    {/* REAL EL-OLAM LOGO */}
                    <Logo />

                    {/* Desktop navigation */}
                    <div className="hidden items-center gap-7 text-[13px] font-semibold uppercase tracking-wide lg:flex">
                        {navItems.map((item) => (
                            item.children ? (
                                <NavDropdown
                                    key={item.label}
                                    item={item}
                                />
                            ) : (
                                <Link
                                    key={item.label}
                                    href={item.to || "/"}
                                    className="py-2 text-stone-700 transition-colors hover:text-brand-primary"
                                >
                                    {item.label}
                                </Link>
                            )
                        ))}
                    </div>

                    {/* Desktop CTA buttons */}
                    <div className="hidden items-center gap-3 lg:flex">
                        <Link
                            href="/sponsor-a-child"
                            className="rounded-sm border-2 border-brand-primary px-5 py-2 text-xs font-bold uppercase tracking-widest text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
                        >
                            Sponsor a Child
                        </Link>

                        <Link
                            href="/donate"
                            className="rounded-sm bg-brand-primary px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-colors hover:bg-sky-950"
                        >
                            Donate
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        aria-label="Open menu"
                        onClick={() => setMobileOpen(true)}
                        className="p-2 text-stone-700 transition-colors hover:text-brand-primary lg:hidden"
                    >
                        <Menu className="size-6" />
                    </button>
                </nav>
            </header>

            {/* Mobile menu */}
            {mobileOpen && (
                <MobileMenu
                    onClose={() => setMobileOpen(false)}
                />
            )}
        </>
    );
}