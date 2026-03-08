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
        // Animación sutil de entrada al hacer scroll
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
    }, { scope: container });

    return (
        <section ref={container} className={styles.section} id="about">
            <div className={styles.content}>
                <p className={styles.description}>
                    <strong>309T</strong> leverages custom end to end AI/ML models to scan and detect HVAC damage with surgical precision...
                </p>

                <div ref={imgWrapperRef} className={styles.imageWrapper}>
                    <Image
                        src="/devices-mockup.png"
                        alt="309T Interface on Laptop, Tablet and Mobile"
                        width={1200} // Ajusta según el tamaño original de tu PNG
                        height={800}
                        priority={false} // Se carga solo cuando el usuario hace scroll hacia abajo
                        className={styles.devicesImg}
                    />
                </div>
            </div>
        </section>
    );
}