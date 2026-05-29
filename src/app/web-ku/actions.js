'use server';

import { revalidatePath } from 'next/cache';
// ✅ SEKARANG SUDAH FIX: Menggunakan jalur file yang benar ('/server')
import { createClient } from '@/lib/supabase/serve'; 

/**
 * 1. CREATE - Menambah Catatan Tabungan Baru
 * Menggunakan parameter (state, formData) agar cocok dengan hook useActionState
 */
export async function addtabungan(state, formData) {
  try {
    const supabase = await createClient();
    
    // Ambil data dari elemen form HTML
    const tipe = formData.get('tipe');
    const keterangan = formData.get('keterangan');
    const jumlahRaw = formData.get('jumlah');

    console.log('[addtabungan] tipe:', tipe);
    console.log('[addtabungan] keterangan:', keterangan);
    console.log('[addtabungan] jumlah:', jumlahRaw);

    // ─── 1. VALIDASI DATA KOSONG ───
    if (!tipe || !keterangan || !jumlahRaw) {
      return { error: 'Tipe, keterangan, dan jumlah wajib diisi.' };
    }

    // ─── 2. KONVERSI & VALIDASI NOMINAL ───
    const jumlah = parseInt(jumlahRaw, 10);
    if (isNaN(jumlah) || jumlah <= 0) {
      return { error: 'Jumlah uang harus berupa angka yang valid dan lebih dari 0.' };
    }

    // Masukkan entri baru ke tabel 'tabungan' Supabase
    const { data, error } = await supabase
      .from('tabungan')
      .insert([{ 
        tipe: tipe,
        keterangan: keterangan, 
        jumlah: jumlah          
      }])
      .select();

    if (error) {
      console.error('[addtabungan] Database error:', error);
      return { error: 'Gagal menyimpan data: ' + error.message };
    }

    console.log('[addtabungan] Success, data:', data);
    
    // ─── 3. REVALIDATE PATH ───
    // Memaksa Next.js memperbarui cache halaman agar data baru langsung muncul di layar
    revalidatePath('/web-ku/keuagan'); 
    
    return { success: true };

  } catch (err) {
    console.error('[addtabungan] Unexpected error:', err);
    return { error: 'Terjadi kesalahan: ' + err.message };
  }
}

/**
 * 2. READ - Mengambil Data Target Laptop & Log Transaksi Tabungan
 * Dipanggil di Server Component halaman utama keuangan
 */
export async function getKeuanganData() {
  try {
    const supabase = await createClient();

    // Ambil semua data target_laptop untuk memeriksa ketersediaan baris data
    const { data: laptopArray, error: laptopError } = await supabase
      .from('target_laptop')
      .select('*')
      .order('id', { ascending: false });

    if (laptopError) {
      console.error('[getKeuanganData] Laptop error:', laptopError);
    }

    // Ambil baris pertama (terbaru) jika array memiliki isi data
    const laptop = (laptopArray && laptopArray.length > 0) ? laptopArray[0] : null;

    // Ambil semua riwayat transaksi dari yang terbaru
    const { data: logs, error: logsError } = await supabase
      .from('tabungan')
      .select('*')
      .order('id', { ascending: false });

    if (logsError) {
      console.error('[getKeuanganData] Logs error:', logsError);
    }

    // ─── PENGAMAN STRUKTUR DATA COLUMNS ───
    const namaLaptopAsli = laptop ? (laptop.nama_laptop || laptop.nama || laptop.nama_barang) : 'Belum Ada Target';
    const hargaLaptopAsli = laptop ? (laptop.harga || laptop.harga_laptop || 0) : 0;

    return {
      laptop: {
        nama_laptop: namaLaptopAsli,
        harga: Number(hargaLaptopAsli)
      },
      logs: logs || []
    };
  } catch (error) {
    console.error('[getKeuanganData] Crash:', error);
    return {
      laptop: { nama_laptop: 'Belum Ada Target', harga: 0 },
      logs: []
    };
  }
}