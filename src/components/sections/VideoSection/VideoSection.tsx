'use client';
import { useRef, useState } from 'react';
import styles from './VideoSection.module.css';

export default function VideoSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleToggle = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
            // Al dar play, forzamos que el hover se "resetee" visualmente
            setIsHovered(false);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div
                    className={`${styles.videoWrapper} ${isPlaying ? styles.playing : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => handleToggle()}
                >
                    <video
                        ref={videoRef}
                        src="/video.mp4"
                        muted
                        playsInline
                        className={styles.videoImage}
                    />

                    <div className={styles.overlay} style={{ opacity: isPlaying ? 0 : 1 }} />

                    {/* INYECCIÓN DINÁMICA:
                        Si está pausado, el botón EXISTE.
                        Si está reproduciendo, SOLO EXISTE si el mouse está encima.
                    */}
                    {(!isPlaying || isHovered) && (
                        <button
                            className={styles.playButton}
                            onClick={(e) => handleToggle(e)}
                        >
                            <div className={styles.glassCircle}>
                                {isPlaying ? (
                                    /* Icono Pausa */
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                        <rect x="6" y="4" width="4" height="16" rx="1"/>
                                        <rect x="14" y="4" width="4" height="16" rx="1"/>
                                    </svg>
                                ) : (
                                    /* Icono Play */
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                        <polygon points="6,3 20,12 6,21"/>
                                    </svg>
                                )}
                            </div>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}