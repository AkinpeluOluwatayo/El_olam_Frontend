import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Leading Rehabilitation Center in Nigeria | Serving Ogun, Lagos & South-West",
    description:
        "Premier rehabilitation center in Nigeria. Offering confidential addiction recovery, mental health care, and residential support serving Mowe, Ogun, Lagos, and nationwide.",
    verification: {
        google: "s4-GmRtqfafuXKy_ZMihptT3EH-OD1PhAfr1Szq_agw",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen bg-brand-surface font-sans">
                {children}
            </body>
        </html>
    );
}
