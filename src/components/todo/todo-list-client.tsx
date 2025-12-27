"use client";

import { Todo } from "@/lib/types";
import { TodoItem } from "./todo-item";
import { motion } from "framer-motion";

export function TodoListClient({ todos }: { todos: Todo[] }) {
    if (todos.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center space-y-4 py-12 text-center text-gray-400"
            >
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/10">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                    </svg>
                </div>
                <p className="text-lg font-medium text-white">No tasks yet</p>
                <p className="text-sm">Create your first task to get started!</p>
            </motion.div>
        );
    }

    return (
        <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2 -mr-2 pl-1 h-full">
            {todos.map((todo, index) => (
                <motion.div
                    key={todo.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                >
                    <TodoItem todo={todo} />
                </motion.div>
            ))}
        </div>
    );
}