import { Laptop, CheckCircle2 } from 'lucide-react'

export default function TargetLaptop({ targetNama, targetHarga, totalTabungan }) {
  const hargaAman = Number(targetHarga) || 0
  const tabunganAman = Number(totalTabungan) || 0

  // Hitung sisa kekurangan (Gunakan Math.max agar tidak minus jika uangmu kelebihan)
  const sisaKekurangan = Math.max(hargaAman - tabunganAman, 0)
  
  // Hitung persentase (Cegah pembagian dengan angka nol)
  const persentasePencapaian = hargaAman > 0 
    ? Math.min((tabunganAman / hargaAman) * 100, 100) 
    : 0

  const apakahLunas = persentasePencapaian >= 100

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
        <div>
          <span className="bg-[#4D96FF] border-2 border-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block mb-2">
            Target Gadget
          </span>
          <h2 className="text-xl font-black uppercase flex items-center gap-2">
            {apakahLunas ? (
              <CheckCircle2 size={20} className="text-green-600 animate-bounce" strokeWidth={3} />
            ) : (
              <Laptop size={20} strokeWidth={3} />
            )} 
            {targetNama || 'Belum Menentukan Target'}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black uppercase text-neutral-500">Harga Target</p>
          <p className="text-lg font-black text-blue-600">Rp {hargaAman.toLocaleString('id-ID')}</p>
        </div>
      </div>

      {/* PROGRESS BAR NEO-BRUTALISM */}
      <div className="w-full bg-neutral-200 border-4 border-black h-8 relative overflow-hidden mb-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* 🔥 PERBAIKAN DI SINI: Menggunakan inline style width murni agar pasti di-render oleh browser */}
        <div 
          className="bg-[#6BCB77] h-full transition-all duration-500"
          style={{ width: `${persentasePencapaian}%`, borderRight: persentasePencapaian > 0 ? '4px solid black' : 'none' }}
        />
        <span className="absolute inset-0 flex items-center justify-center font-black text-xs uppercase mix-blend-difference text-white tracking-widest">
          {apakahLunas ? '🎉 TARGET TERCAPAI 100%' : `${persentasePencapaian.toFixed(1)}% TERCAPAI`}
        </span>
      </div>

      {/* INFORMASI RINGKASAN */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        {/* UANG TERKUMPUL */}
        <div className="bg-neutral-50 border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <p className="text-[9px] font-black uppercase text-neutral-500">Uang Terkumpul</p>
          <p className="text-sm font-black text-green-600">Rp {tabunganAman.toLocaleString('id-ID')}</p>
        </div>

        {/* KEKURANGAN / STATUS SELESAI */}
        <div className={`border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors ${
          apakahLunas ? 'bg-green-50' : 'bg-neutral-50'
        }`}>
          <p className="text-[9px] font-black uppercase text-neutral-500">
            {apakahLunas ? 'Status Target' : 'Kekurangan Uang'}
          </p>
          <p className={`text-sm font-black ${apakahLunas ? 'text-green-600' : 'text-red-500'}`}>
            {apakahLunas ? 'LUNAS / SELESAI' : `Rp ${sisaKekurangan.toLocaleString('id-ID')}`}
          </p>
        </div>
      </div>
    </div>
  )
}