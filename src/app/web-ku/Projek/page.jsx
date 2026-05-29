'use client'

import { useState, useEffect, Suspense } from 'react'
import Navbar from '@/app/web-ku/components/nav'
import { FolderKanban, ExternalLink, Code2, Image as ImageIcon, X, ArrowUpRight } from 'lucide-react'
import { projects } from '../data/projects'

/**
 * 📸 KOMPONEN SLIDER GAMBAR OTOMATIS
 */
function ProjectImageSlider({ image1, image2, title }) {
  const availableImages = [image1, image2].filter(img => img && img.trim() !== "")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fade, setFade] = useState(true)

  useEffect(() => {
    if (availableImages.length <= 1) return

    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % availableImages.length)
        setFade(true)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [availableImages.length])

  if (availableImages.length === 0) {
    return (
      <div className="flex flex-col items-center text-black/40 select-none">
        <ImageIcon size={24} />
        <span className="text-[8px] font-black uppercase tracking-wider mt-1">No Preview</span>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src={availableImages[currentIndex]} 
        alt={title} 
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          fade ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {availableImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 bg-black px-2 py-1 border border-black rounded-none">
          {availableImages.map((_, idx) => (
            <div 
              key={idx} 
              className={`h-1.5 border border-black transition-all rounded-none ${
                idx === currentIndex ? 'w-3 bg-[#FFDE4D]' : 'w-1.5 bg-white'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * 📦 SKELETON LOADING
 */
function ProjekSkeleton() {
  return (
    <div className="animate-pulse space-y-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="w-full bg-neutral-200 border-4 border-black h-80 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" />
        ))}
      </div>
    </div>
  )
}

/**
 * 🗃️ KONTEN UTAMA PROJEK
 */
function ProjekContent() {
  const [activeProject, setActiveProject] = useState(null)

  const cardColors = [
    'bg-[#2ecc71]', // Hijau Pop
    'bg-[#3498db]', // Biru Pop
    'bg-[#e67e22]', // Oranye Pop
    'bg-[#9b59b6]'  // Ungu Pop
  ]

  return (
    <div className="relative z-10 space-y-8">
      
      {/* HEADER INFO */}
      <div className="bg-white border-4 border-black p-5 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black uppercase tracking-tight">Koleksi Proyek Pengembangan</h2>
          <p className="text-[10px] font-bold text-neutral-700 uppercase tracking-wider">
            Berhasil Memuat {projects.length} Aplikasi Kreatif
          </p>
        </div>
        <div className="bg-black border-2 border-black px-3 py-1 text-[#FFDE4D] font-black text-xs uppercase shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
          💼 PRODUCTION READY
        </div>
      </div>

      {/* GRID KARTU PROJEK */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((projek, index) => {
          const dynamicBg = cardColors[index % cardColors.length]

          return (
            <div 
              key={projek.id} 
              className={`${dynamicBg} border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-5 flex flex-col justify-between min-h-[350px] transition-transform hover:-translate-y-1`}
            >
              <div>
                {/* GAMBAR MINI PREVIEW */}
                <div className="w-full h-36 border-4 border-black bg-white mb-4 overflow-hidden relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                  <ProjectImageSlider 
                    image1={projek.image1} 
                    image2={projek.image2} 
                    title={projek.title} 
                  />
                </div>

                {/* JUDUL */}
                <h3 className="text-lg font-black uppercase tracking-tight text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] line-clamp-1 mb-1">
                  {projek.title}
                </h3>

                {/* POTONGAN DESKRIPSI */}
                <p className="text-[11px] font-bold text-black border-2 border-black bg-[#fff9db] p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] line-clamp-3 mb-4 uppercase leading-snug">
                  {projek.description}
                </p>
              </div>

              {/* BAGIAN BAWAH KARTU */}
              <div>
                <div className="flex flex-wrap gap-1 mb-4">
                  {projek.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className="bg-black text-white border border-black px-2 py-0.5 text-[8px] font-black uppercase tracking-wider">
                      {tech}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => setActiveProject(projek)}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-[#FFDE4D] text-black border-3 border-black font-black text-xs uppercase tracking-wider py-2.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer"
                >
                  <span>Lihat Detail</span>
                  <ArrowUpRight size={14} strokeWidth={4} />
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* ====================================================================== */}
      {/* 🔮 INTERAKTIF POP-UP MODAL */}
      {/* ====================================================================== */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#ff7675] border-4 border-black w-full max-w-2xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col relative animate-[scaleUp_0.2s_ease-out]">
            
            {/* Header Pop-up */}
            <div className="bg-black text-white p-4 flex items-center justify-between border-b-4 border-black">
              <div className="flex items-center gap-2">
                <FolderKanban size={18} className="text-[#FFDE4D]" />
                <h3 className="font-black text-sm uppercase tracking-wider">Detail Informasi Projek</h3>
              </div>
              <button 
                onClick={() => setActiveProject(null)}
                className="p-1 bg-[#ff7675] border-2 border-black text-black hover:bg-white transition-colors rounded-none shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              >
                <X size={16} strokeWidth={4} />
              </button>
            </div>

            {/* Konten Isi Pop-up */}
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Gambar Besar */}
              <div className="w-full h-48 sm:h-60 border-4 border-black bg-white overflow-hidden relative shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center">
                <ProjectImageSlider 
                  image1={activeProject.image1} 
                  image2={activeProject.image2} 
                  title={activeProject.title} 
                />
              </div>

              {/* Judul & Tech Stack */}
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight text-white drop-shadow-[2.5px_2.5px_0px_rgba(0,0,0,1)] mb-2">
                  {activeProject.title}
                </h4>
                <div className="flex flex-wrap gap-1.5 items-center">
                  <Code2 size={14} className="text-black" />
                  {activeProject.tech.map((t) => (
                    <span key={t} className="bg-[#FFDE4D] text-black border-2 border-black px-2 py-0.5 text-[9px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {/* 🔥 PERBAIKAN: Di sini sekarang sudah murni {t} */}
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="border-t-2 border-black border-dashed" />

              {/* Deskripsi Penuh */}
              <div>
                <h5 className="text-xs font-black uppercase text-black mb-1">Deskripsi Sistem:</h5>
                <p className="text-xs font-bold text-black leading-relaxed uppercase bg-white p-4 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-pre-line">
                  {activeProject.description}
                </p>
              </div>
            </div>

            {/* Footer Aksi */}
            <div className="p-4 bg-black border-t-4 border-black flex gap-3">
              <button 
                onClick={() => setActiveProject(null)}
                className="flex-1 bg-white hover:bg-neutral-200 border-2 border-black text-black font-black text-xs uppercase py-2.5 transition-all cursor-pointer text-center"
              >
                Kembali
              </button>

              {activeProject.link ? (
                <a 
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#FFDE4D] hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider py-2.5 border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all cursor-pointer text-center"
                >
                  <span>Kunjungi Situs</span>
                  <ExternalLink size={12} strokeWidth={4} />
                </a>
              ) : (
                <div className="flex-1 text-center bg-neutral-800 border-2 border-dashed border-neutral-600 text-neutral-400 font-black text-xs uppercase py-2.5 cursor-not-allowed select-none">
                  Tautan Kosong
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

/**
 * 🏠 HALAMAN UTAMA LAYOUT INDUK
 */
export default function ProjekPage() {
  return (
    <div className="bg-[#FFDE4D] min-h-screen font-sans text-black w-full pt-24 md:pt-32 pb-28 md:pb-16 relative overflow-x-hidden selection:bg-black selection:text-[#FFDE4D]">
      
      {/* DEKORASI */}
      <div className="absolute top-28 right-6 w-12 h-12 bg-[#FF6B6B] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] invisible sm:visible -rotate-12" />
      <div className="absolute bottom-10 left-8 w-20 h-20 bg-[#4D96FF] border-4 border-black rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] invisible lg:visible" />

      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<ProjekSkeleton />}>
          <ProjekContent />
        </Suspense>
      </main>

    </div>
  )
}