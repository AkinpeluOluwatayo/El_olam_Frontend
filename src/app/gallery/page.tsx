"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Image from "next/image";
import { useState } from "react";
import { ZoomIn, Play, ExternalLink, Video, Youtube, Facebook, Image as ImageIcon } from "lucide-react";

const galleryImages = [
    {
        src: "/images/Service1.jpeg",
        alt: "Children in therapy session at El-Olam",
        category: "Therapy",
    },
    {
        src: "/images/Service2.jpeg",
        alt: "Group rehabilitation activities",
        category: "Therapy",
    },
    {
        src: "/images/Service3.jpeg",
        alt: "Occupational therapy session",
        category: "Therapy",
    },
    {
        src: "/images/Sevice4.jpeg",
        alt: "Vocational training workshop",
        category: "Vocational",
    },
    {
        src: "/images/Service5.jpeg",
        alt: "Community outreach program",
        category: "Outreach",
    },
    {
        src: "/images/Service6.jpeg",
        alt: "Special education advocacy session",
        category: "Education",
    },
    {
        src: "/images/Service7.jpeg",
        alt: "Children at El-Olam facility",
        category: "Facility",
    },
    {
        src: "/images/landingPageBackground.jpeg",
        alt: "El-Olam Special Home exterior",
        category: "Facility",
    },
    {
        src: "/images/8 Engaging Activities for Children with Limited Mobility.jpeg",
        alt: "Engaging activities for children with limited mobility",
        category: "Therapy",
    },
];

