
// This is a placeholder service for OpenAI interactions
// In a production setting, this would call a backend proxy to handle API keys securely

export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIRequest {
  messages: OpenAIMessage[];
  model: string;
  temperature?: number;
  max_tokens?: number;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    message: OpenAIMessage;
    finish_reason: string;
  }[];
}

// This function would normally call your backend proxy
// For now, it returns a mock response
export async function getAIResponse(messages: OpenAIMessage[]): Promise<string> {
  console.log('Messages sent to OpenAI:', messages);
  
  // In a real implementation, this would call your backend
  // const response = await fetch('/api/openai', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ messages }),
  // });
  // const data = await response.json();
  // return data.choices[0].message.content;
  
  // For development, return a simulated response
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get the last user message
      const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
      
      if (!lastUserMessage) {
        resolve("I'm sorry, I couldn't understand your request. How can I help you with property management today?");
        return;
      }
      
      const query = lastUserMessage.content.toLowerCase();
      
      if (query.includes('property') && (query.includes('status') || query.includes('inspect'))) {
        resolve("Your property at 123 Main St is scheduled for inspection on Friday at 2pm. Would you like to reschedule or get more details?");
      } else if (query.includes('lock') || query.includes('install')) {
        resolve("I can help schedule a smart lock installation. Our next available appointment is Tuesday at 10am. Would you like to book this slot?");
      } else if (query.includes('maintenance') || query.includes('request')) {
        resolve("You currently have 2 open maintenance requests: 1) Plumbing issue (scheduled for tomorrow), 2) HVAC check (pending assignment). Would you like more details on either of these?");
      } else if (query.includes('owner')) {
        resolve("As a property owner, I can help you with property inspections, maintenance coordination, tenant issues, and getting estimates for repairs. What would you like assistance with today?");
      } else if (query.includes('contractor')) {
        resolve("For contractors, I can show assigned jobs, help upload completion photos, and facilitate communication with property owners. Would you like to see your current assignments?");
      } else if (query.includes('tenant')) {
        resolve("As a tenant, I can help you report maintenance issues, check rent payment status, and communicate with property management. What can I assist you with today?");
      } else {
        resolve("I'm here to help with property management. I can assist with inspections, maintenance requests, smart lock installations, and more. How can I help you today?");
      }
    }, 1000);
  });
}
