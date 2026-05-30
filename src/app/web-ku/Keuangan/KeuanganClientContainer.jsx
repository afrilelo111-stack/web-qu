'use client'

import { useState } from 'react'
import TargetLaptop from '@/app/web-ku/components/TargetLaptop'
import FormTabungan from '@/app/web-ku/components/FormTabungan'
import RiwayatTabungan from '@/app/web-ku/components/RiwayatTabungan'
import { ArrowLeft, ArrowRight } from 'lucide-react'

export default function KeuanganClientContainer({ laptop, logs }) {
  // 1. STATE UNTUK PAGINASI
  const [halamanSekarang, setHalamanSekarang] = useState(1)
  const dataPerHalaman = 5

  // Hitung total seluruh tabungan
  const totalTabungan = (logs || []).reduce((total, log) => {
    const nominal = Number(log.jumlah) || 0
    if (log.tipe === 'masuk') return total + nominal
    if (log.tipe === 'keluar') return total - nominal
    return total
  }, 0)

  // 2. LOGIKA MEMOTONG DATA (Pagination)
  const indeksTerakhir = halamanSekarang * dataPerHalaman
  const indeksPertama = indeksTerakhir - dataPerHalaman
  // Mengambil hanya 5 data sesuai halaman yang aktif
  const logsTerpotong = (logs || []).slice(indeksPertama, indeksTerakhir)

  // Hitung total halaman yang tersedia
  const totalHalaman = Math.ceil((logs || []).length / dataPerHalaman) || 1

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 text-black items-start">
      
      {/* ─── KOLOM KIRI (TARGET & RIWAYAT) ─── */}
      <div className="lg:col-span-2 flex flex-col space-y-8">
        
        {/* 💳 1. TARGET LAPTOP */}
        <div className="bg-[#ff922b] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 relative overflow-hidden group">
          <div className="bg-[#fff9db] border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <TargetLaptop 
              targetNama={laptop.nama_laptop} 
              targetHarga={Number(laptop.harga)} 
              totalTabungan={totalTabungan} 
            />
          </div>
        </div>

        {/* 📥 2. FORM INPUT TRANSAKSI (KHUSUS TAMPILAN HP) */}
        <div className="block lg:hidden bg-[#20c997] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="bg-[#fff0f6] border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <FormTabungan />
          </div>
        </div>
        
        {/* 📜 3. RIWAYAT TABUNGAN DENGAN KONTROL HALAMAN */}
        <div className="bg-[#b197fc] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="bg-[#e7f5ff] border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            
            {/* Mengirim data yang sudah dipotong (maksimal 5 data) */}
            <RiwayatTabungan logs={logsTerpotong} />

            {/* ─── KONTROL NAVIGASI PAGINASI (NEO-BRUTALISM STYLE) ─── */}
            {/* Hanya muncul jika total data lebih dari 5 */}
            {(logs || []).length > dataPerHalaman && (
              <div className="mt-6 pt-4 border-t-4 border-black flex items-center justify-between gap-4">
                
                {/* Tombol Halaman Sebelumnya */}
                <button
                  onClick={() => setHalamanSekarang((prev) => Math.max(prev - 1, 1))}
                  disabled={halamanSekarang === 1}
                  className="bg-[#ff6b6b] disabled:opacity-40 disabled:pointer-events-none text-black font-black border-3 border-black px-3 py-2 text-xs uppercase tracking-wider flex items-center gap-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer"
                >
                  <ArrowLeft size={14} strokeWidth={3} />
                  <span>Sebelumnya</span>
                </button>

                {/* Indikator Angka Halaman */}
                <div className="bg-black text-[#FFDE4D] border-3 border-black font-black px-4 py-2 text-xs tracking-widest uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  Hal. {halamanSekarang} Dari {totalHalaman}
                </div>

                {/* Tombol Halaman Berikutnya */}
                <button
                  onClick={() => setHalamanSekarang((prev) => Math.min(prev + 1, totalHalaman))}
                  disabled={halamanSekarang === totalHalaman}
                  className="bg-[#4d96ff] disabled:opacity-40 disabled:pointer-events-none text-black font-black border-3 border-black px-3 py-2 text-xs uppercase tracking-wider flex items-center gap-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer"
                >
                  <span>Berikutnya</span>
                  <ArrowRight size={14} strokeWidth={3} />
                </button>

              </div>
            )}

          </div>
        </div>

      </div>

      {/* ─── KOLOM KANAN (FORM INPUT TRANSAKSI KHUSUS LAPTOP) ─── */}
      <div className="hidden lg:block lg:col-span-1 bg-[#20c997] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 h-fit sticky top-36">
        <div className="bg-[#fff0f6] border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <FormTabungan />
        </div>
      </div>

    </div>
  )
}