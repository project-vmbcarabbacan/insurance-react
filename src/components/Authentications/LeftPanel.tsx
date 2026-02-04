import React from "react";
import { motion } from "framer-motion";
import { Car, ShieldCheck, Motorbike, HeartPlus, Home, Plane, PawPrint } from "lucide-react";

const FloatingShape = ({
    className,
    delay = 0,
    duration = 20
}: {
    className: string;
    delay?: number;
    duration?: number;
}) => <motion.div className={`absolute rounded-full mix-blend-overlay filter blur-xl opacity-70 ${className}`} animate={{
    y: [0, -40, 0],
    x: [0, 20, 0],
    rotate: [0, 360],
    scale: [1, 1.1, 1]
}} transition={{
    duration,
    repeat: Infinity,
    ease: 'linear',
    delay
}} />;
const benefits = [
    {
        icon: Car,
        text: 'Comprehensive protection for your vehicle, designed for peace of mind.'
    },
    // {
    //     icon: Motorbike,
    //     text: 'Premium coverage that keeps you protected on every ride.'
    // },
    {
        icon: HeartPlus,
        text: 'Exceptional care and coverage for your well-being.'
    },
    {
        icon: Home,
        text: 'Advanced protection for what matters most—your home.'
    },
    {
        icon: Plane,
        text: 'Refined protection wherever your journey takes you.'
    },
    {
        icon: PawPrint,
        text: 'Premium care for the companions you cherish.'
    },
];


export function AuthLeftPanel() {
    return <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-900 text-white p-12 flex flex-col justify-between min-h-[400px] lg:min-h-screen" >
        {/* Animated Background Shapes */}
        < div className="absolute inset-0 overflow-hidden pointer-events-none" >
            <FloatingShape className="w-96 h-96 bg-purple-500 -top-20 -left-20" duration={25} />
            <FloatingShape className="w-80 h-80 bg-indigo-500 top-1/2 -right-20" delay={2} duration={30} />
            <FloatingShape className="w-64 h-64 bg-pink-500 bottom-0 left-1/3" delay={5} duration={22} />

            {/* Noise texture overlay for texture */}
            < div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-soft-light" > </div>
        </div>

        {/* Content */}
        <div className="relative z-10 mt-10 lg:mt-20" >
            <motion.div initial={
                {
                    opacity: 0,
                    y: 20
                }
            } animate={{
                opacity: 1,
                y: 0
            }
            } transition={{
                duration: 0.8,
                ease: 'easeOut'
            }}>
                <div className="flex items-center gap-2 mb-8" >
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center" >
                        <ShieldCheck className="w-6 h-6 text-yellow-300" />
                    </div>
                    < span className="text-xl font-bold tracking-tight" >
                        Insurance < span className="text-purple-300" > Protection </span>
                    </span>
                </div>

                < h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6" >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300" >
                        Insurance{' '}
                    </span>
                    Made Simple
                </h1>
                < p className="text-lg text-purple-100 leading-relaxed" >
                    Comprehensive insurance solutions for you, your family, and what you value most.
                </p>
            </motion.div>
        </div>

        {/* Benefits List */}
        <div className="relative z-10 mb-10 hidden lg:block" >
            <div className="space-y-6" >
                {
                    benefits.map((item, index) => <motion.div key={index} initial={{
                        opacity: 0,
                        x: -20
                    }} animate={{
                        opacity: 1,
                        x: 0
                    }} transition={{
                        delay: 0.5 + index * 0.1,
                        duration: 0.5
                    }} className="flex items-center gap-4 group" >
                        <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300" >
                            <item.icon className="w-6 h-6 text-purple-200" />
                        </div>
                        < span className="font-medium text-lg text-purple-50" >
                            {item.text}
                        </span>
                    </motion.div>)}
            </div>
        </div>

        {/* Mobile only footer text */}
        <div className="relative z-10 lg:hidden mt-8" >
            <p className="text-sm text-purple-200 opacity-80" >
                Trusted by industry leaders worldwide.
            </p>
        </div>
    </div>;
}