const featuredVideos = [
    {
        id: "yt-1",
        title: "Support Missionary Aids (SUMA) Visit",
        type: "youtube",
        youtubeId: "TAQgSDq0ozE",
        url: "https://youtu.be/TAQgSDq0ozE",
        embedUrl: "https://www.youtube.com/embed/TAQgSDq0ozE?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/TAQgSDq0ozE/hqdefault.jpg",
    },
    {
        id: "yt-2",
        title: "El-Olam Rehabilitation Fellowship Service",
        type: "youtube",
        youtubeId: "M3xhIfs_QT4",
        url: "https://youtu.be/M3xhIfs_QT4",
        embedUrl: "https://www.youtube.com/embed/M3xhIfs_QT4?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/M3xhIfs_QT4/hqdefault.jpg",
    },
    {
        id: "yt-3",
        title: "Children Therapy Progress & Activities",
        type: "youtube",
        youtubeId: "HxCBtim6FYM",
        url: "https://youtu.be/HxCBtim6FYM",
        embedUrl: "https://www.youtube.com/embed/HxCBtim6FYM?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/HxCBtim6FYM/hqdefault.jpg",
    },
    {
        id: "yt-4",
        title: "El-Olam Rehabilitation Permanent Site",
        type: "youtube",
        youtubeId: "qjghKqdBawQ",
        url: "https://youtu.be/qjghKqdBawQ",
        embedUrl: "https://www.youtube.com/embed/qjghKqdBawQ?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/qjghKqdBawQ/hqdefault.jpg",
    },
    {
        id: "yt-5",
        title: "Special Child BirthDay Celeration (Timileyin)",
        type: "youtube",
        youtubeId: "XxKxvMMepo0",
        url: "https://youtu.be/XxKxvMMepo0",
        embedUrl: "https://www.youtube.com/embed/XxKxvMMepo0?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/XxKxvMMepo0/hqdefault.jpg",
    },
    {
        id: "yt-6",
        title: "El-Olam Special Home won First Position 2 years in a row",
        type: "youtube",
        youtubeId: "aNEVmCfpHcs",
        url: "https://youtu.be/aNEVmCfpHcs",
        embedUrl: "https://www.youtube.com/embed/aNEVmCfpHcs?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/aNEVmCfpHcs/hqdefault.jpg",
    },
    {
        id: "yt-7",
        title: "El-Olam Special Home Founder and CEO Wishes Happy international Disabity Day",
        type: "youtube",
        youtubeId: "pAPVUF-wTzk",
        url: "https://youtu.be/pAPVUF-wTzk",
        embedUrl: "https://www.youtube.com/embed/pAPVUF-wTzk?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/pAPVUF-wTzk/hqdefault.jpg",
    },
    {
        id: "yt-8",
        title: "El-Olam Special Home Director Wishes Happy international Disabity Day",
        type: "youtube",
        youtubeId: "ODYEqyW4VH4",
        url: "https://youtu.be/ODYEqyW4VH4",
        embedUrl: "https://www.youtube.com/embed/ODYEqyW4VH4?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/ODYEqyW4VH4/hqdefault.jpg",
    },
    {
        id: "yt-9",
        title: "Special Rehabilitation Program Overview ",
        type: "youtube",
        youtubeId: "Z1jK3X6bZDk",
        url: "https://youtu.be/Z1jK3X6bZDk",
        embedUrl: "https://www.youtube.com/embed/Z1jK3X6bZDk?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/Z1jK3X6bZDk/hqdefault.jpg",
    },
    {
        id: "yt-10",
        title: "Disability Helping Another Disabiled child",
        type: "youtube",
        youtubeId: "3V0iWUhNQzg",
        url: "https://youtu.be/3V0iWUhNQzg",
        embedUrl: "https://www.youtube.com/embed/3V0iWUhNQzg?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/3V0iWUhNQzg/hqdefault.jpg",
    },
    {
        id: "yt-11",
        title: "El-Olam Daily Life & Special Home Care",
        type: "youtube",
        youtubeId: "HjtYe-iEF9E",
        url: "https://youtu.be/HjtYe-iEF9E",
        embedUrl: "https://www.youtube.com/embed/HjtYe-iEF9E?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/HjtYe-iEF9E/hqdefault.jpg",
    },
    {
        id: "yt-12",
        title: "Therapy & Special Child Care Sessions",
        type: "youtube",
        youtubeId: "TPo9B4L4fGo",
        url: "https://youtu.be/TPo9B4L4fGo",
        embedUrl: "https://www.youtube.com/embed/TPo9B4L4fGo?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/TPo9B4L4fGo/hqdefault.jpg",
    },
    {
        id: "yt-13",
        title: "El-Olam Special Home Adopts 1 Week old Baby Girl",
        type: "youtube",
        youtubeId: "K6byaQ4g2DU",
        url: "https://youtu.be/K6byaQ4g2DU",
        embedUrl: "https://www.youtube.com/embed/K6byaQ4g2DU?autoplay=1",
        thumbnail: "https://img.youtube.com/vi/K6byaQ4g2DU/hqdefault.jpg",
    },
    {
        id: "fb-1",
        title: "Therapy & Special Rehabilitation Session",
        type: "facebook",
        url: "https://www.facebook.com/share/v/1DY4zxLqMf/?mibextid=UalRPS",
        embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent("https://www.facebook.com/share/v/1DY4zxLqMf/?mibextid=UalRPS")}&show_text=false&width=560`,
        thumbnail: "/images/Service1.jpeg",
    },
    {
        id: "fb-2",
        title: "El-Olam Outreach Special Education Session",
        type: "facebook",
        url: "https://www.facebook.com/share/v/1Gk5GB8sVa/?mibextid=UalRPS",
        embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent("https://www.facebook.com/share/v/1Gk5GB8sVa/?mibextid=UalRPS")}&show_text=false&width=560`,
        thumbnail: "/images/Service2.jpeg",
    },
];

const categories = ["All", "Therapy", "Vocational", "Outreach", "Education", "Facility"];

