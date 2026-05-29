'use client'

import TargetLaptop from '@/app/web-ku/components/TargetLaptop'
import FormTabungan from '@/app/web-ku/components/FormTabungan'
import RiwayatTabungan from '@/app/web-ku/components/RiwayatTabungan'

export default function KeuanganClientContainer({ laptop, logs }) {
  // Hitung total tabungan dari data logs yang dikirim oleh server
  const totalTabungan = (logs || []).reduce((total, log) => {
    const nominal = Number(log.jumlah) || 0
    if (log.tipe === 'masuk') return total + nominal
    if (log.tipe === 'keluar') return total - nominal
    return total
  }, 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10 text-black">
      {/* SISI KIRI: TARGET LAPTOP & RIWAYAT */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* 💳 KARTU TARGET LAPTOP (Warna Orange-Yellow Pop) */}
        <div className="bg-[#ff922b] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 relative overflow-hidden group">
          <div className="bg-[#fff9db] border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <TargetLaptop 
              targetNama={laptop.nama_laptop} 
              targetHarga={Number(laptop.harga)} 
              totalTabungan={totalTabungan} 
            />
          </div>
        </div>
        
        {/* 📜 KARTU RIWAYAT TABUNGAN (Warna Ungu Retro Pop) */}
        <div className="bg-[#b197fc] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
          <div className="bg-[#e7f5ff] border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <RiwayatTabungan logs={logs} />
          </div>
        </div>
      </div>

      {/* SISI KANAN: FORM INPUT TRANSAKSI */}
      {/* 📥 KARTU FORM INPUT (Warna Hijau Toska Pop) */}
      <div className="bg-[#20c997] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 h-fit">
        <div className="bg-[#fff0f6] border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <FormTabungan />
        </div>
      </div>
    </div>
  )
}