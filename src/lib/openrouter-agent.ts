import OpenAI from 'openai';

// Initialize OpenRouter client with the API key from environment
const openRouterClient = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPEN_ROUTER || '', // Provide empty string as fallback to avoid error
  defaultHeaders: {
    'HTTP-Referer': process.env.NODE_ENV === 'production'
      ? 'https://ai-powered-todo-app-sandy.vercel.app'  // Production URL
      : 'http://localhost:3000', // For logging purposes
    'X-Title': 'AI-Powered Todo App', // For logging purposes
  },
});

/**
 * Safe agent that handles Todo-related tasks using OpenRouter API
 * Uses qwen/qwen3-coder:free model for all responses
 */
export class TodoAgent {
  private client: OpenAI;

  constructor() {
    this.client = openRouterClient;
  }

  /**
   * Process a user's request related to Todo tasks
   * @param userRequest - The user's request about Todo operations
   * @param todosContext - Context about existing todos (optional)
   * @returns Processed response with safe error handling
   */
  async processTodoRequest(userRequest: string, todosContext?: any[]): Promise<{
    success: boolean;
    message: string;
    action?: {
      type: 'create' | 'update' | 'delete' | 'list' | 'other';
      data?: any;
    };
  }> {
    try {
      // Check if API key is available
      if (!process.env.OPEN_ROUTER || process.env.OPEN_ROUTER.trim() === '') {
        return {
          success: false,
          message: 'AI service is not configured properly. Please check the API key.',
        };
      }

      // Validate inputs with enhanced safety
      if (!userRequest || typeof userRequest !== 'string') {
        return {
          success: false,
          message: 'Invalid request: Please provide a valid text request',
        };
      }

      // Sanitize and limit input length
      const sanitizedRequest = userRequest.trim().substring(0, 1000); // Limit to 1000 chars
      if (sanitizedRequest.length === 0) {
        return {
          success: false,
          message: 'Invalid request: Input cannot be empty after sanitization',
        };
      }

      // Prepare context for the AI
      const systemPrompt = `You are an AI assistant specialized in helping with Todo tasks.
      Your role is to interpret user requests about creating, listing, updating, or deleting todos.
      The user is using a Todo application with the following capabilities:
      - Creating todos with title, description, priority (low/medium/high), and due date
      - Listing todos (all, completed, pending)
      - Updating todo status (complete/incomplete)
      - Deleting todos
      - Filtering and sorting todos

      Respond in a structured format that can be parsed by the application.
      Always respond in a helpful, concise manner.`;

      const userContext = todosContext
        ? `Current todos context: ${JSON.stringify(todosContext, null, 2).substring(0, 2000)}. User request: ${sanitizedRequest}` // Limit context size
        : `User request: ${sanitizedRequest}`;

      // Call OpenRouter API with the specified model
      const completion = await this.client.chat.completions.create({
        model: 'qwen/qwen3-coder:free', // Using the free Qwen model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userContext },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      const response = completion.choices[0]?.message?.content || '';

      // Parse the response and determine the appropriate action
      const action = this.parseActionFromResponse(userRequest.toLowerCase(), response);

      return {
        success: true,
        message: response,
        action,
      };
    } catch (error: any) {
      console.error('Error in TodoAgent:', error);

      // Handle specific error types
      if (error.status === 401) {
        return {
          success: false,
          message: 'Authentication failed. Please check your API key.',
        };
      } else if (error.status === 429) {
        return {
          success: false,
          message: 'Rate limit exceeded. Please try again later.',
        };
      } else if (error.status === 500) {
        return {
          success: false,
          message: 'Service temporarily unavailable. Please try again later.',
        };
      } else {
        // For other errors, provide a generic safe response
        return {
          success: false,
          message: 'Unable to process your request at the moment. Please try again.',
        };
      }
    }
  }

  /**
   * Parse the intended action from the AI response
   * @param userRequest - The original user request
   * @param aiResponse - The AI's response
   * @returns The parsed action
   */
  private parseActionFromResponse(userRequest: string, aiResponse: string) {
    // Determine action type based on user request
    if (userRequest.includes('create') || userRequest.includes('add') || userRequest.includes('new')) {
      return {
        type: 'create' as const,
        data: this.extractTodoData(aiResponse),
      };
    } else if (userRequest.includes('update') || userRequest.includes('change') || userRequest.includes('complete')) {
      return {
        type: 'update' as const,
        data: this.extractUpdateData(aiResponse),
      };
    } else if (userRequest.includes('delete') || userRequest.includes('remove')) {
      return {
        type: 'delete' as const,
        data: this.extractDeleteData(aiResponse),
      };
    } else if (userRequest.includes('list') || userRequest.includes('show') || userRequest.includes('all')) {
      return {
        type: 'list' as const,
      };
    } else {
      return {
        type: 'other' as const,
        data: { response: aiResponse },
      };
    }
  }

  /**
   * Extract todo creation data from AI response with validation
   */
  private extractTodoData(response: string) {
    // Simple extraction logic - in a real app, you'd want more sophisticated parsing
    const titleMatch = response.match(/title:\s*"?([^"\n]+)"?/i) || response.match(/task:\s*"?([^"\n]+)"?/i);
    const priorityMatch = response.match(/priority:\s*"?([^"\n]+)"?/i);
    const dueDateMatch = response.match(/due:\s*"?([^"\n]+)"?/i) || response.match(/date:\s*"?([^"\n]+)"?/i);

    // Sanitize and validate extracted data
    const title = titleMatch ? this.sanitizeString(titleMatch[1].trim(), 100) : 'New Task';
    const priority = priorityMatch
      ? this.validatePriority(priorityMatch[1].trim().toLowerCase())
      : 'medium';
    const dueDate = dueDateMatch ? this.sanitizeString(dueDateMatch[1].trim(), 20) : undefined;

    return {
      title,
      priority,
      dueDate,
    };
  }

  /**
   * Extract update data from AI response with validation
   */
  private extractUpdateData(response: string) {
    // Simple extraction logic for updates
    const idMatch = response.match(/id:\s*"?(\d+)"?/i);
    const statusMatch = response.match(/status:\s*"?([^"\n]+)"?/i);

    return {
      id: idMatch ? this.validateId(parseInt(idMatch[1], 10)) : undefined,
      status: statusMatch ? this.validateStatus(statusMatch[1].trim().toLowerCase()) : undefined,
    };
  }

