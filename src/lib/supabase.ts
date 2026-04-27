/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://jphvgqbqvzlbyoqbnwsd.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_4R9tLbBDFFAqqM0sx1Si-w_e5hijKZ1';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
