function CreateQuiz() {
    return (
        <div className="max-w-[1200px] mx-auto text-black dark:text-white pb-12 pt-6">

            {/* Banner */}
            <div className="w-full bg-gradient-to-r from-[#5b5bff]/90 via-[#312e81] to-[#0b1220]/50 dark:to-black rounded-2xl py-14 px-10 mb-10 shadow-2xl relative overflow-hidden">
                <h1 className="font-bold text-3xl md:text-[34px] text-white mb-4 tracking-wide relative z-10">
                    Share Your Knowledge: Create a Custom<br />Quiz and Challenge the Community
                </h1>
                <p className="text-[#a5b4fc] text-[15px] font-medium tracking-wide relative z-10">
                    Build specialized mock tests for any category in just a few minutes.
                </p>
                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#5b5bff]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
            </div>

            <div className="flex flex-col items-center w-full max-w-[600px] mx-auto">
                {/* Download Button */}
                <button className="bg-[#5b5bff] hover:bg-[#4f4fe5] text-white font-semibold py-3 px-10 rounded-full shadow-lg shadow-[#5b5bff]/30 transition-all mb-12">
                    Download Sample Q File here
                </button>

                {/* Question Section */}
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-white">
                    Add your questions below !
                </h2>

                {/* Upload Box */}
                <div className="w-full h-[220px] bg-[#1e2333]/30 dark:bg-[#4b5563]/30 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-2xl flex items-center justify-center p-8 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#4b5563]/50 transition-colors mb-6 shadow-sm group">
                    <p className="text-xl md:text-2xl font-semibold text-gray-600 dark:text-gray-200 text-center leading-relaxed">
                        Upload .csv file of for<br />larger amount of questions
                    </p>
                </div>

                {/* Create Quiz Button */}
                <button className="w-full bg-[#64748b] hover:bg-[#475569] text-white font-semibold py-3.5 px-6 rounded-full shadow-md transition-all text-lg">
                    Create Quiz Now
                </button>
            </div>
        </div>
    );
}

export default CreateQuiz;
