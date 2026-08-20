"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

export function PromoModal() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const lastSeenTimestamp = localStorage.getItem("hasSeenPromoModal");
        const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

        if (
            !lastSeenTimestamp ||
            Date.now() - Number(lastSeenTimestamp) > ONE_DAY_IN_MS
        ) {
            setIsOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem("hasSeenPromoModal", Date.now().toString());
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={handleClose}
            className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-lg w-full p-5 flex flex-col items-center overflow-hidden"
            >
                {/* Close "X" Button */}
                <button
                    type="button"
                    onClick={handleClose}
                    aria-label="Close modal"
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 cursor-pointer transition-colors"
                >
                    <X className="size-4" />
                </button>

                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-stone-100">
                    <Image
                        src="/images/officialPromoBanner.png"
                        alt="El-Olam Special Home & Rehabilitation Center - Disability is not Inability Promo"
                        fill
                        sizes="(max-width: 768px) 100vw, 500px"
                        className="object-cover"
                        priority
                    />
                </div>

                {/* Action Button */}
                <button
                    type="button"
                    onClick={handleClose}
                    className="w-full bg-brand-primary hover:bg-sky-950 text-white py-3 px-6 rounded-xl font-semibold text-sm uppercase tracking-wider transition-colors shadow-md"
                >
                    Continue to Site
                </button>
            </div>
        </div>
    );
}
