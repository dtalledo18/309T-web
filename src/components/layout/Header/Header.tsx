'use client';
import { useWaitlist} from "@/components/context/WaitlistContext";
import styles from './Header.module.css';

export default function Header() {
    const { openWaitlist } = useWaitlist(); // Extraemos la función

    return (
        <header className={styles.header}>
            <img src="/logo.svg" alt="309T Logo" className={styles.logo} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                <nav className={styles.nav}>
                    <a href="#about">About us</a>
                    <a href="#features">Features</a>
                    <a href="#values">Values</a>
                    <a href="#faq">FAQ</a>
                </nav>
                {/* Agregamos el onClick aquí */}
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