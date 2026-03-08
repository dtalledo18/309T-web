export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/5 py-16 px-10 text-sm opacity-60">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
                <div className="col-span-2">
                    <div className="font-bold text-xl text-white mb-4">309T</div>
                    <p className="max-w-xs">Driving innovation in HVAC management through artificial intelligence and smart workflows.</p>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Product</h4>
                    <ul className="space-y-2">
                        <li>Solutions</li>
                        <li>Case Studies</li>
                        <li>Pricing</li>
                    </ul>
                </div>
                <div>
                    <h4 className="text-white font-bold mb-4">Company</h4>
                    <ul className="space-y-2">
                        <li>About Us</li>
                        <li>Careers</li>
                        <li>Contact</li>
                    </ul>
                </div>
            </div>
            <div className="mt-16 pt-8 border-t border-white/5 flex justify-between items-center">
                <p>© 2026 309T. All rights reserved.</p>
                <div className="flex gap-6">
                    <span>Privacy Policy</span>
                    <span>Terms of Service</span>
                </div>
            </div>
        </footer>
    );
}