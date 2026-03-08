import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <img src="/logo.svg" alt="309T Logo" className={styles.logo} />
            <nav className={styles.nav}>
                <a href="#about">About us</a>
                <a href="#features">Features</a>
                <a href="#values">Values</a>
                <a href="#faq">FAQ</a>
            </nav>
            <button className={styles.btnWaitlist}>Join the Waitlist</button>
        </header>
    );
}