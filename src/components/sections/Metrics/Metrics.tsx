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
            <>
                <div className={styles.deviceIcon}>
                    <Image src="/icons/devices.webp" alt="Shield" width={120} height={120} />
                </div>
                <p className={styles.cardText}>
                    <strong>A robust multi-platform User Experience ecosystem.</strong>
                    <br /><br />
                    Technical precision, Mobile-optimized interface with full-scale depth on any screen you use.
                </p>
            </>
        ),
    },
    {
        content: (
            <>
                <div className={styles.worldIcon}>
                    <Image src="/icons/world_heart.webp" alt="Shield" width={120} height={120} />
                </div>
                <p className={styles.cardText}>
                    <strong>Algorithm speed with human expertise.</strong>
                    <br /><br />
                    Precise measurements, no guesswork. The new standard for HVAC accuracy.
                </p>
            </>
        ),
    },
    {
        content: (
            <>
                <div className={styles.shieldIcon}>
                    <Image src="/icons/shield.webp" alt="Shield" width={120} height={120} />
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
        const gap = parseFloat(getComputedStyle(cardsTrack).rowGap || "100");
        const sectionHeight = pinContainer.offsetHeight;
        const cardHeight = cards[0].offsetHeight;
        const centerOffset = (sectionHeight - cardHeight) / 2;

        cardsTrack.style.paddingTop = `${centerOffset}px`;
        cardsTrack.style.paddingBottom = `${centerOffset}px`;

        const totalMovement = (cardHeight + gap) * (cards.length - 1);


        pinContainer.style.marginBottom = `${totalMovement}px`;

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
                pinSpacing: false,
            },
        });
    }, { scope: pinContainerRef });

    return (
        <section ref={pinContainerRef} className={styles.section}>
            <div className={`${styles.petalBase} ${styles.pTopLeft}`}>
                <Image src="/petal-1.webp" alt="" width={475} height={554} />
            </div>
            <div className={`${styles.petalBase} ${styles.pTopCenter}`}>
                <Image src="/petal-2.webp" alt="" width={205} height={222} />
            </div>
            <div className={`${styles.petalBase} ${styles.pTopRight}`}>
                <Image src="/petal-1.webp" alt="" width={475} height={554} />
            </div>
            <div className={`${styles.petalBase} ${styles.pBottomLeft}`}>
                <Image src="/petal-1.webp" alt="" width={475} height={554} />
            </div>
            <div className={`${styles.petalBase} ${styles.pMidLeft}`}>
                <Image src="/petal-2.webp" alt="" width={205} height={222} />
            </div>
            <div className={`${styles.petalBase} ${styles.pBottomRight}`}>
                <Image src="/petal-1.webp" alt="" width={475} height={554} />
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