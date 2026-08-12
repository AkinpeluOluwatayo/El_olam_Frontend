import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichPage } from "@/components/RichPage";

export const metadata = {
    title: "Self Care | El-Olam Special Home & Rehabilitation Center",
    description:
        "El-Olam's self-care program empowers children with disabilities to develop personal hygiene, grooming, and daily living skills for greater independence.",
};

export default function SelfCarePage() {
    return (
        <div>
            <Header />
            <main>
                <RichPage
                    eyebrow="What We Do"
                    title="Self Care"
                    lede="Teaching children the skills to care for themselves is one of the greatest gifts we can give. Our self-care program builds real independence through compassionate, structured training."
                    stats={[
                        { value: "300+", label: "Children in Self-Care Programs" },
                        { value: "Daily", label: "Practice Sessions" },
                        { value: "6mo", label: "Average Progress Cycle" },
                        { value: "100%", label: "Family Engagement" },
                    ]}
                    sections={[
                        {
                            eyebrow: "The Program",
                            heading: "Independence starts with the basics.",
                            image: "/images/Service3.jpeg",
                            imageAlt: "Child practicing self-care skills with therapist support",
                            body: (
                                <>
                                    <p>
                                        Our self-care program is designed to teach children with
                                        disabilities the foundational activities of daily living —
                                        from personal hygiene and grooming, to dressing, meal
                                        preparation, and household tasks.
                                    </p>
                                    <p>
                                        We use a task-analysis approach — breaking each skill into
                                        small, manageable steps — and celebrate progress at every
                                        stage, building confidence alongside competence.
                                    </p>
                                    <ul className="list-disc list-inside text-sm space-y-1 pt-2">
                                        <li>Personal hygiene and grooming routines</li>
                                        <li>Dressing and undressing independently</li>
                                        <li>Toileting skills and continence support</li>
                                        <li>Basic meal preparation and feeding</li>
                                        <li>Household safety awareness</li>
                                    </ul>
                                </>
                            ),
                        },
                        {
                            eyebrow: "Family Partnership",
                            heading: "Parents are our most powerful partners.",
                            imageAlign: "left",
                            image: "/images/Service7.jpeg",
                            imageAlt: "Parent and child practicing self-care together",
                            body: (
                                <>
                                    <p>
                                        Self-care skills learned at the center must be reinforced at
                                        home. That&apos;s why we involve parents and carers at every stage,
                                        providing clear guidance, visual schedules, and practical
                                        tools they can use during daily routines.
                                    </p>
                                    <p>
                                        Our family coaching sessions equip parents with the patience,
                                        techniques, and encouragement strategies to continue
                                        therapy goals at home — extending the impact of every
                                        session.
                                    </p>
                                </>
                            ),
                        },
                    ]}
                    ctaTitle="Help a child live independently."
                    ctaBody="Self-care skills transform not just a child's day — they transform a family's life. Support this program and help more children build the confidence to care for themselves."
                    ctaPrimary={{ label: "Donate Now", to: "/donate" }}
                    ctaSecondary={{ label: "Sponsor a Child", to: "/sponsor-a-child" }}
                />
            </main>
            <Footer />
        </div>
    );
}
