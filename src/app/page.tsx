'use client';
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from '@/components/layout/Header/Header';
import Hero3D from '@/components/sections/Hero3D/Hero3D';
import AboutUs from "@/components/sections/AboutUs/AboutUs";
import Calculator from '@/components/sections/Calculator/Calculator';
import VideoSection from "@/components/sections/VideoSection/VideoSection";
import LateralScroll from '@/components/sections/LateralScroll/LateralScroll';
import Metrics from "@/components/sections/Metrics/Metrics";
import FAQ from '@/components/sections/FAQ/FAQ';
import Footer from '@/components/layout/Footer/Footer';

export default function Home() {
    return (
        <>
            <Header />
            <div id="color-root" style={{ backgroundColor: '#ffffff' }}>
                <div id="color-root-gradient" style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'linear-gradient(135deg, #0E111B 0%, #252F4A 100%)',
                    opacity: 0,
                    pointerEvents: 'none',
                    zIndex: 0,
                }} />
                <main style={{ position: 'relative', zIndex: 1 }}>
                    <Hero3D />
                    <AboutUs />
                    <Calculator />
                    <VideoSection />
                    <LateralScroll />
                    <Metrics />
                    <FAQ />
                </main>
                <Footer />
            </div>
        </>
    );
}