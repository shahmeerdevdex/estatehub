
import { ChatMessage } from "@/types/chat";
import { getInitialSystemMessage, getRoleBasedGreeting } from "./chat-helpers";

// Helper to create a system message
export const createSystemMessage = (userRole?: string): ChatMessage => {
  return {
    id: 'system-1',
    role: 'system',
    content: getInitialSystemMessage(userRole),
    timestamp: new Date(),
  };
};

// Helper to create a welcome message
export const createWelcomeMessage = (userRole?: string): ChatMessage => {
  return {
    id: 'assistant-1',
    role: 'assistant',
    content: getRoleBasedGreeting(userRole),
    timestamp: new Date(),
  };
};

// Helper to generate an AI response based on user input
export const generateAIResponse = (content: string): string => {
  const lowerContent = content.toLowerCase();
  
  if (lowerContent.includes('vacant') || lowerContent.includes('foreclosure')) {
    return "Yes, we specialize in vacant properties and foreclosures. Our services include securing the property, regular inspections, and preparing it for market. Would you like more details about our specific services?";
  }
  else if (lowerContent.includes('smart') || lowerContent.includes('lock') || lowerContent.includes('install')) {
    return "Our smart lock installation is $149, which includes professional installation, the lock hardware, and app configuration. Would you like to schedule an installation?";
  }
  else if (lowerContent.includes('grass') || lowerContent.includes('cut') || lowerContent.includes('lawn')) {
    return "Yes, we manage lawn care and grass cuts as part of our property maintenance services. We can set up regular schedules or one-time cuts based on your needs.";
  }
  else if (lowerContent.includes('maintenance') || lowerContent.includes('coverage')) {
    return "Our maintenance coverage is comprehensive with 0% markup on any repairs. We coordinate all repairs with qualified contractors and provide detailed reports with photos.";
  }
  else if (lowerContent.includes('sign up') || lowerContent.includes('contractor')) {
    return "To sign up as a contractor, you'll need to complete our contractor application form. We'll need your credentials, insurance information, and service areas. Would you like me to direct you to our application?";
  }
  else if (lowerContent.includes('pay') || lowerContent.includes('paid') || lowerContent.includes('rate')) {
    return "We typically pay contractors within 7 days of job verification. Our rates are competitive for the industry and vary based on the type of work and your qualifications.";
  }
  else if (lowerContent.includes('bulk') || lowerContent.includes('portfolio')) {
    return "Yes, we specialize in handling bulk properties and portfolios. We offer volume discounts and can create customized management plans for larger clients. Would you like to schedule a consultation?";
  }
  else if (lowerContent.includes('fee') || lowerContent.includes('price') || lowerContent.includes('cost')) {
    return "Our management fee is a flat $65/unit per month with a one-time placement fee of $325. We charge 0% markup on maintenance, even for after-hours and holidays. Would you like to see our full pricing structure?";
  }
  else if (lowerContent.includes('rent')) {
    return "For rent payments, you can use our online portal, which accepts credit/debit cards and ACH transfers. I can guide you to the payment page if you'd like, or assist with any issues you're having with payments.";
  }
  else if (lowerContent.includes('maintenance issue') || lowerContent.includes('repair')) {
    return "I'm sorry to hear you're having maintenance issues. As a tenant, you can submit a maintenance request through your tenant portal or I can help you file one now. Can you briefly describe the issue you're experiencing?";
  }
  else if (lowerContent.includes('eviction')) {
    return "We handle eviction filing and processing for $299, which includes case evaluation, document preparation, court filing, and process service. Our team can guide you through the entire eviction process.";
  }
  else if (lowerContent.includes('intake') || lowerContent.includes('start')) {
    return "To start the property intake process, we'll need some basic information about your property. You can begin by clicking the 'Start Property Intake' button on our site, or I can guide you through the process here.";
  }
  else if (lowerContent.includes('rehab') || lowerContent.includes('renovate')) {
    return "Our full-service rehab options can prepare your property for the rental market quickly and effectively. We handle everything from minor repairs to major renovations with 0% markup on all work. Would you like details on our rehab process?";
  }
  else if (lowerContent.includes('inspection') || lowerContent.includes('inspect')) {
    return "We offer comprehensive property inspections for $249. This includes detailed photo documentation, violation checks, and a full condition report. Regular inspections are also included with our $65/month management service.";
  }
  else if (lowerContent.includes('broker') || lowerContent.includes('realtor')) {
    return "We work closely with real estate brokers to manage their clients' properties. We offer special bulk pricing for brokers managing multiple properties and can help with everything from rehab to tenant placement.";
  }
  else {
    return "Thank you for your question about " + content + ". TurnkeyFix provides comprehensive property management services including repairs, tenant placement, rent collection, and maintenance for just $65/unit per month. How can I assist you more specifically with your property needs?";
  }
};

// Function to prepare messages for API calls
export const prepareMessagesForAPI = (messages: ChatMessage[], content: string, userRole?: string) => {
  // Prepare messages for API (excluding system message from visible history)
  const historyForApi = messages
    .filter(msg => msg.role !== 'system') // Filter out system message
    .map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  
  // Add the system message as the first message
  const systemMessage = messages.find(msg => msg.role === 'system');
  return [
    { role: 'system', content: systemMessage?.content || getInitialSystemMessage(userRole) },
    ...historyForApi,
    { role: 'user', content } // Add the new user message
  ];
};
