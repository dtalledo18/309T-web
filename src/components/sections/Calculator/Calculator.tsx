'use client';
import { useState, useRef } from 'react';
import { useColorSwitch } from '@/hooks/useColorSwitch';
import styles from './Calculator.module.css';
import Image from "next/image";
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

export default function Calculator() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [reportVolume, setReportVolume] = useState(100);
    const [hourlyCost, setHourlyCost] = useState(100);
    const [hoursPerReport, setHoursPerReport] = useState(20);
    const containerDecorRef = useRef<HTMLDivElement>(null); // Ref para el contenedor de pétalos

    useColorSwitch(sectionRef, '#252f4a', '#ffffff', 'top center');

    useGSAP(() => {
        const petals = gsap.utils.toArray(`.${styles.petalBase}`);

        petals.forEach((petal, i) => {
            gsap.to(petal as HTMLElement, {
                // Movimiento lateral y vertical mínimo y casi igual para todos
                y: "random(-5, 5)",       // Solo 10px de recorrido total
                x: "random(-3, 3)",       // Desplazamiento lateral casi nulo

                // Eliminamos la rotación para que solo "floten"
                rotation: 0,

                // Duración muy larga y similar (entre 8 y 10 segundos)
                // Esto hace que el ritmo sea constante en toda la pantalla
                duration: `random(8, 10)`,

                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",

                // Escalonamos el inicio para que no arranquen a la vez
                delay: i * 0.4,

                force3D: true
            });
        });
    }, { scope: sectionRef });

    // Nueva Fórmula: (A * C * B) - (A * D * B)
    // A = Monthly report volume (reportVolume)
    // B = Hourly cost per report (hourlyCost)
    // C = Hours per report (hoursPerReport)
    // D = 309T Reporting Time (0.084)
    const D = 0.084;
    const oldProcessCost = reportVolume * hoursPerReport * hourlyCost;
    const newProcessCost = reportVolume * D * hourlyCost;

    const savings = Math.max(0, Math.floor(oldProcessCost - newProcessCost)).toLocaleString('en-US');

    return (
        <section ref={sectionRef} className={styles.container} id="calculator">

            <div ref={containerDecorRef} className={styles.decorBackground}>
                <div className={`${styles.petalBase} ${styles.pTopLeft}`}>
                    <Image src="/petal-1.webp" alt="" width={475} height={554} />
                </div>
                <div className={`${styles.petalBase} ${styles.pTopCenter}`}>
                    <Image src="/petal-2.webp" alt="" width={205} height={222} />
                </div>
                <div className={`${styles.petalBase} ${styles.pTopRight}`}>
                    <Image src="/petal-1.webp" alt="" width={475} height={554} />
                </div>
                <div className={`${styles.petalBase} ${styles.pBottomLeft}`}>
                    <Image src="/petal-1.webp" alt="" width={475} height={554} />
                </div>
                <div className={`${styles.petalBase} ${styles.pMidLeft}`}>
                    <Image src="/petal-2.webp" alt="" width={205} height={222} />
                </div>
                <div className={`${styles.petalBase} ${styles.pBottomRight}`}>
                    <Image src="/petal-1.webp" alt="" width={475} height={554} />
                </div>
            </div>

            <div className={styles.glassCard}>
                <div className={styles.processHeader}>
                    <div className={styles.col}>
                        <h3 className={styles.titleSmall}>Old Process</h3>
                        <ul className={styles.list}>
                            <li>
                                <span className={`${styles.iconCircle}`}>✕</span>
                                10+ days to finalize a claim report.
                            </li>
                            <li>
                                <span className={`${styles.iconCircle}`}>✕</span>
                                Estimates based on "gut feeling".
                            </li>
                            <li>
                                <span className={`${styles.iconCircle}`}>✕</span>
                                Back and forth disputes with carriers.
                            </li>
                            <li>
                                <span className={`${styles.iconCircle}`}>✕</span>
                                Late nights of data entry at home.
                            </li>
                        </ul>
                    </div>

                    <div className={styles.col}>
                        <h3 className={styles.titleSmall}>309T Process</h3>
                        <ul className={styles.list}>
                            <li>
                                <span className={`${styles.iconCircle}`}>✓</span>
                                5 minutes from scan to export.
                            </li>
                            <li>
                                <span className={`${styles.iconCircle}`}>✓</span>
                                Math-backed logic with database.
                            </li>
                            <li>
                                <span className={`${styles.iconCircle}`}>✓</span>
                                Audit-Ready transparency.
                            </li>
                            <li>
                                <span className={`${styles.iconCircle}`}>✓</span>
                                Work is done before you leave the field.
                            </li>
                        </ul>
                    </div>
                </div>

                <h2 className={styles.title}>Savings calculator</h2>
                <p className={styles.subtitle}>
                    Cut reporting time, <strong>improve</strong> team productivity, and gain better control over your HVAC operations.
                </p>

                <div className={styles.calcGrid}>
                    <div className={styles.inputs}>
                        <div className={styles.inputBox}>
                            <label>Monthly Report Volume</label>
                            <div className={styles.inputFieldWrapper}>
                                <input
                                    type="number"
                                    value={reportVolume}
                                    onChange={(e) => setReportVolume(Number(e.target.value))}
                                    className={styles.mainInput}
                                />
                            </div>
                        </div>

                        <div className={styles.inputBox}>
                            <label>Hourly cost per Report</label>
                            <div className={styles.inputFieldWrapper}>
                                <input
                                    type="number"
                                    value={hourlyCost}
                                    onChange={(e) => setHourlyCost(Number(e.target.value))}
                                    className={styles.mainInput}
                                />
                                <span className={styles.suffix}>USD</span>
                            </div>
                        </div>

                        <div className={styles.inputBox}>
                            <label>Hours per Report</label>
                            <div className={styles.inputFieldWrapper}>
                                <input
                                    type="number"
                                    value={hoursPerReport}
                                    onChange={(e) => setHoursPerReport(Number(e.target.value))}
                                    className={styles.mainInput}
                                />
                                <span className={styles.suffix}>Hours</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.resultDisplay}>
                        <div className={styles.amount}>
                            {savings}
                            <span>USD</span>
                        </div>
                        <p>Can be saved monthly from now on.*</p>
                    </div>
                </div>

                <div className={styles.footerInfo}>
                    <span>Operation = (A × C × B) − (A × D × B)</span>
                    <br />
                    <span>A = Monthly report volume  B = Hourly cost per report  C = Hours per report  D = 309T Reporting Time (5min = 0.084)</span>
                </div>
            </div>
        </section>
    );
}