'use client';
import Image from 'next/image';
import styles from './AboutUs.module.css';
import { useRef } from 'react';
import { gsap } from '@/lib/gsap-config';
import { useGSAP } from '@gsap/react';

export default function AboutUs() {
    const container = useRef(null);
    const imgWrapperRef = useRef(null);

    useGSAP(() => {
        // Entrada inicial
        gsap.from(imgWrapperRef.current, {
            y: 60,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: container.current,
                start: "top 70%",
            }
        });

        // Efecto de scale-down al hacer scroll
        gsap.fromTo(
            imgWrapperRef.current,
            { scale: 1.15 },
            {
                scale: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 60%",   // empieza cuando la sección entra al viewport
                    end: "center center", // termina cuando el centro de la sección llega al centro de la pantalla
                    scrub: 1,          // suaviza el seguimiento del scroll
                    invalidateOnRefresh: true,
                }
            }
        );
    }, { scope: container });

    return (
        <section ref={container} className={styles.section} id="about">
            <div className={styles.content}>
                <div className={styles.flowerWrapper}>
                    <img
                        src="/flower-outline-alt.webp"
                        alt=""
                        className={styles.flowerImg}
                    />
                </div>

                <p className={styles.description} id="about-text">
                    <strong>309T</strong> leverages custom end to end AI/ML models to scan and detect HVAC damage with surgical precision. We transform weeks of manual paperwork into Audit-Ready technical reports in minutes that supports your expertise, using verified equipment databases to provide a single source of truth for both technicians and insurance carriers. Engineered for the field, tested in the extremes of Chicago.
                </p>

                <div ref={imgWrapperRef} className={styles.imageWrapper}>
                    <Image
                        src="/devices-mockup.webp"
                        alt="309T Interface on Laptop, Tablet and Mobile"
                        width={1400} // Ajusta según el tamaño original de tu PNG
                        height={1000}
                        loading="eager" priority
                        className={styles.devicesImg}
                    />
                </div>
            </div>
        </section>
    );
}