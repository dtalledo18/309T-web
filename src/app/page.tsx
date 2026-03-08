'use client';
import { useStore } from '@/store/useStore';
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
    const theme = useStore((state) => state.theme);

    return (
        <div className={`transition-colors duration-1000 ${theme === 'dark' ? 'bg-slate-950 text-white' : 'bg-white text-black'}`}>
            <Header />
            <main>
                <Hero3D />
                <AboutUs />
                <Calculator />
                <VideoSection/>
                <LateralScroll />
                <Metrics/>
                <FAQ />
            </main>
            <Footer />
        </div>
    );
}