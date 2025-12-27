"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const variants = {
            primary: "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-600 hover:to-cyan-600",
            secondary: "bg-gray-700/50 text-white hover:bg-gray-600/50 border border-gray-600",
            outline: "border border-gray-600 text-white hover:bg-gray-700/50",
            ghost: "hover:bg-gray-700/50 hover:text-white",
            destructive: "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30",
        };

        const sizes = {
            sm: "h-9 px-3 text-xs",
            md: "h-10 px-4 text-sm",
            lg: "h-12 px-6 text-base",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500/50 disabled:pointer-events-none disabled:opacity-50 shadow-lg cursor-pointer",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";
