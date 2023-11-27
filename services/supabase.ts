import { createClient } from '@supabase/supabase-js';

const client = createClient(
  'https://lkwmkzpzslzkcemnuukj.supabase.co/',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxrd21renB6c2x6a2NlbW51dWtqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODkwODk4MzQsImV4cCI6MjAwNDY2NTgzNH0.uoDMHXdE0BfAZ8fPRG0-SUFKWjANkoKROKCYL6aWEKE',
);

export default client;