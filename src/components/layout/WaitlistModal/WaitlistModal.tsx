'use client';
import { useState, useRef, useEffect } from 'react';
import { useWaitlist } from "@/components/context/WaitlistContext";
import styles from './WaitlistModal.module.css';

const ROLES = [
    { value: 'appraiser', label: 'Appraiser' },
    { value: 'hvac_contractor', label: 'HVAC Contractor' },
    { value: 'general_contractor', label: 'General Contractor' },
    { value: 'insurance_adjuster', label: 'Insurance Adjuster' },
    { value: 'home_inspector', label: 'Home inspector' },
    { value: 'architect', label: 'Architect' },
    { value: 'licensed_engineer', label: 'Licensed Engineer' },
    { value: 'consultant', label: 'Consultant' },
    { value: 'other', label: 'Other' },
];

export default function WaitlistModal() {
    const { isOpen, closeWaitlist } = useWaitlist();
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Cierra al hacer click fuera
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    if (!isOpen) return null;

    const selectedLabel = ROLES.find(r => r.value === selectedRole)?.label;

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

                    {/* Custom Dropdown */}
                    <div className={styles.dropdownWrapper} ref={dropdownRef}>
                        <button
                            type="button"
                            className={`${styles.dropdownTrigger} ${!selectedLabel ? styles.placeholder : ''}`}
                            onClick={() => setDropdownOpen(o => !o)}
                        >
                            {selectedLabel || 'Professional role'}
                            <svg
                                className={`${styles.dropdownArrow} ${dropdownOpen ? styles.dropdownArrowOpen : ''}`}
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className={styles.dropdownMenu}>
                                {ROLES.map(role => (
                                    <button
                                        key={role.value}
                                        type="button"
                                        className={`${styles.dropdownItem} ${selectedRole === role.value ? styles.dropdownItemActive : ''}`}
                                        onClick={() => {
                                            setSelectedRole(role.value);
                                            setDropdownOpen(false);
                                        }}
                                    >
                                        {role.label}
                                        {selectedRole === role.value && (
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.checkIcon}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <input type="email" placeholder="Email" className={styles.input} required />

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

                    <button type="submit" className={styles.submitBtn}>Join the Waitlist</button>
                </form>
            </div>
        </div>
    );
}