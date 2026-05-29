
'use server';

import { createClient } from '@/lib/supabase/serve';
import { redirect } from 'next/navigation';

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Logout error:', error);
    return { error: error.message };
  }
  
  // Redirect ke halaman login setelah logout
  redirect('/');
}