
import { supabase } from '@/lib/supabase';
import { uploadFile, saveUploadRecord } from '@/lib/uploadService';
import { PropertyIntakeFormData } from './PropertyIntakeFormTypes';

export async function submitPropertyIntake(
  formData: PropertyIntakeFormData,
  userId: string
): Promise<{ propertyId: string }> {
  // 1. Insert property record
  const { data: property, error: propertyError } = await supabase
    .from('properties')
    .insert({
      address: formData.address,
      unit_type: formData.unitType,
      condition: formData.condition,
      user_id: userId,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (propertyError) {
    throw new Error(`Error creating property: ${propertyError.message}`);
  }

  // 2. Upload photos and save upload records
  const uploadPromises = formData.photos.map(async (photo) => {
    const uploadResult = await uploadFile(photo, 'property-photos', `properties/${property.id}`);
    await saveUploadRecord(uploadResult, userId, property.id);
    return uploadResult;
  });

  await Promise.all(uploadPromises);

  // 3. Create service requests for each selected service
  const servicePromises = formData.services.map(async (service) => {
    const { error: serviceError } = await supabase
      .from('service_requests')
      .insert({
        property_id: property.id,
        service_type: service,
        status: 'pending',
        notes: '',
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });

    if (serviceError) {
      throw new Error(`Error creating service request: ${serviceError.message}`);
    }
  });

  await Promise.all(servicePromises);

  return { propertyId: property.id };
}
