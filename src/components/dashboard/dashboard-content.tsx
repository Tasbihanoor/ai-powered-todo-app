"use client";

import { motion } from "framer-motion";
import { AddTodoForm } from "@/components/todo/add-todo-form";
import { ReactNode } from "react";

interface DashboardContentProps {
  children: ReactNode;
}

export function DashboardContent({ children }: DashboardContentProps) {
  return (
    <div className="w-full">
      <div className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700 rounded-2xl p-6 shadow-2xl shadow-emerald-500/10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

          {/* CREATE TASK (Fixed height) */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="w-full"
          >
            <div className="bg-linear-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-lg border border-gray-600 rounded-xl p-5 shadow-xl shadow-emerald-500/5">
              <h2 className="text-xl font-bold text-white mb-4">
                Create New Task
              </h2>
              <AddTodoForm />
            </div>
          </motion.div>

          {/* TASK LIST (Scrollable Growth) */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full"
          >
            <div className="bg-linear-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-lg border border-gray-600 rounded-xl p-5 shadow-xl shadow-emerald-500/5">
              
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4"
              >
                Your Task List
              </motion.h2>
              <div className="max-h-[420px] overflow-y-auto space-y-3 pr-2">
                {children}
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
