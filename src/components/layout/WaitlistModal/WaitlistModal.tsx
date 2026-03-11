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
                    <h2 className={styles.title}>Join the Waitlist</h2>
                    <button className={styles.closeBtn} onClick={closeWaitlist}>✕</button>
                </header>

                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.row}>
                        <input type="text" placeholder="First name" className={styles.input} />
                        <input type="text" placeholder="Last name" className={styles.input} />
                    </div>
                    <input type="email" placeholder="Email" className={styles.input} />
                    <select className={styles.select}>
                        <option value="">Professional role</option>
                        <option value="technician">Technician</option>
                        <option value="owner">Company Owner</option>
                    </select>
                    <input type="text" placeholder="Company (optional)" className={styles.input} />
                    <textarea
                        placeholder="Tell us why you're interested in beta-test access."
                        className={styles.textarea}
                        rows={4}
                    ></textarea>

                    <label className={styles.checkboxContainer}>
                        <input type="checkbox" />
                        <span className={styles.checkboxText}>Subscribe to be notified when new slots become available.</span>
                    </label>

                    <button type="submit" className={styles.submitBtn}>
                        Join the Waitlist
                    </button>
                </form>
            </div>
        </div>
    );
}