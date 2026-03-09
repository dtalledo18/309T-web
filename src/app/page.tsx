'use client';
import Header from '@/components/layout/Header/Header';
import Hero3D from '@/components/sections/Hero3D/Hero3D';
import LateralScroll from '@/components/sections/LateralScroll/LateralScroll';
import Calculator from '@/components/sections/Calculator/Calculator';
import FAQ from '@/components/sections/FAQ/FAQ';
import Footer from '@/components/layout/Footer/Footer';
import AboutUs from "@/components/sections/AboutUs/AboutUs";
import VideoSection from "@/components/sections/VideoSection/VideoSection";
import Metrics from "@/components/sections/Metrics/Metrics";

export default function Home() {
    return (
        /*
          id="color-root"
          - GSAP anima backgroundColor de este div directamente
          - NO uses clases Tailwind de color aquí (bg-white, bg-slate-950, etc.)
            porque Tailwind sobreescribiría los estilos inline de GSAP
          - Color inicial: #ffffff (blanco = Hero + AboutUs)
        */
        <div id="color-root" style={{ backgroundColor: '#ffffff' }}>
            <Header />
            <main>
                <Hero3D />
                <AboutUs />

                {/*
                  Calculator tiene el useColorSwitch.
                  Cuando su TOP cruza el CENTER del viewport,
                  TODO el #color-root cambia a #353c4c suavemente.
                  Esto hace que AboutUs (que ya pasó) y Calculator
                  (que está entrando) se vean ambas en el color oscuro.
                */}
                <Calculator />

                <VideoSection />
                <LateralScroll />
                <Metrics />
                <FAQ />
            </main>
            <Footer />
        </div>
    );
}