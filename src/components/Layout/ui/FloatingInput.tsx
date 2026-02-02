import React, { useState } from 'react';
import { Eye, EyeOff, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


export const FloatingInput: React.FC<{
    label: string;
    type?: string;
    id: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}> = ({
    label,
    type = 'text',
    id,
    value,
    onChange,
    error
}) => {
        const [isFocused, setIsFocused] = useState(false);
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === 'password';
        const inputType = isPassword ? showPassword ? 'text' : 'password' : type;

        return <div className="relative mb-6">
            <motion.label htmlFor={id} className={`absolute left-4 z-10 pointer-events-none transition-colors duration-200 ${isFocused || value ? 'text-purple-600 font-semibold' : 'text-gray-500'}`} initial={false} animate={{
                y: isFocused || value ? -24 : 12,
                scale: isFocused || value ? 0.85 : 1,
                x: isFocused || value ? -10 : 0
            }} transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30
            }}>
                {label}
            </motion.label>
            <div className="relative">
                <input id={id} name={id} type={inputType} value={value} onChange={onChange} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} className={`w-full px-4 py-3 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200 ${error ? 'border-red-300 focus:border-red-500 bg-red-50' : 'border-gray-200 focus:border-purple-500 focus:bg-white'}`} />

                {isPassword && <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>}

                {/* Success Checkmark Animation */}
                <AnimatePresence>
                    {!error && value.length > 3 && !isPassword && <motion.div initial={{
                        scale: 0,
                        opacity: 0
                    }} animate={{
                        scale: 1,
                        opacity: 1
                    }} exit={{
                        scale: 0,
                        opacity: 0
                    }} className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                        <Check size={20} strokeWidth={3} />
                    </motion.div>}
                </AnimatePresence>
            </div>

            <AnimatePresence>
                {error && <motion.p initial={{
                    height: 0,
                    opacity: 0
                }} animate={{
                    height: 'auto',
                    opacity: 1
                }} exit={{
                    height: 0,
                    opacity: 0
                }} className="text-red-500 text-xs mt-1 font-medium ml-1 overflow-hidden">
                    {error}
                </motion.p>}
            </AnimatePresence>
        </div>;
    }