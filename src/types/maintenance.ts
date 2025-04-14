
export type MaintenanceRequestStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export type MaintenanceRequestPriority = 'low' | 'medium' | 'high' | 'emergency';

export interface MaintenanceRequest {
  id: string;
  propertyId: string;
  propertyName: string;
  title: string;
  description: string;
  category: string;
  priority: MaintenanceRequestPriority;
  status: MaintenanceRequestStatus;
  createdAt: string;
  updatedAt: string;
  attachments?: string[];
  notes?: string[];
}
