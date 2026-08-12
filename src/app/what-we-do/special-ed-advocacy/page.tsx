import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RichPage } from "@/components/RichPage";

export const metadata = {
    title: "Special Ed Advocacy | El-Olam Special Home & Rehabilitation Center",
    description:
        "El-Olam advocates for inclusive education across Nigeria — helping children with disabilities access mainstream schools with IEPs, trained teachers, and classroom support.",
};

export default function SpecialEdAdvocacyPage() {
    return (
        <div>
            <Header />
            <main>
                <RichPage
                    eyebrow="What We Do"
                    title="Special Ed Advocacy"
                    lede="Every child with a disability has the right to quality education. We fight for that right — working with schools, ministries, and families to make inclusive education a lived reality across Nigeria."
                    stats={[
                        { value: "850+", label: "Partner Schools" },
                        { value: "1,200+", label: "IEPs Developed" },
                        { value: "4,000+", label: "Teachers Trained" },
                        { value: "15+", label: "States Reached" },
                    ]}
                    sections={[
                        {
                            eyebrow: "Our Advocacy Work",
                            heading: "Bridging the inclusive education gap.",
                            image: "/images/Service6.jpeg",
                            imageAlt: "IEP review meeting with teacher, parent, and therapist",
                            body: (
                                <>
                                    <p>
                                        Nigeria&apos;s inclusive education policy exists — but its
                                        implementation is deeply uneven. Our Special Ed Advocacy
                                        program works directly with mainstream schools, state
                                        education ministries, and parents to bridge this gap and
                                        ensure children with disabilities are genuinely included.
                                    </p>
                                    <p>
                                        We provide Individual Education Plans (IEPs), teacher
                                        training workshops, adapted curriculum resources, and
                                        ongoing classroom support for children with disabilities
                                        enrolled in mainstream schools.
                                    </p>
                                    <ul className="list-disc list-inside text-sm space-y-1 pt-2">
                                        <li>IEP development and review support</li>
                                        <li>Teacher and staff training workshops</li>
                                        <li>Adapted curriculum and learning resources</li>
                                        <li>Disability rights awareness campaigns</li>
                                        <li>Ministry engagement and policy input</li>
                                    </ul>
                                </>
                            ),
                        },
                        {
                            eyebrow: "Parent Empowerment",
                            heading: "Equipping families to advocate for their children.",
                            imageAlign: "left",
                            image: "/images/Service7.jpeg",
                            imageAlt: "Parent advocacy workshop at El-Olam",
                            body: (
                                <>
                                    <p>
                                        Parents are often the most powerful advocates for their
                                        child&apos;s education — but many lack the knowledge to navigate
                                        school systems, understand their rights, or request the
                                        accommodations their child needs.
                                    </p>
                                    <p>
                                        Our family advocacy workshops equip parents with practical
                                        knowledge: how to request an IEP, what accommodations are
                                        available, how to work with teachers, and how to escalate
                                        when their child&apos;s needs are not being met.
                                    </p>
                                </>
                            ),
                        },
                    ]}
                    ctaTitle="Champion the right to learn."
                    ctaBody="Every child deserves an education that meets their needs. Your donation funds IEP development, teacher training, and the classroom support that makes inclusion real."
                    ctaPrimary={{ label: "Donate Now", to: "/donate" }}
                    ctaSecondary={{ label: "Get Involved", to: "/get-involved" }}
                />
            </main>
            <Footer />
        </div>
    );
}
