'use client';
import { useWaitlist} from "@/components/context/WaitlistContext";
import styles from './WaitlistWidget.module.css';

export default function WaitlistWidget() {
    const { openWaitlist } = useWaitlist();

    return (
        <button className={styles.widget} onClick={openWaitlist} aria-label="Join Waitlist">
            <span className={styles.text}>Join Waitlist</span>
            <div className={styles.icon}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1V13M1 7H13" stroke="black" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
        </button>
    );
}