'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Send, Loader2 } from 'lucide-react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  priority: string;
  dueDate?: string | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

interface AIResponse {
  success: boolean;
  message: string;
  action?: {
    type: 'create' | 'update' | 'delete' | 'list' | 'other';
    data?: any;
  };
  todo?: Todo;
  todos?: Todo[];
  deletedId?: number;
}

export default function AITodoAssistant({ onTodoAction }: { onTodoAction?: () => void }) {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Add user message to conversation
    const userMessage = { role: 'user' as const, content: input };
    setConversation(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsLoading(true);

    try {
      // Get current todos context to send to AI
      // In a real implementation, you'd fetch current todos here
      const response = await fetch('/api/ai-todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userRequest: userInput,
          // You can pass current todos context here if needed
          // todosContext: currentTodos
        }),
      });

      const data: AIResponse = await response.json();

      if (data.success) {
        // Add AI response to conversation
        setConversation(prev => [
          ...prev,
          { role: 'assistant', content: data.message }
        ]);

        // If the AI identified an action, trigger a refresh
        if (data.action && onTodoAction) {
          onTodoAction();
        }
      } else {
        // Add error message to conversation
        setConversation(prev => [
          ...prev,
          { role: 'assistant', content: data.message || 'Sorry, I couldn\'t process that request.' }
        ]);
      }
    } catch (error) {
      console.error('Error calling AI API:', error);
      setConversation(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, there was an error processing your request. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bot className="w-5 h-5 text-blue-600" />
          AI Todo Assistant
        </CardTitle>
        <p className="text-sm text-gray-600">
          Ask me to create, update, or manage your todos
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Conversation history */}
          <div className="h-60 overflow-y-auto space-y-3 pr-2">
            {conversation.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                <Bot className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p>Ask me to help with your todos!</p>
                <p className="text-sm mt-2">
                  Try: "Create a high priority task to finish the report by Friday"
                </p>
              </div>
            ) : (
              conversation.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-lg ${
                      msg.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))
            )}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me to create or manage your todos..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading} size="icon">
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}