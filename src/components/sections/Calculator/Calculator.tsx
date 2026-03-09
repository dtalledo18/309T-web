'use client';
import { useState, useRef } from 'react';
import { useScrollColor } from '@/hooks/useScrollColor';
import styles from './Calculator.module.css';

export default function Calculator() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [hours, setHours] = useState(8);
    const [rate, setRate] = useState(70);

    // De blanco → oscuro al entrar a Calculator
    useScrollColor(sectionRef, '#0f172a', '#ffffff');

    const savings = (hours * rate * 7.5).toFixed(0);

    return (
        <section ref={sectionRef} className={styles.container}>
            <div className={styles.glassCard}>
                <div className={styles.processHeader}>
                    <div className={styles.col}>
                        <h3>Old Process</h3>
                        <ul>
                            <li>✖ 10+ days to finalize a claim report.</li>
                            <li>✖ Estimates based on "gut feeling".</li>
                            <li>✖ Back and forth disputes with carriers.</li>
                            <li>✖ Late nights of data entry at home.</li>
                        </ul>
                    </div>
                    <div className={styles.col}>
                        <h3>309T Process</h3>
                        <ul className={styles.successList}>
                            <li>✔ 5 minutes from scan to export.</li>
                            <li>✔ Math-backed logic with database.</li>
                            <li>✔ Audit-Ready transparency.</li>
                            <li>✔ Work is done before you leave the field.</li>
                        </ul>
                    </div>
                </div>

                <h2 className={styles.title}>Discover your potential savings</h2>
                <p className={styles.subtitle}>
                    Cut reporting time, <strong>improve</strong> team productivity, and gain better control over your HVAC operations.
                </p>

                <div className={styles.calcGrid}>
                    <div className={styles.inputs}>
                        <div className={styles.inputBox}>
                            <label>Enter your average hours per report</label>
                            <input
                                type="number"
                                value={hours}
                                onChange={(e) => setHours(Number(e.target.value))}
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <label>Enter your hourly rate</label>
                            <div className={styles.rateRow}>
                                <input
                                    type="number"
                                    value={rate}
                                    onChange={(e) => setRate(Number(e.target.value))}
                                />
                                <span>USD</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.resultDisplay}>
                        <div className={styles.amount}>{savings} <span>USD</span></div>
                        <p>saved in this month</p>
                    </div>
                </div>

                <div className={styles.footerInfo}>
                    {hours} hour per report &nbsp; × &nbsp; {rate} USD hourly rate
                </div>
            </div>
        </section>
    );
}