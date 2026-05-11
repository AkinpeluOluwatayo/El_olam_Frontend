import "./globals.css";
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google';

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

export const metadata = {
    title: "El-Olam Special Home & Rehabilitation Center",
    description: "Nurturing Every Unique Potential - Providing compassionate care and specialized rehabilitation for children with neurodiverse needs.",

    verification: {

        google: "s4-GmRtqfafuXKy_ZMihptT3EH-OD1PhAfr1Szq_agw",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={inter.className}>
            <body className="antialiased">
                <Toaster position="top-center" reverseOrder={false} />
                {children}
            </body>
        </html>
    );
}