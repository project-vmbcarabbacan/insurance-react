import React from 'react';
import { Search, Bell, Menu, Moon, Sun } from 'lucide-react';
import { Avatar } from './ui/Avatar';
import { useTheme } from './hooks/useTheme';
import { useAppSelector } from '../../app/stores/hooks';
interface TopBarProps {
    isSidebarCollapsed: boolean;
    toggleMobileSidebar: () => void;
}
export function TopBar({
    isSidebarCollapsed,
    toggleMobileSidebar
}: TopBarProps) {
    const { theme, toggleTheme } = useTheme();

    const user = useAppSelector(state => state.user.user)

    return <header className={`h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 fixed top-0 right-0 z-20 transition-all duration-300 ease-in-out flex items-center justify-between px-4 sm:px-6
        ${isSidebarCollapsed ? 'lg:left-20' : 'lg:left-64'}
        left-0
      `}>
        {/* Left: Mobile Menu + Search */}
        <div className="flex items-center gap-4 flex-1">
            {/* Hamburger Menu - Mobile Only */}
            <button onClick={toggleMobileSidebar} className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" aria-label="Toggle menu">
                <Menu className="w-5 h-5" />
            </button>

            {/* Search */}
            <div className="flex-1 max-w-xl">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 dark:text-white transition-all" />
                </div>
            </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
            <button onClick={toggleTheme} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors" aria-label="Toggle theme">
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button className="relative p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </button>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-3 cursor-pointer">
                <div className="text-right hidden md:block">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {user?.name}
                    </p>
                    <p className="text-xs text-gray-500">{user?.role_name}</p>
                </div>
                <Avatar fallback={user!.initials} className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300" />
            </div>
        </div>
    </header>;
}