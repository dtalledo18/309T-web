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

        const getScrollAmount = () => {
            const trackWidth = cardsTrack.scrollWidth;
            const viewportWidth = window.innerWidth;
            const cards = cardsTrack.querySelectorAll(`.${styles.card}`);
            const lastCard = cards[cards.length - 1] as HTMLElement;
            const lastCardCenter = lastCard.offsetLeft + lastCard.offsetWidth / 2;
            const viewportCenter = viewportWidth / 2;
            return lastCardCenter - viewportCenter;
        };

        const scrollAmount = getScrollAmount();

        gsap.to(cardsTrack, {
            x: -scrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: pinContainer,
                // CAMBIO CLAVE 1: "top center" hace que el pin ocurra cuando
                // la sección llega al centro de la pantalla, no arriba del todo.
                // Si quieres que sea arriba pero sin saltos, usa "top top".
                start: "center center",
                end: () => `+=${scrollAmount}`,
                scrub: 1,
                pin: true,
                // CAMBIO CLAVE 2: Ajustamos anticipatePin.
                // Valores más altos (como 1.5) ayudan a evitar el parpadeo en móviles y scrolls rápidos.
                anticipatePin: 1.5,
                invalidateOnRefresh: true,
                // CAMBIO CLAVE 3: Marcadores para que veas dónde empieza y termina (quítalo luego)
                // markers: true,
            }
        });

    }, { scope: pinContainerRef });

    return (
        <section ref={pinContainerRef} className={styles.pinContainer}>
            <div className={styles.introSide}>
                <h2 className={styles.mainTitle}>
                    <span className={styles.blueText}>309T</span><br />
                    FEATURES
                </h2>
            </div>

            <div className={styles.flowerWrapper}>
                <Image src="/flower-outline.png" alt="" fill className={styles.flowerImg} />
            </div>

            <div ref={cardsTrackRef} className={styles.cardsTrack}>
                {CARDS.map((card, index) => (
                    <div key={index} className={styles.card}>
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
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                        </div>
                        <div className={styles.cardContent}>
                            <p>{card.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}