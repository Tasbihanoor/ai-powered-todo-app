import { NextRequest } from "next/server";
import { todoAgent } from "@/lib/openrouter-agent";
import {
  getTodos,
  createTodo,
  toggleTodo,
  deleteTodo,
} from "@/server/actions/todos";
import { auth } from "@/lib/auth";

interface AiTodoRequestBody {
  userRequest: string;
  todosContext?: unknown;
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as AiTodoRequestBody;

    if (!body.userRequest) {
      return Response.json(
        { error: "Missing userRequest in request body" },
        { status: 400 }
      );
    }

    const result = await todoAgent.processTodoRequest(
      body.userRequest,
      Array.isArray(body.todosContext) ? body.todosContext : undefined
    );

    if (result.action) {
      switch (result.action.type) {
        case "create": {
          const data = result.action.data;
          if (!data) break;

          const formData = new FormData();
          formData.append("content", data.title || "New Task");
          formData.append("priority", data.priority || "medium");

          if (data.dueDate) {
            formData.append("dueDate", data.dueDate);
          }

          await createTodo(formData);
          const updatedTodos = await getTodos();

          return Response.json({
            ...result,
            todo: updatedTodos[0],
          });
        }

        case "update": {
          const data = result.action.data;
          if (!data?.id || !data.status) break;

          const todoId = String(data.id);
          const isCompleted = data.status === "complete";

          await toggleTodo(todoId, isCompleted);
          const updatedTodos = await getTodos();
          const updatedTodo = updatedTodos.find(
            (todo) => todo.id === todoId
          );

          return Response.json({
            ...result,
            todo: updatedTodo,
          });
        }

        case "delete": {
          const data = result.action.data;
          if (!data?.id) break;

          const todoId = String(data.id);
          await deleteTodo(todoId);

          return Response.json({
            ...result,
            deletedId: todoId,
          });
        }

        case "list": {
          const todos = await getTodos();
          return Response.json({
            ...result,
            todos,
          });
        }

        case "other":
        default:
          break;
      }
    }

    return Response.json(result);
  } catch {
    return Response.json(
      {
        success: false,
        message:
          "An error occurred while processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
