import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichPage } from "@/components/RichPage";

export const metadata = {
    title: "Get Involved | El-Olam Special Home & Rehabilitation Center",
    description:
        "Join El-Olam as a volunteer, corporate partner, monthly donor, or regional hub supporter. Your involvement amplifies every child's chance.",
};

export default function GetInvolvedPage() {
    return (
        <div>
            <Header />
            <main>
                <RichPage
                    eyebrow="Get Involved"
                    title="There are many ways to champion a child."
                    lede="Whether you give your time, your skills, or your resources — every act of support amplifies what's possible for children with disabilities across Nigeria."
                    stats={[
                        { value: "500+", label: "Active Volunteers" },
                        { value: "40+", label: "Corporate Partners" },
                        { value: "2,400+", label: "Monthly Donors" },
                        { value: "12", label: "Regional Support Hubs" },
                    ]}
                    sections={[
                        {
                            eyebrow: "Volunteer",
                            heading: "Give your time. Transform a life.",
                            image: "/images/Service1.jpeg",
                            imageAlt: "University student volunteers at therapy session",
                            body: (
                                <>
                                    <p>
                                        El-Olam welcomes volunteers from all backgrounds —
                                        occupational therapists, teachers, counsellors, logistics
                                        professionals, IT specialists, and community advocates.
                                        Whether you have two hours a week or two weeks a year, your
                                        time matters.
                                    </p>
                                    <p>
                                        Volunteer roles include hub therapy assistants, IEP
                                        documentation support, community outreach advocates, school
                                        liaison officers, and digital media volunteers.
                                    </p>
                                    <p className="font-semibold text-brand-primary text-sm">
                                        Applications are open year-round. Email us at{" "}
                                        <a
                                            href="mailto:elolamspecialandrehabilitation@gmail.com"
                                            className="underline hover:text-brand-sky transition-colors"
                                        >
                                            elolamspecialandrehabilitation@gmail.com
                                        </a>
                                    </p>
                                </>
                            ),
                        },
                        {
                            eyebrow: "Corporate Partnerships",
                            heading: "Partner with purpose.",
                            imageAlign: "left",
                            image: "/images/Service5.jpeg",
                            imageAlt: "Corporate team at El-Olam hub dedication ceremony",
                            body: (
                                <>
                                    <p>
                                        Businesses that partner with El-Olam join a movement of
                                        transformational social impact aligned with the UN Sustainable
                                        Development Goals (SDG 3, 4, and 10). Corporate partnerships
                                        include co-branded programs, employee volunteering days,
                                        equipment donations, and capacity sponsorships.
                                    </p>
                                    <p>
                                        Our corporate partners receive annual acknowledgment,
                                        co-branded impact reports, named hub recognition, and
                                        opportunities to engage their teams directly with
                                        beneficiaries.
                                    </p>
                                    <p className="text-sm text-stone-500">
                                        Contact our partnerships team:{" "}
                                        <a
                                            href="mailto:elolamspecialandrehabilitation@gmail.com"
                                            className="text-brand-primary hover:text-brand-sky transition-colors underline"
                                        >
                                            elolamspecialandrehabilitation@gmail.com
                                        </a>
                                    </p>
                                </>
                            ),
                        },
                        {
                            eyebrow: "Monthly Giving",
                            heading: "Sustained giving. Sustained transformation.",
                            image: "/images/Service6.jpeg",
                            imageAlt: "Monthly giving programme beneficiaries group photo",
                            body: (
                                <>
                                    <p>
                                        A monthly gift to El-Olam is one of the most powerful things
                                        you can do. Predictable, recurring funding allows us to plan
                                        ahead — keeping hub staff employed, ensuring devices are
                                        restocked, and keeping therapy sessions uninterrupted for
                                        children in active care.
                                    </p>
                                    <p>
                                        Monthly giving tiers start from as little as $10/month, and
                                        all monthly givers receive our bimonthly newsletter, impact
                                        digest, and exclusive annual givers report.
                                    </p>
                                </>
                            ),
                        },
                    ]}
                    bullets={[
                        {
                            title: "Volunteer Signups",
                            body: "Join our pool of 500+ active volunteers. Roles available in therapy, education, admin, IT, logistics, and outreach advocacy.",
                        },
                        {
                            title: "Corporate Giving",
                            body: "CSR partnerships aligned to SDG goals 3, 4, and 10. Named hub sponsorships, employee engagement days, and matched giving programs.",
                        },
                        {
                            title: "Regional Hubs",
                            body: "Support a specific hub in your city — Lagos, Abuja, Ibadan, Kano, Enugu, and more — through targeted local giving.",
                        },
                    ]}
                    ctaTitle="Ready to get involved?"
                    ctaBody="Contact us today to discuss volunteer roles, corporate partnerships, or regional hub support. Every form of involvement makes an irreplaceable difference."
                    ctaPrimary={{ label: "Email Our Team", to: "mailto:elolamspecialandrehabilitation@gmail.com" }}
                    ctaSecondary={{ label: "Donate Now", to: "/donate" }}
                />
            </main>
            <Footer />
        </div>
    );
}
