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
          id="color-root" ← el hook useScrollColor anima el backgroundColor
          de este div directamente con gsap.utils.interpolate.

          SIN clases de Tailwind de color aquí — Tailwind sobreescribiría
          los estilos inline que aplica GSAP.

          El color inicial es blanco (#ffffff), coincidiendo con fromColor
          del hook en Calculator.
        */
        <div
            id="color-root"
            style={{ backgroundColor: '#ffffff', color: '#000000' }}
        >
            <Header />
            <main>
                <Hero3D />
                <AboutUs />
                <Calculator />      {/* ← aquí ocurre el switch blanco → oscuro */}
                <VideoSection />
                <LateralScroll />
                <Metrics />
                <FAQ />
            </main>
            <Footer />
        </div>
    );
}