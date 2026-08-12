import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichPage } from "@/components/RichPage";

export const metadata = {
    title: "Speech Therapy | El-Olam Special Home & Rehabilitation Center",
    description:
        "El-Olam's speech therapy program helps children with communication disorders find their voice and develop language skills for connection and learning.",
};

export default function SpeechTherapyPage() {
    return (
        <div>
            <Header />
            <main>
                <RichPage
                    eyebrow="What We Do"
                    title="Speech Therapy"
                    lede="Every child deserves to communicate, connect, and be heard. Our licensed speech-language therapists work with children of all abilities to develop voice, language, and communication skills."
                    stats={[
                        { value: "400+", label: "Children in Active SLT" },
                        { value: "2x/week", label: "Average Session Frequency" },
                        { value: "85%", label: "Communication Goal Rate" },
                        { value: "AAC", label: "Augmentative Comm. Support" },
                    ]}
                    sections={[
                        {
                            eyebrow: "Our SLT Program",
                            heading: "Helping every child find their voice.",
                            image: "/images/Service1.jpeg",
                            imageAlt: "Speech therapist working with a child",
                            body: (
                                <>
                                    <p>
                                        Our Speech-Language Therapy (SLT) program supports children
                                        who have difficulty with speech, language, communication, or
                                        swallowing. This includes children with autism, cerebral
                                        palsy, Down syndrome, stuttering, hearing impairment, and
                                        developmental language disorders.
                                    </p>
                                    <p>
                                        We use evidence-based techniques tailored to each child&apos;s
                                        profile — combining direct therapy with parent coaching and
                                        school collaboration strategies.
                                    </p>
                                    <ul className="list-disc list-inside text-sm space-y-1 pt-2">
                                        <li>Expressive and receptive language therapy</li>
                                        <li>Articulation and phonological therapy</li>
                                        <li>Augmentative and Alternative Communication (AAC)</li>
                                        <li>Social communication and pragmatics training</li>
                                        <li>Parent and carer coaching sessions</li>
                                    </ul>
                                </>
                            ),
                        },
                        {
                            eyebrow: "AAC & Technology",
                            heading: "No voice? No barrier.",
                            imageAlign: "left",
                            image: "/images/Service2.jpeg",
                            imageAlt: "Child using AAC device to communicate",
                            body: (
                                <>
                                    <p>
                                        For children who are non-verbal or minimally verbal, El-Olam
                                        provides Augmentative and Alternative Communication (AAC)
                                        resources — including picture boards, speech-generating
                                        devices, and sign-based systems — to ensure every child has
                                        a reliable way to express themselves.
                                    </p>
                                    <p>
                                        Our therapists train both the child and their family in how
                                        to use AAC tools effectively across different settings —
                                        at home, in school, and in the community.
                                    </p>
                                </>
                            ),
                        },
                    ]}
                    ctaTitle="Help a child speak their truth."
                    ctaBody="Speech therapy changes everything — from relationships to learning to self-confidence. Your support keeps these sessions accessible for every child who needs them."
                    ctaPrimary={{ label: "Donate Now", to: "/donate" }}
                    ctaSecondary={{ label: "Sponsor a Child", to: "/sponsor-a-child" }}
                />
            </main>
            <Footer />
        </div>
    );
}
