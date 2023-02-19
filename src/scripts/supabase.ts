import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://ggdddilkajoutxdlvybv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdnZGRkaWxrYWpvdXR4ZGx2eWJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2OTgyMDUsImV4cCI6MTk5MjI3NDIwNX0.vnHHggc_7pvZ946_JZWZNQ-uY-KJ2ArU-4coGhy3G3w')

