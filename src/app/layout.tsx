import type { Metadata } from "next";
import { Barlow, Public_Sans } from "next/font/google";
import "./globals.css";// 1. Importa el Provider y el Modal
import { WaitlistProvider} from "@/components/context/WaitlistContext";
import WaitlistModal from "@/components/layout/WaitlistModal/WaitlistModal";

const barlow = Barlow({
    subsets: ["latin"],
    weight: ["600", "700", "800"], // Pesos para títulos
    variable: "--font-barlow",
});

const publicSans = Public_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-public-sans",
});

export const metadata: Metadata = {
  title: "309T",
  description: "HVAC by 309 technology",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${barlow.variable} ${publicSans.variable} antialiased`}>
        <WaitlistProvider>
            {children}
            <WaitlistModal />
        </WaitlistProvider>
        </body>
        </html>
    );
}