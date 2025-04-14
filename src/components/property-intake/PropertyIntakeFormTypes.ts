
import { UnitType, PropertyCondition, ServiceType } from '@/types/property';

export interface PropertyIntakeFormData {
  address: string;
  unitType: UnitType;
  condition: PropertyCondition;
  services: ServiceType[];
  photos: File[];
  photoUrls: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
}

export interface PropertyIntakeFormProps {
  onSuccess?: (propertyId: string) => void;
}
