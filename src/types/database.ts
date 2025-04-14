
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          role: 'owner' | 'asset_manager' | 'admin'
          created_at: string
          avatar_url?: string
        }
        Insert: {
          id: string
          email: string
          name: string
          role: 'owner' | 'asset_manager' | 'admin'
          created_at?: string
          avatar_url?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          role?: 'owner' | 'asset_manager' | 'admin'
          created_at?: string
          avatar_url?: string
        }
      }
      properties: {
        Row: {
          id: string
          address: string
          unit_type: string
          condition: string
          created_at: string
          updated_at: string
          user_id: string
          status: string
        }
        Insert: {
          id?: string
          address: string
          unit_type: string
          condition: string
          created_at?: string
          updated_at?: string
          user_id: string
          status?: string
        }
        Update: {
          id?: string
          address?: string
          unit_type?: string
          condition?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          status?: string
        }
      }
      service_requests: {
        Row: {
          id: string
          property_id: string
          service_type: string
          status: string
          notes: string
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          property_id: string
          service_type: string
          status?: string
          notes?: string
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          property_id?: string
          service_type?: string
          status?: string
          notes?: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      uploads: {
        Row: {
          id: string
          path: string
          property_id?: string
          service_request_id?: string
          user_id: string
          created_at: string
          file_name: string
          file_type: string
          file_size: number
        }
        Insert: {
          id?: string
          path: string
          property_id?: string
          service_request_id?: string
          user_id: string
          created_at?: string
          file_name: string
          file_type: string
          file_size: number
        }
        Update: {
          id?: string
          path?: string
          property_id?: string
          service_request_id?: string
          user_id?: string
          created_at?: string
          file_name?: string
          file_type?: string
          file_size?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
