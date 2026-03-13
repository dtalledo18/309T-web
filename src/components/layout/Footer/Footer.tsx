'use client';
import Image from 'next/image';
import styles from './Footer.module.css';
import {useWaitlist} from "@/components/context/WaitlistContext";

export default function Footer() {

    const { openWaitlist } = useWaitlist();
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topGrid}>
                    {/* Logo y Eslogan */}
                    <div className={styles.brandCol}>
                        <div className={styles.logoWrapper}>
                            <Image src="/logo.svg" alt="309T" width={40} height={40} />
                            <span className={styles.brandName}>309T</span>
                        </div>
                        <p className={styles.slogan}>
                            You solve real problems.<br />
                            Your tools should too.
                        </p>
                    </div>

                    {/* Contacto */}
                    <div className={styles.navCol}>
                        <h4>CONTACT</h4>
                        <ul>
                            <li>+ 847 630 1415</li>
                            <li>309technology@gmail.com</li>
                            <li>Chicago, IL</li>
                        </ul>
                    </div>

                    {/* Features */}
                    <div className={styles.navCol}>
                        <h4>FEATURES</h4>
                        <ul>
                            <li>Reports</li>
                            <li>Cost Estimator</li>
                            <li>AI Integration</li>
                        </ul>
                    </div>

                    {/* Reliability */}
                    <div className={styles.navCol}>
                        <h4>RELIABILITY</h4>
                        <ul>
                            <li>Audit-Ready Standards</li>
                            <li>Security & Compliance</li>
                            <li>Human-machine synergy</li>
                        </ul>
                    </div>
                </div>

                {/* Barra Inferior */}
                <div className={styles.bottomBar}>
                    <div className={styles.legal}>
                        <span>© 2025 Hvacai. All rights reserved.</span>
                        <span className={styles.separator}>|</span>
                        <a href="#">Privacy Policy</a>
                        <span className={styles.separator}>|</span>
                        <a href="#">Terms of Service</a>
                    </div>
                    <button onClick={openWaitlist} className={styles.waitlistBtn}>
                        Join the Waitlist
                    </button>
                </div>
            </div>
        </footer>
    );
}