import { image, link, title } from "framer-motion/client";

export const projects =[
    {
        id: 1,
        title: "Laporan Web App",
        description : "Sistem web laporan sekolah yang Anda buat memungkinkan siswa menyampaikan keluhan secara anonim terkait fasilitas rusak, perundungan, atau masalah lainnya tanpa harus mencantumkan identitas, sehingga mereka merasa aman dan nyaman dalam melapor. Setiap laporan yang masuk akan diterima oleh admin sekolah yang bertugas menanggapi, mengubah status (misalnya menjadi 'diproses' atau 'selesai'), serta memberikan solusi atau tindak lanjut. Siswa dapat memantau tanggapan admin menggunakan kode unik yang diberikan setelah pengiriman laporan, tanpa perlu login. Dengan sistem ini, sekolah diharapkan lebih responsif terhadap kendala di lingkungan belajar sekaligus menciptakan ikatan kepercayaan antara siswa dan pihak sekolah.",
        tech: ["Laravel", "MySQL"],
        image1: "/projects/LaporanAja1.png",
        image2: "/projects/LaporanAja2.png",
        link: "https://laporaja.page.gd/?i=1"
    },
    {
        id: 2,
        title: "Web Kelas App",
        description : "Sistem web kelas yang Anda buat untuk PPLG 2 berfungsi sebagai portal informasi dan pengenalan jurusan Pengembangan Perangkat Lunak dan Gim (PPLG) sekaligus media kebersamaan antar anggota kelas. Pada halaman Home, pengunjung dapat membaca penjelasan mengenai jurusan PPLG secara singkat dan jelas, serta dilengkapi dengan fitur belajar koding ringan untuk memberikan pengalaman interaktif bagi siswa yang ingin mulai memahami pemrograman. Sementara itu, pada halaman About, ditampilkan profil lengkap tentang kelas PPLG 2, termasuk dokumentasi kebersamaan kelas melalui foto-foto yang memperlihatkan momen belajar, kerja kelompok, dan kegiatan lainnya. Dengan struktur ini, web tidak hanya menjadi sarana edukasi dan promosi jurusan, tetapi juga ruang digital yang mempererat rasa memiliki dan kekompakan siswa PPLG 2.",
        tech: ["Next.js", "Supabase"],
        image1: "/projects/PPLG2_1.png",
        image2: "/projects/PPLG2_2.png",
        link: "https://pplg-gacor.vercel.app/"
    },
    {
        id: 3,
        title: "Web Chat App",
        description: "Web chat yang Anda bangun menggunakan Laravel dan MySQL dengan dukungan Laravel Reverb memungkinkan komunikasi antar pengguna secara real-time tanpa perlu me-refresh halaman. Setiap pengguna yang telah login dapat mengirim dan menerima pesan secara langsung, serta akan mendapat notifikasi instan ketika ada pengguna lain yang mengirim pesan, sehingga interaksi terasa cepat dan responsif. Sistem ini memanfaatkan WebSocket melalui Reverb untuk menghadirkan pengalaman chatting yang modern dan efisien, cocok untuk kebutuhan diskusi kelompok, tanya jawab, atau sekadar obrolan ringan antar anggota kelas atau tim.",
        tech: ["Laravel","Mysql","tailwind"],
        image1: "/projects/Chat1.png",
        image2: "/projects/Chat2.png",
        link: ""
    }
]