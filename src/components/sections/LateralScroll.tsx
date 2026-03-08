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

        const getScrollAmount = () => {
            const containerWidth = pinContainer.offsetWidth;
            const trackWidth = cardsTrack.scrollWidth;
            return trackWidth - containerWidth;
        };

        gsap.to(cardsTrack, {
            x: () => getScrollAmount(),
            ease: "none",
            scrollTrigger: {
                trigger: pinContainer,
                start: "top top",
                end: () => `+=${getScrollAmount()}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

    }, { scope: pinContainerRef });

    return (

        <section ref={pinContainerRef} className={styles.pinContainer}>

            {/* Fondo decorativo */}
            <div className={styles.flowerWrapper}>
                <Image
                    src="/flower-outline.png"
                    alt=""
                    fill
                    className={styles.flowerImg}
                />
            </div>

            <div className={styles.contentWrapper}>

                {/* Título */}
                <div className={styles.introSide}>
                    <h2 className={styles.mainTitle}>
                        THE <span className={styles.blueText}>309T</span><br />
                        STANDARD
                    </h2>
                </div>

                {/* Track horizontal */}
                <div ref={cardsTrackRef} className={styles.cardsTrack}>
                    {CARDS.map((card, index) => (
                        <div key={index} className={styles.card}>

                            <div className={styles.cardIcon}>
                                <Image
                                    src={card.icon}
                                    alt={card.title}
                                    width={48}
                                    height={48}
                                />
                            </div>

                            <div className={styles.cardContent}>
                                <h3>{card.title}</h3>
                                <p>{card.desc}</p>
                            </div>

                        </div>
                    ))}
                </div>

            </div>

        </section>
    );
}