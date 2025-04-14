
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';

// Get values from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are available
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase credentials. Please make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file'
  );
}

// Create a mock client for development if credentials are missing
const createSupabaseClient = () => {
  // If we have valid credentials, use them
  if (supabaseUrl && supabaseAnonKey) {
    return createClient<Database>(supabaseUrl, supabaseAnonKey);
  }
  
  // Create a mock client for development that won't crash the app
  // This prevents the app from crashing, but Supabase operations will fail silently
  const mockClient = {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signUp: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: null }),
      updateUser: async () => ({ data: null, error: new Error('Supabase not configured') }),
    },
    from: () => ({
      select: () => ({
        eq: () => ({
          single: async () => ({ data: null, error: new Error('Supabase not configured') }),
        }),
        insert: async () => ({ data: null, error: new Error('Supabase not configured') }),
        update: async () => ({ data: null, error: new Error('Supabase not configured') }),
      }),
    }),
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: new Error('Supabase not configured') }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        remove: async () => ({ data: null, error: new Error('Supabase not configured') }),
      }),
    },
  } as unknown as ReturnType<typeof createClient<Database>>;
  
  return mockClient;
};

export const supabase = createSupabaseClient();
