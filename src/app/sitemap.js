export default function sitemap() {
    return [
        {
            url: 'https://elolamspecialhomeandrehabilitationcenter.vercel.app/',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },

        {
            url: 'https://elolamspecialhomeandrehabilitationcenter.vercel.app/aboutUs',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },

        {
            url: 'https://elolamspecialhomeandrehabilitationcenter.vercel.app/elolamServices',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://elolamspecialhomeandrehabilitationcenter.vercel.app/donate',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ]
}