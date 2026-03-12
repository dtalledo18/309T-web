import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useColorSwitch = (
    triggerRef: React.RefObject<HTMLDivElement | null>,
    darkColor: string = '#353c4c',
    lightColor: string = '#ffffff',
    triggerPoint: string = 'top center'
) => {
    useEffect(() => {
        if (!triggerRef.current) return;

        const enterTrigger = ScrollTrigger.create({
            trigger: triggerRef.current,
            start: triggerPoint,
            onEnter: () => {
                // Fade in del gradiente
                gsap.to('#color-root-gradient', {
                    opacity: 1,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    overwrite: 'auto',
                });
                // Fade out del color plano
                gsap.to('#color-root', {
                    backgroundColor: 'transparent',
                    duration: 0.5,
                    ease: 'power2.inOut',
                    overwrite: 'auto',
                });
            },
            onLeaveBack: () => {
                // Fade out del gradiente
                gsap.to('#color-root-gradient', {
                    opacity: 0,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    overwrite: 'auto',
                });
                // Restaura el color blanco
                gsap.to('#color-root', {
                    backgroundColor: lightColor,
                    duration: 0.5,
                    ease: 'power2.inOut',
                    overwrite: 'auto',
                });
            },
        });

        return () => enterTrigger.kill();
    }, [triggerRef, darkColor, lightColor, triggerPoint]);
};