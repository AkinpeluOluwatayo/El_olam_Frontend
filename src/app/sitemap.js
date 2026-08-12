export default function sitemap() {
    const base = 'https://elolamspecialhomeandrehabilitationcenter.vercel.app';
    const now = new Date();

    return [
        { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
        { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${base}/admission`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${base}/gallery`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${base}/donate`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${base}/sponsor-a-child`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
        { url: `${base}/get-involved`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/programs`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/resources`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${base}/what-we-do/therapeutic-services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/what-we-do/occupational-therapy`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/what-we-do/speech-therapy`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/what-we-do/self-care`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/what-we-do/vocational-training`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${base}/what-we-do/special-ed-advocacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ];
}