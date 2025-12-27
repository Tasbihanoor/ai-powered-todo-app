import { NextRequest } from 'next/server';
import { todoAgent } from '@/lib/openrouter-agent';
import { getTodos, createTodo, toggleTodo, deleteTodo } from '@/server/actions/todos';
import { auth } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    // Authenticate the user
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;

    const { userRequest, todosContext } = await request.json();

    if (!userRequest) {
      return Response.json(
        { error: 'Missing userRequest in request body' },
        { status: 400 }
      );
    }

    // Process the request with the agent
    const result = await todoAgent.processTodoRequest(userRequest, todosContext);

    // If the agent identified a specific action, execute it
    if (result.action) {
      switch (result.action.type) {
        case 'create':
          if (result.action.data) {
            const { title, priority, dueDate } = result.action.data;

            // Create a FormData object to match the expected signature of createTodo
            const formData = new FormData();
            formData.append('content', title || 'New Task');
            formData.append('priority', priority || 'medium');
            if (dueDate) {
              formData.append('dueDate', dueDate);
            }

            await createTodo(formData);

            // Fetch updated todos to return
            const updatedTodos = await getTodos();
            const newTodo = updatedTodos[0]; // The new todo should be first due to ordering

            return Response.json({
              ...result,
              todo: newTodo,
            });
          }
          break;

        case 'update':
          if (result.action.data && result.action.data.id) {
            const { id, status } = result.action.data;
            if (status === 'complete' || status === 'incomplete') {
              const isCompleted = status === 'complete';
              await toggleTodo(id, isCompleted);

              // Fetch updated todos to return
              const updatedTodos = await getTodos();
              const updatedTodo = updatedTodos.find(todo => todo.id === id);

              return Response.json({
                ...result,
                todo: updatedTodo,
              });
            }
          }
          break;

        case 'delete':
          if (result.action.data && result.action.data.id) {
            const { id } = result.action.data;
            await deleteTodo(id);

            return Response.json({
              ...result,
              deletedId: id,
            });
          }
          break;

        case 'list':
          const todos = await getTodos();
          return Response.json({
            ...result,
            todos,
          });

        case 'other':
        default:
          // Just return the agent response without executing specific actions
          break;
      }
    }

    return Response.json(result);
  } catch (error) {
    console.error('Error in AI Todo API:', error);

    // Return a safe error response
    return Response.json(
      {
        success: false,
        message: 'An error occurred while processing your request. Please try again.'
      },
      { status: 500 }
    );
  }
}