'use client'

import { useActionState } from 'react'
import { addtabungan } from '../actions' // ✅ Memanggil fungsi langsung dari actions.js kamu
import { PlusCircle } from 'lucide-react'

export default function FormTabungan() {
  // ✅ Mengelola state form secara mandiri di dalam komponen ini
  const [state, action, isPending] = useActionState(addtabungan, undefined)

  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] sticky top-6">
      <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
        <PlusCircle size={18} strokeWidth={3} />
        <h3 className="text-sm font-black uppercase tracking-wider">Update Catatan Uang</h3>
      </div>

      {/* Menampilkan pesan error jika validasi server gagal */}
      {state?.error && (
        <div className="mb-4 bg-[#FF6B6B] border-2 border-black text-xs font-black p-3 uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          ⚠️ {state.error}
        </div>
      )}

      <form action={action} className="space-y-4">
        {/* JENIS ALIRAN */}
        <div className="space-y-1">
          <label className="block text-[10px] font-black uppercase tracking-wider">Jenis Aliran</label>
          <select 
            name="tipe" 
            required
            className="w-full bg-white border-4 border-black p-2.5 text-xs font-black uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
          >
            <option value="masuk">🟢 Uang Masuk (Menabung)</option>
            <option value="keluar">🔴 Uang Keluar (Keperluan)</option>
          </select>
        </div>

        {/* KETERANGAN */}
        <div className="space-y-1">
          <label className="block text-[10px] font-black uppercase tracking-wider">Sumber / Keterangan</label>
          <input 
            type="text" 
            name="keterangan" 
            required
            placeholder="Contoh: Sisa uang jajan"
            className="w-full bg-white border-4 border-black p-2.5 text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] placeholder-neutral-400 focus:outline-none"
          />
        </div>

        {/* NOMINAL JUMLAH */}
        <div className="space-y-1">
          <label className="block text-[10px] font-black uppercase tracking-wider">Nominal (Rupiah)</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-black text-xs text-neutral-500">Rp</span>
            <input 
              type="number" 
              name="jumlah" 
              required
              placeholder="50000"
              className="w-full bg-white border-4 border-black pl-9 pr-3 py-2.5 text-xs font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] placeholder-neutral-400 focus:outline-none"
            />
          </div>
        </div>

        {/* TOMBOL SUBMIT */}
        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-[#6BCB77] hover:bg-[#59b865] text-black font-black text-xs uppercase tracking-wider py-3.5 px-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all disabled:opacity-50 cursor-pointer mt-2"
        >
          {isPending ? 'Memproses Data...' : 'Simpan Transaksi'}
        </button>
      </form>
    </div>
  )
}