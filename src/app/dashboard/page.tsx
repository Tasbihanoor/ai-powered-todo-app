import { getUserFromToken } from "@/lib/auth";
import { redirect } from "next/navigation";
import { TodoList } from "@/components/todo/todo-list";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardContent } from "@/components/dashboard/dashboard-content";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, CheckCircle, Clock, ListTodo } from "lucide-react";
import AITodoChat from "@/components/todo/ai-todo-chat";

export default async function DashboardPage() {
    const user = await getUserFromToken();

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900/50 via-transparent to-transparent"></div>
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10">
                <DashboardHeader
                    userName={user.name}
                    userEmail={user.email}
                    userImage={null}
                />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8">
                    {/* Dashboard Stats Overview */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-8">
                        <Card className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700 shadow-2xl shadow-emerald-500/10">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">Total Tasks</CardTitle>
                                <ListTodo className="h-4 w-4 text-emerald-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">12</div>
                                <p className="text-xs text-gray-400">+2 from last week</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700 shadow-2xl shadow-cyan-500/10">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">Completed</CardTitle>
                                <CheckCircle className="h-4 w-4 text-cyan-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">8</div>
                                <p className="text-xs text-gray-400">67% completion rate</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700 shadow-2xl shadow-purple-500/10">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">Pending</CardTitle>
                                <Clock className="h-4 w-4 text-purple-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">4</div>
                                <p className="text-xs text-gray-400">Due soon</p>
                            </CardContent>
                        </Card>

                        <Card className="bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-gray-700 shadow-2xl shadow-violet-500/10">
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-gray-400">Upcoming</CardTitle>
                                <Calendar className="h-4 w-4 text-violet-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-white">3</div>
                                <p className="text-xs text-gray-400">Scheduled for this week</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Todo Section */}
                    <div className="flex justify-center w-full">
                        <div className="w-full max-w-4xl">
                            <DashboardContent>
                                <TodoList />
                            </DashboardContent>
                        </div>
                    </div>
                </div>

                {/* AI Todo Chat */}
                <AITodoChat />
            </div>
        </div>
    );
}
