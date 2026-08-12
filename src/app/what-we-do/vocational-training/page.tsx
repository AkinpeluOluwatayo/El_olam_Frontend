import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichPage } from "@/components/RichPage";

export const metadata = {
    title: "Vocational Trainings | El-Olam Special Home & Rehabilitation Center",
    description:
        "El-Olam prepares young people with disabilities for productive, independent futures through practical vocational trainings in a range of life and work skills.",
};

export default function VocationalTrainingPage() {
    return (
        <div>
            <Header />
            <main>
                <RichPage
                    eyebrow="What We Do"
                    title="Vocational Trainings"
                    lede="We go beyond therapy to prepare young people with disabilities for the world of work and independent living — building practical skills that open doors to opportunity and dignity."
                    stats={[
                        { value: "200+", label: "Trainees Annually" },
                        { value: "10+", label: "Vocational Tracks" },
                        { value: "70%", label: "Employment Transition Rate" },
                        { value: "2yr", label: "Typical Program Duration" },
                    ]}
                    sections={[
                        {
                            eyebrow: "Skills for Life",
                            heading: "Preparing for independence and employment.",
                            image: "/images/Sevice4.jpeg",
                            imageAlt: "Young adult in vocational training workshop",
                            body: (
                                <>
                                    <p>
                                        El-Olam&apos;s vocational training program equips young people with
                                        disabilities — particularly those transitioning out of
                                        school-age services — with the practical skills they need
                                        to earn a living, manage a household, and participate fully
                                        in community life.
                                    </p>
                                    <p>
                                        Programs are tailored to each person&apos;s strengths, interests,
                                        and local job market opportunities, ensuring training leads
                                        to real-world outcomes.
                                    </p>
                                    <ul className="list-disc list-inside text-sm space-y-1 pt-2">
                                        <li>Tailoring and fashion design</li>
                                        <li>Food processing and catering</li>
                                        <li>Beadmaking and craft production</li>
                                        <li>Computer and digital literacy</li>
                                        <li>Small business management basics</li>
                                    </ul>
                                </>
                            ),
                        },
                        {
                            eyebrow: "Transition Support",
                            heading: "From training to real opportunity.",
                            imageAlign: "left",
                            image: "/images/Service5.jpeg",
                            imageAlt: "Graduate from vocational program at work",
                            body: (
                                <>
                                    <p>
                                        Completing a vocational program is just the beginning. Our
                                        transition support team connects graduates with employment
                                        opportunities, micro-business funding partnerships, and
                                        mentoring from other program alumni.
                                    </p>
                                    <p>
                                        We also work with local employers to raise awareness of
                                        disability inclusion and create supported work placement
                                        opportunities that give our graduates a real start.
                                    </p>
                                </>
                            ),
                        },
                    ]}
                    ctaTitle="Invest in a future of dignity and work."
                    ctaBody="Vocational training changes the long-term trajectory of a young person's life. Your support funds equipment, trainers, and the transition support that makes it all stick."
                    ctaPrimary={{ label: "Donate Now", to: "/donate" }}
                    ctaSecondary={{ label: "Sponsor a Child", to: "/sponsor-a-child" }}
                />
            </main>
            <Footer />
        </div>
    );
}
