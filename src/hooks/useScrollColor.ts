import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollColor
 * Cambia el background de #color-root de forma GRADUAL con el scroll.
 *
 * @param ref       - ref del elemento trigger
 * @param toColor   - color destino cuando la sección entra
 * @param fromColor - color origen (sección anterior), default blanco
 */
export const useScrollColor = (
    ref: React.RefObject<HTMLDivElement | null>,
    toColor: string,
    fromColor: string = '#ffffff'
) => {
    useEffect(() => {
        if (!ref.current) return;

        const trigger = ScrollTrigger.create({
            trigger: ref.current,
            start: 'top 80%',   // empieza a transicionar cuando la sección está al 80% del viewport
            end: 'top 20%',     // termina cuando llega al 20% → transición suave en ese rango
            scrub: true,        // ← gradual y sincronizado con el scroll
            onUpdate: (self) => {
                const root = document.getElementById('color-root');
                if (!root) return;
                // Interpola entre fromColor y toColor según el progreso del scroll
                const color = gsap.utils.interpolate(fromColor, toColor, self.progress);
                root.style.backgroundColor = color;
            },
        });

        return () => trigger.kill();

    }, [ref, toColor, fromColor]);
};