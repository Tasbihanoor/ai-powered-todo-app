import OpenAI from "openai";

export type TodoPriority = "low" | "medium" | "high";
export type TodoStatus = "complete" | "incomplete";

export interface TodoContext {
  id: number;
  title: string;
  priority: TodoPriority;
  status: TodoStatus;
  dueDate?: string;
}

interface CreateTodoData {
  title: string;
  priority: TodoPriority;
  dueDate?: string;
}

interface UpdateTodoData {
  id?: number;
  status?: TodoStatus;
}

interface DeleteTodoData {
  id?: number;
}

type TodoAction =
  | { type: "create"; data: CreateTodoData }
  | { type: "update"; data: UpdateTodoData }
  | { type: "delete"; data: DeleteTodoData }
  | { type: "list" }
  | { type: "other"; data: { response: string } };

interface AgentResponse {
  success: boolean;
  message: string;
  action?: TodoAction;
}

const openRouterClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER ?? "",
  defaultHeaders: {
    "HTTP-Referer": "https://ai-powered-todo-app-sandy.vercel.app/",
    "X-Title": "AI-Powered Todo App",
  },
});


export class TodoAgent {
  private client: OpenAI = openRouterClient;

  async processTodoRequest(
    userRequest: string,
    todosContext?: TodoContext[]
  ): Promise<AgentResponse> {
    try {
      if (!process.env.OPEN_ROUTER?.trim()) {
        return {
          success: false,
          message: "AI service is not configured properly.",
        };
      }

      if (!userRequest || typeof userRequest !== "string") {
        return {
          success: false,
          message: "Invalid request.",
        };
      }

      const sanitizedRequest = userRequest.trim().slice(0, 1000);
      if (!sanitizedRequest) {
        return {
          success: false,
          message: "Request cannot be empty.",
        };
      }

      const systemPrompt = `
You are an AI assistant for a Todo application.
Interpret user intent and respond clearly and concisely.
`;

      const context = todosContext
        ? `Todos Context: ${JSON.stringify(todosContext).slice(0, 2000)}`
        : "";

      const completion = await this.client.chat.completions.create({
        model: "qwen/qwen3-coder:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `${context}\n${sanitizedRequest}` },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const response = completion.choices[0]?.message?.content ?? "";

      return {
        success: true,
        message: response,
        action: this.parseAction(userRequest.toLowerCase(), response),
      };
    } catch (error: unknown) {
      console.error("TodoAgent Error:", error);

      if (this.isApiError(error)) {
        if (error.status === 401) {
          return { success: false, message: "Invalid API key." };
        }
        if (error.status === 429) {
          return { success: false, message: "Rate limit exceeded." };
        }
        if (error.status === 500) {
          return { success: false, message: "Service unavailable." };
        }
      }

      return {
        success: false,
        message: "Unable to process request.",
      };
    }
  }

  /* ------------------------------------------------------------------------ */
  /* Helpers */
  /* ------------------------------------------------------------------------ */

  private parseAction(userRequest: string, aiResponse: string): TodoAction {
    if (userRequest.includes("create") || userRequest.includes("add")) {
      return { type: "create", data: this.extractTodoData() };
    }

    if (userRequest.includes("update") || userRequest.includes("complete")) {
      return { type: "update", data: this.extractUpdateData() };
    }

    if (userRequest.includes("delete") || userRequest.includes("remove")) {
      return { type: "delete", data: this.extractDeleteData() };
    }

    if (userRequest.includes("list") || userRequest.includes("show")) {
      return { type: "list" };
    }

    return { type: "other", data: { response: aiResponse } };
  }

  private extractTodoData(): CreateTodoData {
    return {
      title: "New Task",
      priority: "medium",
    };
  }

  private extractUpdateData(): UpdateTodoData {
    return {};
  }

  private extractDeleteData(): DeleteTodoData {
    return {};
  }

  private isApiError(error: unknown): error is { status: number } {
    return typeof error === "object" && error !== null && "status" in error;
  }
}


export const todoAgent = new TodoAgent();
