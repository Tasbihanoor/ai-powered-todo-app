"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LogOut, User as UserIcon, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DashboardHeaderProps {
    userName: string;
    userEmail: string;
    userImage?: string | null;
}

export function DashboardHeader({ userName, userEmail, userImage }: DashboardHeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            // Call the logout API endpoint
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
            });

            if (response.ok) {
                window.location.href = "/login";
            } else {
                // If logout API fails, still redirect to login
                window.location.href = "/login";
            }
        } catch (error) {
            // If there's an error, still redirect to login
            window.location.href = "/login";
        }
    };

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="border-b border-gray-700 bg-gray-800/50 backdrop-blur-lg sticky top-0 z-40"
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="flex items-center space-x-4"
                >
                    {userImage ? (
                        <Image
                            src={userImage}
                            alt={userName}
                            width={40}
                            height={40}
                            className="rounded-full ring-2 ring-emerald-500/30"
                        />
                    ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-emerald-500 to-cyan-500 ring-2 ring-emerald-500/30">
                            <UserIcon className="h-5 w-5 text-white" />
                        </div>
                    )}
                    <div>
                        <h1 className="text-lg font-bold text-white">{userName}</h1>
                        <p className="text-sm text-gray-400">{userEmail}</p>
                    </div>
                </motion.div>

                {/* Desktop Logout Button */}
                <div className="hidden md:block">
                    <Button
                        onClick={handleLogout}
                        size="sm"
                        className="bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white hover:bg-gray-700/50 cursor-pointer"
                    >
                        {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="md:hidden border-t border-gray-700 bg-gray-800/50 backdrop-blur-lg"
                >
                    <div className="mx-auto max-w-7xl px-6 py-4">
                        <Button
                            onClick={handleLogout}
                            className="w-full bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/20 cursor-pointer"
                        >
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
}
