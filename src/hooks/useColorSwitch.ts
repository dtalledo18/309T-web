import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useColorSwitch
 *
 * Dispara UN cambio de color suave (no proporcional al scroll) cuando
 * el usuario cruza un punto de altura específico en la página.
 *
 * Afecta el elemento con id="color-root" (el wrapper de toda la página).
 *
 * @param triggerRef  - ref del elemento que actúa como punto de disparo
 * @param darkColor   - color oscuro destino (default: #353c4c)
 * @param lightColor  - color claro origen (default: #ffffff)
 * @param triggerPoint - cuándo se dispara: "top" del elemento trigger (default: "top center")
 */
export const useColorSwitch = (
    triggerRef: React.RefObject<HTMLDivElement | null>,
    darkColor: string = '#353c4c',
    lightColor: string = '#ffffff',
    triggerPoint: string = 'top center'
) => {
    useEffect(() => {
        if (!triggerRef.current) return;

        // Al cruzar el punto hacia abajo → oscuro
        const enterTrigger = ScrollTrigger.create({
            trigger: triggerRef.current,
            start: triggerPoint,
            onEnter: () => {
                gsap.to('#color-root', {
                    backgroundColor: darkColor,
                    duration: 0.5,       // suave pero no lentísimo
                    ease: 'power2.inOut',
                    overwrite: 'auto',
                });
            },
            // Al volver hacia arriba → blanco
            onLeaveBack: () => {
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