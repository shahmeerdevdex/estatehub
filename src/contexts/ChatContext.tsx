import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/lib/supabase';
import { getRoleBasedGreeting, getSuggestedQueries } from '@/lib/chat-helpers';
import { 
  ChatMessage, 
  MessageHistory, 
  ChatContextType, 
  SuggestedQuery 
} from '@/types/chat';
import { 
  createSystemMessage, 
  createWelcomeMessage, 
  generateAIResponse,
  prepareMessagesForAPI
} from '@/lib/chat-utils';

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<MessageHistory>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [tempUserRole, setTempUserRole] = useState<string | null>(null);
  const [suggestedQueries, setSuggestedQueries] = useState<SuggestedQuery[]>([]);
  
  // Update suggested queries when user role changes
  useEffect(() => {
    const actualRole = tempUserRole || user?.role || null;
    const queries = getSuggestedQueries(actualRole || undefined);
    
    // Convert string array to SuggestedQuery objects with IDs
    setSuggestedQueries(
      queries.map((text, index) => ({
        id: `query-${index}`,
        text
      }))
    );
  }, [user?.role, tempUserRole]);
  
  // Set up initial system message
  useEffect(() => {
    // If there are no messages, add the system message
    if (messages.length === 0) {
      const actualRole = tempUserRole || user?.role || null;
      setUserRole(actualRole);
      
      const systemMessage = createSystemMessage(actualRole || undefined);
      const welcomeMessage = createWelcomeMessage(actualRole || undefined);
      
      setMessages([systemMessage, welcomeMessage]);
    }
  }, [messages.length, user?.role, tempUserRole]);

  // Update the system message when user or tempUserRole changes
  useEffect(() => {
    // Skip if no messages yet
    if (messages.length === 0) return;
    
    const actualRole = tempUserRole || user?.role || null;
    
    // Only update if the role has changed
    if (actualRole !== userRole) {
      setUserRole(actualRole);
      
      // Find and update the system message
      setMessages(prev => {
        const updatedMessages = [...prev];
        const systemIndex = updatedMessages.findIndex(msg => msg.role === 'system');
        
        if (systemIndex !== -1) {
          updatedMessages[systemIndex] = {
            ...updatedMessages[systemIndex],
            content: createSystemMessage(actualRole || undefined).content,
          };
        }
        
        return updatedMessages;
      });
    }
  }, [user?.role, tempUserRole, userRole, messages]);
  
  // Add a new user message and get AI response
  const addMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Prepare messages for API
      const apiMessages = prepareMessagesForAPI(messages, content, userRole || undefined);
      
      // In the future, this would call your backend API
      // Now, we'll simulate a response with keyword matching
      const aiResponse = generateAIResponse(content);
      
      // Add AI response with a small delay to simulate API call
      setTimeout(() => {
        const assistantMessage: ChatMessage = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: aiResponse,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: `assistant-error-${Date.now()}`,
        role: 'assistant',
        content: 'I apologize, but I encountered an error processing your request. Please try again later.',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  }, [messages, userRole]);
  
  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);
  
  const clearChat = useCallback(() => {
    // Keep only the system message
    const systemMessage = messages.find(msg => msg.role === 'system');
    const actualRole = tempUserRole || user?.role || null;
    
    if (systemMessage) {
      setMessages([
        systemMessage,
        {
          id: 'assistant-new',
          role: 'assistant',
          content: getRoleBasedGreeting(actualRole || undefined),
          timestamp: new Date(),
        }
      ]);
    } else {
      // If no system message exists for some reason, start fresh
      setMessages([
        createSystemMessage(actualRole || undefined),
        createWelcomeMessage(actualRole || undefined)
      ]);
    }
  }, [messages, userRole, tempUserRole, user?.role]);
  
  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        isLoading,
        isOpen,
        toggleChat,
        clearChat,
        userRole,
        setTempUserRole,
        suggestedQueries,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Re-export types for convenience
export type { ChatMessage, SuggestedQuery } from '@/types/chat';
