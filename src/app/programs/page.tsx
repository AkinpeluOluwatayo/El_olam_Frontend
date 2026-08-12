import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichPage } from "@/components/RichPage";

export const metadata = {
    title: "Our Programs | El-Olam Special Home & Rehabilitation Center",
    description:
        "Explore El-Olam's operational programs: Therapeutic Services, Assistive Technology Delivery, Special Education Advocacy, and Outreach Clinics.",
};

export default function ProgramsPage() {
    return (
        <div>
            <Header />
            <main>
                <RichPage
                    eyebrow="Our Programs"
                    title="Four operational hubs. One mission."
                    lede="El-Olam's integrated program framework addresses every dimension of a child's rehabilitation — therapy, technology, education, and community outreach — through evidence-based, locally-delivered services."
                    heroImageAlt="Therapist demonstrating assistive technology to a child"
                    stats={[
                        { value: "4", label: "Core Program Areas" },
                        { value: "15", label: "Active Hubs" },
                        { value: "40+", label: "Rural LGAs Reached" },
                        { value: "8,000+", label: "Annual Therapy Sessions" },
                    ]}
                    sections={[
                        {
                            eyebrow: "Program 01",
                            heading: "Therapeutic Services",
                            image: "/images/Service1.jpeg",
                            imageAlt: "Group occupational therapy session at Lagos hub",
                            body: (
                                <>
                                    <p>
                                        Our flagship therapeutic services program delivers
                                        occupational therapy (OT), physiotherapy (PT), speech-language
                                        therapy (SLT), and applied behaviour analysis (ABA) across all
                                        15 hubs. Each child receives an individualised therapy plan
                                        developed by a multidisciplinary team.
                                    </p>
                                    <p>
                                        Our therapists complete 8,000+ therapy sessions annually,
                                        and 90% of children enrolled in regular therapy achieve at
                                        least one major developmental milestone within six months.
                                    </p>
                                    <ul className="list-disc list-inside text-sm space-y-1 pt-2">
                                        <li>Occupational Therapy (OT)</li>
                                        <li>Physiotherapy & Mobility Rehabilitation</li>
                                        <li>Speech-Language Therapy</li>
                                        <li>Applied Behaviour Analysis (ABA)</li>
                                        <li>Sensory Integration Therapy</li>
                                    </ul>
                                </>
                            ),
                        },
                        {
                            eyebrow: "Program 02",
                            heading: "Assistive Technology Delivery",
                            imageAlign: "left",
                            image: "/images/Service3.jpeg",
                            imageAlt: "Child receiving a customized wheelchair fitting",
                            body: (
                                <>
                                    <p>
                                        Many children with disabilities require assistive technology
                                        to participate in daily life — but these devices are
                                        expensive, hard to source, and often poorly fitted. El-Olam's
                                        Assistive Tech Delivery program tackles this directly.
                                    </p>
                                    <p>
                                        We procure, customize, and distribute wheelchairs, hearing
                                        aids, prosthetics, communication boards, AAC devices, and
                                        adapted learning materials. Every device is child-fitted by a
                                        trained clinician and followed up with quarterly review
                                        appointments.
                                    </p>
                                    <p>
                                        In partnership with global AT suppliers and local fabricators,
                                        we have delivered over 3,000 assistive devices since 2015.
                                    </p>
                                </>
                            ),
                        },
                        {
                            eyebrow: "Program 03",
                            heading: "Special Education Advocacy",
                            image: "/images/Service6.jpeg",
                            imageAlt: "IEP review meeting between parents, teacher, and therapist",
                            body: (
                                <>
                                    <p>
                                        Nigeria's inclusive education policy exists — but its
                                        implementation is deeply uneven. Our Special Ed Advocacy
                                        program works directly with mainstream schools, state
                                        education ministries, and parents to bridge this gap.
                                    </p>
                                    <p>
                                        We provide Individual Education Plans (IEPs), teacher
                                        training workshops, adapted curriculum resources, and
                                        ongoing classroom support for children with disabilities
                                        enrolled in mainstream schools. We have placed children
                                        in over 850 partner schools to date.
                                    </p>
                                </>
                            ),
                        },
                        {
                            eyebrow: "Program 04",
                            heading: "Outreach Clinics",
                            imageAlign: "left",
                            image: "/images/Service5.jpeg",
                            imageAlt: "Mobile outreach clinic van serving rural community",
                            body: (
                                <>
                                    <p>
                                        Our fixed hubs serve major cities — but disability doesn't
                                        stop at urban boundaries. Our Outreach Clinics program
                                        deploys mobile therapy teams to rural and semi-urban
                                        communities across 40+ local government areas in Nigeria.
                                    </p>
                                    <p>
                                        Each outreach clinic provides: free screening, diagnosis
                                        referrals, parent education workshops, and linkage to
                                        sponsorship and device programs. Outreach clinics run
                                        monthly in each location, with follow-up home visits by
                                        community health workers.
                                    </p>
                                </>
                            ),
                        },
                    ]}
                    ctaTitle="Support a program that's changing lives."
                    ctaBody="Your donation directly funds therapy sessions, assistive devices, teacher training, and mobile outreach visits in communities that have no other access to care."
                    ctaPrimary={{ label: "Donate to Our Programs", to: "/donate" }}
                    ctaSecondary={{ label: "Sponsor a Child", to: "/sponsor-a-child" }}
                />
            </main>
            <Footer />
        </div>
    );
}
