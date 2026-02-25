import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function CreateTournament() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="max-w-[1200px] mx-auto text-black dark:text-white pb-12 pt-6">

            {/* Banner */}
            <div className="w-full bg-gradient-to-r from-[#5b5bff]/90 via-[#312e81] to-[#0b1220]/50 dark:to-[#090e17] rounded-2xl py-12 px-10 mb-10 shadow-lg relative overflow-hidden">
                <h1 className="font-bold text-3xl md:text-[34px] text-white mb-8 tracking-wide relative z-10">
                    One Centralized Panel for Management
                </h1>

                {/* Banner Buttons */}
                <div className="flex flex-wrap gap-4 relative z-10">
                    <button onClick={() => navigate('/admin/users')} className="px-6 py-1.5 rounded-full border-2 border-white text-white font-semibold text-sm hover:bg-white/10 transition">
                        mange users
                    </button>
                    <button onClick={() => navigate('/admin/content')} className="px-6 py-1.5 rounded-full border-2 border-white text-white font-semibold text-sm hover:bg-white/10 transition">
                        manage Q's
                    </button>
                    <button onClick={() => navigate('/admin/tournaments')} className="px-6 py-1.5 rounded-full border-2 border-white text-white font-semibold text-sm hover:bg-white/10 transition">
                        manage tournaments
                    </button>
                    <button onClick={() => navigate('/admin/reports')} className="px-6 py-1.5 rounded-full border-2 border-white text-white font-semibold text-sm hover:bg-white/10 transition">
                        Reports
                    </button>
                </div>

                {/* Decorative glow */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#5b5bff]/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
            </div>

            <div className="mb-8">
                <h2 className="text-[17px] font-bold tracking-wider uppercase text-gray-800 dark:text-white">
                    CREATE TOURNAMENT
                </h2>
            </div>

            <div className="flex flex-col items-center w-full max-w-[500px] mx-auto">
                {/* Download Button */}
                <button className="bg-[#5b5bff] hover:bg-[#4f4fe5] text-white font-semibold text-[15px] py-3.5 px-10 rounded-[14px] shadow-md transition-all mb-12 w-[350px]">
                    Download Sample Q File here
                </button>

                {/* Question Section */}
                <h2 className="text-2xl font-bold mb-8 text-center text-gray-800 dark:text-white tracking-wide">
                    Add your questions below !
                </h2>

                {/* Upload Box */}
                <div
                    onClick={handleUploadClick}
                    className="w-full h-[220px] bg-[#4b5563]/30 dark:bg-[#4b5563]/30 border-2 border-dashed border-gray-400 dark:border-gray-500 rounded-3xl flex items-center justify-center p-8 cursor-pointer hover:bg-gray-100 dark:hover:bg-[#4b5563]/50 transition-colors mb-6 shadow-sm group"
                >
                    <p className="text-xl md:text-[22px] font-semibold text-gray-700 dark:text-white text-center leading-[1.4] tracking-wide">
                        Upload .csv file of for<br />larger amount of questions
                    </p>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept=".csv"
                    />
                </div>

                {/* Create Tournament Button */}
                <button className="w-full bg-[#64748b] hover:bg-[#475569] text-gray-200 font-semibold py-3.5 px-6 rounded-full shadow-md transition-all text-[15px] tracking-wide">
                    Create Tournament Now
                </button>
            </div>

        </div>
    );
}

export default CreateTournament;
