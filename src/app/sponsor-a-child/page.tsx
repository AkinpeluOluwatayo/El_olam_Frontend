import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichPage } from "@/components/RichPage";

export const metadata = {
    title: "Sponsor a Child | El-Olam Special Home & Rehabilitation Center",
    description:
        "For $45 per month, you can sponsor a child with disabilities through diagnostic screening, wheelchair access, learning kits, and ongoing therapy.",
};

export default function SponsorAChildPage() {
    return (
        <div>
            <Header />

            <main>
                <RichPage
                    /* =====================================================
                       HERO
                    ===================================================== */
                    eyebrow="Sponsorship Program"
                    title="Transform a child's life for $45 a month."
                    lede="Your monthly sponsorship gives one child access to diagnostic screening, a personalized therapy plan, mobility devices, and specialized learning kits — changing the trajectory of their entire future."
                    heroImage="/images/landingPageBackground.jpeg"
                    heroImageAlt="Children receiving care and support at El-Olam Special Home"

                    /* =====================================================
                       STATS
                    ===================================================== */
                    stats={[
                        {
                            value: "2,400+",
                            label: "Active Sponsors",
                        },
                        {
                            value: "$45/mo",
                            label: "Full Child Sponsorship",
                        },
                        {
                            value: "90%",
                            label: "Therapy Completion Rate",
                        },
                        {
                            value: "3–6mo",
                            label: "Avg. Milestone Achieved",
                        },
                    ]}

                    /* =====================================================
                       CONTENT SECTIONS
                    ===================================================== */
                    sections={[
                        {
                            eyebrow: "The Match Model",
                            heading: "You sponsor. We match expertise.",
                            image: "/images/Service1.jpeg",
                            imageAlt: "Child receiving specialized therapy at El-Olam",
                            body: (
                                <>
                                    <p>
                                        Our $45/month model is built on transparency and measurable
                                        impact. When you sponsor a child, our team matches them
                                        with the exact care they need — from a diagnostic screening
                                        and referral all the way through structured therapy and
                                        learning kit provision.
                                    </p>

                                    <p>
                                        You receive quarterly progress reports, photos, and
                                        milestone updates directly from the hub managing your
                                        sponsored child's care. You are not just a donor — you are
                                        a named advocate in their rehabilitation journey.
                                    </p>
                                </>
                            ),
                        },

                        {
                            eyebrow: "Care Tiers",
                            heading: "A complete care package, every month.",
                            imageAlign: "left",
                            image: "/images/Service2.jpeg",
                            imageAlt: "El-Olam therapy and care services",
                            body: (
                                <>
                                    <p>
                                        Your $45/month is allocated across three integrated care
                                        tiers, ensuring every sponsored child receives
                                        comprehensive, sustained support:
                                    </p>

                                    <ul className="list-disc list-inside space-y-2 text-sm mt-2">
                                        <li>
                                            <strong>
                                                Tier 1 – Diagnostic Screening:
                                            </strong>{" "}
                                            Initial assessment by a licensed occupational
                                            therapist, neurodevelopmental evaluation, and care plan
                                            creation.
                                        </li>

                                        <li>
                                            <strong>
                                                Tier 2 – Wheelchair & Device Access:
                                            </strong>{" "}
                                            Provision of appropriate mobility aids, hearing devices,
                                            or orthotics. Devices are child-fitted and tracked for
                                            growth adjustments.
                                        </li>

                                        <li>
                                            <strong>
                                                Tier 3 – Learning Kits:
                                            </strong>{" "}
                                            Customized educational materials — tactile tools, AAC
                                            devices, adapted textbooks — aligned to the child's IEP
                                            and school setting.
                                        </li>
                                    </ul>
                                </>
                            ),
                        },
                    ]}
                    /* =====================================================
                       TIMELINE
                    ===================================================== */
                    timelineSteps={[
                        {
                            step: "01",
                            title: "You sign up as a sponsor",
                            description:
                                "Complete your monthly sponsorship commitment online. You'll receive an immediate welcome email with your sponsorship ID and details.",
                        },
                        {
                            step: "02",
                            title: "Child matching & intake",
                            description:
                                "Our team matches you with a child from our waitlist — based on urgency, region, and available hub capacity. You are introduced via a profile document within 7 days.",
                        },
                        {
                            step: "03",
                            title: "Diagnostic screening & plan",
                            description:
                                "The child receives a full occupational therapy screening, neurodevelopmental evaluation, and a personalized rehabilitation and education plan within the first month.",
                        },
                        {
                            step: "04",
                            title: "Therapy & device provision",
                            description:
                                "Monthly therapy sessions begin at the nearest hub. Assistive devices are sourced, fitted, and provided in the second or third month depending on availability.",
                        },
                        {
                            step: "05",
                            title: "Quarterly reports to you",
                            description:
                                "Every three months, you receive a detailed progress report including therapy notes, milestone achievements, photos, and feedback from the child's caregivers.",
                        },
                        {
                            step: "06",
                            title: "Milestone celebration",
                            description:
                                "When a child achieves a major milestone — first steps, first words, school enrollment — we notify you directly. Your support made it happen.",
                        },
                    ]}

                    /* =====================================================
                       CTA
                    ===================================================== */
                    ctaTitle="Begin your sponsorship today."
                    ctaBody="$45 a month. One child. A lifetime of impact. Your consistent support is what makes long-term rehabilitation possible. Join over 2,400 sponsors already walking this journey."
                    ctaPrimary={{
                        label: "Sponsor Now — $45/mo",
                        to: "/donate",
                    }}
                    ctaSecondary={{
                        label: "Make a One-Time Gift",
                        to: "/donate",
                    }}
                />
            </main>

            <Footer />
        </div>
    );
}