
// Types for our chat messages
export type ChatRole = 'assistant' | 'user' | 'system';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: Date;
}

// Define a type for suggested queries
export interface SuggestedQuery {
  id: string;
  text: string;
}

export type MessageHistory = ChatMessage[];

export interface ChatContextType {
  messages: MessageHistory;
  addMessage: (content: string) => void;
  isLoading: boolean;
  isOpen: boolean;
  toggleChat: () => void;
  clearChat: () => void;
  userRole: string | null;
  setTempUserRole: (role: string | null) => void;
  suggestedQueries: SuggestedQuery[];
}

// Email templates types
export interface EmailTemplate {
  subject: string;
  body: string;
}

export interface EmailTemplates {
  newIntake: EmailTemplate;
  confirmationToOwner: EmailTemplate;
  contractorAssignment: EmailTemplate;
  followUp: EmailTemplate;
  tenantConfirmation: EmailTemplate;
}

// Pre-defined email templates
export const emailTemplates: EmailTemplates = {
  newIntake: {
    subject: "New Property Intake Submitted",
    body: "New submission from {{ownerName}} at {{propertyAddress}} for {{serviceType}}. Please assign internally."
  },
  confirmationToOwner: {
    subject: "We've Received Your Intake",
    body: "Thanks for submitting your property to TurnkeyFix. A member of our team will follow up shortly."
  },
  contractorAssignment: {
    subject: "You've Been Assigned a New Job",
    body: "Job Type: {{jobType}}\nAddress: {{propertyAddress}}\nConfirm schedule and upload photos upon completion."
  },
  followUp: {
    subject: "Ready to Unlock Income From Your Property?",
    body: "Still thinking it over? TurnkeyFix offers full-service rehab + management for just $65/unit."
  },
  tenantConfirmation: {
    subject: "Maintenance Request Received",
    body: "We're on it — we'll confirm once your service provider is dispatched."
  }
};
