import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "El-Olam Special Home & Rehabilitation Center",
    description:
        "Offering occupational therapy, assistive technologies, and specialized education scholarships to ensure no child with disabilities is left behind.",
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
