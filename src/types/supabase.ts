// src/types/supabase.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      summaries: {
        Row: {
          id: string;
          user_id: string;
          blog_url: string;
          summary: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          blog_url: string;
          summary: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          blog_url?: string;
          summary?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}
