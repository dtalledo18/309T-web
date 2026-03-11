'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './Metrics.module.css';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
    {
        content: (
            <>
                <p className={styles.cardTag}>End to end process, delivering Speed and efficiency cutting turnarounds times by</p>
                <h2 className={styles.statNumber}>80%</h2>
                <p className={styles.cardFooter}>Maintaining every detail.</p>
            </>
        ),
    },
    {
        content: (
            <p className={styles.cardText}>
                <strong>Clarity speeds up claims with Audit-Ready Reports.</strong>
                <br /><br />
                Providing a single, trusted source that meets transparency standards.
            </p>
        ),
    },
    {
        content: (
            <p className={styles.cardText}>
                <strong>Clarity speeds up claims with Audit-Ready Reports.</strong>
                <br /><br />
                Providing a single, trusted source that meets transparency standards.
            </p>
        ),
    },
    {
        content: (
            <>
                <div className={styles.shieldIcon}>
                    <Image src="/icons/shield.png" alt="Shield" width={120} height={120} />
                </div>
                <p className={styles.cardTextCenter}>
                    <strong>Clarity speeds up claims with Audit-Ready Reports.</strong>
                    <br /><br />
                    Providing a single, trusted source that meets transparency standards.
                </p>
            </>
        ),
    },
];

export default function Metrics() {
    const pinContainerRef = useRef<HTMLDivElement>(null);
    const cardsTrackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const pinContainer = pinContainerRef.current;
        const cardsTrack = cardsTrackRef.current;
        if (!pinContainer || !cardsTrack) return;

        const cards = gsap.utils.toArray(`.${styles.card}`) as HTMLElement[];

        const gap = parseFloat(
            getComputedStyle(cardsTrack).rowGap || "24"
        );

        const cardHeight = cards[0].offsetHeight;

        const totalMovement = (cardHeight + gap) * (cards.length - 1);

        if (pinContainer) {
            pinContainer.style.marginBottom = `${totalMovement}px`;
        }

        gsap.to(cardsTrack, {
            y: -totalMovement,
            ease: "none",
            scrollTrigger: {
                trigger: pinContainer,
                start: "center center",
                end: "+=" + totalMovement,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                pinSpacing: false  // <- esto
            }
        });

    }, { scope: pinContainerRef });

    return (
        <section ref={pinContainerRef} className={styles.section}>
            <div className={styles.bgDecorLeft}>
                <Image src="/decor-blur-left.png" alt="" width={200} height={200} />
            </div>
            <div className={styles.bgDecorRight}>
                <Image src="/decor-blur-right.png" alt="" width={300} height={300} />
            </div>

            <div className={styles.viewport}>
                <div ref={cardsTrackRef} className={styles.cardsTrack}>
                    {CARDS.map((card, i) => (
                        <div key={i} className={styles.card}>
                            {card.content}
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.titleSide}>
                <h2 className={styles.mainTitle}>THE <span className={styles.blueText}>309T</span><br />STANDARD</h2>
            </div>


        </section>
    );
}