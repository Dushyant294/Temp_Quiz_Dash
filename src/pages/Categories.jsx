import { Link } from "react-router-dom";

function Categories() {
    const categories = [
        {
            title: "NEET",
            subtitle: "Medical Entrance Prep & Biology Specialist Quizzes",
            gradient: "from-[#022c22] to-[#064e3b]",
            border: "border-[#059669]",
        },
        {
            title: "JEE",
            subtitle: "Engineering Entrance focused on Physics, Chemistry & Maths",
            gradient: "from-[#1e1b4b] to-[#312e81]",
            border: "border-[#4f46e5]",
        },
        {
            title: "NDA-NA",
            subtitle: "Defence Academy Prep: General Ability & Mathematics Mocks",
            gradient: "from-[#422006] to-[#713f12]",
            border: "border-[#ca8a04]",
        },
        {
            title: "SSC CGL",
            subtitle: "Government Tier 1 & 2 Competitive Patterns",
            gradient: "from-[#064e3b] to-[#022c22]",
            border: "border-[#10b981]",
        },
        {
            title: "GATE",
            subtitle: "Advanced Engineering & PSU Entrance Mock Tests",
            gradient: "from-[#450a0a] to-[#2ecc71]", // Using a slight mix for the red to dark look
            border: "border-[#ef4444]",
        },
        {
            title: "Boards",
            subtitle: "CBSE, ICSE & State Board Mock Exams",
            gradient: "from-[#4c1d95] to-[#2e1065]",
            border: "border-[#a855f7]",
        },
    ];

    // Adjusting gradients manually to closely match the image
    const refinedCategories = [
        {
            title: "NEET",
            subtitle: "Medical Entrance Prep & Biology\nSpecialist Quizzes",
            gradient: "bg-gradient-to-b from-[#14532d] via-[#064e3b] to-black",
            border: "border-[#4ade80]/40 text-white",
        },
        {
            title: "JEE",
            subtitle: "Engineering Entrance focused\non Physics, Chemistry & Maths",
            gradient: "bg-gradient-to-b from-[#312e81] via-[#1e1b4b] to-black",
            border: "border-[#818cf8]/40 text-white",
        },
        {
            title: "NDA-NA",
            subtitle: "Defence Academy Prep: General\nAbility & Mathematics Mocks",
            gradient: "bg-gradient-to-b from-[#b45309] via-[#713f12] to-black",
            border: "border-[#fcd34d]/40 text-white",
        },
        {
            title: "SSC CGL",
            subtitle: "Government Tier 1 & 2\nCompetitive Patterns",
            gradient: "bg-gradient-to-b from-[#15803d] via-[#14532d] to-black",
            border: "border-[#86efac]/40 text-white",
        },
        {
            title: "GATE",
            subtitle: "Advanced Engineering & PSU\nEntrance Mock Tests",
            gradient: "bg-gradient-to-b from-[#991b1b] via-[#450a0a] to-black",
            border: "border-[#fca5a5]/40 text-white",
        },
        {
            title: "Boards",
            subtitle: "CBSE, ICSE & State Board Mock\nExams",
            gradient: "bg-gradient-to-b from-[#7e22ce] via-[#4c1d95] to-black",
            border: "border-[#d8b4fe]/40 text-white",
        },
    ];

    return (
        <div className="max-w-[1200px] mx-auto text-black dark:text-white pb-12 pt-6">

            {/* Top Banner */}
            <div className="w-full bg-gradient-to-r from-[#4f46e5] via-[#1e1b4b] to-[#040914] rounded-2xl py-12 px-10 mb-10 shadow-2xl overflow-hidden relative">
                <h1 className="font-bold text-3xl md:text-[32px] text-white mb-3 tracking-wide z-10 relative">
                    Select Your Path to Success : &nbsp;Mock Quizzes for Your Career Goals
                </h1>
                <p className="text-gray-300 text-sm font-light mb-8 z-10 relative">
                    Select a category to explore specialized mock tests and quizzes
                </p>

                <div className="flex flex-wrap gap-4 z-10 relative">
                    <span className="border-2 border-white rounded-full px-5 py-1.5 font-semibold text-sm tracking-wide bg-white/10 text-white shadow-lg backdrop-blur-sm">
                        Trending Now
                    </span>
                    <span className="border border-white/40 rounded-full px-5 py-1.5 text-sm tracking-wide hover:bg-white/10 transition cursor-pointer text-gray-200">
                        GATE
                    </span>
                    <span className="border border-white/40 rounded-full px-5 py-1.5 text-sm tracking-wide hover:bg-white/10 transition cursor-pointer text-gray-200">
                        JEE
                    </span>
                    <span className="border border-white/40 rounded-full px-5 py-1.5 text-sm tracking-wide hover:bg-white/10 transition cursor-pointer text-gray-200">
                        NEET
                    </span>
                    <span className="border border-white/40 rounded-full px-5 py-1.5 text-sm tracking-wide hover:bg-white/10 transition cursor-pointer text-gray-200">
                        Boards
                    </span>
                </div>
            </div>

            {/* Popular Categories Title */}
            <div className="flex justify-center mb-10">
                <span className="border-2 border-gray-400 rounded-lg px-5 py-1.5 font-semibold text-[15px] tracking-wide text-gray-200">
                    Popular Categories
                </span>
            </div>

            {/* Grid of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {refinedCategories.map((cat, idx) => (
                    <div
                        key={idx}
                        className={`rounded-2xl border ${cat.border} ${cat.gradient} p-8 flex flex-col items-center justify-center text-center shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
                    >
                        <h2 className="text-2xl font-bold mb-3 tracking-wider">{cat.title}</h2>
                        <p className="text-[11px] leading-relaxed text-gray-300 mb-6 px-4 whitespace-pre-line font-medium">
                            {cat.subtitle}
                        </p>
                        <Link
                            to="/explore"
                            className="border border-white/60 text-white rounded-full px-10 py-1.5 text-xs font-semibold hover:bg-white/20 transition-colors tracking-wide"
                        >
                            Explore now
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Categories;
