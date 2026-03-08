import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';

// Ajustamos el tipo a React.RefObject<HTMLDivElement | null>
export const useScrollColor = (ref: React.RefObject<HTMLDivElement | null>, theme: 'light' | 'dark') => {
    useGSAP(() => {
        if (!ref.current) return;

        ScrollTrigger.create({
            trigger: ref.current,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => {
                gsap.to("body", {
                    backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
                    color: theme === 'dark' ? '#ffffff' : '#000000',
                    duration: 0.8,
                    overwrite: 'auto'
                });
            },
            onLeaveBack: () => {
                gsap.to("body", {
                    backgroundColor: theme === 'dark' ? '#ffffff' : '#0f172a',
                    color: theme === 'dark' ? '#000000' : '#ffffff',
                    duration: 0.8,
                    overwrite: 'auto'
                });
            }
        });
    }, [ref, theme]);
};