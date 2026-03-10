'use client';
import { useState, useRef } from 'react';
import { useColorSwitch } from '@/hooks/useColorSwitch';
import styles from './Calculator.module.css';

export default function Calculator() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [reportVolume, setReportVolume] = useState(100);
    const [hourlyCost, setHourlyCost] = useState(100);
    const [hoursPerReport, setHoursPerReport] = useState(20);

    useColorSwitch(sectionRef, '#252f4a', '#ffffff', 'top center');

    // Fórmula: (Reports × Hours per report) × Hourly cost
    const savings = (reportVolume * hoursPerReport * hourlyCost).toLocaleString('en-US');

    return (
        <section ref={sectionRef} className={styles.container}>
            <div className={styles.glassCard}>
                <div className={styles.processHeader}>
                    <div className={styles.col}>
                        <h3>Old Process</h3>
                        <ul>
                            <li><span className={styles.iconBad}>✖</span> 10+ days to finalize a claim report.</li>
                            <li><span className={styles.iconBad}>✖</span> Estimates based on "gut feeling".</li>
                            <li><span className={styles.iconBad}>✖</span> Back and forth disputes with carriers.</li>
                            <li><span className={styles.iconBad}>✖</span> Late nights of data entry at home.</li>
                        </ul>
                    </div>
                    <div className={styles.col}>
                        <h3>309T Process</h3>
                        <ul className={styles.successList}>
                            <li><span className={styles.iconGood}>✔</span> 5 minutes from scan to export.</li>
                            <li><span className={styles.iconGood}>✔</span> Math-backed logic with database.</li>
                            <li><span className={styles.iconGood}>✔</span> Audit-Ready transparency.</li>
                            <li><span className={styles.iconGood}>✔</span> Work is done before you leave the field.</li>
                        </ul>
                    </div>
                </div>

                <h2 className={styles.title}>Lost Revenue calculator</h2>
                <p className={styles.subtitle}>
                    Cut reporting time, <strong>improve</strong> team productivity, and gain better control over your HVAC operations.
                </p>

                <div className={styles.calcGrid}>
                    <div className={styles.inputs}>
                        {/* Input A — Monthly Report Volume */}
                        <div className={styles.inputBox}>
                            <label>Monthly Report Volume</label>
                            <div className={styles.inputRow}>
                                <input
                                    type="number"
                                    value={reportVolume}
                                    onChange={(e) => setReportVolume(Number(e.target.value))}
                                />
                            </div>
                        </div>

                        {/* Input B — Hourly cost per Report */}
                        <div className={styles.inputBox}>
                            <label>Hourly cost per Report</label>
                            <div className={styles.inputRow}>
                                <input
                                    type="number"
                                    value={hourlyCost}
                                    onChange={(e) => setHourlyCost(Number(e.target.value))}
                                />
                                <span className={styles.unit}>USD</span>
                            </div>
                        </div>

                        {/* Input C — Hours per Report */}
                        <div className={styles.inputBox}>
                            <label>Hours per Report</label>
                            <div className={styles.inputRow}>
                                <input
                                    type="number"
                                    value={hoursPerReport}
                                    onChange={(e) => setHoursPerReport(Number(e.target.value))}
                                />
                                <span className={styles.unit}>Hours</span>
                            </div>
                        </div>
                    </div>

                    {/* Result Display D */}
                    <div className={styles.resultDisplay}>
                        <div className={styles.amount}>
                            {savings}
                            <span>USD</span>
                        </div>
                        <p>Can be saved monthly from now on.*</p>
                    </div>
                </div>

                <div className={styles.footerInfo}>
                    <span>( <strong>Reports</strong> per month × <strong>Hours</strong> per report ) × <strong>Hourly cost</strong> per service</span>
                    <br />
                    <span>*Estimation made considering 5 minute per report.</span>
                </div>
            </div>
        </section>
    );
}