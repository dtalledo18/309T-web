'use client';
import { useRef, useState } from 'react';
import styles from './VideoSection.module.css';

export default function VideoSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (isPlaying) {
            video.pause();
            setIsPlaying(false);
        } else {
            video.play();
            setIsPlaying(true);
        }
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div
                    className={`${styles.videoWrapper} ${isPlaying ? styles.playing : ''}`}
                    onClick={togglePlay}
                >
                    <video
                        ref={videoRef}
                        src="/video.mp4"
                        muted
                        playsInline
                        className={styles.videoImage}
                    />

                    <div className={styles.overlay} />

                    <button
                        className={styles.playButton}
                        onClick={(e) => { e.stopPropagation(); togglePlay(); }}
                    >
                        <div className={styles.glassCircle}>
                            {isPlaying ? (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                    <rect x="6" y="4" width="4" height="16" rx="1"/>
                                    <rect x="14" y="4" width="4" height="16" rx="1"/>
                                </svg>
                            ) : (
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                                    <polygon points="6,3 20,12 6,21"/>
                                </svg>
                            )}
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
}