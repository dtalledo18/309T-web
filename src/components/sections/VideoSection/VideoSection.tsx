'use client';
import Image from 'next/image';
import styles from './VideoSection.module.css';

export default function VideoSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.videoWrapper}>
                    {/* Imagen que actúa como placeholder del video */}
                    <Image
                        src="/video-placeholder.png" // Asegúrate de poner tu archivo VIDEO.jpg aquí
                        alt="309T App Interface"
                        width={1200}
                        height={675}
                        className={styles.videoImage}
                    />

                    {/* Botón con efecto Glassmorphism de iOS */}
                    <button className={styles.playButton}>
                        <div className={styles.glassCircle}>
                            <span className={styles.playText}>Play Video</span>
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}