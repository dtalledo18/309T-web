'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './LateralScroll.module.css';
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    const petal1Ref = useRef<HTMLDivElement>(null);
    const petal2Ref = useRef<HTMLDivElement>(null);
    const petal3Ref = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    useEffect(() => {
        const petals = [
            { ref: petal1Ref, x: 90,  y: 110, rot: 22, dur: 10 },
            { ref: petal2Ref, x: 70,  y: 80,  rot: 28, dur: 7  },
            { ref: petal3Ref, x: 100, y: 70,  rot: 18, dur: 13 },
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
        if (isMobile) {
            // Mata todos los ScrollTriggers de este scope
            ScrollTrigger.getAll().forEach(st => st.kill());
            return;
        }

        const pinContainer = pinContainerRef.current;
        const cardsTrack = cardsTrackRef.current;
        if (!pinContainer || !cardsTrack) return;

        requestAnimationFrame(() => {
            const scrollAmount = cardsTrack.scrollWidth - window.innerWidth;
            gsap.to(cardsTrack, {
                x: -scrollAmount,
                ease: "none",
                scrollTrigger: {
                    trigger: pinContainer,
                    start: "top top",
                    end: `+=${cardsTrack.scrollWidth}`,
                    scrub: 1,
                    pin: true,
                    invalidateOnRefresh: true,
                }
            });
        });
    }, { scope: pinContainerRef, dependencies: [isMobile] });

    // ── MOBILE / TABLET: versión estática ──
    if (isMobile) {
        return (
            <section className={styles.mobileSection} id="features">
                <div className={styles.mobileDarkHeader}>
                    <h2 className={styles.mainTitle}>
                        <span className={styles.blueText}>THE 309T</span><br />
                        STANDARD
                    </h2>
                </div>
                <div className={styles.mobileCardsContainer}>
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
            </section>
        );
    }

    // ── DESKTOP: versión con GSAP horizontal scroll ──
    return (
        <section ref={pinContainerRef} className={styles.pinContainer} id="features">
            <div className={styles.darkHeader}>
                <div className={styles.headerContent}>
                    <h2 className={styles.mainTitle}>
                        <span className={styles.blueText}>THE 309T</span><br />
                        STANDARD
                    </h2>
                </div>
                <div ref={petal1Ref} className={styles.flowerWrapperOne}>
                    <Image src="/petal-1.webp" alt="" fill sizes="400px" className={styles.petalOneImg} loading="lazy"/>
                </div>
                <div ref={petal2Ref} className={styles.flowerWrapperTwo}>
                    <Image src="/petal-2.webp" alt="" fill sizes="200px" className={styles.petalTwoImg} loading="lazy"/>
                </div>
                <div ref={petal3Ref} className={styles.flowerWrapperThree}>
                    <Image src="/petal-1.webp" alt="" fill sizes="400px" className={styles.petalThreeImg} loading="lazy"/>
                </div>
            </div>

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