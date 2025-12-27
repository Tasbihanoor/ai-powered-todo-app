"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Zap, Shield, Star, Users, ArrowRight, Target, Brain, Github } from "lucide-react";

export default function Home() {
    return (
        <div className="relative min-h-screen w-full bg-linear-to-br from-gray-900 via-slate-900 to-black text-white overflow-x-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-gray-900/50 via-transparent to-transparent"></div>
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-lg border-b border-gray-700">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                            <Target className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">TaskFlow</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors cursor-pointer">
                            Sign In
                        </Link>
                        <Link href="/signup">
                            <Button variant="primary" size="sm" className="bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/20 cursor-pointer">
                                Get Started
                            </Button>
                        </Link>
                    </div>
                    <button className="md:hidden text-gray-300 hover:text-white cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </nav>

            <main className="relative pt-16 lg:pt-24">
                {/* Hero Section */}
                <div className="container relative z-10 mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mx-auto max-w-5xl"
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-2 border border-emerald-500/30">
                            <Star className="h-4 w-4 text-emerald-400" />
                            <span className="text-xs font-semibold uppercase tracking-widest text-emerald-400">Productivity Redefined</span>
                        </div>

                        <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            <span className="text-white">
                                Master Your
                            </span>
                            <br />
                            <span className="bg-linear-to-r from-emerald-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                Productivity
                            </span>
                        </h1>

                        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 md:text-xl leading-relaxed">
                            Transform chaos into clarity with our AI-powered task management system. Streamline your workflow and achieve more with intelligent organization.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                            <Link href="/signup">
                                <Button size="lg" className="h-14 px-8 text-base font-semibold bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/20 cursor-pointer">
                                    Start Your Journey
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    {/* Two Beautiful Sections */}
                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                                    <Target className="h-5 w-5 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">Smart Task Management</h3>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Organize your tasks with AI-powered suggestions, priority insights, and smart categorization that adapts to your workflow.
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-400" />
                                    <span className="text-sm text-gray-300">Intelligent priority sorting</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-400" />
                                    <span className="text-sm text-gray-300">Automatic deadline tracking</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-emerald-400" />
                                    <span className="text-sm text-gray-300">Smart notification system</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-linear-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center">
                                    <Brain className="h-5 w-5 text-cyan-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white">AI-Powered Insights</h3>
                            </div>
                            <p className="text-gray-400 mb-4">
                                Get actionable insights and recommendations to optimize your productivity and make better decisions about your tasks.
                            </p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-cyan-400" />
                                    <span className="text-sm text-gray-300">Productivity analytics</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-cyan-400" />
                                    <span className="text-sm text-gray-300">Time management insights</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-cyan-400" />
                                    <span className="text-sm text-gray-300">Focus optimization</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Stats Section */}
                    <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { icon: Users, value: "50K+", label: "Happy Users" },
                            { icon: Zap, value: "99.9%", label: "Uptime" },
                            { icon: Star, value: "4.9★", label: "Rating" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="text-center p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                            >
                                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-emerald-500/20 to-cyan-500/20 mb-4">
                                    <stat.icon className="h-6 w-6 text-emerald-400" />
                                </div>
                                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                                <div className="text-sm text-gray-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Feature Grid */}
                    <div className="container mx-auto mt-24 pb-16">
                        <h2 className="text-4xl font-bold text-center mb-16 text-white">
                            Why Choose TaskFlow?
                        </h2>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    icon: Brain,
                                    title: "AI-Powered Insights",
                                    desc: "Smart suggestions and insights to optimize your workflow and boost productivity."
                                },
                                {
                                    icon: Shield,
                                    title: "Bank-Grade Security",
                                    desc: "Military-grade encryption keeps your data safe with end-to-end protection."
                                },
                                {
                                    icon: Zap,
                                    title: "Blazing Fast",
                                    desc: "Lightning-quick responses and seamless performance for maximum efficiency."
                                }
                            ].map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    className="group rounded-2xl border border-gray-700 bg-gray-800/30 p-6 backdrop-blur-sm hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-linear-to-br from-emerald-500/20 to-cyan-500/20 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="h-6 w-6 text-emerald-400" />
                                    </div>
                                    <h3 className="mb-3 text-xl font-semibold text-white group-hover:text-emerald-300 transition-colors">{feature.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full border-t border-gray-800 bg-black px-6 py-4">
                <div className="mx-auto flex max-w-7xl items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-linear-to-br from-emerald-500 to-cyan-500">
                            <Target className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-white">
                            TaskFlow
                        </span>
                    </div>
                    <Link
                        href="https://github.com/Tasbihanoor/ai-powered-todo-app"
                        target="_blank">
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 border-gray-700 text-white hover:bg-gray-800">
                        <Github className="h-4 w-4" />
                        GitHub
                    </Button>
                    </Link>
                </div>
            </footer>
        </div>
    );
}
