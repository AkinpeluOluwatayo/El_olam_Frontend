import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichPage } from "@/components/RichPage";

export const metadata = {
    title: "Occupational Therapy | El-Olam Special Home & Rehabilitation Center",
    description:
        "El-Olam delivers specialized occupational therapy to help children with disabilities develop the daily living skills they need for independence and participation.",
};

export default function OccupationalTherapyPage() {
    return (
        <div>
            <Header />
            <main>
                <RichPage
                    eyebrow="What We Do"
                    title="Occupational Therapy"
                    lede="We help children develop the everyday skills — dressing, feeding, writing, and play — that create the foundation for independence, participation, and confidence."
                    stats={[
                        { value: "500+", label: "Children in Active OT" },
                        { value: "3–6mo", label: "Average Milestone Timeline" },
                        { value: "100%", label: "Tailored Care Plans" },
                        { value: "10+", label: "Years Experience" },
                    ]}
                    sections={[
                        {
                            eyebrow: "Our OT Program",
                            heading: "Building skills for everyday life.",
                            image: "/images/Service3.jpeg",
                            imageAlt: "Child in occupational therapy session",
                            body: (
                                <>
                                    <p>
                                        Occupational therapy at El-Olam focuses on developing the
                                        fine motor, sensory, self-care, and cognitive skills that
                                        allow children to engage meaningfully in daily activities,
                                        school, and social environments.
                                    </p>
                                    <p>
                                        Each child&apos;s OT program starts with a comprehensive assessment
                                        that identifies their strengths, challenges, and goals. We
                                        then design targeted, engaging therapy activities that make
                                        real progress feel exciting and achievable.
                                    </p>
                                    <ul className="list-disc list-inside text-sm space-y-1 pt-2">
                                        <li>Fine motor skill development</li>
                                        <li>Sensory processing and integration</li>
                                        <li>Self-care training (dressing, feeding, hygiene)</li>
                                        <li>Visual-perceptual skills for learning</li>
                                        <li>Adaptive equipment prescription</li>
                                    </ul>
                                </>
                            ),
                        },
                        {
                            eyebrow: "Real Results",
                            heading: "Independence unlocked, one skill at a time.",
                            imageAlign: "left",
                            image: "/images/Service7.jpeg",
                            imageAlt: "Child independently performing a daily task",
                            body: (
                                <>
                                    <p>
                                        Our occupational therapists celebrate every milestone —
                                        from the first time a child holds a spoon independently, to
                                        the first day they dress themselves before school. These
                                        moments ripple outward, transforming family life and self-esteem.
                                    </p>
                                    <p>
                                        We work closely with parents to extend therapy goals at home,
                                        providing practical strategies for carers to embed skill
                                        practice into daily routines.
                                    </p>
                                </>
                            ),
                        },
                    ]}
                    ctaTitle="Invest in a child's independence."
                    ctaBody="Your support keeps our occupational therapy program running for hundreds of children who would otherwise have no access to these life-changing services."
                    ctaPrimary={{ label: "Donate Now", to: "/donate" }}
                    ctaSecondary={{ label: "Sponsor a Child", to: "/sponsor-a-child" }}
                />
            </main>
            <Footer />
        </div>
    );
}