  /**
   * Extract delete data from AI response with validation
   */
  private extractDeleteData(response: string) {
    // Simple extraction logic for deletes
    const idMatch = response.match(/id:\s*"?(\d+)"?/i);

    return {
      id: idMatch ? this.validateId(parseInt(idMatch[1], 10)) : undefined,
    };
  }

  /**
   * Sanitize string input and limit length
   */
  private sanitizeString(input: string, maxLength: number = 200): string {
    if (!input) return '';

    // Remove potentially dangerous characters and limit length
    const sanitized = input
      .replace(/[<>{}\\|;#*~`$^&\[\]]/g, '') // Remove potentially dangerous chars
      .substring(0, maxLength)
      .trim();

    return sanitized;
  }

  /**
   * Validate priority value
   */
  private validatePriority(priority: string): string {
    const validPriorities = ['low', 'medium', 'high'];
    return validPriorities.includes(priority) ? priority : 'medium';
  }

  /**
   * Validate status value
   */
  private validateStatus(status: string): string {
    const validStatuses = ['complete', 'incomplete', 'true', 'false', 'done', 'pending'];
    if (validStatuses.includes(status)) {
      // Normalize status to standard values
      if (['complete', 'true', 'done'].includes(status)) {
        return 'complete';
      } else {
        return 'incomplete';
      }
    }
    return 'incomplete'; // default
  }

  /**
   * Validate ID value
   */
  private validateId(id: number): number | undefined {
    if (isNaN(id) || id <= 0 || id > Number.MAX_SAFE_INTEGER) {
      return undefined;
    }
    return id;
  }
}

// Export a singleton instance
export const todoAgent = new TodoAgent();