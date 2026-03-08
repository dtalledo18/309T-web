'use client';
import { useStore } from '@/store/useStore';
import Header from '@/components/layout/Header';
import Hero3D from '@/components/sections/Hero3D';
import LateralScroll from '@/components/sections/LateralScroll';
import Calculator from '@/components/sections/Calculator';
import FAQ from '@/components/sections/FAQ';
import Footer from '@/components/layout/Footer';
import AboutUs from "@/components/sections/AboutUs";
import VideoSection from "@/components/sections/VideoSection";

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
                <FAQ />
            </main>
            <Footer />
        </div>
    );
}