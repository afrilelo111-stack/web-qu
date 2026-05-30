// app/web-ku/prosesLogin.js (atau src/app/web-ku/prosesLogin.js)
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/serve'  // Pastikan path ini benar

export async function login(prevState, formData) {
  const supabase = await createClient()

  const email = formData.get('email')
  const password = formData.get('password')

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
  redirect('/web-ku/keuangan')
}