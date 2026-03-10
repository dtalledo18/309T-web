'use client';
import { useWaitlist} from "@/components/context/WaitlistContext";
import styles from './WaitlistModal.module.css';

export default function WaitlistModal() {
    const { isOpen, closeWaitlist } = useWaitlist();

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={closeWaitlist}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <header className={styles.header}>
                    <h2>Join the Waitlist</h2>
                    <button className={styles.closeBtn} onClick={closeWaitlist}>×</button>
                </header>

                <form className={styles.form}>
                    <div className={styles.row}>
                        <input type="text" placeholder="First name" required />
                        <input type="text" placeholder="Last name" required />
                    </div>
                    <input type="email" placeholder="Email" required />
                    <select required>
                        <option value="">Professional role</option>
                        <option value="technician">Technician</option>
                        <option value="manager">HVAC Manager</option>
                    </select>
                    <input type="text" placeholder="Company (optional)" />
                    <textarea placeholder="Tell us why you're interested in beta-test access." rows={4}></textarea>

                    <label className={styles.checkbox}>
                        <input type="checkbox" />
                        <span>Subscribe to be notified when new slots become available.</span>
                    </label>

                    <button type="submit" className={styles.submitBtn}>
                        Join the Waitlist
                    </button>
                </form>
            </div>
        </div>
    );
}