import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-3xl text-center">
                <h1 className="text-4xl font-bold text-blue-800 mb-6">Welcome to GuardianLink</h1>

                <p className="text-lg mb-12">
                    Bridging the gap between non-profits and cybersecurity volunteers — at no cost to the organizations we serve.
                </p>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-2">🌐 Who Are We?</h2>
                    <p>
                        GuardianLink is a mission-driven platform connecting skilled cybersecurity volunteers with
                        non-profit organizations in need of protection and digital support. We believe digital safety is a public good.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-2">⚙️ What Do We Do?</h2>
                    <p>
                        We provide a streamlined web application for cybersecurity professionals to register, and for non-profits to
                        request assistance. Our admin team facilitates secure matches between verified volunteers and trusted organizations.
                    </p>
                </section>

                <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-2">❤️ Why Do We Do It?</h2>
                    <p>
                        Non-profits often lack the budget and resources to protect themselves from cyber threats. We believe that by
                        contributing our skills where they matter most, we strengthen communities and defend what matters.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-blue-700 mb-2">🤝 Our Partnerships</h2>
                    <ul className="list-disc list-inside inline-block text-left">
                        <li>CyberPeace Foundation (Fake)</li>
                        <li>Digital Defenders Alliance (Fake)</li>
                        <li>Infosec Protectors Collective (Fake)</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Home;
