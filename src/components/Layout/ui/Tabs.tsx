import React from 'react';
import { motion } from 'framer-motion';
interface Tab {
  id: string;
  label: string;
}
interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}
export function Tabs({
  tabs,
  activeTab,
  onChange,
  className = ''
}: TabsProps) {
  return <div className={`border-b border-gray-200 dark:border-gray-700 ${className}`}>
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return <button key={tab.id} onClick={() => onChange(tab.id)} className={`
                relative whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${isActive ? 'border-blue-500 text-blue-600 dark:text-blue-400' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'}
              `} aria-current={isActive ? 'page' : undefined}>
              {tab.label}
              {isActive && <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" initial={false} transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30
          }} />}
            </button>;
      })}
      </nav>
    </div>;
}