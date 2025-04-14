export interface Property {
  id: number;
  name: string;
  address: string;
  status: 'Occupied' | 'Vacant' | 'Maintenance';
  rent: number;
  tenants: number;
  lastPayment?: string;
  nextPayment?: string;
  maintenanceRequests?: number;
  image?: string;
}

export interface Tenant {
  id: number;
  name: string;
  email: string;
  phone: string;
  moveInDate: string;
  leaseEnd: string;
  rentAmount: number;
  status: 'active' | 'former';
  propertyId: number;
  profileImage?: string;
}

export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'succeeded' | 'failed';
  createdAt: string;
  propertyId: number;
  tenantId: number;
  description: string;
  paymentMethod?: string;
  receiptUrl?: string;
}

export interface Appointment {
  id: string;
  title: string;
  description: string;
  propertyId: number;
  propertyName: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'inspection' | 'maintenance' | 'viewing' | 'other';
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  attendees?: string[];
}

// New interfaces for property intake
export interface PropertyIntake {
  id: string;
  address: string;
  unitType: UnitType;
  condition: PropertyCondition;
  services: ServiceType[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  photos: string[];
  createdAt: string;
  userId: string;
  status: 'pending' | 'in-progress' | 'completed';
}

export type UnitType = 'single-family' | 'multi-unit' | 'condo' | 'commercial' | 'other';
export type PropertyCondition = 'good' | 'needs-minor-repairs' | 'needs-full-rehab';
export type ServiceType = 
  | 'smart-lock-install' 
  | 'violation-check' 
  | 'repair-inspection' 
  | 'rent-ready-estimate'
  | 'rent-collection'
  | 'eviction-services';

export interface PricingTier {
  id: string;
  name: string;
  price: number;
  frequency: 'monthly' | 'one-time';
  description: string;
  features: string[];
  popular?: boolean;
}
