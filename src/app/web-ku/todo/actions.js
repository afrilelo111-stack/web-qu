'use server'

import { createClient } from '@/lib/supabase/serve'
import { revalidatePath } from 'next/cache'

// 1. Ambil data todo sesuai user yang login
export async function getTodos() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) return []

  const { data, error } = await supabase
    .from('todos')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  if (error) return []
  return data
}

// 2. Tambah todo baru
export async function tambahTodoDb(teks) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || !teks.trim()) return

  await supabase.from('todos').insert([
    { teks, selesai: false, user_id: user.id }
  ])

  revalidatePath('/web-ku/todo')
}

// 3. Ubah status selesai/belum
export async function toggleTodoDb(id, statusSelesai) {
  const supabase = await createClient()
  
  await supabase
    .from('todos')
    .update({ selesai: !statusSelesai })
    .eq('id', id)

  revalidatePath('/web-ku/todo')
}

// 4. Hapus todo
export async function hapusTodoDb(id) {
  const supabase = await createClient()

  await supabase
    .from('todos')
    .delete()
    .eq('id', id)

  revalidatePath('/web-ku/todo')
}