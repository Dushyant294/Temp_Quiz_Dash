import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MainLayout() {
    return (
        <div className="bg-white dark:bg-[#0b1220] text-black dark:text-white min-h-screen">
            <Sidebar />

            {/* Right side */}
            <div className="ml-64 pt-20">
                <Topbar />

                {/* Scrollable content */}
                <main className="px-12 py-8 h-[calc(100vh-80px)] overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default MainLayout;
