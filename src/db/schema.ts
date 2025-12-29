import { pgTable, text, boolean, timestamp, uuid, index } from 'drizzle-orm/pg-core';

export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(), // Add password field for simple auth
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull()
});

export const todos = pgTable('todos', {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: text('user_id').references(() => users.id).notNull(),
    content: text('content').notNull(),
    isCompleted: boolean('is_completed').default(false).notNull(),
    priority: text('priority', { enum: ['low', 'medium', 'high'] }).default('low').notNull(),
    dueDate: timestamp('due_date'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (table) => {
    return {
        userIdIdx: index("todo_user_id_idx").on(table.userId),
    };
});
