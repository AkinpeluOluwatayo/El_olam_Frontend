import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type RichSection = {
    eyebrow?: string;
    heading: string;
    body: ReactNode;
    image?: string;
    imageAlt?: string;
    imageAlign?: "left" | "right";
};

export type RichStat = {
    value: string;
    label: string;
};

export type RichTimelineStep = {
    step: string;
    title: string;
    description: string;
};

export type RichPageProps = {
    eyebrow?: string;
    title: string;
    lede: string;

    heroImage?: string;
    heroImageAlt?: string;

    stats?: RichStat[];

    sections?: RichSection[];

    bullets?: {
        title: string;
        body: string;
    }[];

    timelineSteps?: RichTimelineStep[];

    ctaTitle: string;
    ctaBody: string;
    ctaPrimary: {
        label: string;
        to: string;
    };
    ctaSecondary?: {
        label: string;
        to: string;
    };
};

function ImageBlock({
                        src,
                        alt,
                        className = "",
                    }: {
    src: string;
    alt: string;
    className?: string;
}) {
    return (
        <div
            className={`relative aspect-[4/3] w-full overflow-hidden bg-sky-100 border border-brand-sky/30 ${className}`}
        >
            <Image
                src={src}
                alt={alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
            />

            <div className="absolute inset-3 border border-white/20 pointer-events-none z-10" />
        </div>
    );
}

export function RichPage({
                             eyebrow,
                             title,
                             lede,
                             heroImage,
                             heroImageAlt = "El-Olam Special Home and Rehabilitation Center",
                             stats,
                             sections = [],
                             bullets,
                             timelineSteps,
                             ctaTitle,
                             ctaBody,
                             ctaPrimary,
                             ctaSecondary,
                         }: RichPageProps) {
    return (
        <div className="bg-brand-surface">
            {/* =========================================================
                HERO
            ========================================================= */}
            <section className="relative bg-brand-primary text-white overflow-hidden">
                {/* Decorative background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sky/10 rounded-full translate-x-48 -translate-y-24" />

                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/5 rounded-full -translate-x-24 translate-y-16" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-28 grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Hero content */}
                    <div>
                        {eyebrow && (
                            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-sky mb-6">
                                {eyebrow}
                            </p>
                        )}

                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight mb-6">
                            {title}
                        </h1>

                        <p className="text-base sm:text-lg text-sky-100 leading-relaxed max-w-xl">
                            {lede}
                        </p>
                    </div>

                    {/* Hero image */}
                    {heroImage && (
                        <div className="md:justify-self-end w-full max-w-md">
                            <ImageBlock
                                src={heroImage}
                                alt={heroImageAlt}
                                className="shadow-2xl"
                            />
                        </div>
                    )}
                </div>
            </section>

            {/* =========================================================
                STATS
            ========================================================= */}
            {stats && stats.length > 0 && (
                <section className="border-b border-stone-200 bg-white">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 md:py-12 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 md:gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className={`${
                                    index !== stats.length - 1
                                        ? "md:border-r md:border-stone-100"
                                        : ""
                                } md:pr-8`}
                            >
                                <div className="font-serif text-3xl sm:text-4xl text-brand-primary mb-2">
                                    {stat.value}
                                </div>

                                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-stone-500">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* =========================================================
                CONTENT SECTIONS
            ========================================================= */}
            {sections.length > 0 && (
                <section className="max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-20 space-y-20 md:space-y-28">
                    {sections.map((section, index) => {
                        const imageRight = section.imageAlign
                            ? section.imageAlign === "right"
                            : index % 2 === 0;

                        return (
                            <div
                                key={section.heading}
                                className="grid md:grid-cols-2 gap-10 md:gap-12 lg:gap-16 items-center"
                            >
                                {/* Text */}
                                <div
                                    className={
                                        imageRight
                                            ? "md:order-1"
                                            : "md:order-2"
                                    }
                                >
                                    {section.eyebrow && (
                                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">
                                            {section.eyebrow}
                                        </p>
                                    )}

                                    <h2 className="font-serif text-3xl md:text-4xl text-brand-primary mb-6 leading-tight">
                                        {section.heading}
                                    </h2>

                                    <div className="text-stone-600 leading-relaxed space-y-4">
                                        {section.body}
                                    </div>
                                </div>

                                {/* Image */}
                                <div
                                    className={
                                        imageRight
                                            ? "md:order-2"
                                            : "md:order-1"
                                    }
                                >
                                    {section.image && (
                                        <ImageBlock
                                            src={section.image}
                                            alt={
                                                section.imageAlt ??
                                                section.heading
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </section>
            )}

            {/* =========================================================
                BULLET / PILLAR CARDS
            ========================================================= */}
            {bullets && bullets.length > 0 && (
                <section className="bg-white border-y border-stone-200">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 md:py-20">
                        <div className="grid md:grid-cols-3 gap-8">
                            {bullets.map((bullet, index) => (
                                <div
                                    key={bullet.title}
                                    className="border border-stone-200 p-8 hover:border-brand-sky hover:shadow-md transition-all group"
                                >
                                    <div className="font-serif text-3xl text-brand-sky mb-3 group-hover:text-brand-primary transition-colors">
                                        {String(index + 1).padStart(2, "0")}
                                    </div>

                                    <h3 className="font-serif text-xl text-brand-primary mb-3">
                                        {bullet.title}
                                    </h3>

                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        {bullet.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* =========================================================
                TIMELINE
            ========================================================= */}
            {timelineSteps && timelineSteps.length > 0 && (
                <section className="max-w-5xl mx-auto px-6 sm:px-8 py-16 md:py-20">
                    <div className="space-y-0">
                        {timelineSteps.map((step, index) => (
                            <div
                                key={step.title}
                                className="flex gap-5 md:gap-8 pb-12 last:pb-0 relative"
                            >
                                {/* Vertical line */}
                                {index < timelineSteps.length - 1 && (
                                    <div className="absolute left-5 top-12 bottom-0 w-px bg-brand-sky/30" />
                                )}

                                {/* Number */}
                                <div className="flex-none size-10 rounded-full bg-brand-primary text-white flex items-center justify-center text-xs font-bold z-10">
                                    {step.step}
                                </div>

                                {/* Text */}
                                <div className="pt-1.5">
                                    <h3 className="font-serif text-xl text-brand-primary mb-2">
                                        {step.title}
                                    </h3>

                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* =========================================================
                CTA
            ========================================================= */}
            <section className="bg-brand-primary text-white relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-sky/10 rounded-full" />

                    <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-brand-accent/10 rounded-full" />
                </div>

                <div className="relative max-w-5xl mx-auto px-6 sm:px-8 py-16 md:py-20 text-center">
                    <h2 className="font-serif text-3xl md:text-4xl mb-4">
                        {ctaTitle}
                    </h2>

                    <p className="text-sky-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                        {ctaBody}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href={ctaPrimary.to}
                            className="bg-brand-accent text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg rounded-sm"
                        >
                            {ctaPrimary.label}
                        </Link>

                        {ctaSecondary && (
                            <Link
                                href={ctaSecondary.to}
                                className="border-2 border-white/60 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-primary transition-colors rounded-sm"
                            >
                                {ctaSecondary.label}
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}