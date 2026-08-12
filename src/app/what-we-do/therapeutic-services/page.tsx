import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichPage } from "@/components/RichPage";

export const metadata = {
    title: "Therapeutic Services | El-Olam Special Home & Rehabilitation Center",
    description:
        "El-Olam provides evidence-based therapeutic services including occupational therapy, physiotherapy, speech therapy, and ABA — tailored for each child's unique needs.",
};

export default function TherapeuticServicesPage() {
    return (
        <div>
            <Header />
            <main>
                <RichPage
                    eyebrow="What We Do"
                    title="Therapeutic Services"
                    lede="Our flagship therapeutic program delivers individualized, multidisciplinary treatment plans for children with disabilities across Ogun State, Nigeria."
                    stats={[
                        { value: "8,000+", label: "Annual Therapy Sessions" },
                        { value: "90%", label: "Milestone Achievement Rate" },
                        { value: "15", label: "Active Care Hubs" },
                        { value: "10+", label: "Years of Service" },
                    ]}
                    sections={[
                        {
                            eyebrow: "Our Approach",
                            heading: "Every child receives an individualized care plan.",
                            image: "/images/Service1.jpeg",
                            imageAlt: "Therapist working one-on-one with a child",
                            body: (
                                <>
                                    <p>
                                        At El-Olam, therapeutic services are the cornerstone of
                                        everything we do. We believe that every child — regardless
                                        of their diagnosis — deserves access to skilled, compassionate
                                        therapy delivered in a safe and caring environment.
                                    </p>
                                    <p>
                                        Our multidisciplinary team of licensed therapists, counselors,
                                        and rehabilitation specialists collaborates to develop
                                        individualized therapy plans that are reviewed regularly
                                        and adapted as each child grows.
                                    </p>
                                    <ul className="list-disc list-inside text-sm space-y-1 pt-2">
                                        <li>Occupational Therapy (OT)</li>
                                        <li>Physiotherapy &amp; Mobility Rehabilitation</li>
                                        <li>Speech-Language Therapy</li>
                                        <li>Applied Behaviour Analysis (ABA)</li>
                                        <li>Sensory Integration Therapy</li>
                                    </ul>
                                </>
                            ),
                        },
                        {
                            eyebrow: "Your Impact",
                            heading: "Consistent therapy changes trajectories.",
                            imageAlign: "left",
                            image: "/images/Service2.jpeg",
                            imageAlt: "Group therapy session at El-Olam center",
                            body: (
                                <>
                                    <p>
                                        Children enrolled in regular therapy at El-Olam achieve at
                                        least one major developmental milestone within six months —
                                        whether that&apos;s a first step, a word spoken, or the ability
                                        to hold a pencil for the first time.
                                    </p>
                                    <p>
                                        With your support through sponsorship or donation, we can
                                        keep therapy sessions running, staff trained, and children
                                        progressing toward the independence they deserve.
                                    </p>
                                </>
                            ),
                        },
                    ]}
                    ctaTitle="Support our therapy programs."
                    ctaBody="Your contribution directly funds therapy sessions and the trained specialists who deliver them. Join hundreds of sponsors already making a difference."
                    ctaPrimary={{ label: "Donate Now", to: "/donate" }}
                    ctaSecondary={{ label: "Sponsor a Child", to: "/sponsor-a-child" }}
                />
            </main>
            <Footer />
        </div>
    );
}
