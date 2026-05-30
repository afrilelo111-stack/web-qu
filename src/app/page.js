'use client'

import { useActionState, useState } from 'react'
import { login } from './prosesLogin'
import { Eye, EyeOff, Lock, User, ShieldAlert, Sparkles, ArrowRight, ArrowLeft, Terminal } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function LoginPage() {
  // 🔒 Menggunakan useActionState bawaan kode awal Anda
  const [state, action, isPending] = useActionState(login, undefined)
  const [showPassword, setShowPassword] = useState(false)

  return (
    // ─── KANVAS UTAMA: Efek latar belakang pola kotak komik retro agar lebih premium ───
    <div className="flex min-h-screen bg-[#FFDE4D] text-black items-center justify-center p-4 md:p-10 relative font-sans selection:bg-black selection:text-[#FFDE4D] overflow-x-hidden bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:24px_24px]">
      
      {/* Ornamen Geometri Abstrak (Efek 3D Bayangan Tebal khas Neo-Brutalism) */}
      <div className="absolute top-12 left-12 w-20 h-20 bg-[#FF6B6B] border-4 border-black hidden md:block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-6" />
      <div className="absolute bottom-16 right-16 w-28 h-28 bg-[#4D96FF] border-4 border-black rounded-full hidden md:block shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
      <div className="absolute bottom-12 left-1/4 w-12 h-12 bg-[#20c997] border-4 border-black hidden md:block shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-45" />

      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 z-10">
        
        {/* ─── SISI KIRI: TEKS SAMBUTAN UTAMA WEB PRIBADI ─── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6 px-4"
        >
          {/* Lencana Otentikasi */}
          <div className="bg-[#b197fc] border-4 border-black px-4 py-2 uppercase font-black tracking-wider text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-1.5deg] flex items-center gap-2">
            <Terminal size={14} strokeWidth={3} />
            <span>Gerbang Utama Pemilik</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-none uppercase drop-shadow-[3px_3px_0px_rgba(255,255,255,1)]">
            Pusat Kendali <br />
            Situs <span className="bg-[#4D96FF] text-black px-4 border-4 border-black inline-block transform rotate-[1.5deg] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">Pribadiku</span>
          </h1>
          
          <p className="text-black text-sm font-bold max-w-sm leading-relaxed bg-[#fff9db] border-3 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            Pintu masuk khusus untuk verifikasi pemilik sistem. Akses penuh untuk mengelola portofolio, memantau modul data keuangan, dan mengontrol seluruh ekosistem web utama.
          </p>
        </motion.div>

        {/* ─── SISI KANAN: KOTAK LOGIN DENGAN LAPISAN GANDA ─── */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
          className="w-full md:w-[460px] bg-[#20c997] border-4 border-black p-1.5 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
        >
          {/* Lapisan Kartu Bagian Dalam (Kuning Mentega Retro) */}
          <div className="bg-[#fff9db] border-4 border-black p-8 md:p-10 relative">
            
            {/* Label Status Keamanan */}
            <div className="flex justify-center md:justify-start mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 border-2 border-black bg-black text-[#FFDE4D] text-xs font-black tracking-wider uppercase shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
                <Sparkles size={12} />
                <span>Khusus Administrator</span>
              </div>
            </div>

            {/* ERROR STATE ALERT */}
            {state?.error && (
              <div className="mb-6 flex items-start gap-3 bg-[#FF6B6B] border-4 border-black text-black p-4 text-xs font-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <ShieldAlert size={18} className="shrink-0 mt-0.5" />
                <p className="leading-relaxed uppercase">{state.error}</p>
              </div>
            )}

            {/* FORM AKSES LOGIN */}
            <form action={action} className="space-y-6">
              
              {/* INPUT USERNAME / EMAIL */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-xs font-black uppercase tracking-wider text-black">
                  Identitas Pengelola
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black z-10">
                    <User size={18} strokeWidth={3} />
                  </span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="admin@domainkamu.id"
                    className="w-full bg-white border-4 border-black rounded-none pl-12 pr-4 py-3.5 text-sm font-black text-black placeholder-neutral-500 focus:outline-none focus:bg-[#4D96FF]/20 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px]"
                  />
                </div>
              </div>

              {/* INPUT PASSWORD */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="text-xs font-black uppercase tracking-wider text-black">
                    Kunci Akses Keamanan
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-xs font-black uppercase underline decoration-2 hover:text-[#FF6B6B] transition-colors"
                  >
                    Bypass?
                  </Link>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black z-10">
                    <Lock size={18} strokeWidth={3} />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    className="w-full bg-white border-4 border-black rounded-none pl-12 pr-12 py-3.5 text-sm font-black text-black placeholder-neutral-500 focus:outline-none focus:bg-[#4D96FF]/20 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:translate-x-[2px] focus:translate-y-[2px]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-neutral-700 focus:outline-none z-10"
                  >
                    {showPassword ? <EyeOff size={18} strokeWidth={2.5} /> : <Eye size={18} strokeWidth={2.5} />}
                  </button>
                </div>
              </div>

              {/* TOMBOL SUBMIT */}
              <button
                type="submit"
                disabled={isPending}
                className="w-full relative mt-4 bg-[#4D96FF] hover:bg-[#ff922b] text-black py-4 px-4 border-4 border-black rounded-none font-black text-sm uppercase tracking-wider shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2">
                  {isPending ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>MEMERIKSA AKSES...</span>
                    </>
                  ) : (
                    <>
                      <span>Inisialisasi Masuk</span>
                      <ArrowRight size={16} strokeWidth={3} />
                    </>
                  )}
                </div>
              </button>
              
            </form>

            {/* ─── TOMBOL KEMBALI & FOOTER UTILITY ─── */}
            <div className="mt-8 pt-5 border-t-4 border-black flex flex-col items-center gap-4 text-center">
              <Link 
                href="/" 
                className="inline-flex items-center gap-1.5 text-xs font-black uppercase underline decoration-2 hover:text-[#FF6B6B] transition-colors group"
              >
                <ArrowLeft size={14} strokeWidth={3} className="group-hover:-translate-x-0.5 transition-transform" />
                <span>Kembali ke Beranda Utama</span>
              </Link>

              <p className="text-[9px] font-black uppercase tracking-widest text-neutral-600">
                Sistem Pusat Kontrol Utama — Hak Cipta Dilindungi
              </p>
            </div>

          </div>
        </motion.div>
        
      </div>
    </div>
  )
}