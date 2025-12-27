
import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <div className={cn("rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700 shadow-2xl shadow-emerald-500/10", className)}>
            {children}
        </div>
    );
}

export function CardHeader({ className, children }: { className?: string, children: React.ReactNode }) {
    return <div className={cn("flex flex-col space-y-1.5 p-6", className)}>{children}</div>
}

export function CardTitle({ className, children }: { className?: string, children: React.ReactNode }) {
    return <h3 className={cn("font-semibold leading-none tracking-tight text-white", className)}>{children}</h3>
}

export function CardContent({ className, children }: { className?: string, children: React.ReactNode }) {
    return <div className={cn("p-6 pt-0", className)}>{children}</div>
}
