'use client';

import { useEffect, useState } from "react";
import { useWaitlist } from "@/components/context/WaitlistContext";
import styles from './Header.module.css';

export default function Header() {

    const { openWaitlist } = useWaitlist();

    const [isCompact, setIsCompact] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [isPastHero, setIsPastHero] = useState(false);

    /* Detectar mobile */
    useEffect(() => {

        const checkMobile = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);

            if (mobile) {
                setIsCompact(true);
            }
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);

    }, []);

    /* Detectar scroll */
    useEffect(() => {

        const handleScroll = () => {

            const trigger = document.getElementById("about");

            if (!trigger) return;

            const rect = trigger.getBoundingClientRect();

            const past = rect.top <= 90;

            setIsPastHero(past);

            if (!isMobile) {
                setIsCompact(past);
            }

        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => window.removeEventListener("scroll", handleScroll);

    }, [isMobile]);


    return (

        <header
            className={`
                ${styles.header}
                ${isCompact ? styles.compact : ""}
                ${isMobile ? styles.mobile : ""}
                ${isPastHero ? styles.pastHero : ""}
            `}
        >

            <img
                src="/logo.svg"
                alt="309T Logo"
                className={styles.logo}
            />

            <div className={styles.rightSide}>

                {!isCompact && (

                    <nav className={styles.nav}>
                        <a href="#about">About us</a>
                        <a href="#calculator">Calculator</a>
                        <a href="#features">Features</a>
                        <a href="#values">Values</a>
                        <a href="#faq">FAQ</a>
                    </nav>

                )}

                <button
                    className={styles.btnWaitlist}
                    onClick={openWaitlist}
                >
                    Join the Waitlist
                </button>

            </div>

        </header>

    );

}