export default function GalleryPage() {
    const [viewMode, setViewMode] = useState<"all" | "photos" | "videos">("all");
    const [activeCategory, setActiveCategory] = useState("All");
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
    const [lightboxAlt, setLightboxAlt] = useState<string>("");
    const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

    const filteredImages =
        activeCategory === "All"
            ? galleryImages
            : galleryImages.filter((img) => img.category === activeCategory);

    return (
        <div>
            <Header />
            <main>
                {/* Hero */}
                <section className="relative bg-brand-primary text-white overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-sky/10 rounded-full translate-x-48 -translate-y-24" />
                    </div>
                    <div className="relative max-w-7xl mx-auto px-6 sm:px-8 py-20 md:py-28">
                        <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-sky mb-6">
                            Gallery &amp; Video Media
                        </p>
                        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-tight mb-4 max-w-3xl">
                            Moments of progress, hope, and joy.
                        </h1>
                        <p className="text-base sm:text-lg text-sky-100 leading-relaxed max-w-2xl">
                            Explore our video highlights and photo archives capturing daily life, therapy sessions, YouTube &amp; Facebook video features, and milestones at El-Olam.
                        </p>
                    </div>
                </section>

                {/* Top View Mode Selector */}
                <section className="bg-stone-100 border-b border-stone-200">
                    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setViewMode("all")}
                                className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${viewMode === "all"
                                        ? "bg-brand-primary text-white shadow-sm"
                                        : "bg-white text-stone-700 hover:bg-stone-200"
                                    }`}
                            >
                                <Video className="size-4" /> All Media ({featuredVideos.length + galleryImages.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode("videos")}
                                className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${viewMode === "videos"
                                        ? "bg-brand-primary text-white shadow-sm"
                                        : "bg-white text-stone-700 hover:bg-stone-200"
                                    }`}
                            >
                                <Youtube className="size-4 text-red-500" /> Videos ({featuredVideos.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setViewMode("photos")}
                                className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-sm transition-all ${viewMode === "photos"
                                        ? "bg-brand-primary text-white shadow-sm"
                                        : "bg-white text-stone-700 hover:bg-stone-200"
                                    }`}
                            >
                                <ImageIcon className="size-4 text-brand-sky" /> Photo Gallery ({galleryImages.length})
                            </button>
                        </div>
                    </div>
                </section>

                {/* Videos Section */}
                {(viewMode === "all" || viewMode === "videos") && (
                    <section className="bg-stone-50 border-b border-stone-200 py-12 md:py-16">
                        <div className="max-w-7xl mx-auto px-6 sm:px-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <div className="flex items-center gap-2 text-brand-primary mb-2">
                                        <Youtube className="size-5 text-red-600" />
                                        <p className="text-[11px] font-bold uppercase tracking-[0.3em]">
                                            Video Highlights ({featuredVideos.length})
                                        </p>
                                    </div>
                                    <h2 className="font-serif text-3xl md:text-4xl text-brand-primary">
                                        Watch El-Olam in Action
                                    </h2>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredVideos.map((video) => (
                                    <div
                                        key={video.id}
                                        className="bg-white border border-stone-200 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                                    >
                                        <div className="relative aspect-video bg-black flex-none">
                                            {playingVideoId === video.id ? (
                                                <iframe
                                                    src={video.embedUrl}
                                                    className="w-full h-full border-0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    allowFullScreen
                                                    title={video.title}
                                                />
                                            ) : (
                                                <div
                                                    className="relative w-full h-full group cursor-pointer"
                                                    onClick={() => setPlayingVideoId(video.id)}
                                                >
                                                    <Image
                                                        src={video.thumbnail}
                                                        alt={video.title}
                                                        fill
                                                        unoptimized={video.type === "youtube"}
                                                        className="object-cover opacity-85 group-hover:opacity-95 transition-opacity"
                                                    />
                                                    <div className="absolute inset-0 bg-brand-primary/30 group-hover:bg-brand-primary/20 transition-all flex items-center justify-center">
                                                        <div className="size-14 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                                            <Play className="size-7 ml-1" />
                                                        </div>
                                                    </div>
                                                    <span className="absolute top-3 left-3 bg-black/75 text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm flex items-center gap-1">
                                                        {video.type === "youtube" ? (
                                                            <>
                                                                <Youtube className="size-3.5 text-red-500" /> YouTube
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Facebook className="size-3.5 text-blue-400" /> Facebook
                                                            </>
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5 flex flex-col justify-between flex-1">
                                            <div>
                                                <h3 className="font-serif text-lg text-brand-primary mb-2 line-clamp-2">
                                                    {video.title}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-3 pt-3 mt-auto border-t border-stone-100">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setPlayingVideoId(playingVideoId === video.id ? null : video.id)
                                                    }
                                                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-brand-primary text-white px-3.5 py-1.5 rounded-sm hover:bg-sky-950 transition-colors"
                                                >
                                                    <Play className="size-3" />
                                                    {playingVideoId === video.id ? "Close" : "Play"}
                                                </button>
                                                <a
                                                    href={video.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-stone-600 hover:text-brand-primary transition-colors ml-auto"
                                                >
                                                    Open Link <ExternalLink className="size-3" />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Filter Tabs for Photo Gallery */}
                {(viewMode === "all" || viewMode === "photos") && (
                    <>
                        <section className="bg-white border-b border-stone-200 sticky top-[69px] z-30">
                            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
                                <div className="flex gap-3">
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            type="button"
                                            onClick={() => setActiveCategory(cat)}
                                            className={`shrink-0 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all ${activeCategory === cat
                                                    ? "bg-brand-primary text-white"
                                                    : "border border-stone-300 text-stone-600 hover:border-brand-primary hover:text-brand-primary"
                                                }`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </section>

                        {/* Gallery Grid */}
                        <section className="max-w-7xl mx-auto px-6 sm:px-8 py-12 md:py-16">
                            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                                {filteredImages.map((img) => (
                                    <button
                                        key={img.src}
                                        type="button"
                                        className="relative group w-full overflow-hidden block rounded-sm shadow-sm hover:shadow-lg transition-shadow"
                                        onClick={() => {
                                            setLightboxSrc(img.src);
                                            setLightboxAlt(img.alt);
                                        }}
                                    >
                                        <div className="relative w-full aspect-[4/3]">
                                            <Image
                                                src={img.src}
                                                alt={img.alt}
                                                fill
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        </div>
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/40 transition-all duration-300 flex items-center justify-center">
                                            <ZoomIn className="size-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        </div>
                                        {/* Category tag */}
                                        <span className="absolute top-3 left-3 bg-white/90 text-brand-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm">
                                            {img.category}
                                        </span>
                                    </button>
                                ))}
                            </div>

                            {filteredImages.length === 0 && (
                                <div className="text-center py-20 text-stone-400">
                                    <p className="text-lg font-serif">No images in this category yet.</p>
                                </div>
                            )}
                        </section>
                    </>
                )}

                {/* Lightbox */}
                {lightboxSrc && (
                    <div
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setLightboxSrc(null)}
                    >
                        <div className="relative max-w-4xl w-full max-h-[90vh]">
                            <Image
                                src={lightboxSrc}
                                alt={lightboxAlt}
                                width={1200}
                                height={800}
                                className="object-contain w-full h-full max-h-[85vh] rounded-sm"
                            />
                            <button
                                type="button"
                                onClick={() => setLightboxSrc(null)}
                                className="absolute top-3 right-3 bg-white/20 hover:bg-white/40 text-white rounded-full w-9 h-9 flex items-center justify-center text-lg font-bold transition-colors"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                            {lightboxAlt && (
                                <p className="text-center text-white/70 text-sm mt-3">{lightboxAlt}</p>
                            )}
                        </div>
                    </div>
                )}

                {/* Upload Notice CTA */}
                <section className="bg-brand-primary text-white relative overflow-hidden">
                    <div className="relative max-w-5xl mx-auto px-6 sm:px-8 py-16 md:py-20 text-center">
                        <h2 className="font-serif text-3xl md:text-4xl mb-4">
                            More memories being made every day.
                        </h2>
                        <p className="text-sky-100 max-w-2xl mx-auto mb-8 leading-relaxed">
                            Browse our programs, follow our social media channels for the latest
                            updates, or contact us to share photos and stories from your experience
                            at El-Olam.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a
                                href="https://www.instagram.com/el_olamspecialhome?igsh=amRtZHB1OHB0em9p&utm_source=qr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-brand-accent text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg rounded-sm"
                            >
                                Follow on Instagram
                            </a>
                            <a
                                href="https://www.facebook.com/share/19MPc74HK5/?mibextid=LQQJ4d"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border-2 border-white/60 text-white px-8 py-3.5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-brand-primary transition-colors rounded-sm"
                            >
                                Follow on Facebook
                            </a>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
