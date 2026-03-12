'use client';
import Image from 'next/image';
import {useEffect, useRef} from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Metrics.module.css';
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
                    <Image src="/icons/devices.webp" alt="Shield" width={180} height={180} />
                </div>
                <p className={styles.cardText}>
                    <strong>A robust multi-platform User Experience ecosystem.</strong>
                    Technical precision, Mobile-optimized interface with full-scale depth on any screen you use.
                </p>
            </>
        ),
    },
    {
        content: (
            <>
                <div className={styles.worldIcon}>
                    <Image src="/icons/world_heart.webp" alt="Shield" width={150} height={150} />
                </div>
                <p className={styles.cardText}>
                    <strong>Algorithm speed with human expertise.</strong>
                    Precise measurements, no guesswork. The new standard for HVAC accuracy.
                </p>
            </>
        ),
    },
    {
        content: (
            <>
                <div className={styles.shieldIcon}>
                    <Image src="/icons/shield.webp" alt="Shield" width={150} height={150} />
                </div>
                <p className={styles.cardTextCenter}>
                    <strong>Clarity speeds up claims with Audit-Ready Reports.</strong>
                    Providing a single, trusted source that meets transparency standards.
                </p>
            </>
        ),
    },
];

export default function Metrics() {
    const pinContainerRef = useRef<HTMLDivElement>(null);
    const cardsTrackRef = useRef<HTMLDivElement>(null);
    const p1 = useRef<HTMLDivElement>(null);
    const p2 = useRef<HTMLDivElement>(null);
    const p3 = useRef<HTMLDivElement>(null);
    const p4 = useRef<HTMLDivElement>(null);
    const p5 = useRef<HTMLDivElement>(null);
    const p6 = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const petals = [
            { ref: p1, x: 90,  y: 110, rot: 22, dur: 10 },
            { ref: p2, x: 70,  y: 80,  rot: 28, dur: 7  },
            { ref: p3, x: 100, y: 70,  rot: 18, dur: 12 },
            { ref: p4, x: 85,  y: 100, rot: 25, dur: 8  },
            { ref: p5, x: 60,  y: 90,  rot: 32, dur: 6  },
            { ref: p6, x: 110, y: 60,  rot: 15, dur: 14 },
        ];

        petals.forEach(({ ref, x, y, rot, dur }) => {
            if (!ref.current) return;
            gsap.to(ref.current, {
                x: `+=${x}`,
                y: `+=${y}`,
                rotation: `+=${rot}`,
                duration: dur,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true,
            });
        });
    }, []);

    useGSAP(() => {
        const pinContainer = pinContainerRef.current;
        const cardsTrack = cardsTrackRef.current;
        if (!pinContainer || !cardsTrack) return;

        requestAnimationFrame(() => {
            // 1. SOLO LECTURAS primero
            const cards = gsap.utils.toArray(`.${styles.card}`) as HTMLElement[];
            const gap = parseFloat(getComputedStyle(cardsTrack).rowGap || "100");
            const sectionHeight = pinContainer.offsetHeight;
            const cardHeight = cards[0].offsetHeight;
            const centerOffset = (sectionHeight - cardHeight) / 2;
            const totalMovement = (cardHeight + gap) * (cards.length - 1);

            // 2. SOLO ESCRITURAS después
            cardsTrack.style.paddingTop = `${centerOffset}px`;
            cardsTrack.style.paddingBottom = `${centerOffset}px`;
            pinContainer.style.marginBottom = `${totalMovement}px`;

            // 3. GSAP al final
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

            ScrollTrigger.refresh();
        });
    }, { scope: pinContainerRef });

    return (
        <section ref={pinContainerRef} className={styles.section} id="values">
            <div ref={p1} className={`${styles.petalBase} ${styles.pTopLeft}`}>
                <Image src="/petal-1.webp" alt="" width={475} height={554} loading="lazy"/>
            </div>
            <div ref={p2} className={`${styles.petalBase} ${styles.pTopCenter}`}>
                <Image src="/petal-2.webp" alt="" width={205} height={222} loading="lazy"/>
            </div>
            <div ref={p3} className={`${styles.petalBase} ${styles.pTopRight}`}>
                <Image src="/petal-1.webp" alt="" width={475} height={554} loading="lazy"/>
            </div>
            <div ref={p4} className={`${styles.petalBase} ${styles.pBottomLeft}`}>
                <Image src="/petal-1.webp" alt="" width={475} height={554} loading="lazy"/>
            </div>
            <div ref={p5} className={`${styles.petalBase} ${styles.pMidLeft}`}>
                <Image src="/petal-2.webp" alt="" width={205} height={222} loading="lazy"/>
            </div>
            <div ref={p6} className={`${styles.petalBase} ${styles.pBottomRight}`}>
                <Image src="/petal-1.webp" alt="" width={475} height={554} loading="lazy"/>
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