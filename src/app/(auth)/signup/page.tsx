"use client";

import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import Link from "next/link";

import { signupSchema } from "@/lib/validations/auth";
import { AlertCircle, User, Mail, Lock, CheckCircle, ArrowRight, Target } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSignup = async () => {
        setError(null);
        setLoading(true);

        // Client-side Validation
        const validation = signupSchema.safeParse({ email, password, name });
        if (!validation.success) {
            setError(validation.error.errors[0].message);
            setLoading(false);
            return;
        }

        await authClient.signUp.email({
            email,
            password,
            name,
        }, {
            onSuccess: async () => {
                // Better-Auth auto-signs in to create user record properly
                // Now we sign out immediately to enforce manual login
                await authClient.signOut();
                setSuccess(true);
                setLoading(false);
            },
            onError: (ctx: { error: { message: string } }) => {
                setError(ctx.error.message);
                setLoading(false);
            },
        });
    };

    if (success) {
        return (
            <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-transparent to-transparent"></div>
                    <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-emerald-500/10 text-center">
                        <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                            <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Account Created!
                        </h2>
                        <p className="text-gray-400 mb-6">
                            Your account has been successfully created. You can now access your dashboard.
                        </p>
                        <Link href="/login">
                            <Button className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/20">
                                Sign In to Dashboard
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-transparent to-transparent"></div>
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-8 shadow-2xl shadow-emerald-500/10">
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/20">
                            <Target className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-400">Join us and start organizing your day</p>
                    </div>

                    <div className="space-y-6">
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: error ? "auto" : 0, opacity: error ? 1 : 0 }}
                            className="overflow-hidden"
                        >
                            {error && (
                                <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">
                                    <AlertCircle className="h-4 w-4" />
                                    <span>{error}</span>
                                </div>
                            )}
                        </motion.div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="text"
                                        placeholder="Enter your full name"
                                        className="pl-10 h-12 bg-gray-700/50 border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        className="pl-10 h-12 bg-gray-700/50 border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                                    <Input
                                        type="password"
                                        placeholder="Enter your password"
                                        className="pl-10 h-12 bg-gray-700/50 border-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 text-white"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={handleSignup}
                            disabled={loading}
                            className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/20"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                <>
                                    Get Started
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-transparent px-2 text-gray-400 font-medium">Or sign up with</span>
                            </div>
                        </div>

                        <div className="text-center text-sm">
                            <span className="text-gray-400">Already have an account? </span>
                            <Link href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors underline-offset-4 hover:underline">
                                Sign in here
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
