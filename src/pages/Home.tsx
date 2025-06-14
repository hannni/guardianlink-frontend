import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12">
            <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-4xl text-center">
                <h1 className="text-5xl font-extrabold text-blue-800 mb-6">Welcome to GuardianLink</h1>

                <p className="text-lg text-gray-700 mb-12">
                    GuardianLink is a digital service platform committed to bridging the cybersecurity gap in the nonprofit sector.
                    We connect vetted cybersecurity professionals with non-profit organizations that need protection — all at no financial cost to the organizations we support.
                </p>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-700 mb-3">Who Are We?</h2>
                    <p className="text-gray-700">
                        We are a community-driven initiative built by cybersecurity experts, public interest technologists, and digital rights advocates who believe that
                        online safety should be a universal right, not a privilege. GuardianLink is not a company — it's a civic infrastructure for digital defense.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-700 mb-3">What Do We Do?</h2>
                    <p className="text-gray-700">
                        We’ve developed a secure and streamlined platform where verified volunteers can register their credentials and availability, while
                        non-profit organizations can submit tailored support requests. Our admin team ensures responsible and safe pairings, facilitating real impact through
                        cyber resilience services such as audits, training, threat detection, and data recovery.
                    </p>
                </section>

                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-blue-700 mb-3">Why Does It Matter?</h2>
                    <p className="text-gray-700">
                        Nonprofits frequently operate under constrained budgets, leaving them vulnerable to phishing, ransomware, and other threats that compromise their missions.
                        By volunteering time and skills to protect these organizations, we empower the changemakers who serve communities, defend human rights,
                        and deliver frontline social services. Cybersecurity is no longer optional — it's foundational.
                    </p>
                </section>

                <section className="mb-16">
                    <h2 className="text-2xl font-bold text-blue-700 mb-3">Who Are Our Early Partners?</h2>
                    <p className="text-gray-700 mb-3">
                        During our prototype phase, GuardianLink collaborated with a select group of simulated non-profit networks to test and refine the platform's
                        architecture and workflows. These organizations provided critical feedback and stress-tested our system under real-world scenarios.
                    </p>
                    <ul className="list-disc list-inside text-left text-gray-700 text-md inline-block">
                        <li>CyberPeace Foundation (Simulated Environment)</li>
                        <li>Digital Defenders Alliance (Pilot Use Case)</li>
                        <li>Infosec Protectors Collective (Testbed Collaboration)</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Home;
