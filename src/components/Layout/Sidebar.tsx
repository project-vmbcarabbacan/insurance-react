import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, ShieldCheck, LogOut, X, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../core/configs/navConfig';
import { useAppDispatch } from '../../app/stores/hooks';
import { logout } from '../../app/stores/slices/authSlice';

interface SidebarProps {
    isCollapsed: boolean;
    toggleCollapse: () => void;
    isMobileOpen: boolean;
    closeMobile: () => void;
}
export function Sidebar({
    isCollapsed,
    toggleCollapse,
    isMobileOpen,
    closeMobile
}: SidebarProps) {
    const [expandedSections, setExpandedSections] = useState<string[]>([]);

    const toggleSection = (label: string) => {
        setExpandedSections(prev => prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]);
    };

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const signOut = async () => {
        await dispatch(logout())
        navigate('/login')
    }

    const setting = () => {
        navigate('/settings')
    }

    return <>
        {/* Mobile Overlay */}
        {isMobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={closeMobile} />}

        {/* Sidebar */}
        <aside className={`h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-slate-700 flex flex-col fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
          w-64
        `}>
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-6 border-b border-slate-700">
                <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <ShieldCheck className="w-5 h-5 text-white" />
                    </div>
                    {!isCollapsed && <span className="font-bold text-xl text-white whitespace-nowrap">
                        Insurance Protect
                    </span>}
                </div>

                {/* Mobile Close Button */}
                <button onClick={closeMobile} className="lg:hidden p-1 text-gray-400 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
                {navItems.map(item => <div key={item.label}>
                    {item.path ?
                        // Single item without children
                        <NavLink to={item.path} onClick={closeMobile} className={({
                            isActive
                        }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative ${isActive ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-slate-700 hover:text-white'}`}>
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            {!isCollapsed && <span className="font-medium whitespace-nowrap">
                                {item.label}
                            </span>}
                            {isCollapsed && <div className="absolute left-16 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap border border-slate-700">
                                {item.label}
                            </div>}
                        </NavLink> :
                        // Parent item with children
                        <>
                            <button onClick={() => toggleSection(item.label)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-700 hover:text-white group relative">
                                <item.icon className="w-5 h-5 flex-shrink-0" />
                                {!isCollapsed && <>
                                    <span className="font-medium whitespace-nowrap flex-1 text-left">
                                        {item.label}
                                    </span>
                                    <motion.div animate={{
                                        rotate: expandedSections.includes(item.label) ? 180 : 0
                                    }} transition={{
                                        duration: 0.2
                                    }}>
                                        <ChevronDown className="w-4 h-4" />
                                    </motion.div>
                                </>}
                                {isCollapsed && <div className="absolute left-16 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap border border-slate-700">
                                    {item.label}
                                </div>}
                            </button>

                            {/* Children */}
                            <AnimatePresence>
                                {!isCollapsed && expandedSections.includes(item.label) && item.children && <motion.div initial={{
                                    height: 0,
                                    opacity: 0
                                }} animate={{
                                    height: 'auto',
                                    opacity: 1
                                }} exit={{
                                    height: 0,
                                    opacity: 0
                                }} transition={{
                                    duration: 0.2
                                }} className="overflow-hidden ml-4 mt-1 space-y-1">
                                    {item.children.map(child => <NavLink key={child.path} to={child.path} onClick={closeMobile} className={({
                                        isActive
                                    }) => `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm ${isActive ? 'bg-blue-600/20 text-blue-400 border-l-2 border-blue-400' : 'text-gray-400 hover:bg-slate-700 hover:text-gray-200'}`}>
                                        <child.icon className="w-4 h-4 flex-shrink-0" />
                                        <span className="font-medium whitespace-nowrap">
                                            {child.label}
                                        </span>
                                    </NavLink>)}
                                </motion.div>}
                            </AnimatePresence>
                        </>}
                </div>)}
            </nav>

            {/* Settings Button */}
            <div className="p-4 border-t border-slate-700">
                <button
                    onClick={setting}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-gray-300 hover:bg-slate-700 hover:text-white group relative"
                >
                    <Settings className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium whitespace-nowrap">Settings</span>}
                    {isCollapsed && <div className="absolute left-16 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap border border-slate-700">
                        ss
                    </div>}
                </button>
            </div>
            <div className="p-4 border-t border-slate-700">
                <button
                    onClick={signOut}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-red-400 hover:bg-red-500/10 hover:text-red-300 group relative"
                >
                    <LogOut className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="font-medium whitespace-nowrap">Sign Out</span>}
                    {isCollapsed && <div className="absolute left-16 bg-slate-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap border border-slate-700">
                        Sign Out
                    </div>}
                </button>
            </div>

            {/* Collapse Toggle - Desktop Only */}
            <div className="p-4 border-t border-slate-700 hidden">
                <button onClick={toggleCollapse} className="w-full flex items-center justify-center p-2 rounded-lg text-gray-400 hover:bg-slate-700 hover:text-white transition-colors">
                    {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
                </button>
            </div>
        </aside>
    </>;
}