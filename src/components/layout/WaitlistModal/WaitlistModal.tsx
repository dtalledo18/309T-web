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

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    professionalRole: string;
    company: string;
    reason: string;
    subscribe: boolean;
    notRobot: boolean;
}

interface FormErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    professionalRole?: string;
    reason?: string;
    notRobot?: string;
}

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

const API_URL = 'https://api-hvacai-dev.309technology.com/api/administration/waitlist';

export default function WaitlistModal() {
    const { isOpen, closeWaitlist } = useWaitlist();

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        email: '',
        professionalRole: '',
        company: '',
        reason: '',
        subscribe: false,
        notRobot: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [submitStatus, setSubmitStatus] = useState<SubmitStatus>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                professionalRole: '',
                company: '',
                reason: '',
                subscribe: false,
                notRobot: false,
            });
            setErrors({});
            setSubmitStatus('idle');
            setErrorMessage('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const selectedLabel = ROLES.find(r => r.value === formData.professionalRole)?.label;

    // ── Validations ──────────────────────────────────────────────
    const validate = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required.';
        } else if (formData.firstName.trim().length < 2) {
            newErrors.firstName = 'Must be at least 2 characters.';
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required.';
        } else if (formData.lastName.trim().length < 2) {
            newErrors.lastName = 'Must be at least 2 characters.';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Enter a valid email address.';
        }

        if (!formData.professionalRole) {
            newErrors.professionalRole = 'Please select your professional role.';
        }

        if (!formData.reason.trim()) {
            newErrors.reason = 'Please tell us why you\'re interested.';
        } else if (formData.reason.trim().length < 20) {
            newErrors.reason = 'Please write at least 20 characters.';
        }

        if (!formData.notRobot) {
            newErrors.notRobot = 'Please confirm you\'re not a robot.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // ── Field change helpers ──────────────────────────────────────
    const handleChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error on change
        if (errors[field as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    // ── Submit ────────────────────────────────────────────────────
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setSubmitStatus('loading');
        setErrorMessage('');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email.trim(),
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    professionalRole: formData.professionalRole,
                    company: formData.company.trim() || undefined,
                    reason: formData.reason.trim(),
                }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => null);
                throw new Error(data?.message || `Error ${response.status}: ${response.statusText}`);
            }

            setSubmitStatus('success');
        } catch (err: unknown) {
            setSubmitStatus('error');
            setErrorMessage(
                err instanceof Error
                    ? err.message
                    : 'Something went wrong. Please try again.'
            );
        }
    };

    // ── Success screen ────────────────────────────────────────────
    if (submitStatus === 'success') {
        return (
            <div className={styles.toastContainer}>
                <div className={styles.modalContent}>
                    <header className={styles.header}>
                        <h2 className={styles.title}>Join the Waitlist</h2>
                        <button className={styles.closeBtn} onClick={closeWaitlist}>✕</button>
                    </header>
                    <div className={styles.successBody}>
                        <div className={styles.successIcon}>✓</div>
                        <h3 className={styles.successTitle}>You're on the list!</h3>
                        <p className={styles.successText}>
                            Thanks, <strong>{formData.firstName}</strong>! We'll be in touch soon.
                        </p>
                        <button className={styles.submitBtn} onClick={closeWaitlist}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Main form ─────────────────────────────────────────────────
    return (
        <div className={styles.toastContainer}>
            <div className={styles.modalContent}>
                <header className={styles.header}>
                    <h2 className={styles.title}>Join the Waitlist</h2>
                    <button className={styles.closeBtn} onClick={closeWaitlist}>✕</button>
                </header>

                <form className={styles.form} onSubmit={handleSubmit} noValidate>

                    {/* First / Last name */}
                    <div className={styles.row}>
                        <div className={styles.fieldGroup}>
                            <input
                                type="text"
                                placeholder="First name"
                                className={`${styles.input} ${errors.firstName ? styles.inputError : ''}`}
                                value={formData.firstName}
                                onChange={e => handleChange('firstName', e.target.value)}
                            />
                            {errors.firstName && <span className={styles.errorMsg}>{errors.firstName}</span>}
                        </div>
                        <div className={styles.fieldGroup}>
                            <input
                                type="text"
                                placeholder="Last name"
                                className={`${styles.input} ${errors.lastName ? styles.inputError : ''}`}
                                value={formData.lastName}
                                onChange={e => handleChange('lastName', e.target.value)}
                            />
                            {errors.lastName && <span className={styles.errorMsg}>{errors.lastName}</span>}
                        </div>
                    </div>

                    {/* Email */}
                    <div className={styles.fieldGroup}>
                        <input
                            type="email"
                            placeholder="Email"
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            value={formData.email}
                            onChange={e => handleChange('email', e.target.value)}
                        />
                        {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                    </div>

                    {/* Professional Role Dropdown */}
                    <div className={styles.fieldGroup}>
                        <div className={styles.dropdownWrapper} ref={dropdownRef}>
                            <button
                                type="button"
                                className={`${styles.dropdownTrigger} ${!selectedLabel ? styles.placeholder : ''} ${errors.professionalRole ? styles.inputError : ''}`}
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
                                            className={`${styles.dropdownItem} ${formData.professionalRole === role.value ? styles.dropdownItemActive : ''}`}
                                            onClick={() => {
                                                handleChange('professionalRole', role.value);
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            {role.label}
                                            {formData.professionalRole === role.value && (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={styles.checkIcon}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                        {errors.professionalRole && <span className={styles.errorMsg}>{errors.professionalRole}</span>}
                    </div>

                    {/* Company */}
                    <input
                        type="text"
                        placeholder="Company (optional)"
                        className={styles.input}
                        value={formData.company}
                        onChange={e => handleChange('company', e.target.value)}
                    />

                    {/* Reason */}
                    <div className={styles.fieldGroup}>
                        <textarea
                            placeholder="Tell us why you're interested in beta-test access."
                            className={`${styles.textarea} ${errors.reason ? styles.inputError : ''}`}
                            rows={3}
                            value={formData.reason}
                            onChange={e => handleChange('reason', e.target.value)}
                        />
                        {errors.reason && <span className={styles.errorMsg}>{errors.reason}</span>}
                    </div>

                    {/* Subscribe checkbox */}
                    <label className={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={formData.subscribe}
                            onChange={e => handleChange('subscribe', e.target.checked)}
                        />
                        <span className={styles.checkboxText}>
                            Subscribe to be notified when new slots become available.
                        </span>
                    </label>

                    {/* reCAPTCHA */}
                    <div className={styles.fieldGroup}>
                        <div className={`${styles.captchaBox} ${errors.notRobot ? styles.captchaBoxError : ''}`}>
                            <div className={styles.captchaLeft}>
                                <input
                                    type="checkbox"
                                    id="robot"
                                    className={styles.captchaCheck}
                                    checked={formData.notRobot}
                                    onChange={e => handleChange('notRobot', e.target.checked)}
                                />
                                <label htmlFor="robot">I'm not a robot</label>
                            </div>
                            <div className={styles.captchaRight}>
                                <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" />
                                <span>reCAPTCHA</span>
                                <div className={styles.captchaLinks}>Privacy - Terms</div>
                            </div>
                        </div>
                        {errors.notRobot && <span className={styles.errorMsg}>{errors.notRobot}</span>}
                    </div>

                    {/* API error banner */}
                    {submitStatus === 'error' && (
                        <div className={styles.errorBanner}>
                            ⚠️ {errorMessage}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={submitStatus === 'loading'}
                    >
                        {submitStatus === 'loading' ? 'Submitting…' : 'Join the Waitlist'}
                    </button>
                </form>
            </div>
        </div>
    );
}