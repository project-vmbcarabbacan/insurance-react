import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useAppDispatch } from '../../app/stores/hooks';
import { loginWithSession } from '../../app/stores/slices/authSlice';
import { ApiError } from '../../domain/errors/ApiError';
import { PasswordInvalidError } from '../../domain/errors/PasswordInvalidError';
import { Email } from '../../domain/VOs/Email';
import { Password } from '../../domain/VOs/Password';
import { useNavigate } from 'react-router-dom';
import type { Login } from '../../core/interfaces/Auth';
import { FloatingInput } from '../Layout/ui/FloatingInput';
// Custom Floating Label Input Component
;
export function AuthForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    /* ------------------------ Local State ------------------------ */
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [serverError, setServerError] = useState<string | null>(null);
    const [formData, setFormData] = useState<Login>({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

    /* ------------------------ Handlers ------------------------ */
    const validate = () => {
        const newErrors: typeof errors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }

        try {
            Email.create(formData.email);
        } catch (err) {
            newErrors.email = (err as Error).message;
        }

        try {
            Password.create(formData.password);
        } catch (err) {
            newErrors.password = (err as Error).message;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);

        try {
            const result = await dispatch(loginWithSession(formData))
            if (loginWithSession.fulfilled.match(result)) {
                navigate('/')
            } else {
                setServerError((result.payload as string) || 'Invalid Credentials')
            }
        } catch (error: unknown) {
            if (error instanceof PasswordInvalidError)
                setServerError(`Error: ${error.message}`)
            else if (error instanceof ApiError)
                setServerError(`Error: ${error.message}`)

        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
        setServerError(null);
    };

    return <div className="flex-1 flex items-center justify-center p-6 lg:p-12 bg-white">
        <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-10 text-center lg:text-left">
                <motion.h2 key="login-h" initial={{
                    opacity: 0,
                    y: 10
                }} animate={{
                    opacity: 1,
                    y: 0
                }} className="text-3xl font-bold text-gray-900 mb-2">
                    Welcome back
                </motion.h2>
                <motion.p key="login-p" initial={{
                    opacity: 0
                }} animate={{
                    opacity: 1
                }} className="text-gray-500">
                    Enter your details to access your workspace.
                </motion.p>
            </div>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="relative">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key="login" initial={{
                        x: -20,
                        opacity: 0
                    }} animate={{
                        x: 0,
                        opacity: 1
                    }} exit={{
                        x: 20,
                        opacity: 0
                    }} transition={{
                        duration: 0.3,
                        ease: 'easeInOut'
                    }}>


                        <FloatingInput id="email" label="Email Address" type="email" value={formData.email} error={errors.email} onChange={handleChange} />

                        <FloatingInput id="password" label="Password" type="password" value={formData.password} error={errors.password} onChange={handleChange} />

                        {serverError && <motion.p key="server-error-p" initial={{
                            opacity: 0
                        }} animate={{
                            opacity: 1
                        }} className="text-red-500">
                            {serverError}
                        </motion.p>}

                        <div className="flex justify-end mb-6">
                            <a href="#" className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <motion.button whileHover={{
                            scale: 1.02
                        }} whileTap={{
                            scale: 0.98
                        }} className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 hover:shadow-xl transition-all flex items-center justify-center gap-2 group"
                            disabled={isLoading}>
                            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <>
                                Sign In
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>}
                        </motion.button>
                    </motion.div>
                </AnimatePresence>
            </form>


            {/* Social Proof / Footer */}
            <div className="mt-12 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
                <p>
                    By continuing, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    </div>;
}