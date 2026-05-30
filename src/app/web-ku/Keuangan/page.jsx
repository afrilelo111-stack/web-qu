import { Suspense } from 'react'
import { getKeuanganData } from '../actions'
import Navbar from '@/app/web-ku/components/nav' 
import KeuanganClientContainer from './KeuanganClientContainer' // 👈 Kita panggil kontainer client di sini
import {createClient} from '@/lib/supabase/serve'
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic'

// ✅ Sekarang metadata aman di sini karena ini sudah menjadi Server Component murni

function KeuanganSkeleton() {
  return (
    <div className="animate-pulse space-y-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="w-full bg-neutral-300 border-4 border-black h-56" />
          <div className="w-full bg-neutral-300 border-4 border-black h-72" />
        </div>
        <div className="w-full bg-neutral-300 border-4 border-black h-[500px]" />
      </div>
    </div>
  )
}

async function KeuanganContent() {
  const supabase = await createClient();
  // 1. KEAMANAN UTAMA: Validasi user terlebih dahulu sebelum memproses data server
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  // Fetching data langsung terjadi di sisi server (lebih aman & cepat)
  const { laptop, logs } = await getKeuanganData()

  if (!logs || !laptop) {
    return (
      <div className="border-4 border-black bg-[#ff6b6b] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center relative z-10">
        <h2 className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">⚠️ Koneksi Terputus</h2>
        <p className="text-xs font-bold mt-2 uppercase text-black bg-[#ffde4d] border-2 border-black inline-block px-3 py-1">
          Gagal mengambil data dari Supabase.
        </p>
      </div>
    )
  }

  // Lempar data server ke komponen kontainer client penampung visual pop-art
  return <KeuanganClientContainer laptop={laptop} logs={logs} />
}

export default function KeuanganPage() {
  return (
    <div className="bg-[#ffde4d] min-h-screen font-sans text-black w-full pt-32 pb-16 relative overflow-x-hidden selection:bg-black selection:text-[#ffde4d]">
      
      {/* 🔮 ORNAMEN RETRO */}
      <div className="absolute top-28 left-6 w-12 h-12 bg-[#ff6b6b] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] invisible sm:visible rotate-12" />
      <div className="absolute bottom-10 right-8 w-24 h-24 bg-[#4d96ff] border-4 border-black rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] invisible lg:visible" />
      <div className="absolute bottom-20 left-10 w-8 h-8 bg-black invisible lg:visible -rotate-12" />

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<KeuanganSkeleton />}>
          <KeuanganContent />
        </Suspense>
      </main>

    </div>
  )
}