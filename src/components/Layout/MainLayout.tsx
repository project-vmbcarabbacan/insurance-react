import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./Topbar";
import { Outlet } from 'react-router-dom';


export function MainLayout() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);


    return <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-200">
        <Sidebar
            isCollapsed={isSidebarCollapsed}
            toggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isMobileOpen={isMobileSidebarOpen}
            closeMobile={() => setIsMobileSidebarOpen(false)}
        />
        <TopBar
            isSidebarCollapsed={isSidebarCollapsed}
            toggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        />

        <main className={`pt-24 pb-12 px-4 sm:px-6 transition-all duration-360 ease-in-out min-h-screen
            ${isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'}
            `}>
            <div className="max-w-7xl mx-auto"><Outlet /></div>
        </main>
    </div>;
}