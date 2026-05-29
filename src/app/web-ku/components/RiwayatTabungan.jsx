'use client'
import { History, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export default function RiwayatTabungan({ logs }) {
  return (
    <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-2">
        <History size={18} strokeWidth={3} />
        <h3 className="text-sm font-black uppercase tracking-wider">Log Aliran Dana Celengan</h3>
      </div>

      <div className="space-y-3">
        {logs.length === 0 ? (
          <p className="text-xs font-bold text-neutral-500 uppercase text-center py-4">Belum ada transaksi</p>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex items-center justify-between border-2 border-black p-3 bg-neutral-50 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center gap-3">
                <div className={`p-1.5 border-2 border-black ${log.tipe === 'masuk' ? 'bg-[#6BCB77]' : 'bg-[#FF6B6B]'}`}>
                  {log.tipe === 'masuk' ? <ArrowUpRight size={16} strokeWidth={3} /> : <ArrowDownRight size={16} strokeWidth={3} />}
                </div>
                <div>
                  <p className="text-xs font-black uppercase">{log.keterangan}</p>
                  <p className="text-[9px] font-bold font-mono text-neutral-500 uppercase">
                    {log.created_at ? new Date(log.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-black ${log.tipe === 'masuk' ? 'text-green-600' : 'text-red-600'}`}>
                {log.tipe === 'masuk' ? '+' : '-'} Rp {Number(log.jumlah).toLocaleString('id-ID')}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}