'use client';
import Image from 'next/image';
import styles from './FAQ.module.css';
import { useWaitlist} from "@/components/context/WaitlistContext";

const FAQ_DATA = [
    {
        question: "How does HVAC AI improve Field Tech Efficiency?",
        answer: "By automating the reporting process and providing real-time AI-driven diagnostics, reducing inspection time by 80%."
    },
    {
        question: "Is the data compliant with US Insurance Standards?",
        answer: "Yes, enhanced reports are built to be Insurance-Ready, following the latest compliance protocols for claim documentation."
    },
    {
        question: "Is the data secured with a verified chain of custody?",
        answer: "Integrity is our priority. We use secure, time-stamped logs for every assessment, creating a reliable HVAC Chain of Custody for your data that meets the highest professional and technical standards."
    },
    {
        question: "Do I need to be an AI expert to use the app?",
        answer: "No. We built it for the field, not for an office. The AI works in the background to support your expertise, not to complicate it."
    }
];

export default function FAQ() {
    const { openWaitlist } = useWaitlist(); // Extraemos la función
    return (
        <section className={styles.section}>
            {/* Imagen decorativa de fondo (Flor/Unión) */}
            <div className={styles.bgDecor}>
                <Image src="/union.webp" alt="" width={600} height={600} priority />
            </div>

            <div className={styles.container}>
                <h2 className={styles.mainTitle}>FAQ</h2>

                <div className={styles.faqList}>
                    {FAQ_DATA.map((item, index) => (
                        <div key={index} className={styles.faqCard}>
                            <h3 className={styles.question}>{item.question}</h3>
                            <p className={styles.answer}>{item.answer}</p>
                        </div>
                    ))}
                </div>

                {/* Sección Inferior: CTA con Imagen de Techo */}
                <div className={styles.ctaWrapper}>
                    <div className={styles.imageContainer}>
                        <Image
                            src="/hvac-roof.webp"
                            alt="HVAC units on roof"
                            width={600}
                            height={450}
                            className={styles.roofImage}
                        />
                    </div>

                    <div className={styles.ctaContent}>
                        <h2 className={styles.ctaTitle}>START <br/> <span className={styles.blueText}>SAVING TIME</span> </h2>
                        <p className={styles.ctaText}>
                            Secure your spot in the <span className={styles.blueText}>next generation</span> of HVAC management.
                            The industry is moving to <span className={styles.blueText}>AI-driven workflows</span>.
                            Don’t miss a thing!
                        </p>
                        <button className={styles.waitlistBtn} onClick={openWaitlist}>
                            Join the Waitlist
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}