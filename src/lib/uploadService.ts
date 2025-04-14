
import { supabase } from './supabase';
import { v4 as uuidv4 } from 'uuid';

export interface UploadResult {
  path: string;
  file_name: string;
  file_type: string;
  file_size: number;
  id: string;
}

export async function uploadFile(
  file: File,
  bucket: string = 'property-photos',
  folder: string = 'uploads'
): Promise<UploadResult> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  const filePath = `${folder}/${fileName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }

  // Get public URL
  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);

  return {
    path: data.publicUrl,
    file_name: file.name,
    file_type: file.type,
    file_size: file.size,
    id: uuidv4()
  };
}

export async function deleteFile(
  path: string,
  bucket: string = 'property-photos'
): Promise<void> {
  // Extract relative path from full URL
  const storageUrl = supabase.storage.from(bucket).getPublicUrl('').data.publicUrl;
  const relativePath = path.replace(storageUrl, '');

  const { error } = await supabase.storage
    .from(bucket)
    .remove([relativePath]);

  if (error) {
    throw new Error(`Error deleting file: ${error.message}`);
  }
}

export async function saveUploadRecord(upload: UploadResult, userId: string, propertyId?: string, serviceRequestId?: string): Promise<string> {
  const { data, error } = await supabase
    .from('uploads')
    .insert({
      id: upload.id,
      path: upload.path,
      file_name: upload.file_name,
      file_type: upload.file_type,
      file_size: upload.file_size,
      user_id: userId,
      property_id: propertyId,
      service_request_id: serviceRequestId,
      created_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Error saving upload record: ${error.message}`);
  }

  return data.id;
}
