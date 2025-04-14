
// Helper functions for the chat system

// Get initial system message based on user role
export function getInitialSystemMessage(userRole?: string): string {
  const basePrompt = `You are "FixBot", an AI assistant for TurnkeyFix — a platform that manages vacant and underperforming properties for owners, brokers, banks, and contractors. Your job is to answer questions, guide people to the right services, and schedule callbacks or assign tasks. Be concise, helpful, and professional.`;
  
  if (userRole === 'owner' || userRole === 'asset_manager') {
    return `${basePrompt} 
    
    As you're speaking with a property owner, you can help with:
    - Checking property inspection status
    - Scheduling smart lock installations
    - Viewing service requests
    - Starting new property intake
    - Checking for property violations or fines`;
  }
  
  if (userRole === 'broker') {
    return `${basePrompt} 
    
    As you're speaking with a broker, you can help with:
    - Handling bulk properties
    - Securing foreclosures
    - Discussing fees and services
    - Setting up property management for clients`;
  }
  
  if (userRole === 'contractor') {
    return `${basePrompt} 
    
    As you're speaking with a contractor, you can help with:
    - Signing up to do work
    - Payment schedules and rates
    - Viewing assigned jobs
    - Submitting job reports`;
  }
  
  if (userRole === 'tenant') {
    return `${basePrompt} 
    
    As you're speaking with a tenant, you can help with:
    - Reporting maintenance issues
    - Rent payment information
    - Contacting property managers
    - Submitting formal requests`;
  }
  
  if (userRole === 'admin') {
    return `${basePrompt} 
    
    As you're speaking with an admin, you can help with:
    - Managing properties in the system
    - Reviewing service requests
    - Assigning tasks to contractors
    - Generating reports`;
  }
  
  // Default for unauthenticated or other roles
  return `${basePrompt} 
  
  I can help you learn about our services including:
  - Property intake and onboarding
  - Smart lock installation
  - Fines and violations checks
  - Property inspections
  - Market readiness estimates
  
  If you're a property owner, contractor, or tenant, I can provide more specific assistance once you sign in.`;
}

// Get appropriate greeting based on role
export function getRoleBasedGreeting(role?: string): string {
  if (!role) {
    return "Hello! I'm FixBot, the AI assistant for TurnkeyFix. How can I help you manage your properties today?";
  }
  
  switch (role) {
    case 'owner':
      return "Hello property owner! I'm FixBot. How can I help you manage your properties today?";
    case 'asset_manager':
    case 'broker':
      return "Hello! I'm FixBot. How can I help you coordinate your properties and services today?";
    case 'admin':
      return "Hello admin! I'm FixBot. How can I help you with system management today?";
    case 'contractor':
      return "Hello contractor! I'm FixBot. I can help you with job information, payments, and scheduling.";
    case 'tenant':
      return "Hello tenant! I'm FixBot. I can help with maintenance requests, rent payments, and other property issues.";
    default:
      return "Hello! I'm FixBot. How can I help you with property management today?";
  }
}

// Get suggested queries based on role
export function getSuggestedQueries(role?: string): string[] {
  if (!role) {
    return [
      "Do you work with vacant properties?",
      "How much are smart locks?",
      "What services do you offer?",
      "How does property intake work?",
    ];
  }
  
  switch (role) {
    case 'owner':
      return [
        "Can you manage grass cuts?",
        "How do I schedule a smart lock install?",
        "Do you offer maintenance coverage?",
        "How do I start property intake?",
      ];
    case 'asset_manager':
    case 'broker':
      return [
        "Can you handle bulk properties?",
        "Can you secure foreclosures?",
        "What are your fees?",
        "Schedule a consultation",
      ];
    case 'admin':
      return [
        "Show me all properties",
        "View pending service requests",
        "View active contractors",
        "Generate monthly report",
      ];
    case 'contractor':
      return [
        "How do I sign up for work?",
        "When do I get paid?",
        "What are your pay rates?",
        "View my assigned jobs",
      ];
    case 'tenant':
      return [
        "I have a maintenance issue",
        "How do I pay rent?",
        "Report a problem",
        "Contact property manager",
      ];
    default:
      return [
        "How does your service work?",
        "What are your pricing options?",
        "Do you handle evictions?",
        "Schedule a consultation",
      ];
  }
}
