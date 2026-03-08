const faqs = [
    { q: "How does 309T improve Fleet Tech efficiency?", a: "By automating data collection and providing real-time analytics..." },
    { q: "Is the data compliant with US Insurance Standards?", a: "Yes, we follow all industry-standard security and compliance protocols." },
    { q: "Do I need to be an AI expert to use the app?", a: "Not at all. Our interface is designed for intuitive use by anyone in the field." }
];

export default function FAQ() {
    return (
        <section className="py-24 px-6 max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-12">FAQ</h2>
            <div className="space-y-6">
                {faqs.map((item, i) => (
                    <div key={i} className="group border-b border-white/10 pb-6 cursor-pointer">
                        <h3 className="text-xl font-medium group-hover:text-lime-400 transition-colors flex justify-between">
                            {item.q} <span>+</span>
                        </h3>
                        <p className="mt-4 opacity-50 hidden group-hover:block transition-all">
                            {item.a}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}