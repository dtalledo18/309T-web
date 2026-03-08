// src/lib/gsap-config.ts
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // Configuración opcional para que el scroll sea más suave
    ScrollTrigger.config({
        ignoreMobileResize: true,
    });
}

export * from 'gsap';
export * from 'gsap/ScrollTrigger';