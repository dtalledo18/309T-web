'use client';
import { useWaitlist } from "@/components/context/WaitlistContext";
import styles from './WaitlistModal.module.css';

export default function WaitlistModal() {
    const { isOpen, closeWaitlist } = useWaitlist();

    if (!isOpen) return null;

    return (
        <div className={styles.toastContainer}>
            <div className={styles.modalContent}>
                <header className={styles.header}>
                    <h2 className={styles.title}>Join the Waitlist</h2>
                    <button className={styles.closeBtn} onClick={closeWaitlist}>✕</button>
                </header>

                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <div className={styles.row}>
                        <input type="text" placeholder="First name" className={styles.input} required />
                        <input type="text" placeholder="Last name" className={styles.input} required />
                    </div>

                    <input type="email" placeholder="Email" className={styles.input} required />

                    <select className={styles.select} required defaultValue="">
                        <option value="" disabled hidden>Professional role</option>
                        <option value="hvac_contractor">HVAC Contractor</option>
                        <option value="general_contractor">General Contractor</option>
                        <option value="insurance_adjuster">Insurance Adjuster</option>
                        <option value="home_inspector">Home Inspector</option>
                        <option value="appraiser">Appraiser</option>
                        <option value="architect">Architect</option>
                        <option value="licensed_engineer">Licensed Engineer</option>
                        <option value="consultant">Consultant</option>
                        <option value="other">Other</option>
                    </select>

                    <input type="text" placeholder="Company (optional)" className={styles.input} />

                    <textarea
                        placeholder="Tell us why you're interested in beta-test access."
                        className={styles.textarea}
                        rows={3}
                    ></textarea>

                    <label className={styles.checkboxContainer}>
                        <input type="checkbox" className={styles.checkbox} />
                        <span className={styles.checkboxText}>
                            Subscribe to be notified when new slots become available.
                        </span>
                    </label>

                    {/* Simulación de reCAPTCHA */}
                    <div className={styles.captchaBox}>
                        <div className={styles.captchaLeft}>
                            <input type="checkbox" id="robot" className={styles.captchaCheck} />
                            <label htmlFor="robot">I'm not a robot</label>
                        </div>
                        <div className={styles.captchaRight}>
                            <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" />
                            <span>reCAPTCHA</span>
                            <div className={styles.captchaLinks}>Privacy - Terms</div>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Join the Waitlist
                    </button>
                </form>
            </div>
        </div>
    );
}