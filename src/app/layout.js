import "./globals.css";
import React from 'react';
import { Toaster } from 'react-hot-toast';

export const metadata = {
    title: "El-Olam Special Home & Rehabilitation Center",
    description: "Nurturing Every Unique Potential - Providing compassionate care and specialized rehabilitation for children with neurodiverse needs.",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className="antialiased">
                <Toaster position="top-center" reverseOrder={false} />
                {children}
            </body>
        </html>
    );
}
