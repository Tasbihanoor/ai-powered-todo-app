"use server";

import { db } from "@/db";
import { todos, users } from "@/db/schema";
import { getUserFromToken } from "@/lib/auth";
import { createTodoSchema } from "@/lib/validations";
import { revalidatePath } from "next/cache";
import { and, eq, desc } from "drizzle-orm";

export async function getTodos() {
    const user = await getUserFromToken();

    if (!user) {
        throw new Error("Unauthorized");
    }

    return db
        .select()
        .from(todos)
        .where(eq(todos.userId, user.id))
        .orderBy(desc(todos.createdAt));
}

export async function createTodo(formData: FormData) {
    const user = await getUserFromToken();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const userId = user.id;

    const rawData = {
        content: String(formData.get("content") ?? ""),
        priority: String(formData.get("priority") ?? "low"),
        dueDate: formData.get("dueDate")
            ? String(formData.get("dueDate"))
            : undefined,
    };

    const parsed = createTodoSchema.safeParse(rawData);

    if (!parsed.success) {
        throw new Error(parsed.error.errors[0].message);
    }

    const { content, priority, dueDate } = parsed.data;

    await db.insert(todos).values({
        userId,
        content,
        priority,
        dueDate: dueDate ? new Date(dueDate) : null,
    });

    revalidatePath("/dashboard");
}

export async function toggleTodo(id: string, isCompleted: boolean) {
    const user = await getUserFromToken();

    if (!user) {
        throw new Error("Unauthorized");
    }

    await db
        .update(todos)
        .set({ isCompleted })
        .where(
            and(
                eq(todos.id, id),
                eq(todos.userId, user.id)
            )
        );

    revalidatePath("/dashboard");
}

export async function deleteTodo(id: string) {
    const user = await getUserFromToken();

    if (!user) {
        throw new Error("Unauthorized");
    }

    await db
        .delete(todos)
        .where(
            and(
                eq(todos.id, id),
                eq(todos.userId, user.id)
            )
        );

    revalidatePath("/dashboard");
}