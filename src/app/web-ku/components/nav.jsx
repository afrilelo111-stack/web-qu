'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion' // 👈 Ditambahkan untuk animasi transisi menu super smooth
import { logout } from '@/app/web-ku/logout/actions' 
import { 
  Wallet, 
  BookOpen, 
  CheckSquare, 
  FolderKanban, 
  LogOut,
  ChevronDown // 👈 Ditambahkan untuk tombol pemicu navbar desktop
} from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // 🔄 LOGIK DETEKSI ARAH SCROLL
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Jika scroll ke bawah lebih dari 10px, sembunyikan navbar. Jika ke atas, munculkan.
        if (window.scrollY > lastScrollY && window.scrollY > 10) {
          setIsVisible(false) 
        } else {
          setIsVisible(true)  
        }
        setLastScrollY(window.scrollY)
      }
    }

    window.addEventListener('scroll', controlNavbar)

    return () => {
      window.removeEventListener('scroll', controlNavbar)
    }
  }, [lastScrollY])

  const menuItems = [
    { name: 'Keuangan', href: '/web-ku/Keuangan', icon: Wallet },
    { name: 'To-Do', href: '/web-ku/todo', icon: CheckSquare },
    { name: 'Projek', href: '/web-ku/Projek', icon: FolderKanban },
  ]

  const currentMenu = menuItems.find(item => item.href === pathname)?.name || 'Dashboard'

  return (
    <>
      {/* ====================================================================== */}
      {/* 🏹 DESKTOP ONLY: TOMBOL PANAH PEMICU (Muncul hanya saat Nav Tersembunyi) */}
      {/* ====================================================================== */}
      <AnimatePresence>
        {!isVisible && (
          <motion.div
            initial={{ y: -50, x: '-50%', opacity: 0 }}
            animate={{ y: 0, x: '-50%', opacity: 1 }}
            exit={{ y: -50, x: '-50%', opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="hidden md:block fixed top-0 left-1/2 z-50"
          >
            <button
              onClick={() => setIsVisible(true)}
              onMouseEnter={() => setIsVisible(true)} // Langsung memunculkan nav saat kursor mendekat
              className="bg-[#FFDE4D] hover:bg-yellow-400 border-x-4 border-b-4 border-black px-6 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center gap-0.5 group rounded-b-2xl cursor-pointer transition-colors"
              title="Tampilkan Navigasi"
            >
              <span className="text-[8px] font-black uppercase tracking-widest text-black/70 group-hover:text-black">NAV</span>
              <ChevronDown size={14} strokeWidth={4} className="animate-bounce text-black" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================== */}
      {/* 💻 1. DESKTOP MODE: FLOATING TOP NAVBAR                                */}
      {/* ====================================================================== */}
      <div 
        className={`hidden md:block fixed left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-500 ease-in-out ${
          isVisible ? 'top-4 opacity-100' : '-top-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="max-w-7xl mx-auto bg-white border-4 border-black rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] px-6 py-3 flex items-center justify-between">
          
          {/* SISI KIRI: INDIKATOR HALAMAN AKTIF DINAMIS */}
          <div className="flex items-center gap-3">
            <span className="font-black text-base uppercase tracking-tight text-black">
              Web <span className="text-blue-600">CIO</span>
            </span>
            <div className="w-[2px] h-4 bg-black/20" />
            <div className="flex items-center gap-1.5 bg-neutral-100 border-2 border-black px-2.5 py-0.5 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-wider text-neutral-600">
                MENU: {currentMenu}
              </span>
            </div>
          </div>

          {/* MENU TENGAH (DENGAN SLIDING ANIMATION SMOOTH) */}
          <nav className="flex items-center gap-1 bg-neutral-100 p-1.5 rounded-full border-2 border-black relative">
            {menuItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-wider relative transition-colors duration-300 z-10 ${
                    isActive ? 'text-white' : 'text-neutral-700 hover:text-black'
                  }`}
                >
                  {/* Efek Latar Belakang Biru Meluncur (Sliding Layout) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabDesktop"
                      className="absolute inset-0 bg-blue-600 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* LOGOUT */}
          <div className="flex items-center">
            <form action={logout}>
              <button
                type="submit"
                className="flex items-center gap-2 bg-[#FF6B6B] hover:bg-[#ff5252] border-2 border-black text-white font-black text-xs uppercase tracking-wider px-4 py-2 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[3px] active:translate-y-[3px] transition-all cursor-pointer"
              >
                <LogOut size={12} strokeWidth={3} />
                <span>Keluar</span>
              </button>
            </form>
          </div>
        </div>
      </div>


      {/* ====================================================================== */}
      {/* 📱 2. MOBILE MODE: FLOATING BOTTOM NAVBAR                              */}
      {/* ====================================================================== */}
      <div 
        className={`md:hidden fixed left-0 right-0 z-50 px-4 transition-all duration-500 ease-in-out ${
          isVisible ? 'bottom-4 opacity-100' : '-bottom-24 opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] px-2 py-2.5 flex items-center justify-around max-w-md mx-auto">
          
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex flex-col items-center justify-center flex-1 relative group py-1"
              >
                <div className={`transition-all duration-300 ${isActive ? 'text-blue-600 scale-110' : 'text-neutral-400 group-hover:text-black'}`}>
                  <Icon size={20} strokeWidth={isActive ? 3 : 2.5} />
                </div>
                
                <span className={`text-[9px] font-black uppercase tracking-tight mt-1 transition-all duration-300 ${
                  isActive ? 'text-blue-600' : 'text-neutral-500'
                }`}>
                  {item.name}
                </span>

                {/* Indikator aktif di bawah dengan transisi meluncur smooth */}
                {isActive && (
                  <motion.div 
                    layoutId="activeIndicatorMobile"
                    className="absolute -bottom-1 w-5 h-1 bg-blue-600 rounded-full" 
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            )
          })}

          <div className="w-[2px] h-6 bg-black opacity-20 rounded-full mx-1" />

          <form action={logout} className="flex items-center justify-center flex-1">
            <button
              type="submit"
              className="flex flex-col items-center justify-center text-[#FF6B6B] hover:text-red-700 py-1 cursor-pointer"
            >
              <LogOut size={20} strokeWidth={3} />
              <span className="text-[9px] font-black uppercase tracking-tight mt-1">Out</span>
            </button>
          </form>

        </div>
      </div>
    </>
  )
}