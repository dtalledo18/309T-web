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
        desc: <>Enhance your expertise with automated reporting that delivers <span className={styles.highlight}>audit-ready results</span> to significantly reduce HVAC reporting time.</>,
        icon: "/icons/reports.svg",
    },
    {
        title: "Estimator",
        desc: <>Eliminate pricing friction with mathematical precision. Our engine processes field data through verified engineering equations to generate transparent <span className={styles.highlight}>Audit ready estimates</span> for zero back-and-forth.</>,
        icon: "/icons/estimator.svg",
    },
    {
        title: "AI Ready",
        desc: <>Leverage precision damage analysis and automated field reporting <span className={styles.highlight}>by scanning equipments</span> and get data-based results.</>,
        icon: "/icons/ai.svg",
    }
];

export default function LateralScroll() {
    const pinContainerRef = useRef<HTMLDivElement>(null);
    const cardsTrackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const pinContainer = pinContainerRef.current;
        const cardsTrack = cardsTrackRef.current;
        if (!pinContainer || !cardsTrack) return;

        // Calculamos el desplazamiento: ancho total del track menos lo que ya vemos en pantalla
        const getScrollAmount = () => {
            return cardsTrack.scrollWidth - window.innerWidth;
        };

        gsap.to(cardsTrack, {
            x: () => -(cardsTrack.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: pinContainer,
                start: "top top",
                // Multiplicamos por la cantidad de cards para que el scroll se sienta natural
                end: () => `+=${cardsTrack.scrollWidth}`,
                scrub: 1,
                pin: true,
                invalidateOnRefresh: true,
            }
        });
    }, { scope: pinContainerRef });

    return (
        <section ref={pinContainerRef} className={styles.pinContainer}>
            {/* 30% SUPERIOR: Header Oscuro */}
            <div className={styles.darkHeader}>
                <div className={styles.headerContent}>
                    <h2 className={styles.mainTitle}>
                        <span className={styles.blueText}>309T</span><br />
                        FEATURES
                    </h2>
                </div>
                {/* Elemento decorativo flor */}
                <div className={styles.flowerWrapperOne}>
                    <Image src="/petal-1.webp" alt="" fill className={styles.petalOneImg} />
                </div>
                <div className={styles.flowerWrapperTwo}>
                    <Image src="/petal-2.webp" alt="" fill className={styles.petalTwoImg} />
                </div>
                <div className={styles.flowerWrapperThree}>
                    <Image src="/petal-1.webp" alt="" fill className={styles.petalThreeImg} />
                </div>
            </div>

            {/* 70% INFERIOR: Area de Cards */}
            <div className={styles.cardsSection}>
                <div ref={cardsTrackRef} className={styles.cardsTrack}>
                    {CARDS.map((card, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.cardIcon}>
                                <div className={styles.iconRelativeContainer}>
                                    <Image src={card.icon} alt={card.title} fill className={styles.iconImage} />
                                </div>
                            </div>
                            <div className={styles.cardContent}>
                                <h3 className={styles.cardTitle}>{card.title}</h3>
                                <p>{card.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}