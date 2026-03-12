'use client';
import { useEffect, useState } from "react";
import { useWaitlist } from "@/components/context/WaitlistContext";
import styles from './Header.module.css';

export default function Header() {
    const { openWaitlist } = useWaitlist();
    const [isCompact, setIsCompact] = useState(false);

    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const trigger = document.getElementById("about");
                    if (trigger) {
                        const rect = trigger.getBoundingClientRect();
                        setIsCompact(rect.top <= 90);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${isCompact ? styles.compact : ''}`}>
            <img src="/logo.svg" alt="309T Logo" className={styles.logo} />
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
                <button className={styles.btnWaitlist} onClick={openWaitlist}>
                    Join the Waitlist
                </button>
            </div>
        </header>
    );
}