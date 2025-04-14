
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Avatar } from '@/components/ui/avatar';
import { useChat, ChatMessage } from '@/contexts/ChatContext';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';

export function ChatWidget() {
  const { 
    messages, 
    addMessage, 
    isLoading, 
    isOpen, 
    toggleChat, 
    clearChat, 
    setTempUserRole,
    suggestedQueries 
  } = useChat();
  const { user } = useAuth();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [devMode, setDevMode] = useState(false);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Handle suggested query click
  const handleSuggestedQueryClick = (query: string) => {
    addMessage(query);
  };

  // Filter out system messages for display
  const visibleMessages = messages.filter(msg => msg.role !== 'system');

  return (
    <>
      {/* Chat toggle button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 rounded-full w-14 h-14 shadow-lg z-50"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat panel */}
      <Sheet open={isOpen} onOpenChange={toggleChat}>
        <SheetContent className="sm:max-w-md w-full p-0 h-[600px] sm:h-[80vh] max-h-screen flex flex-col">
          {/* Header */}
          <SheetHeader className="border-b p-4 flex flex-row justify-between items-center">
            <SheetTitle>TurnkeyBot</SheetTitle>
            <div className="flex gap-2">
              {/* Dev mode toggle */}
              {import.meta.env.DEV && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setDevMode(!devMode)}
                  className={cn(devMode ? "bg-amber-100" : "")}
                >
                  Dev
                </Button>
              )}
              <Button variant="outline" size="icon" onClick={clearChat} title="Clear chat">
                <Trash2 className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={toggleChat}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </SheetHeader>

          {/* Dev mode controls */}
          {devMode && (
            <div className="border-b p-2 bg-amber-50">
              <div className="flex flex-col gap-2">
                <p className="text-xs font-medium">Dev Mode: Test different user roles</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setTempUserRole('owner')}
                    className="text-xs h-7"
                  >
                    Owner
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setTempUserRole('asset_manager')}
                    className="text-xs h-7"
                  >
                    Asset Manager
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setTempUserRole('broker')}
                    className="text-xs h-7"
                  >
                    Broker
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setTempUserRole('contractor')}
                    className="text-xs h-7"
                  >
                    Contractor
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setTempUserRole('tenant')}
                    className="text-xs h-7"
                  >
                    Tenant
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setTempUserRole('admin')}
                    className="text-xs h-7"
                  >
                    Admin
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    onClick={() => setTempUserRole(null)}
                    className="text-xs h-7"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {visibleMessages.map((message) => (
              <ChatMessageItem key={message.id} message={message} />
            ))}
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-center text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                TurnkeyBot is thinking...
              </div>
            )}
            
            {/* Scroll anchor */}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Queries */}
          <div className="p-2 border-t bg-muted/40">
            <div className="flex gap-2 overflow-x-auto px-2 py-1">
              {suggestedQueries.slice(0, 4).map(query => (
                <Button 
                  key={query.id}
                  variant="outline" 
                  size="sm" 
                  onClick={() => handleSuggestedQueryClick(query.text)}
                  className="whitespace-nowrap text-xs"
                >
                  {query.text}
                </Button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </SheetContent>
      </Sheet>
    </>
  );
}

// Individual message component
function ChatMessageItem({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user';

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div className={cn(
        "flex gap-3 max-w-[80%]", 
        isUser ? "flex-row-reverse" : "flex-row"
      )}>
        {/* Avatar */}
        {!isUser && (
          <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
            <span className="text-xs font-bold">TKB</span>
          </Avatar>
        )}
        
        {/* Message bubble */}
        <div className={cn(
          "rounded-lg px-4 py-2 text-sm",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        )}>
          {message.content}
        </div>
      </div>
    </div>
  );
}
