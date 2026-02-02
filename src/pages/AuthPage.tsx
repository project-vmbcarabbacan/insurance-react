import React from 'react';
import { AuthLeftPanel } from '../components/Authentications/LeftPanel';
import { AuthForm } from '../components/Authentications/LoginForm';

export function AuthPage() {
    return <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2">
        {/* Left Panel - Visuals */}
        {/* Order-last on mobile so form comes first, or order-first to show brand first?
            Usually brand first is nice, but for utility, form first.
            Let's keep standard order: Left Panel (top on mobile) -> Form (bottom on mobile)
            Actually, prompt says "stacks vertically". Usually visuals on top is better for branding.
        */}
        <div className="h-64 lg:h-auto lg:sticky lg:top-0 lg:h-screen w-full relative z-0">
            <AuthLeftPanel />
        </div>

        {/* Right Panel - Form */}
        <div className="flex flex-col justify-center w-full bg-white relative z-10 -mt-6 rounded-t-3xl lg:mt-0 lg:rounded-none shadow-2xl lg:shadow-none">
            <AuthForm />
        </div>
    </div>;
}