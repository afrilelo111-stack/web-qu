'use client'

import { useState, useEffect } from 'react'
import { Plus, Trash2, CheckCircle, Circle, ClipboardList, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react'
import Navbar from '@/app/web-ku/components/nav'
import { getTodos, tambahTodoDb, toggleTodoDb, hapusTodoDb } from './actions'
import { motion, AnimatePresence } from 'framer-motion'

export default function TodoPage() {
  const [todos, setTodos] = useState([])
  const [inputBaru, setInputBaru] = useState('')
  const [loading, setLoading] = useState(true)
  const [filterAktif, setFilterAktif] = useState('semua')
  
  // 🔢 STATE UNTUK PAGINASI (PINDAH HALAMAN)
  const [halamanSekarang, setHalamanSekarang] = useState(1)
  const dataPerHalaman = 5

  // 1. Load data pertama kali dari database (Array dependensi kosong agar jalan 1x saja)
  useEffect(() => {
    async function muatData() {
      const data = await getTodos()
      setTodos(data || [])
      setLoading(false)
    }
    muatData()
  }, [])

  // Fungsi Tambah Data
  const handleTambah = async (e) => {
    e.preventDefault()
    if (!inputBaru.trim()) return

    const teksSementara = inputBaru
    setInputBaru('')

    const idSementara = Date.now().toString()
    setTodos(prev => [...prev, { id: idSementara, teks: teksSementara, selesai: false }])

    await tambahTodoDb(teksSementara)
    const dataTerbaru = await getTodos()
    setTodos(dataTerbaru || [])
  }

  // Fungsi Ubah Status Checklist
  const handleToggle = async (id, statusSelesai) => {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, selesai: !statusSelesai } : t))
    await toggleTodoDb(id, statusSelesai)
  }

  // Fungsi Hapus Data
  const handleHapus = async (id) => {
    setTodos(prev => prev.filter(t => t.id !== id))
    await hapusTodoDb(id)
  }

  // Perhitungan Data Statistik Global
  const totalTugas = todos.length
  const tugasSelesai = todos.filter((t) => t.selesai).length

  // 🔍 1. FILTER DATA TERLEBIH DAHULU
  const todosTersaring = todos.filter((todo) => {
    if (filterAktif === 'aktif') return todo.selesai === false
    if (filterAktif === 'selesai') return todo.selesai === true
    return true
  })

  // ✂️ 2. POTONG DATA HASIL FILTER UNTUK PAGINASI (MAKSIMAL 5 DATA)
  const indeksTerakhir = halamanSekarang * dataPerHalaman
  const indeksPertama = indeksTerakhir - dataPerHalaman
  const todosTerpotong = todosTersaring.slice(indeksPertama, indeksTerakhir)

  // Hitung total halaman berdasarkan data yang sudah tersaring
  const totalHalaman = Math.ceil(todosTersaring.length / dataPerHalaman) || 1

  return (
    <div className="bg-[#FFDE4D] min-h-screen font-sans text-black w-full pt-32 pb-16 relative overflow-x-hidden bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:24px_24px] selection:bg-black selection:text-[#FFDE4D]">
      
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 z-10 relative">
        
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-10 space-y-4">
          <div className="bg-[#b197fc] border-4 border-black px-4 py-1.5 uppercase font-black tracking-wider text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-1.5deg] flex items-center gap-1.5">
            <ClipboardList size={14} strokeWidth={3} />
            <span>Pusat Kendali Proyek</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight drop-shadow-[3px_3px_0px_rgba(255,255,255,1)]">
            Daftar <span className="bg-[#4D96FF] text-black px-4 border-4 border-black inline-block transform rotate-[1deg] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">Tugasku</span>
          </h1>
        </div>

        {/* FORM INPUT */}
        <form onSubmit={handleTambah} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            value={inputBaru}
            onChange={(e) => setInputBaru(e.target.value)}
            placeholder="Ketik rencana atau tugas baru hari ini..."
            className="flex-1 bg-white border-4 border-black rounded-none px-5 py-4 text-sm font-black text-black placeholder-neutral-500 focus:outline-none focus:bg-[#4D96FF]/10 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          />
          <button
            type="submit"
            className="bg-[#20c997] hover:bg-[#12b886] text-black font-black border-4 border-black px-8 py-4 uppercase tracking-wider text-sm flex items-center justify-center gap-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[6px] active:translate-y-[6px] transition-all cursor-pointer"
          >
            <Plus size={18} strokeWidth={3} />
            <span>Tambah</span>
          </button>
        </form>

        {/* PANEL STATISTIK */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#fff9db] border-4 border-black p-3.5 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center">
            <span>Total Agenda:</span>
            <span className="bg-black text-[#FFDE4D] px-2.5 py-0.5 border-2 border-black text-sm">{totalTugas}</span>
          </div>
          <div className="bg-[#6BCB77] border-4 border-black p-3.5 font-black text-xs uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center">
            <span>Berhasil Beres:</span>
            <span className="bg-black text-white px-2.5 py-0.5 border-2 border-black text-sm">{tugasSelesai}</span>
          </div>
        </div>

        {/* TAB FILTER */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
          {['semua', 'aktif', 'selesai'].map((tipeTab) => (
            <button
              key={tipeTab}
              type="button"
              onClick={() => {
                setFilterAktif(tipeTab)
                setHalamanSekarang(1) // ✨ Reset halaman langsung di sini tanpa useEffect tambahan
              }}
              className={`px-4 py-2 border-3 border-black font-black text-xs uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] ${
                filterAktif === tipeTab 
                  ? 'bg-black text-[#FFDE4D]' 
                  : 'bg-white hover:bg-neutral-100 text-black'
              }`}
            >
              {tipeTab} ({tipeTab === 'semua' ? totalTugas : tipeTab === 'aktif' ? (totalTugas - tugasSelesai) : tugasSelesai})
            </button>
          ))}
        </div>

        {/* PAPAN UTAMA LIST TODO */}
        <div className="bg-[#ff922b] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-4 sm:p-6">
          <div className="bg-white border-3 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3 min-h-[220px] flex flex-col justify-between">
            
            <div className="space-y-3 flex-1">
              {loading ? (
                <div className="flex flex-col justify-center items-center py-16 font-black uppercase text-xs gap-3">
                  <div className="w-6 h-6 border-4 border-black border-t-transparent animate-spin rounded-full" />
                  <span>Sinkronisasi Database...</span>
                </div>
              ) : todosTerpotong.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-16 text-center text-neutral-500 space-y-2">
                  <Sparkles size={32} className="text-black" />
                  <p className="font-black uppercase text-xs text-black">
                    {filterAktif === 'semua' ? 'Tidak ada rencana tertulis.' : `Kategori ${filterAktif} masih kosong.`}
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="popLayout">
                  {todosTerpotong.map((todo) => (
                    <motion.div
                      key={todo.id}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -30, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className={`flex items-center justify-between p-3.5 border-3 border-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] ${
                        todo.selesai ? 'bg-[#e7f5ff] opacity-80' : 'bg-[#fff0f6]'
                      }`}
                    >
                      <button
                        onClick={() => handleToggle(todo.id, todo.selesai)}
                        className="flex items-center gap-3 text-left flex-1 cursor-pointer font-black text-sm"
                      >
                        <span className="shrink-0 text-black">
                          {todo.selesai ? (
                            <CheckCircle size={22} className="fill-[#6BCB77] text-black" strokeWidth={3} />
                          ) : (
                            <Circle size={22} strokeWidth={3} />
                          )}
                        </span>
                        <span className={`uppercase tracking-wide ${
                          todo.selesai ? 'line-through text-neutral-500 decoration-black decoration-2' : 'text-black'
                        }`}>
                          {todo.teks}
                        </span>
                      </button>

                      <button
                        onClick={() => handleHapus(todo.id)}
                        className="bg-[#ff6b6b] hover:bg-[#fa5252] text-black p-2 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all cursor-pointer ml-2"
                      >
                        <Trash2 size={14} strokeWidth={3} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* ─── 🎛️ TOMBOL NAVIGASI HALAMAN ─── */}
            {todosTersaring.length > dataPerHalaman && (
              <div className="mt-6 pt-4 border-t-4 border-black flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setHalamanSekarang((prev) => Math.max(prev - 1, 1))}
                  disabled={halamanSekarang === 1}
                  className="bg-[#ff6b6b] disabled:opacity-40 disabled:pointer-events-none text-black font-black border-3 border-black px-3 py-2 text-xs uppercase tracking-wider flex items-center gap-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer"
                >
                  <ArrowLeft size={14} strokeWidth={3} />
                  <span>Mundur</span>
                </button>

                <div className="bg-black text-[#FFDE4D] border-3 border-black font-black px-4 py-2 text-xs tracking-widest uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                  {halamanSekarang} / {totalHalaman}
                </div>

                <button
                  type="button"
                  onClick={() => setHalamanSekarang((prev) => Math.min(prev + 1, totalHalaman))}
                  disabled={halamanSekarang === totalHalaman}
                  className="bg-[#4d96ff] disabled:opacity-40 disabled:pointer-events-none text-black font-black border-3 border-black px-3 py-2 text-xs uppercase tracking-wider flex items-center gap-1 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer"
                >
                  <span>Maju</span>
                  <ArrowRight size={14} strokeWidth={3} />
                </button>
              </div>
            )}

          </div>
        </div>

      </main>
    </div>
  )
}