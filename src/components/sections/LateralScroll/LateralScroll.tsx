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

    const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 1024);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Floating petals animation
    useEffect(() => {

        const petals = [
            { ref: petal1Ref, x: 90, y: 110, rot: 22, dur: 10 },
            { ref: petal2Ref, x: 70, y: 80, rot: 28, dur: 7 },
            { ref: petal3Ref, x: 100, y: 70, rot: 18, dur: 13 },
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

    // Horizontal scroll GSAP
    useGSAP(() => {

        const pinContainer = pinContainerRef.current;
        const cardsTrack = cardsTrackRef.current;

        if (!pinContainer || !cardsTrack) return;

        // If mobile → kill trigger
        if (isMobile) {
            scrollTriggerRef.current?.kill();
            scrollTriggerRef.current = null;
            return;
        }

        const scrollAmount = cardsTrack.scrollWidth - window.innerWidth;

        const tween = gsap.to(cardsTrack, {
            x: () => -(cardsTrack.scrollWidth - window.innerWidth),
            ease: "none"
        });

        scrollTriggerRef.current = ScrollTrigger.create({
            trigger: pinContainer,
            start: "top top",
            end: () => "+=" + (cardsTrack.scrollWidth - window.innerWidth),
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            animation: tween
        });

    }, { scope: pinContainerRef, dependencies: [isMobile] });

    // Refresh ScrollTrigger when layout changes
    useEffect(() => {
        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });
    }, [isMobile]);

    // ─────────────────────────────
    // MOBILE VERSION
    // ─────────────────────────────
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
                                    <Image
                                        src={card.icon}
                                        alt={card.title}
                                        fill
                                        className={styles.iconImage}
                                    />
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

    // ─────────────────────────────
    // DESKTOP VERSION
    // ─────────────────────────────
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
                    <Image
                        src="/petal-1.webp"
                        alt=""
                        fill
                        sizes="400px"
                        className={styles.petalOneImg}
                        loading="lazy"
                    />
                </div>

                <div ref={petal2Ref} className={styles.flowerWrapperTwo}>
                    <Image
                        src="/petal-2.webp"
                        alt=""
                        fill
                        sizes="200px"
                        className={styles.petalTwoImg}
                        loading="lazy"
                    />
                </div>

                <div ref={petal3Ref} className={styles.flowerWrapperThree}>
                    <Image
                        src="/petal-1.webp"
                        alt=""
                        fill
                        sizes="400px"
                        className={styles.petalThreeImg}
                        loading="lazy"
                    />
                </div>

            </div>

            <div className={styles.cardsSection}>

                <div ref={cardsTrackRef} className={styles.cardsTrack}>

                    {CARDS.map((card, index) => (

                        <div key={index} className={styles.card}>

                            <div className={styles.cardIcon}>
                                <div className={styles.iconRelativeContainer}>
                                    <Image
                                        src={card.icon}
                                        alt={card.title}
                                        fill
                                        className={styles.iconImage}
                                    />
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