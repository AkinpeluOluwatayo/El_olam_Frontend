import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichPage } from "@/components/RichPage";
import Link from "next/link";
import { CheckCircle, Heart, BookOpen, Stethoscope, Users } from "lucide-react";

export const metadata = {
    title: "Leading Rehabilitation Center in Nigeria | Serving Ogun, Lagos & South-West",
    description:
        "Premier rehabilitation center in Nigeria. Offering confidential addiction recovery, mental health care, and residential support serving Mowe, Ogun, Lagos, and nationwide.",
};

const pillars = [
    {
        icon: BookOpen,
        title: "Specialized Learning",
        description:
            "Individualized education plans and school integration support for children with learning disabilities, autism, and developmental delays.",
    },
    {
        icon: Stethoscope,
        title: "Physiotherapy & Devices",
        description:
            "Comprehensive physiotherapy sessions, mobility devices, hearing aids, and prosthetics provision to restore independence.",
    },
    {
        icon: Users,
        title: "Parental Outreach",
        description:
            "Empowering families with training, psychosocial support groups, and home-based care techniques to support their children daily.",
    },
];

export default function HomePage() {
    return (
        <div>
            <Header />
            <main>
                <RichPage
                    eyebrow="Leading Rehabilitation Center in Nigeria"
                    title="Premier Rehabilitation & Recovery Center in Nigeria"
                    lede="As one of the leading private rehabilitation centers in Nigeria, we provide structured, evidence-based care for individuals and families across the country..."
                    heroImageAlt="Children receiving therapy at El-Olam Rehabilitation Center"
                    stats={[
                        { value: "10k+", label: "Children Assisted" },
                        { value: "$4.2M", label: "Therapy Funding Raised" },
                        { value: "850+", label: "Schools Integration" },
                        { value: "15", label: "Active Hubs" },
                    ]}
                    sections={[
                        {
                            eyebrow: "Nationwide Care",
                            heading: "Trusted Residential Rehabilitation Services Across Nigeria",
                            image: "/images/Service1.jpeg",
                            imageAlt: "Serene rehabilitation facility at El-Olam",
                            body: (
                                <>
                                    <p>
                                        As one of the leading private rehabilitation centers in Nigeria,
                                        we provide structured, evidence-based care for individuals and
                                        families across the country. Our facility offers confidential addiction
                                        recovery, mental health care, occupational therapy, and specialized
                                        residential support serving Mowe, Ogun, Lagos, and nationwide.
                                    </p>
                                    <p>
                                        We welcome clients from across all 36 states, with seamless admission
                                        processes, airport pick-ups (from Murtala Muhammed International Airport, Lagos),
                                        and serene facilities designed for uninterrupted recovery away from home.
                                    </p>
                                    <div className="flex flex-col gap-2 pt-2">
                                        {[
                                            "Airport pick-ups from Murtala Muhammed International Airport, Lagos",
                                            "Seamless admission processes for clients across all 36 states",
                                            "Serene, confidential environment designed for uninterrupted recovery",
                                        ].map((item) => (
                                            <div key={item} className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="size-4 text-brand-primary mt-0.5 flex-none" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ),
                        },
                        {
                            eyebrow: "What We Believe",
                            heading: "Every child and individual deserves the chance to thrive.",
                            image: "/images/Service2.jpeg",
                            imageAlt: "Child with therapist at session",
                            body: (
                                <>
                                    <p>
                                        At El-Olam Special Home, we believe that a disability is not
                                        an inability. Every child — regardless of physical, cognitive,
                                        or sensory challenges — carries unique gifts that the world
                                        deserves to experience.
                                    </p>
                                    <p>
                                        Since our founding, we have served over 10,000 children with
                                        cerebral palsy, autism spectrum disorder, Down syndrome,
                                        hearing impairment, and other complex needs across 15 active
                                        hubs in Nigeria.
                                    </p>
                                    <div className="flex flex-col gap-2 pt-2">
                                        {[
                                            "Free diagnostic screening and therapy referrals",
                                            "Scholarship grants for special education institutions",
                                            "Subsidised assistive devices distribution",
                                        ].map((item) => (
                                            <div key={item} className="flex items-start gap-2 text-sm">
                                                <CheckCircle className="size-4 text-brand-primary mt-0.5 flex-none" />
                                                <span>{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ),
                        },
                        {
                            eyebrow: "Our Impact",
                            heading: "From Nigeria's cities to underserved communities.",
                            imageAlign: "left",
                            image: "/images/Service2.jpeg",
                            imageAlt: "Hub team meeting in a rural community",
                            body: (
                                <>
                                    <p>
                                        Our 15 operational hubs span Lagos, Abuja, Ibadan, Kano, and
                                        Port Harcourt, with mobile clinic services reaching an
                                        additional 40 rural local government areas annually.
                                    </p>
                                    <p>
                                        We partner with 850+ mainstream schools to facilitate
                                        inclusive classrooms, train teachers, and provide
                                        learning aids — so children with disabilities can attend
                                        school alongside their peers.
                                    </p>
                                    <Link
                                        href="/about"
                                        className="inline-block mt-4 border-b-2 border-brand-primary text-brand-primary text-sm font-semibold hover:text-brand-sky transition-colors"
                                    >
                                        Read our full story →
                                    </Link>
                                </>
                            ),
                        },
                    ]}
                    bullets={pillars.map((p) => ({ title: p.title, body: p.description }))}
                    ctaTitle="A child is waiting for your support."
                    ctaBody="Your monthly sponsorship of $45 provides diagnostic care, therapy sessions, learning kits, and a path toward independence for one child. Every contribution transforms a life."
                    ctaPrimary={{ label: "Sponsor a Child", to: "/sponsor-a-child" }}
                    ctaSecondary={{ label: "Make a Donation", to: "/donate" }}
                />

                {/* Pillars visual cards */}
                <section className="max-w-7xl mx-auto px-8 py-20">
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-brand-accent mb-4">
                        Three Pillars of Care
                    </p>
                    <h2 className="font-serif text-3xl md:text-4xl text-brand-primary mb-12 max-w-2xl">
                        Holistic support that changes what's possible.
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {pillars.map((pillar) => {
                            const Icon = pillar.icon;
                            return (
                                <div
                                    key={pillar.title}
                                    className="group p-8 border border-stone-200 hover:border-brand-sky hover:shadow-md transition-all bg-white"
                                >
                                    <div className="size-12 rounded-full bg-sky-50 flex items-center justify-center mb-5 group-hover:bg-brand-primary transition-colors">
                                        <Icon className="size-5 text-brand-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <h3 className="font-serif text-xl text-brand-primary mb-3">
                                        {pillar.title}
                                    </h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Quick donation banner */}
                <section className="bg-sky-50 border-y border-brand-sky/20 py-12 px-8">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="size-12 bg-brand-primary rounded-full flex items-center justify-center flex-none">
                                <Heart className="size-5 text-white fill-white" />
                            </div>
                            <div>
                                <p className="font-serif text-xl text-brand-primary">
                                    Ready to make a difference?
                                </p>
                                <p className="text-stone-500 text-sm">
                                    One-time or recurring donations — every amount matters.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4 flex-wrap">
                            <Link
                                href="/sponsor-a-child"
                                className="border-2 border-brand-primary text-brand-primary px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-colors rounded-sm"
                            >
                                Sponsor $45/mo
                            </Link>
                            <Link
                                href="/donate"
                                className="bg-brand-primary text-white px-6 py-2.5 text-xs font-bold uppercase tracking-widest hover:bg-sky-950 transition-colors shadow-lg rounded-sm"
                            >
                                Donate Now
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
