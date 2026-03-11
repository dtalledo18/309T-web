'use client';
import { useEffect, useState } from "react";
import { useWaitlist } from "@/components/context/WaitlistContext";
import styles from './Header.module.css';

export default function Header() {
    const { openWaitlist } = useWaitlist();
    const [isCompact, setIsCompact] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const trigger = document.getElementById("about");
            if (!trigger) return;

            const rect = trigger.getBoundingClientRect();

            if (rect.top <= 90) {
                setIsCompact(true);
            } else {
                setIsCompact(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className={`${styles.header} ${isCompact ? styles.compact : ''}`}>
            <img
                src="/logo.svg"
                alt="309T Logo"
                className={styles.logo}
            />

            <div className={styles.rightSide}>
                {!isCompact && (
                    <nav className={styles.nav}>
                        <a href="#about">About us</a>
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