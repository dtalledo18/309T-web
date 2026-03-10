'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from './LateralScroll.module.css';

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
    {
        title: "Reports",
        desc: "Enhance your expertise with automated reporting that delivers audit-ready results to significantly reduce HVAC reporting time.",
        icon: "/icons/reports.png",
    },
    {
        title: "Estimator",
        desc: "Eliminate pricing friction with mathematical certainty. Our engine processes field data through verified engineering equations to generate transparent Audit ready estimates for zero back-and-forth.",
        icon: "/icons/estimator.png",
    },
    {
        title: "AI Implementation",
        desc: "Leverage precision damage analysis and automated field reporting by scanning equipments and get data-based results.",
        icon: "/icons/ai.png",
    }
];

export default function LateralScroll() {

    const pinContainerRef = useRef<HTMLDivElement>(null);
    const cardsTrackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {

        const pinContainer = pinContainerRef.current;
        const cardsTrack = cardsTrackRef.current;
        if (!pinContainer || !cardsTrack) return;

        // ── Posición final ────────────────────────────────────────────────
        const getFinalX = () => -(cardsTrack.scrollWidth - pinContainer.offsetWidth);

        // ── ScrollTrigger ────────────────────────────────────────────────
        const getTotalScroll = () => cardsTrack.scrollWidth - pinContainer.offsetWidth;

        gsap.to(cardsTrack, {
            x: getFinalX,
            ease: "none",
            scrollTrigger: {
                trigger: pinContainer,
                start: "top top",
                end: () => `+=${getTotalScroll()}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

    }, { scope: pinContainerRef });

    return (
        <section ref={pinContainerRef} className={styles.pinContainer}>

            {/* Título fijo en la parte izquierda — posición absoluta para no empujar el track */}
            <div className={styles.introSide}>
                <h2 className={styles.mainTitle}>
                    <span className={styles.blueText}>309T</span><br />
                    FEATURES
                </h2>
            </div>

            {/* Flor decorativa */}
            <div className={styles.flowerWrapper}>
                <Image src="/flower-outline.png" alt="" fill className={styles.flowerImg} />
            </div>

            {/* Track: empieza en x:0, primera card llena el viewport */}
            <div ref={cardsTrackRef} className={styles.cardsTrack}>
                {CARDS.map((card, index) => (
                    <div
                        key={index}
                        className={`${styles.card}`}
                    >
                        <div className={styles.cardIcon}>
                            <div className={styles.iconRelativeContainer}>
                                <Image
                                    src={card.icon}
                                    alt={card.title}
                                    fill
                                    sizes="(max-width: 768px) 10vw, 5vw"
                                    className={styles.iconImage}
                                />
                            </div>
                        </div>
                        <div className={styles.cardContent}>
                            <h3>{card.title}</h3>
                            <p>{card.desc}</p>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}