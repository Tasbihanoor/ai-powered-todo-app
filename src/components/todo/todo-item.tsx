"use client";

import { Todo } from "@/lib/types";
import { toggleTodo, deleteTodo } from "@/server/actions/todos";
import { motion } from "framer-motion";
import { Check, Trash2, Calendar, Flag, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const priorityColors = {
    low: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    medium: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    high: "bg-red-500/20 text-red-400 border-red-500/30",
};

export function TodoItem({ todo }: { todo: Todo }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={cn(
                "group relative flex items-start justify-between rounded-xl border border-gray-700 bg-linear-to-r from-gray-800/40 to-gray-800/20 p-4 transition-all duration-300 hover:bg-linear-to-r hover:from-gray-700/50 hover:to-gray-700/30 shadow-lg shadow-emerald-500/5 cursor-pointer",
                todo.isCompleted
                    ? "opacity-70"
                    : ""
            )}
        >
            <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className="text-gray-500 cursor-grab active:cursor-grabbing opacity-50 mt-0.5">
                    <GripVertical className="h-4 w-4" />
                </div>

                <button
                    onClick={() => toggleTodo(todo.id, !todo.isCompleted)}
                    className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 mt-0.5",
                        todo.isCompleted
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : "border-gray-500 hover:border-emerald-500 bg-transparent"
                    )}
                >
                    <motion.div
                        initial={false}
                        animate={{ scale: todo.isCompleted ? 1 : 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Check className="h-3 w-3 stroke-[3]" />
                    </motion.div>
                </button>

                <div className="flex flex-col gap-1 min-w-0 flex-1">
                    <span
                        className={cn(
                            "text-base font-medium transition-all duration-300 truncate",
                            todo.isCompleted
                                ? "text-gray-500 line-through"
                                : "text-white"
                        )}
                    >
                        {todo.content}
                    </span>

                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        {todo.priority && (
                            <div className={cn(
                                "flex items-center gap-1 px-2.5 py-1 rounded-full text-xs uppercase tracking-wide font-medium border",
                                priorityColors[todo.priority]
                            )}>
                                <Flag className="h-3 w-3" />
                                <span>{todo.priority}</span>
                            </div>
                        )}
                        {todo.dueDate && (
                            <div className="flex items-center gap-1 text-xs text-gray-400 px-2.5 py-1 rounded-full bg-gray-700/30 border border-gray-600">
                                <Calendar className="h-3 w-3" />
                                <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-1 ml-2">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteTodo(todo.id)}
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer rounded-lg"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </div>
        </motion.div>
    );
}
