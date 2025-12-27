import { createTodo } from "@/server/actions/todos";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Send, Calendar, Flag } from "lucide-react";
import { cn } from "@/lib/utils";

export function AddTodoForm() {
    const [content, setContent] = useState("");
    const [priority, setPriority] = useState("low");
    const [dueDate, setDueDate] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!content.trim()) return;
        setLoading(true);

        const formData = new FormData();
        formData.append("content", content);
        formData.append("priority", priority);
        if (dueDate) formData.append("dueDate", dueDate);

        try {
            await createTodo(formData);
            setContent("");
            setPriority("low");
            setDueDate("");
            setShowOptions(false);
        } catch (error) {
            console.error("Failed to add todo:", error);
        } finally {
            setLoading(false);
        }
    };

    const priorityColors = {
        low: "text-emerald-400",
        medium: "text-cyan-400",
        high: "text-violet-400"
    };

    return (
        <form
            className="group relative flex w-full flex-col gap-3"
            onSubmit={handleSubmit}
        >
            <div className="relative flex w-full items-center gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        onFocus={() => setShowOptions(true)}
                        placeholder="What needs to be done?"
                        className="w-full h-12 px-4 pl-10 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all cursor-pointer"
                        disabled={loading}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Plus className="h-4 w-4" />
                    </div>
                </div>
                <Button
                    type="submit"
                    disabled={loading || !content.trim()}
                    className="h-12 px-4 bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 shadow-lg shadow-emerald-500/20 cursor-pointer"
                >
                    {loading ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    ) : (
                        <Send className="h-4 w-4" />
                    )}
                </Button>
            </div>

            {/* Expanded Options */}
            {showOptions && (
                <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 pt-2 border-t border-gray-700/50 pt-3 -mt-1">
                    <div className="flex items-center gap-2">
                        <Flag className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <div className="flex gap-1">
                            {(["low", "medium", "high"] as const).map((p) => (
                                <button
                                    key={p}
                                    type="button"
                                    onClick={() => setPriority(p)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer",
                                        priority === p
                                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                            : "text-gray-400 hover:bg-gray-700/50 hover:text-white border border-transparent"
                                    )}
                                >
                                    <span className="capitalize">{p}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="h-8 px-3 text-xs font-medium text-white bg-gray-700/50 border border-gray-600 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500/50 cursor-pointer"
                        />
                    </div>
                </div>
            )}
        </form>
    );
}
