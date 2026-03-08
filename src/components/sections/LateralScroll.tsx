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

        // ── Posición inicial ──────────────────────────────────────────────
        // Queremos que solo la 1ra tarjeta sea visible.
        // El track empieza en x = 0, pero debemos asegurarnos de que
        // la 2da y 3ra tarjeta están fuera del overflow:hidden del container.
        // Con overflow:hidden en pinContainer y el track en x:0,
        // solo se verá lo que cabe dentro del ancho del container.
        // La primera card tiene min-width: 100vw → ocupa toda la pantalla → listo.

        // ── Posición final ────────────────────────────────────────────────
        // Mover el track a la izquierda hasta que la última card quede visible.
        const getFinalX = () => -(cardsTrack.scrollWidth - pinContainer.offsetWidth);

        // ── ScrollTrigger ────────────────────────────────────────────────
        // end = distancia total que recorre el track
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
                    THE <span className={styles.blueText}>309T</span><br />
                    STANDARD
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
                            <Image src={card.icon} alt={card.title} width={52} height={52} />
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