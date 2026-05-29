// src/app/admin/login/actions.js
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/serve'

export async function login(prevState, formData) {
  const supabase = await createClient()

  const email = formData.get('email')
  const password = formData.get('password')

  // Validasi sederhana
  if (!email || !password) {
    return { error: 'Email dan password harus diisi' }
  }
  if (password.length < 6) {
    return { error: 'Password minimal 6 karakter' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/', 'layout')
  redirect('/web-ku/Keuangan')
}