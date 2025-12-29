import { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import * as schema from '@/db/schema';

// User Types
export type User = InferSelectModel<typeof schema.users>;
export type NewUser = InferInsertModel<typeof schema.users>;

// Todo Types
export type Todo = InferSelectModel<typeof schema.todos>;
export type NewTodo = InferInsertModel<typeof schema.todos>;

// Enum Types
export type Priority = 'low' | 'medium' | 'high';
