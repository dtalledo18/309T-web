'use client';
import Image from 'next/image';
import styles from './Metrics.module.css';

export default function Metrics() {
    return (
        <section className={styles.section}>
            {/* Elementos decorativos de fondo */}
            <div className={styles.bgDecorLeft}>
                <Image src="/decor-blur-left.png" alt="" width={500} height={500} />
            </div>
            <div className={styles.bgDecorRight}>
                <Image src="/decor-blur-right.png" alt="" width={500} height={500} />
            </div>

            <div className={styles.container}>
                <div className={styles.grid}>

                    {/* Tarjeta Principal 80% */}
                    <div className={`${styles.card} ${styles.cardLarge}`}>
                        <p className={styles.cardTag}>
                            End to end process, delivering Speed and efficiency cutting turnarounds times by
                        </p>
                        <h2 className={styles.statNumber}>80%</h2>
                        <p className={styles.cardFooter}>Maintaining every detail.</p>
                    </div>

                    {/* Columna Central de Tarjetas Pequeñas */}
                    <div className={styles.centerCol}>
                        <div className={styles.card}>
                            <p className={styles.cardText}>
                                <strong>Clarity speeds up claims with Audit-Ready Reports.</strong>
                                <br /><br />
                                Providing a single, trusted source that meets transparency standards.
                            </p>
                        </div>
                        <div className={styles.card}>
                            <p className={styles.cardText}>
                                <strong>Clarity speeds up claims with Audit-Ready Reports.</strong>
                                <br /><br />
                                Providing a single, trusted source that meets transparency standards.
                            </p>
                        </div>
                    </div>

                    {/* Tarjeta Derecha con Escudo */}
                    <div className={`${styles.card} ${styles.cardHigh}`}>
                        <div className={styles.shieldIcon}>
                            <Image src="/icons/shield-blue.png" alt="Shield" width={120} height={120} />
                        </div>
                        <p className={styles.cardTextCenter}>
                            <strong>Clarity speeds up claims with Audit-Ready Reports.</strong>
                            <br /><br />
                            Providing a single, trusted source that meets transparency standards.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}