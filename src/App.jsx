import { useState, useEffect } from 'react'
import {
  Printer,
  Tag,
  FileText,
  CreditCard,
  Package,
  Gift,
  Phone,
  Mail,
  MapPin,
  Check,
  MessageSquare,
  Edit,
  ChevronRight,
  ChevronLeft,
  Star,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Award,
  ThumbsUp,
  Clock,
  Send,
  Loader2,
  ShoppingBag,
  ShoppingCart,
  Truck,
  Shield,
  Users,
  User,
  Settings,
  Percent,
  Heart,
  Zap,
  Briefcase,
  Image,
  Cpu,
  Globe,
  Smile,
  Volume2,
  Layout,
  Layers,
  Scissors,
  MousePointer,
  BookOpen,
  Coffee,
  Calendar,
  Camera
} from 'lucide-react'

// Smart, self-detecting API Base URL for zero-configuration local and production hosting
const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL
  }
  const hostname = window.location.hostname
  const port = window.location.port

  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    if (port === '8000') {
      return window.location.origin
    }
    return 'http://127.0.0.1:8000'
  }
  // In production, automatically fallback to the appropriate 'api' subdomain
  const protocol = window.location.protocol
  
  if (/^[0-9.]+$/.test(hostname)) {
    return window.location.origin
  }

  // 1. Special handling for the main domain (fourplusone.my.id)
  if (hostname.endsWith('fourplusone.my.id')) {
    if (hostname === 'fourplusone.my.id') {
      return `${protocol}//apilandingpage.fourplusone.my.id`
    }
    const parts = hostname.split('.')
    // E.g. landingpage.fourplusone.my.id -> apilandingpage.fourplusone.my.id
    if (parts[0] !== 'api' && !parts[0].startsWith('api')) {
      return `${protocol}//api${parts[0]}.fourplusone.my.id`
    }
    return window.location.origin
  }

  // 2. Generic handling for other custom client domains
  let cleanHostname = hostname
  const rawParts = hostname.split('.')
  if (rawParts.length >= 2 && rawParts[0] === 'www') {
    cleanHostname = rawParts.slice(1).join('.')
  }

  if (cleanHostname.startsWith('api.')) {
    return window.location.origin
  }

  return `${protocol}//api.${cleanHostname}`
}

const API_BASE_URL = getApiBaseUrl()

// Icon mapping helper to render dynamic Lucide icons from database string
const renderIcon = (iconName, className = "w-6 h-6") => {
  const icons = {
    'printer': <Printer className={className} />,
    'tag': <Tag className={className} />,
    'file-text': <FileText className={className} />,
    'credit-card': <CreditCard className={className} />,
    'package': <Package className={className} />,
    'gift': <Gift className={className} />,
    'message-square': <MessageSquare className={className} />,
    'edit': <Edit className={className} />,
    'check': <Check className={className} />,
    'shopping-bag': <ShoppingBag className={className} />,
    'shopping-cart': <ShoppingCart className={className} />,
    'truck': <Truck className={className} />,
    'clock': <Clock className={className} />,
    'award': <Award className={className} />,
    'thumbs-up': <ThumbsUp className={className} />,
    'shield': <Shield className={className} />,
    'users': <Users className={className} />,
    'star': <Star className={className} />,
    'phone': <Phone className={className} />,
    'mail': <Mail className={className} />,
    'map-pin': <MapPin className={className} />,
    'settings': <Settings className={className} />,
    'percent': <Percent className={className} />,
    'heart': <Heart className={className} />,
    'sparkles': <Sparkles className={className} />,
    'zap': <Zap className={className} />,
    'briefcase': <Briefcase className={className} />,
    'image': <Image className={className} />,
    'cpu': <Cpu className={className} />,
    'globe': <Globe className={className} />,
    'smile': <Smile className={className} />,
    'volume-2': <Volume2 className={className} />,
    'layout': <Layout className={className} />,
    'layers': <Layers className={className} />,
    'scissors': <Scissors className={className} />,
    'mouse-pointer': <MousePointer className={className} />,
    'book-open': <BookOpen className={className} />,
    'coffee': <Coffee className={className} />,
    'calendar': <Calendar className={className} />,
    'camera': <Camera className={className} />,
  }
  return icons[iconName] || <Printer className={className} />
}

// Translations dictionary for premium multilingual experience
const translations = {
  id: {
    // Nav & General
    home: "Home",
    about: "Tentang Kami",
    services: "Layanan",
    benefits: "Keunggulan",
    portfolio: "Portofolio",
    timeline: "Cara Pesan",
    work_steps: "Cara Kerja",
    testimonials: "Testimoni",
    news: "Berita",
    activities: "Aktifitas",
    contact: "Kontak",
    contact_us: "Hubungi Kami",
    contact_wa: "Hubungi via WhatsApp",
    back_to_home: "Kembali ke Home",
    back_to_home_main: "Kembali ke Beranda",
    back_to_list: "Kembali ke Daftar",
    
    // Headers & Subtitles / Fallbacks
    services_badge: "Layanan Kami",
    services_title: "Solusi Percetakan Cetak Custom Lengkap",
    services_subtitle: "Kami siap mencetak berbagai produk kebutuhan branding, promosi, dan bisnis Anda dengan mesin berteknologi canggih.",
    order_now: "Pesan Sekarang",
    
    no_premium_services: "Belum ada layanan premium yang tersedia saat ini.",
    no_work_steps: "Belum ada langkah cara kerja yang ditambahkan saat ini.",
    about_badge: "Tentang Kami",
    no_about_content: "Belum ada konten Tentang Kami saat ini.",
    benefits_badge: "Keunggulan",
    portfolio_badge: "Portofolio",
    portfolio_title: "Hasil Cetakan Terbaik Kami",
    portfolio_subtitle: "Berikut adalah beberapa galeri foto produk cetakan yang telah diselesaikan untuk klien-klien kami yang puas.",
    portfolio_updating_title: "Portofolio Sedang Diperbarui",
    portfolio_updating_desc: "Kami sedang memperbarui galeri cetakan digital terbaru kami. Hubungi admin kami untuk melihat katalog foto sampel cetakan stiker, brosur, atau banner lengkap!",
    request_sample: "Minta Katalog Sampel",
    
    timeline_badge: "Proses Kerja",
    timeline_title: "Cara Pemesanan Sangat Mudah",
    timeline_subtitle: "Cukup selesaikan 4 langkah mudah berikut untuk mewujudkan ide Anda dalam hasil cetak siap pakai.",
    contact_wa_btn: "Hubungi WhatsApp",
    
    testimonials_badge: "Testimoni",
    testimonials_title: "Apa Kata Pelanggan Setia Kami",
    testimonials_subtitle: "Kelegaan dan kepuasan pelanggan adalah komitmen utama kami. Simak penilaian langsung mereka.",
    
    ready_to_print_title: "Siap Mencetak Ide Anda?",
    ready_to_print_subtitle: "Yuk, mulai konsultasi gratis dengan tim ahli kami untuk mendapatkan hasil terbaik untuk bisnismu!",
    view_services: "Lihat Layanan",
    
    news_badge: "Kabar Terbaru",
    news_title: "Berita & Informasi Terkini",
    news_subtitle: "Ikuti perkembangan terbaru mengenai layanan, promo, dan tips seputar percetakan digital kami.",
    view_all_news: "Lihat Semua Berita",
    read_more: "Baca Selengkapnya",
    no_news: "Belum ada berita yang diterbitkan saat ini.",
    
    activities_badge: "Kegiatan Kami",
    activities_title: "Aktifitas & Dokumentasi",
    activities_subtitle: "Dokumentasi portofolio kerja, kesibukan tim cetak, serta event penting yang kami hadiri.",
    view_all_activities: "Lihat Semua Aktifitas",
    view_details: "Lihat Detail",
    no_activities: "Belum ada aktifitas yang didokumentasikan saat ini.",
    
    contact_title: "Kirimkan Pesan atau Konsultasi Gratis",
    contact_subtitle: "Punya pertanyaan mengenai bahan, ukuran cetakan, atau ingin mendiskusikan pesanan khusus (custom)? Isi formulir, tim ahli kami akan segera menghubungi Anda.",
    address: "Alamat",
    our_email: "Email Kami",
    wa_admin: "WhatsApp Admin",
    online_realtime: "Online & Realtime",
    full_name: "Nama Lengkap",
    enter_full_name: "Masukkan nama lengkap Anda",
    wa_phone_number: "Nomor WhatsApp / Telepon",
    example_phone: "Contoh: 08123456789",
    your_message: "Pesan Anda",
    message_placeholder: "Tuliskan spesifikasi produk cetakan yang ingin ditanyakan (ukuran, jumlah, bahan) atau pesan lainnya...",
    sending: "Mengirim...",
    send_message_now: "Kirim Pesan Sekarang",
    
    news_articles_title: "Kumpulan Berita & Artikel",
    news_articles_subtitle: "Temukan informasi, artikel edukatif, dan tips-tips bermanfaat seputar digital printing.",
    search_news: "Cari berita...",
    no_news_match: "Tidak ada berita yang cocok dengan pencarian Anda.",
    
    doc_activities_title: "Dokumentasi & Kegiatan Kami",
    doc_activities_subtitle: "Simak berbagai aktifitas produksi cetak kami, proses pengerjaan pesanan, serta event internal/eksternal.",
    search_activities: "Cari aktifitas...",
    no_activities_match: "Tidak ada dokumentasi kegiatan yang cocok dengan pencarian Anda.",
    content_not_found: "Konten tidak ditemukan atau gagal dimuat.",
    
    ask_admin_wa: "Tanya Admin via WA",
    instant_wa: "Pesan Instant via WhatsApp",
    navigation: "Navigasi",
    printing_services: "Layanan Cetak",
    our_advantages: "Keunggulan Kami",
    Semua: "Semua",
    
    // Statistics & Fallback Items translations (optional but good to have)
    clients_satisfied: "Klien Puas",
    products_delivered: "Produk Terkirim",
    experience: "Pengalaman",
    years: "Tahun",
    client_rating: "Rating Klien",
    
    hero_badge: "Percetakan Digital",
    hero_title: "Wujudkan Ide Anda Dalam Cetakan",
    hero_subtitle: "Temukan solusi percetakan digital berkualitas terbaik untuk spanduk, brosur, stiker, dan kemasan Anda.",
    why_choose_title: "Mengapa Memilih Kami?",
    why_choose_subtitle: "Prioritas utama kami adalah memberikan hasil cetak dengan kualitas premium, pengerjaan cepat, dan pelayanan terbaik untuk Anda.",
    why_choose_feat1: "Kualitas cetak tajam & presisi",
    why_choose_feat2: "Tim desainer profesional",
    why_choose_feat3: "Pengerjaan cepat & tepat waktu",
    why_choose_feat4: "Harga terjangkau & kompetitif",
    
    order_step_1_title: "Konsultasi",
    order_step_1_desc: "Hubungi kami via WhatsApp untuk konsultasi bahan, ukuran, dan jumlah cetak.",
    order_step_2_title: "Desain",
    order_step_2_desc: "Kirim file desain Anda atau gunakan jasa tim desainer kami untuk hasil maksimal.",
    order_step_3_title: "Cetak",
    order_step_3_desc: "Proses cetak cepat menggunakan mesin digital printing berteknologi modern.",
    order_step_4_title: "Selesai",
    order_step_4_desc: "Hasil cetakan siap diambil atau dikirim langsung ke alamat Anda dengan aman.",
    connecting_to_db: "Menghubungkan ke database...",
    failed_send_lead: "Gagal mengirim pesan. Silakan coba beberapa saat lagi.",
    success_send_lead: "Pesan Anda berhasil terkirim!",
    all_fields_required: "Semua kolom wajib diisi."
  },
  en: {
    // Nav & General
    home: "Home",
    about: "About Us",
    services: "Services",
    benefits: "Advantages",
    portfolio: "Portfolio",
    timeline: "How to Order",
    work_steps: "How it Works",
    testimonials: "Testimonials",
    news: "News",
    activities: "Activities",
    contact: "Contact",
    contact_us: "Contact Us",
    contact_wa: "Contact via WhatsApp",
    back_to_home: "Back to Home",
    back_to_home_main: "Back to Home",
    back_to_list: "Back to List",
    
    // Headers & Subtitles / Fallbacks
    services_badge: "Our Services",
    services_title: "Complete Custom Printing Solutions",
    services_subtitle: "We are ready to print various products for your branding, promotional, and business needs with state-of-the-art machinery.",
    order_now: "Order Now",
    
    no_premium_services: "No premium services available at this time.",
    no_work_steps: "No work steps added at this time.",
    about_badge: "About Us",
    no_about_content: "No About Us content available at this time.",
    benefits_badge: "Advantages",
    portfolio_badge: "Portfolio",
    portfolio_title: "Our Best Printed Products",
    portfolio_subtitle: "Here are some galleries of printed products completed for our satisfied clients.",
    portfolio_updating_title: "Portfolio is Being Updated",
    portfolio_updating_desc: "We are updating our latest digital print gallery. Contact our admin to see the full catalog of stickers, brochures, or banners!",
    request_sample: "Request Sample Catalog",
    
    timeline_badge: "Work Process",
    timeline_title: "Very Easy Ordering Process",
    timeline_subtitle: "Simply complete the following 4 easy steps to bring your ideas to life in ready-to-use print.",
    contact_wa_btn: "Contact WhatsApp",
    
    testimonials_badge: "Testimonials",
    testimonials_title: "What Our Loyal Customers Say",
    testimonials_subtitle: "Customer satisfaction is our main commitment. Hear directly from them.",
    
    ready_to_print_title: "Ready to Print Your Ideas?",
    ready_to_print_subtitle: "Let's start a free consultation with our expert team to get the best results for your business!",
    view_services: "View Services",
    
    news_badge: "Latest News",
    news_title: "Latest News & Information",
    news_subtitle: "Follow the latest developments about services, promos, and tips about our digital printing.",
    view_all_news: "View All News",
    read_more: "Read More",
    no_news: "No news published at this time.",
    
    activities_badge: "Our Activities",
    activities_title: "Activities & Documentation",
    activities_subtitle: "Documentation of work portfolio, printing team operations, and important events we attend.",
    view_all_activities: "View All Activities",
    view_details: "View Details",
    no_activities: "No activities documented at this time.",
    
    contact_title: "Send a Message or Free Consultation",
    contact_subtitle: "Have questions about materials, print sizes, or want to discuss a custom order? Fill out the form, our expert team will contact you shortly.",
    address: "Address",
    our_email: "Our Email",
    wa_admin: "WhatsApp Admin",
    online_realtime: "Online & Realtime",
    full_name: "Full Name",
    enter_full_name: "Enter your full name",
    wa_phone_number: "WhatsApp / Phone Number",
    example_phone: "Example: 08123456789",
    your_message: "Your Message",
    message_placeholder: "Write down print specifications (size, quantity, material) or other questions...",
    sending: "Sending...",
    send_message_now: "Send Message Now",
    
    news_articles_title: "News & Articles Collection",
    news_articles_subtitle: "Find information, educational articles, and useful tips about digital printing.",
    search_news: "Search news...",
    no_news_match: "No news matches your search.",
    
    doc_activities_title: "Our Documentation & Activities",
    doc_activities_subtitle: "Follow our printing production activities, order processes, and internal/external events.",
    search_activities: "Search activities...",
    no_activities_match: "No activity documentation matches your search.",
    content_not_found: "Content not found or failed to load.",
    
    ask_admin_wa: "Ask Admin via WA",
    instant_wa: "Instant Order via WhatsApp",
    navigation: "Navigation",
    printing_services: "Printing Services",
    our_advantages: "Our Advantages",
    Semua: "All",
    
    // Statistics & Fallback Items translations (optional but good to have)
    clients_satisfied: "Satisfied Clients",
    products_delivered: "Products Delivered",
    experience: "Experience",
    years: "Years",
    client_rating: "Client Rating",
    
    hero_badge: "Digital Printing",
    hero_title: "Bring Your Ideas to Life in Print",
    hero_subtitle: "Find the best quality digital printing solutions for your banners, brochures, stickers, and packaging.",
    why_choose_title: "Why Choose Us?",
    why_choose_subtitle: "Our main priority is to deliver premium quality print, fast turnaround, and the best service for you.",
    why_choose_feat1: "Sharp & precise print quality",
    why_choose_feat2: "Professional designer team",
    why_choose_feat3: "Fast & on-time delivery",
    why_choose_feat4: "Affordable & competitive pricing",
    
    order_step_1_title: "Consultation",
    order_step_1_desc: "Contact us via WhatsApp for consultation on materials, size, and print quantity.",
    order_step_2_title: "Design",
    order_step_2_desc: "Send your design file or use our designer team services for best results.",
    order_step_3_title: "Print",
    order_step_3_desc: "Fast printing process using digital printing machinery with modern technology.",
    order_step_4_title: "Done",
    order_step_4_desc: "Printed results are ready to be picked up or shipped directly to your address safely.",
    connecting_to_db: "Connecting to database...",
    failed_send_lead: "Failed to send message. Please try again later.",
    success_send_lead: "Your message has been successfully sent!",
    all_fields_required: "All fields are required."
  }
};

const translateText = (text, lang) => {
  if (lang !== 'en') return text;
  if (!text || typeof text !== 'string') return text;
  
  const textMap = {
    'Home': 'Home',
    'Layanan': 'Services',
    'Keunggulan': 'Advantages',
    'Portofolio': 'Portfolio',
    'Cara Pesan': 'How to Order',
    'Cara Kerja': 'How it Works',
    'Testimoni': 'Testimonials',
    'Berita': 'News',
    'Aktifitas': 'Activities',
    'Kontak': 'Contact',
    'Hubungi Kami': 'Contact Us',
    'Hubungi via WhatsApp': 'Contact via WhatsApp',
    
    'Layanan Kami': 'Our Services',
    'Solusi Percetakan Cetak Custom Lengkap': 'Complete Custom Printing Solutions',
    'Kami siap mencetak berbagai produk kebutuhan branding, promosi, dan bisnis Anda dengan mesin berteknologi canggih.': 'We are ready to print various products for your branding, promotional, and business needs with state-of-the-art machinery.',
    'Pesan Sekarang': 'Order Now',
    
    'Belum ada layanan premium yang tersedia saat ini.': 'No premium services available at this time.',
    'Belum ada langkah cara kerja yang ditambahkan saat ini.': 'No work steps added at this time.',
    'Tentang Kami': 'About Us',
    'Belum ada konten Tentang Kami saat ini.': 'No About Us content available at this time.',
    'Hasil Cetakan Terbaik Kami': 'Our Best Printed Products',
    'Berikut adalah beberapa galeri foto produk cetakan yang telah diselesaikan untuk klien-klien kami yang puas.': 'Here are some galleries of printed products completed for our satisfied clients.',
    'Portofolio Sedang Diperbarui': 'Portfolio is Being Updated',
    'Kami sedang memperbarui galeri cetakan digital terbaru kami. Hubungi admin kami untuk melihat katalog foto sampel cetakan stiker, brosur, atau banner lengkap!': 'We are updating our latest digital print gallery. Contact our admin to see the full catalog of stickers, brochures, or banners!',
    'Minta Katalog Sampel': 'Request Sample Catalog',
    
    'Proses Kerja': 'Work Process',
    'Cara Pemesanan Sangat Mudah': 'Very Easy Ordering Process',
    'Cukup selesaikan 4 langkah mudah berikut untuk mewujudkan ide Anda dalam hasil cetak siap pakai.': 'Simply complete the following 4 easy steps to bring your ideas to life in ready-to-use print.',
    'Hubungi WhatsApp': 'Contact WhatsApp',
    
    'Apa Kata Pelanggan Setia Kami': 'What Our Loyal Customers Say',
    'Kelegaan dan kepuasan pelanggan adalah komitmen utama kami. Simak penilaian langsung mereka.': 'Customer satisfaction is our main commitment. Hear directly from them.',
    
    'Siap Mencetak Ide Anda?': 'Ready to Print Your Ideas?',
    'Yuk, mulai konsultasi gratis dengan tim ahli kami untuk mendapatkan hasil terbaik untuk bisnismu!': 'Let\'s start a free consultation with our expert team to get the best results for your business!',
    'Lihat Layanan': 'View Services',
    
    'Kabar Terbaru': 'Latest News',
    'Berita & Informasi Terkini': 'Latest News & Information',
    'Ikuti perkembangan terbaru mengenai layanan, promo, dan tips seputar percetakan digital kami.': 'Follow the latest developments about services, promos, and tips about our digital printing.',
    'Lihat Semua Berita': 'View All News',
    'Baca Selengkapnya': 'Read More',
    'Belum ada berita yang diterbitkan saat ini.': 'No news published at this time.',
    
    'Kegiatan Kami': 'Our Activities',
    'Aktifitas & Dokumentasi': 'Activities & Documentation',
    'Dokumentasi portofolio kerja, kesibukan tim cetak, serta event penting yang kami hadiri.': 'Documentation of work portfolio, printing team operations, and important events we attend.',
    'Lihat Semua Aktifitas': 'View All Activities',
    'Lihat Detail': 'View Details',
    'Belum ada aktifitas yang didokumentasikan saat ini.': 'No activities documented at this time.',
    
    'Kirimkan Pesan atau Konsultasi Gratis': 'Send a Message or Free Consultation',
    'Punya pertanyaan mengenai bahan, ukuran cetakan, atau ingin mendiskusikan pesanan khusus (custom)? Isi formulir, tim ahli kami akan segera menghubungi Anda.': 'Have questions about materials, print sizes, or want to discuss a custom order? Fill out the form, our expert team will contact you shortly.',
    'Alamat': 'Address',
    'Email Kami': 'Our Email',
    'WhatsApp Admin': 'WhatsApp Admin',
    'Online & Realtime': 'Online & Realtime',
    'Nama Lengkap': 'Full Name',
    'Masukkan nama lengkap Anda': 'Enter your full name',
    'Nomor WhatsApp / Telepon': 'WhatsApp / Phone Number',
    'Contoh: 08123456789': 'Example: 08123456789',
    'Pesan Anda': 'Your Message',
    'Tuliskan spesifikasi produk cetakan yang ingin ditanyakan (ukuran, jumlah, bahan) atau pesan lainnya...': 'Write down print specifications (size, quantity, material) or other questions...',
    'Mengirim...': 'Sending...',
    'Kirim Pesan Sekarang': 'Send Message Now',
    
    'Kembali ke Home': 'Back to Home',
    'Kumpulan Berita & Artikel': 'News & Articles Collection',
    'Temukan informasi, artikel edukatif, dan tips-tips bermanfaat seputar digital printing.': 'Find information, educational articles, and useful tips about digital printing.',
    'Cari berita...': 'Search news...',
    'Tidak ada berita yang cocok dengan pencarian Anda.': 'No news matches your search.',
    
    'Dokumentasi & Kegiatan Kami': 'Our Documentation & Activities',
    'Simak berbagai aktifitas produksi cetak kami, proses pengerjaan pesanan, serta event internal/eksternal.': 'Follow our printing production activities, order processes, and internal/external events.',
    'Cari aktifitas...': 'Search activities...',
    'Tidak ada dokumentasi kegiatan yang cocok dengan pencarian Anda.': 'No activity documentation matches your search.',
    'Konten tidak ditemukan atau gagal dimuat.': 'Content not found or failed to load.',
    'Kembali ke Beranda': 'Back to Home',
    'Kembali ke Daftar': 'Back to List',
    'Tanya Admin via WA': 'Ask Admin via WA',
    'Tanya via WA': 'Ask via WA',
    'Hubungi Kami': 'Contact Us',
    'Lokasi Cabang': 'Our Branch Locations',
    'Temukan Cabang Terdekat Kami': 'Find Our Nearest Branch',
    'Kunjungi gerai fisik kami untuk berkonsultasi langsung atau mengambil pesanan Anda.': 'Visit our physical stores to consult directly or pick up your orders.',
    'Lihat di Peta': 'View on Map',
    'Aktif': 'Active',
    'Cabang': 'Branches',
    'Pesan Instant via WhatsApp': 'Instant Order via WhatsApp',
    'Navigasi': 'Navigation',
    'Layanan Cetak': 'Printing Services',
    'Keunggulan Kami': 'Our Advantages',
    'Semua': 'All',
    
    'Klien Puas': 'Satisfied Clients',
    'Produk Terkirim': 'Products Delivered',
    'Pengalaman': 'Experience',
    '5 Tahun': '5 Years',
    'Tahun': 'Years',
    'Rating Klien': 'Client Rating',
    
    'Percetakan Digital': 'Digital Printing',
    'Wujudkan Ide Anda Dalam Cetakan': 'Bring Your Ideas to Life in Print',
    'Temukan solusi percetakan digital berkualitas terbaik untuk spanduk, brosur, stiker, dan kemasan Anda.': 'Find the best quality digital printing solutions for your banners, brochures, stickers, and packaging.',
    'Mengapa Memilih Kami?': 'Why Choose Us?',
    'Prioritas utama kami adalah memberikan hasil cetak dengan kualitas premium, pengerjaan cepat, dan pelayanan terbaik untuk Anda.': 'Our main priority is to deliver premium quality print, fast turnaround, and the best service for you.',
    'Kualitas cetak tajam & presisi': 'Sharp & precise print quality',
    'Tim desainer profesional': 'Professional designer team',
    'Pengerjaan cepat & tepat waktu': 'Fast & on-time delivery',
    'Harga terjangkau & kompetitif': 'Affordable & competitive pricing',
    
    'Konsultasi': 'Consultation',
    'Hubungi kami via WhatsApp untuk konsultasi bahan, ukuran, dan jumlah cetak.': 'Contact us via WhatsApp for consultation on materials, size, and print quantity.',
    'Desain': 'Design',
    'Kirim file desain Anda atau gunakan jasa tim desainer kami untuk hasil maksimal.': 'Send your design file or use our designer team services for best results.',
    'Cetak': 'Print',
    'Proses cetak cepat menggunakan mesin digital printing berteknologi modern.': 'Fast printing process using digital printing machinery with modern technology.',
    'Selesai': 'Done',
    'Hasil cetakan siap diambil atau dikirim langsung ke alamat Anda dengan aman.': 'Printed results are ready to be picked up or shipped directly to your address safely.',
    
    'Cetak Kualitas HD': 'HD Quality Printing',
    'Warna cemerlang & akurat 99%.': 'Brilliant & 99% accurate colors.',
    'Express Delivery': 'Express Delivery',
    'Pengerjaan tepat waktu sesuai deadline.': 'On-time completion according to deadline.',
    'Layanan Terbaik': 'Best Service',
    'Gratis revisi setup file cetak.': 'Free print file setup revision.',
    'Customer': 'Customer',
    'Belum ada layanan premium yang tersedia.': 'No premium services available.',
    'Belum ada langkah cara kerja yang tersedia saat ini.': 'No work steps available at this time.',
    
    'Sangat puas dengan cetakan stiker kemasan cup kopi saya. Warnanya tajam, tidak luntur bila terkena air, dan pengerjaannya sangat cepat!': 'Very satisfied with the sticker prints for my coffee cups. The colors are sharp, water-resistant, and the service was extremely fast!',
    'Pemilik Kedai Kopi': 'Coffee Shop Owner',
    
    // Services We Provide and work steps
    'Services We Provide': 'Services We Provide',
    'Tailored solutions for every need—whether scaling an enterprise or celebrating a milestone.': 'Tailored solutions for every need—whether scaling an enterprise or celebrating a milestone.',
    'How We Work': 'How We Work',
    'A seamless process designed to save you time and ensure top-quality results': 'A seamless process designed to save you time and ensure top-quality results',
    'Innovation meets precision.': 'Innovation meets precision.',
    'Welcome to Fourplusone. We are a premier IT Software House dedicated to bridging the gap between complex business needs and elegant digital experiences': 'Welcome to Fourplusone. We are a premier IT Software House dedicated to bridging the gap between complex business needs and elegant digital experiences',
    
    'Innovation at Our Core': 'Innovation at Our Core',
    'We design and develop cutting-edge software solutions tailored to your business needs, ensuring high scalability and modern performance.': 'We design and develop cutting-edge software solutions tailored to your business needs, ensuring high scalability and modern performance.',
    'Precision & Performance': 'Precision & Performance',
    'Our engineering processes guarantee bug-free, high-performance applications built with clean, maintainable architecture.': 'Our engineering processes guarantee bug-free, high-performance applications built with clean, maintainable architecture.',
    'Seamless Integration': 'Seamless Integration',
    'Connect your systems, APIs, and workflows seamlessly with robust security and zero friction.': 'Connect your systems, APIs, and workflows seamlessly with robust security and zero friction.',
    
    'Mobile Development': 'Mobile Development',
    'iOS & Android native and hybrid applications designed for exceptional user experiences': 'iOS & Android native and hybrid applications designed for exceptional user experiences',
    'Website Development': 'Website Development',
    'High-performance landing pages, corporate websites, and modern web applications.': 'High-performance landing pages, corporate websites, and modern web applications.',
    'Custom Dashboards': 'Custom Dashboards',
    'Data management, ERP, and CRM solutions tailored to streamline your business operations.': 'Data management, ERP, and CRM solutions tailored to streamline your business operations.',
    'Wedding Templates': 'Wedding Templates',
    'Aesthetic, interactive digital invitations to make your special day unforgettable.': 'Aesthetic, interactive digital invitations to make your special day unforgettable.',
    
    'Consultation': 'Consultation',
    'Share your vision, requirements, and business goals with our expert team.': 'Share your vision, requirements, and business goals with our expert team.',
    'Design & Planning': 'Design & Planning',
    'We map out the UX flow and visual architecture tailored perfectly to your brand.': 'We map out the UX flow and visual architecture tailored perfectly to your brand.',
    'Launch & Support': 'Launch & Support',
    'Seamless deployment and ongoing maintenance to keep your product running perfectly.': 'Seamless deployment and ongoing maintenance to keep your product running perfectly.',
    'Fast Delivery': 'Fast Delivery',
    'Rapid development with regular updates and continuous feedback loops.': 'Rapid development with regular updates and continuous feedback loops.',
    
    'Menyediakan layanan cetak banner, stiker kemasan, brosur, kartu nama, dan aneka merchandise digital berkualitas tinggi dengan pengerjaan kilat.': 'Providing high-quality banner printing, packaging stickers, brochures, business cards, and digital merchandise with express delivery.',
    'Layanan Cetak': 'Printing Services',
    'Keunggulan Kami': 'Our Advantages',
    'Managed by Four Plus One': 'Managed by Four Plus One',
    'Design Premium': 'Premium Design'
  };

  const trimmed = text.trim();
  if (textMap[trimmed]) {
    return textMap[trimmed];
  }

  let translatedText = text;
  Object.keys(textMap).forEach((key) => {
    if (translatedText.includes(key)) {
      translatedText = translatedText.replaceAll(key, textMap[key]);
    }
  });

  return translatedText;
};

// Helper to render text with bracket markup [...] using dynamic colors
const renderFormattedText = (text, isTitle = false, lang = 'id') => {
  if (!text) return null;

  // Translate text if English language is active
  const processedText = translateText(text, lang);

  const hasBrackets = processedText.includes('[') && processedText.includes(']');

  if (!hasBrackets) {
    if (isTitle) {
      return processedText.split(' ').map((word, i) => {
        if (i >= 3) {
          return (
            <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 block sm:inline">
              {word}{' '}
            </span>
          );
        }
        return word + ' ';
      });
    }
    return processedText;
  }

  const parts = processedText.split(/(\[[^\]]+\])/g);

  return parts.map((part, i) => {
    if (part.startsWith('[') && part.endsWith(']')) {
      const cleanText = part.slice(1, -1);
      if (isTitle) {
        return (
          <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 block sm:inline">
            {cleanText}
          </span>
        );
      } else {
        return (
          <span key={i} className="text-emerald-600 font-semibold">
            {cleanText}
          </span>
        );
      }
    }
    return part;
  });
};
function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lang, setLang] = useState(() => localStorage.getItem('site_lang') || 'id')
  const [activePortfolioTab, setActivePortfolioTab] = useState(lang === 'en' ? 'All' : 'Semua')
  const [currentPage, setCurrentPage] = useState('landing') // landing, news-list, activity-list, news-detail, activity-detail
  const [newsList, setNewsList] = useState([])
  const [activitiesList, setActivitiesList] = useState([])
  const [listLoading, setListLoading] = useState(false)
  const [detailItem, setDetailItem] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  
  // Slider state and responsive boundaries
  const [newsStartIndex, setNewsStartIndex] = useState(0)
  const [activitiesStartIndex, setActivitiesStartIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [activeBranchId, setActiveBranchId] = useState(null)

  const itemsPerView = windowWidth >= 1024 ? 3 : (windowWidth >= 768 ? 2 : 1);

  useEffect(() => {
    localStorage.setItem('site_lang', lang)
  }, [lang])

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (data?.branches && data.branches.length > 0 && activeBranchId === null) {
      setActiveBranchId(data.branches[0].id)
    }
  }, [data, activeBranchId])

  const t = (key, fallbackText) => {
    if (translations[lang] && translations[lang][key]) {
      return translations[lang][key];
    }
    const val = fallbackText || key;
    return translateText(val, lang);
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [contactName, setContactName] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [contactMessage, setContactMessage] = useState('')
  const [contactLoading, setContactLoading] = useState(false)
  const [contactSuccess, setContactSuccess] = useState('')
  const [contactError, setContactError] = useState('')
  const [carouselIndex, setCarouselIndex] = useState(0)

  // Get or create persistent session_id for unique visitor tracking
  const getSessionId = () => {
    let sid = localStorage.getItem('analytics_session_id')
    if (!sid) {
      sid = 'session_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
      localStorage.setItem('analytics_session_id', sid)
    }
    return sid
  }
  const sessionId = getSessionId()

  // Send analytics event to Laravel backend
  const trackEvent = (eventType, pageName = null) => {
    fetch(`${API_BASE_URL}/api/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: eventType,
        page_name: pageName,
        session_id: sessionId
      })
    })
    .catch(err => console.error('Error logging analytics event:', err))
  }

  const goHome = (e) => {
    if (e) e.preventDefault()
    setCurrentPage('landing')
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigateToNewsList = () => {
    setListLoading(true)
    setCurrentPage('news-list')
    setMobileMenuOpen(false)
    setSearchTerm('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    fetch(`${API_BASE_URL}/api/news`)
      .then(res => res.json())
      .then(resData => {
        if (resData.status === 'success') {
          setNewsList(resData.data)
        }
      })
      .catch(err => console.error(err))
      .finally(() => setListLoading(false))
  }

  const navigateToActivitiesList = () => {
    setListLoading(true)
    setCurrentPage('activity-list')
    setMobileMenuOpen(false)
    setSearchTerm('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    fetch(`${API_BASE_URL}/api/activities`)
      .then(res => res.json())
      .then(resData => {
        if (resData.status === 'success') {
          setActivitiesList(resData.data)
        }
      })
      .catch(err => console.error(err))
      .finally(() => setListLoading(false))
  }

  const navigateToNewsDetail = (slug) => {
    setDetailLoading(true)
    setCurrentPage('news-detail')
    setDetailItem(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    fetch(`${API_BASE_URL}/api/news/${slug}`)
      .then(res => res.json())
      .then(resData => {
        if (resData.status === 'success') {
          setDetailItem(resData.data)
        }
      })
      .catch(err => console.error(err))
      .finally(() => setDetailLoading(false))
  }

  const navigateToActivityDetail = (slug) => {
    setDetailLoading(true)
    setCurrentPage('activity-detail')
    setDetailItem(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    fetch(`${API_BASE_URL}/api/activities/${slug}`)
      .then(res => res.json())
      .then(resData => {
        if (resData.status === 'success') {
          setDetailItem(resData.data)
        }
      })
      .catch(err => console.error(err))
      .finally(() => setDetailLoading(false))
  }

  // Track page view event when currentPage or detailItem changes
  useEffect(() => {
    let pageName = 'Home'
    if (currentPage === 'news-list') {
      pageName = 'Kumpulan Berita'
    } else if (currentPage === 'activity-list') {
      pageName = 'Dokumentasi Kegiatan'
    } else if (currentPage === 'news-detail') {
      pageName = detailItem ? `Berita: ${detailItem.title}` : 'Detail Berita'
    } else if (currentPage === 'activity-detail') {
      pageName = detailItem ? `Aktifitas: ${detailItem.title}` : 'Detail Aktifitas'
    }
    
    trackEvent('page_view', pageName)
  }, [currentPage, detailItem])

  // Track global WhatsApp link clicks automatically
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const anchor = e.target.closest('a')
      if (anchor && anchor.href && anchor.href.includes('wa.me')) {
        trackEvent('click_wa')
      }
    }
    
    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

  const handleContactSubmit = (e) => {
    e.preventDefault()
    
    if (!contactName.trim() || !contactPhone.trim() || !contactMessage.trim()) {
      setContactError('all_fields_required')
      return
    }

    setContactLoading(true)
    setContactError('')
    setContactSuccess('')

    fetch(`${API_BASE_URL}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: contactName,
        phone: contactPhone,
        message: contactMessage,
        session_id: sessionId
      })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error('failed_send_lead')
      }
      return res.json()
    })
    .then(resData => {
      if (resData.status === 'success') {
        setContactSuccess(resData.message || 'success_send_lead')
        setContactName('')
        setContactPhone('')
        setContactMessage('')
      } else {
        throw new Error(resData.message || 'failed_send_lead')
      }
    })
    .catch(err => {
      console.error(err)
      setContactError(err.message)
    })
    .finally(() => {
      setContactLoading(false)
    })
  }

  // Fetch landing page data from Laravel REST API
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/landing-page`)
      .then((res) => {
        if (!res.ok) throw new Error('Gagal memuat data dari server')
        return res.json()
      })
      .then((resData) => {
        if (resData.status === 'success') {
          setData(resData.data)
        } else {
          throw new Error('Format data tidak sesuai')
        }
      })
      .catch((err) => {
        console.error(err)
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  // Apply theme colors from database dynamically
  useEffect(() => {
    if (data?.site_config) {
      const { primary_color, secondary_color, accent_color, background_color } = data.site_config
      if (primary_color) {
        document.documentElement.style.setProperty('--primary-color', primary_color)
      }
      if (secondary_color) {
        document.documentElement.style.setProperty('--secondary-color', secondary_color)
      }
      if (accent_color) {
        document.documentElement.style.setProperty('--accent-color', accent_color)
      }
      if (background_color) {
        document.documentElement.style.setProperty('--background-color', background_color)
      }
    }
  }, [data])

  // Auto-slide effect for the Hero Carousel (placed before early return to satisfy Rules of Hooks)
  useEffect(() => {
    const heroCarousel = data?.hero_carousel;
    const imagesCount = heroCarousel?.carousel_images?.length || 0;
    if (imagesCount <= 1) return;

    const timer = setInterval(() => {
      setCarouselIndex((prevIndex) => (prevIndex + 1) % imagesCount);
    }, 5000);

    return () => clearInterval(timer);
  }, [data]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
        <p className="text-lg font-medium animate-pulse">{t('connecting_to_db', 'Menghubungkan ke database...')}</p>
      </div>
    )
  }

  // Fallback data in case the API is unreachable (so the frontend still loads beautifully!)
  const landingData = data || {
    site_config: {
      site_name: 'PrintHub',
      whatsapp_number: '628123456789',
      email: 'info@printhub.com',
      address: 'Jl. Percetakan Indah No. 45, Jakarta Selatan',
      facebook_url: '#',
      instagram_url: '#',
      twitter_url: '#',
      contact_title: 'Kirimkan Pesan atau Konsultasi Gratis',
      contact_subtitle: 'Punya pertanyaan mengenai bahan, ukuran cetakan, atau ingin mendiskusikan pesanan khusus (custom)? Isi formulir, tim ahli kami akan segera menghubungi Anda.',
      about_title: 'Innovation meets precision.',
      about_subtitle: 'Welcome to Fourplusone. We are a premier IT Software House dedicated to bridging the gap between complex business needs and elegant digital experiences',
      service_premium_title: 'Services We Provide',
      service_premium_subtitle: 'Tailored solutions for every need—whether scaling an enterprise or celebrating a milestone.',
      work_steps_title: 'How We Work',
      work_steps_subtitle: 'A seamless process designed to save you time and ensure top-quality results',
    },
    hero_section: {
      badge: 'Percetakan Digital',
      title: 'Wujudkan Ide Anda Dalam Cetakan',
      subtitle: 'Temukan solusi percetakan digital berkualitas terbaik untuk spanduk, brosur, stiker, dan kemasan Anda.',
      primary_btn_text: 'Pesan Sekarang',
      primary_btn_url: '#order',
      secondary_btn_text: 'Layanan Kami',
      secondary_btn_url: '#services',
    },
    why_choose_us: {
      title: 'Mengapa Memilih Kami?',
      subtitle: 'Prioritas utama kami adalah memberikan hasil cetak dengan kualitas premium, pengerjaan cepat, dan pelayanan terbaik untuk Anda.',
      features: [
        'Kualitas cetak tajam & presisi',
        'Tim desainer profesional',
        'Pengerjaan cepat & tepat waktu',
        'Harga terjangkau & kompetitif',
      ]
    },
    statistics: [
      { value: '500+', label: 'Klien Puas' },
      { value: '10,000+', label: 'Produk Terkirim' },
      { value: '5 Tahun', label: 'Pengalaman' },
      { value: '4.9/5', label: 'Rating Klien' }
    ],
    services: [
      { title: 'Spanduk & Banner', description: 'Cetak spanduk berkualitas tinggi dengan warna tajam untuk kebutuhan promosi bisnis Anda.', icon: 'printer' },
      { title: 'Stiker & Label', description: 'Stiker kemasan produk, label pengiriman, cutting stiker vinyl tahan air berkualitas tinggi.', icon: 'tag' },
      { title: 'Brosur & Flyer', description: 'Media promosi lipat dua, lipat tiga, brosur pamflet dengan kertas art paper mengkilap.', icon: 'file-text' }
    ],
    order_steps: [
      { step_number: 1, title: 'Konsultasi', description: 'Hubungi kami via WhatsApp untuk konsultasi bahan, ukuran, dan jumlah cetak.', icon: 'message-square' },
      { step_number: 2, title: 'Desain', description: 'Kirim file desain Anda atau gunakan jasa tim desainer kami untuk hasil maksimal.', icon: 'edit' },
      { step_number: 3, title: 'Cetak', description: 'Proses cetak cepat menggunakan mesin digital printing berteknologi modern.', icon: 'printer' },
      { step_number: 4, title: 'Selesai', description: 'Hasil cetakan siap diambil atau dikirim langsung to alamat Anda dengan aman.', icon: 'check' }
    ],
    portfolios: [],
    testimonials: [
      { client_name: 'Rian Diantono', client_role: 'Pemilik Kedai Kopi', stars: 5, content: 'Sangat puas dengan cetakan stiker kemasan cup kopi saya. Warnanya tajam, tidak luntur bila terkena air, dan pengerjaannya sangat cepat!' }
    ],
    news: [],
    activities: [],
    about_items: [
      { title: 'Innovation at Our Core', description: 'We design and develop cutting-edge software solutions tailored to your business needs, ensuring high scalability and modern performance.' },
      { title: 'Precision & Performance', description: 'Our engineering processes guarantee bug-free, high-performance applications built with clean, maintainable architecture.' },
      { title: 'Seamless Integration', description: 'Connect your systems, APIs, and workflows seamlessly with robust security and zero friction.' }
    ],
    service_premiums: [
      { title: 'Mobile Development', description: 'iOS & Android native and hybrid applications designed for exceptional user experiences', button_text: 'Start Project', button_url: 'whatsapp' },
      { title: 'Website Development', description: 'High-performance landing pages, corporate websites, and modern web applications.', button_text: 'Start Project', button_url: 'whatsapp' },
      { title: 'Custom Dashboards', description: 'Data management, ERP, and CRM solutions tailored to streamline your business operations.', button_text: 'Start Project', button_url: 'whatsapp' },
      { title: 'Wedding Templates', description: 'Aesthetic, interactive digital invitations to make your special day unforgettable.', button_text: 'Start Project', button_url: 'whatsapp' }
    ],
    work_steps: [
      { title: 'Consultation', description: 'Share your vision, requirements, and business goals with our expert team.' },
      { title: 'Design & Planning', description: 'We map out the UX flow and visual architecture tailored perfectly to your brand.' },
      { title: 'Launch & Support', description: 'Seamless deployment and ongoing maintenance to keep your product running perfectly.' },
      { title: 'Fast Delivery', description: 'Rapid development with regular updates and continuous feedback loops.' }
    ],
    cta_section: {
      title: 'Siap Mencetak Ide Anda?',
      subtitle: 'Yuk, mulai konsultasi gratis dengan tim ahli kami untuk mendapatkan hasil terbaik untuk bisnismu!',
      btn_text: 'Pesan Sekarang',
      btn_url: 'whatsapp',
    },
    hero_background: {
      badge: 'Bisnis Digital',
      title: 'Wujudkan Ide Anda Dalam Cetakan',
      subtitle: 'Temukan solusi percetakan digital berkualitas terbaik untuk spanduk, brosur, stiker, dan kemasan Anda.',
      primary_btn_text: 'Pesan Sekarang',
      primary_btn_url: '#order',
      secondary_btn_text: 'Layanan Kami',
      secondary_btn_url: '#services',
    },
    hero_carousel: {
      badge: 'Promo Unggulan',
      title: 'Wujudkan Ide Anda Dalam Cetakan',
      subtitle: 'Temukan solusi percetakan digital berkualitas terbaik untuk spanduk, brosur, stiker, dan kemasan Anda.',
      primary_btn_text: 'Pesan Sekarang',
      primary_btn_url: '#order',
      secondary_btn_text: 'Layanan Kami',
      secondary_btn_url: '#services',
      carousel_images: [],
    },
    branches: [],
  }

  const { site_config, hero_section, hero_background, hero_carousel, why_choose_us, cta_section, statistics, services, order_steps, portfolios, testimonials, sections: rawSections, news: rawNews, activities: rawActivities, about_items: rawAboutItems, service_premiums: rawServicePremiums, work_steps: rawWorkSteps, branches: rawBranches } = landingData

  const news = rawNews || []
  const activities = rawActivities || []
  const about_items = rawAboutItems || []
  const service_premiums = rawServicePremiums || []
  const work_steps = rawWorkSteps || []
  const branches = rawBranches || []

  const sections = rawSections || [
    { section_key: 'hero', is_active: true },
    { section_key: 'hero_background', is_active: false },
    { section_key: 'hero_carousel', is_active: false },
    { section_key: 'about', is_active: true },
    { section_key: 'statistics', is_active: true },
    { section_key: 'services', is_active: true },
    { section_key: 'services_premium', is_active: true },
    { section_key: 'work_steps', is_active: true },
    { section_key: 'benefits', is_active: true },
    { section_key: 'portfolio', is_active: true },
    { section_key: 'timeline', is_active: true },
    { section_key: 'testimonials', is_active: true },
    { section_key: 'news', is_active: true },
    { section_key: 'activities', is_active: true },
    { section_key: 'cta', is_active: true },
    { section_key: 'contact', is_active: true },
    { section_key: 'branches', is_active: true },
  ]

  const isSectionActive = (key) => {
    const sec = sections.find(s => s.section_key === key)
    return sec ? sec.is_active : true
  }

  // WhatsApp redirection generator
  const getWhatsAppLink = (message = "Halo PrintHub, saya ingin memesan cetakan...") => {
    const cleanNumber = site_config.whatsapp_number.replace(/\D/g, '')
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
  }

  const handleWaClick = () => {
    trackEvent('click_wa')
  }

  // Helper to resolve button details dynamically based on dropdown values
  const resolveButtonUrl = (urlVal, defaultFallback) => {
    const val = urlVal || defaultFallback
    if (val === 'whatsapp') {
      return getWhatsAppLink("Halo, saya ingin bertanya lebih lanjut...")
    }
    return val
  }

  const getButtonTarget = (urlVal) => urlVal === 'whatsapp' ? '_blank' : undefined
  const getButtonRel = (urlVal) => urlVal === 'whatsapp' ? 'noreferrer' : undefined

  // Get image URL, falling back to a nice layout if null
  const getImageUrl = (path) => {
    if (!path) return null
    return `${API_BASE_URL}/storage/${path}`
  }

  // Categories helper for filter tabs
  const portfolioCategories = ['Semua', ...new Set(portfolios.map(p => p.category))]

  // Filtered portfolio list
  const filteredPortfolios = activePortfolioTab === 'Semua'
    ? portfolios
    : portfolios.filter(p => p.category === activePortfolioTab)

  const renderSectionByKey = (key) => {
    switch (key) {
      case 'hero':
        return (
          <section key="hero" className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.50),white)] opacity-30"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
                {/* Left Content */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  {hero_section.badge && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/60 border border-emerald-200/50 text-emerald-800 text-xs font-extrabold tracking-wide uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 animate-pulse" />
                      <span>{t(hero_section.badge)}</span>
                    </div>
                  )}
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {renderFormattedText(hero_section.title, true, lang)}
                  </h1>
 
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                    {renderFormattedText(hero_section.subtitle, false, lang)}
                  </p>
 
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                    <a
                      href={resolveButtonUrl(hero_section.primary_btn_url, 'whatsapp')}
                      target={getButtonTarget(hero_section.primary_btn_url)}
                      rel={getButtonRel(hero_section.primary_btn_url)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                    >
                      <span>{t(hero_section.primary_btn_text) || t('Pesan Sekarang')}</span>
                      <ArrowRight className="w-5 h-5" />
                    </a>
                    <a
                      href={resolveButtonUrl(hero_section.secondary_btn_url, '#services')}
                      target={getButtonTarget(hero_section.secondary_btn_url)}
                      rel={getButtonRel(hero_section.secondary_btn_url)}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-slate-200 hover:border-emerald-650 hover:bg-emerald-50/30 text-slate-700 hover:text-emerald-700 text-base font-bold hover:-translate-y-0.5 active:translate-y-0 transition-all"
                    >
                      {t(hero_section.secondary_btn_text) || t('Layanan Kami')}
                    </a>
                  </div>
                </div>

                {/* Right Banner Image */}
                <div className="lg:col-span-5 flex justify-center">
                  <div className="relative w-full max-w-md lg:max-w-none">
                    {/* Visual Glass Backing */}
                    <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 rounded-3xl filter blur-xl opacity-75 animate-pulse"></div>
                    
                    {getImageUrl(hero_section.image_path) ? (
                      <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 shadow-2xl bg-white p-2 animate-in slide-in-from-right-12 duration-700">
                        <img
                          src={getImageUrl(hero_section.image_path)}
                          alt="PrintHub Printing Machine Banner"
                          className="w-full h-auto rounded-xl object-cover hover:scale-[1.02] transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      /* Premium default inline vector mockup */
                      <div className="relative w-full aspect-[4/3] rounded-2xl border border-slate-200/80 bg-white shadow-2xl p-6 flex flex-col justify-between overflow-hidden group animate-in slide-in-from-right-12 duration-700">
                        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-emerald-500/10 filter blur-2xl"></div>
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-teal-500/10 filter blur-2xl"></div>
                        
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                          <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                          </div>
                          <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">FourplusOne CMS Engine</span>
                        </div>

                        <div className="flex-1 flex items-center justify-center relative py-6">
                          <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-xl flex items-center justify-center text-white scale-95 group-hover:scale-100 group-hover:rotate-3 transition-all duration-500">
                            <Sparkles className="w-16 h-16 animate-pulse" />
                          </div>
                          <div className="absolute top-2 left-6 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-bold shadow-sm -rotate-6">
                            Premium Quality
                          </div>
                          <div className="absolute bottom-2 right-6 px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-100 text-teal-800 text-xs font-bold shadow-sm rotate-6">
                            Fast Delivery
                          </div>
                        </div>

                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
                            <span className="text-xs font-bold text-slate-600">Dynamic CMS Connected</span>
                          </div>
                          <span className="text-xs font-semibold text-emerald-600">Active & Live</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )

      case 'hero_background':
        return (
          <section
            key="hero_background"
            className="relative min-h-[550px] lg:min-h-[650px] flex items-center bg-cover bg-center bg-no-repeat py-20 lg:py-32 overflow-hidden"
            style={{
              backgroundImage: hero_background.image_path
                ? `url(${getImageUrl(hero_background.image_path)})`
                : 'none',
            }}
          >
            {/* Elegant gradient overlay that ensures text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 sm:from-white sm:via-white/90 to-white/20 -z-10"></div>
            
            {/* If no background image, show a default background gradient */}
            {!hero_background.image_path && (
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50/50 via-white to-slate-100 -z-20"></div>
            )}
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
              <div className="max-w-2xl space-y-6 text-left">
                {hero_background.badge && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/60 border border-emerald-200/50 text-emerald-800 text-xs font-extrabold tracking-wide uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 animate-pulse" />
                    <span>{t(hero_background.badge)}</span>
                  </div>
                )}
                
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {renderFormattedText(hero_background.title, true, lang)}
                </h1>

                <p className="text-lg text-slate-650 leading-relaxed font-normal">
                  {renderFormattedText(hero_background.subtitle, false, lang)}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4">
                  <a
                    href={resolveButtonUrl(hero_background.primary_btn_url, 'whatsapp')}
                    target={getButtonTarget(hero_background.primary_btn_url)}
                    rel={getButtonRel(hero_background.primary_btn_url)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    <span>{t(hero_background.primary_btn_text) || t('Pesan Sekarang')}</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                  <a
                    href={resolveButtonUrl(hero_background.secondary_btn_url, '#services')}
                    target={getButtonTarget(hero_background.secondary_btn_url)}
                    rel={getButtonRel(hero_background.secondary_btn_url)}
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-slate-200 hover:border-emerald-650 hover:bg-emerald-50/30 text-slate-700 hover:text-emerald-700 text-base font-bold hover:-translate-y-0.5 active:translate-y-0 transition-all"
                  >
                    {t(hero_background.secondary_btn_text) || t('Layanan Kami')}
                  </a>
                </div>
              </div>
            </div>
          </section>
        )

      case 'hero_carousel':
        const parseCarouselItem = (item) => {
          if (!item) return null
          if (typeof item === 'string') {
            return {
              image: item,
              title: 'Produk',
              subtitle: 'Bestseller',
              footer: 'Hubungi Kami'
            }
          }
          return {
            image: item.image || '',
            title: item.title || 'Produk',
            subtitle: item.subtitle || 'Bestseller',
            footer: item.footer || 'Hubungi Kami'
          }
        }
        
        const carouselItems = (hero_carousel.carousel_images || []).map(parseCarouselItem).filter(Boolean)
        const heroItemsPerView = windowWidth >= 1024 ? 2 : (windowWidth >= 768 ? 2 : 1)
        const maxIdx = Math.max(0, carouselItems.length - heroItemsPerView)
            return (
          <section
            key="hero_carousel"
            className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-emerald-50/40 via-white to-slate-100 text-slate-900"
          >
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.50/30),transparent)] opacity-35"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center font-sans">
                
                {/* Left Content (Text) */}
                <div className="lg:col-span-5 space-y-6 text-center lg:text-left">
                  {hero_carousel.badge && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/60 border border-emerald-200/50 text-emerald-800 text-xs font-extrabold tracking-wide uppercase">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 animate-pulse" />
                      <span>{t(hero_carousel.badge)}</span>
                    </div>
                  )}
                  
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-tight">
                    {renderFormattedText(hero_carousel.title, true, lang)}
                  </h1>

                  <p className="text-lg text-slate-605 leading-relaxed font-semibold max-w-xl mx-auto lg:mx-0">
                    {renderFormattedText(hero_carousel.subtitle, false, lang)}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                    {hero_carousel.primary_btn_text && (
                      <a
                        href={resolveButtonUrl(hero_carousel.primary_btn_url, 'whatsapp')}
                        target={getButtonTarget(hero_carousel.primary_btn_url)}
                        rel={getButtonRel(hero_carousel.primary_btn_url)}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                      >
                        <span>{t(hero_carousel.primary_btn_text)}</span>
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    )}
                    {hero_carousel.secondary_btn_text && (
                      <a
                        href={resolveButtonUrl(hero_carousel.secondary_btn_url, '#services')}
                        target={getButtonTarget(hero_carousel.secondary_btn_url)}
                        rel={getButtonRel(hero_carousel.secondary_btn_url)}
                        className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-slate-200 hover:border-emerald-655 hover:bg-emerald-50/30 text-slate-700 hover:text-emerald-700 text-base font-bold hover:-translate-y-0.5 active:translate-y-0 transition-all"
                      >
                        {t(hero_carousel.secondary_btn_text)}
                      </a>
                    )}
                  </div>
                </div>

                {/* Right Content (Product Cards Slider) */}
                <div className="lg:col-span-7 relative w-full overflow-hidden select-none">
                  {carouselItems.length > 0 ? (
                    <div className="space-y-6">
                      <div className="relative w-full overflow-hidden">
                        <div 
                          className="flex gap-6 transition-transform duration-500 ease-out"
                          style={{ transform: `translateX(-${Math.min(carouselIndex, maxIdx) * (260 + 24)}px)` }}
                        >
                          {carouselItems.map((item, i) => (
                            <div
                              key={i}
                              onClick={() => {
                                const waUrl = getWhatsAppLink(`Halo, saya tertarik dengan produk *${item.title}*. Bisa minta info selengkapnya?`);
                                window.open(waUrl, '_blank', 'noopener,noreferrer');
                              }}
                              className="flex-shrink-0 w-[260px] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col p-4 cursor-pointer group hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 border border-slate-100"
                            >
                              {/* Product Image Clickable to WA */}
                              <div className="w-full aspect-square overflow-hidden rounded-xl bg-slate-50 relative">
                                <img
                                  src={getImageUrl(item.image)}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                                  <div className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1.5">
                                    <Phone className="w-3.5 h-3.5 fill-white" />
                                    <span>{t('Tanya via WA')}</span>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Card Text Content */}
                              <div className="mt-4 flex flex-col flex-grow text-left">
                                <span className="text-[10px] font-extrabold text-emerald-600 tracking-widest uppercase mb-1">
                                  {t(item.subtitle)}
                                </span>
                                <h3 className="text-base font-black text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
                                  {t(item.title)}
                                </h3>
                                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-500">
                                  <span>{t(item.footer)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Navigation Arrow Buttons */}
                      {carouselItems.length > 1 && (
                        <div className="flex items-center justify-center lg:justify-start gap-4">
                          <button
                            onClick={() => setCarouselIndex(prev => Math.max(0, prev - 1))}
                            disabled={carouselIndex === 0}
                            className={`w-12 h-12 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm transition-all ${
                              carouselIndex === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
                            }`}
                            aria-label="Previous slide"
                          >
                            <ChevronLeft className="w-6 h-6" />
                          </button>
                          <button
                            onClick={() => setCarouselIndex(prev => Math.min(maxIdx, prev + 1))}
                            disabled={carouselIndex >= maxIdx}
                            className={`w-12 h-12 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm transition-all ${
                              carouselIndex >= maxIdx ? 'opacity-40 cursor-not-allowed' : 'hover:bg-emerald-600 hover:text-white hover:border-emerald-600'
                            }`}
                            aria-label="Next slide"
                          >
                            <ChevronRight className="w-6 h-6" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-64 rounded-2xl bg-amber-100/50 border-2 border-dashed border-amber-300 flex items-center justify-center text-amber-800 text-sm font-semibold">
                      Belum ada item carousel. Tambahkan di admin panel.
                    </div>
                  )}
                </div>

              </div>
            </div>
          </section>
        )

      case 'statistics':
        return (
          <section key="statistics" className="relative z-10 -mt-10 w-full bg-emerald-800 py-10 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, i) => (
                <div key={i} className="text-center px-4 space-y-1 py-2 sm:py-0">
                  <span className="block text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {t(stat.value)}
                  </span>
                  <span className="block text-xs font-bold text-emerald-100/90 uppercase tracking-widest">
                    {t(stat.label)}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )

      case 'services':
        return (
          <section key="services" id="services" className="py-24 bg-emerald-50 w-full border-b border-emerald-600/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-xs font-extrabold tracking-widest text-emerald-700 uppercase">{t('Layanan Kami')}</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {renderFormattedText(site_config.services_title || 'Solusi Percetakan Cetak Custom Lengkap', true, lang)}
                </h2>
                <p className="text-base text-slate-600">
                  {renderFormattedText(site_config.services_subtitle || 'Kami siap mencetak berbagai produk kebutuhan branding, promosi, dan bisnis Anda dengan mesin berteknologi canggih.', false, lang)}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, i) => {
                  const isFirst = i === 0;
                  return (
                    <div
                      key={i}
                      className={`group rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between ${
                        isFirst
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/15'
                          : 'bg-white border border-slate-100/80 text-slate-800'
                      }`}
                    >
                      <div className="space-y-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                          isFirst
                            ? 'bg-white text-emerald-600'
                            : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white'
                        }`}>
                          {renderIcon(service.icon, "w-6 h-6")}
                        </div>
                        <h3 className={`text-lg font-bold ${isFirst ? 'text-white' : 'text-slate-900 group-hover:text-emerald-700'}`}>
                          {t(service.title)}
                        </h3>
                        <p className={`text-sm leading-relaxed font-normal ${isFirst ? 'text-emerald-100/90' : 'text-slate-600'}`}>
                          {t(service.description)}
                        </p>
                      </div>

                      <div className={`pt-6 border-t mt-6 flex items-center justify-between ${isFirst ? 'border-emerald-500/30' : 'border-slate-50'}`}>
                        <a
                          href={getWhatsAppLink(t(`Halo PrintHub, saya ingin berkonsultasi tentang cetak custom ${service.title}.`))}
                          target="_blank"
                          rel="noreferrer"
                          className={`inline-flex items-center gap-1 text-xs font-bold ${isFirst ? 'text-white hover:text-emerald-100' : 'text-emerald-600 group-hover:text-emerald-700'}`}
                        >
                          <span>{t('Pesan Sekarang')}</span>
                          <ChevronRight className="w-4 h-4" />
                        </a>
                        <span className={`text-xs font-bold ${isFirst ? 'text-emerald-200/50' : 'text-slate-300 group-hover:text-emerald-300'}`}>0{i+1}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )

      case 'services_premium':
        return (
          <section key="services_premium" id="services_premium" className="py-24 bg-white w-full border-b border-slate-200/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Split Header: Title on Left, Subtitle on Right */}
              <div className="grid md:grid-cols-12 gap-8 items-start md:items-end mb-16">
                <div className="md:col-span-7 space-y-4 text-left">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100/60 border border-emerald-200/50 text-emerald-800 text-xs font-extrabold tracking-wide uppercase">
                    {t('Services')}
                  </span>
                  <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {renderFormattedText(site_config.service_premium_title || 'Services We Provide', true, lang)}
                  </h2>
                </div>
                <div className="md:col-span-5 text-left md:text-right pb-1">
                  <p className="text-base text-slate-650 leading-relaxed font-normal">
                    {renderFormattedText(site_config.service_premium_subtitle || 'Tailored solutions for every need—whether scaling an enterprise or celebrating a milestone.', false, lang)}
                  </p>
                </div>
              </div>

              {/* 2x2 Grid of Blueprint Cards */}
              {service_premiums.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {service_premiums.map((item, i) => (
                    <div
                      key={i}
                      className="group bg-white border border-emerald-600/10 rounded-3xl p-8 flex flex-col justify-between overflow-hidden relative shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 gap-6 min-h-[300px]"
                      style={{
                        backgroundImage: 'linear-gradient(#10b98109 1px, transparent 1px), linear-gradient(90deg, #10b98109 1px, transparent 1px)',
                        backgroundSize: '24px 24px'
                      }}
                    >
                      {/* Left Info Column */}
                      <div className="w-full sm:w-[55%] flex-1 flex flex-col justify-between text-left z-10 space-y-6">
                        <div className="space-y-3">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {t(item.title)}
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed font-normal">
                            {t(item.description)}
                          </p>
                        </div>

                        <div>
                          <a
                            href={resolveButtonUrl(item.button_url, 'whatsapp')}
                            target={getButtonTarget(item.button_url)}
                            rel={getButtonRel(item.button_url)}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-emerald-600/25 hover:border-emerald-650 bg-white hover:bg-emerald-600 text-emerald-700 hover:text-white text-sm font-bold shadow-sm transition-all"
                          >
                            <span>{t(item.button_text) || t('Start Project')}</span>
                            <ArrowRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>

                      {/* Right Illustration Column - Positioned Absolute & Scaled for Figma Style Bleed */}
                      {getImageUrl(item.image_path) ? (
                        <div className="absolute bottom-0 right-0 w-[55%] h-[115%] z-0 flex items-end justify-end pointer-events-none">
                          <img
                            src={getImageUrl(item.image_path)}
                            alt={item.title}
                            className="w-full h-full object-contain object-right-bottom translate-x-[8%] translate-y-[8%] scale-[1.7] origin-bottom-right transition-transform duration-500 group-hover:scale-[1.75] group-hover:translate-x-[6%] group-hover:translate-y-[6%]"
                          />
                        </div>
                      ) : (
                        /* Fallback outline graphic helper based on indices */
                        <div className="absolute bottom-4 right-4 w-28 h-28 z-0 text-emerald-600/25 group-hover:text-emerald-600/50 group-hover:scale-105 transition-all duration-500 flex items-end justify-end pointer-events-none">
                          {i % 4 === 0 && <Cpu className="w-full h-full stroke-[1.25]" />}
                          {i % 4 === 1 && <Globe className="w-full h-full stroke-[1.25]" />}
                          {i % 4 === 2 && <Smile className="w-full h-full stroke-[1.25]" />}
                          {i % 4 === 3 && <Sparkles className="w-full h-full stroke-[1.25]" />}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200/60 border-dashed rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
                  <p className="text-sm text-slate-500 font-semibold">{t('Belum ada layanan premium yang tersedia saat ini.')}</p>
                </div>
              )}
            </div>
          </section>
        )

      case 'work_steps':
        return (
          <section key="work_steps" id="work_steps" className="py-24 bg-white w-full border-b border-slate-200/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Centered Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100/60 border border-emerald-200/50 text-emerald-800 text-xs font-extrabold tracking-wide uppercase">
                  {t('Cara Kerja')}
                </span>
                <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {renderFormattedText(site_config.work_steps_title || 'How We Work', true, lang)}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
                  {renderFormattedText(site_config.work_steps_subtitle || 'A seamless process designed to save you time and ensure top-quality results', false, lang)}
                </p>
              </div>

              {/* 2x2 Grid of Work Steps Cards with internal borders */}
              {work_steps.length > 0 ? (
                <div className="grid md:grid-cols-2 border border-slate-200/60 rounded-3xl overflow-hidden max-w-5xl mx-auto bg-white shadow-sm divide-y md:divide-y-0">
                  {work_steps.map((step, i) => {
                    // Border classes mapping for clean grid borders
                    let borderClasses = "border-slate-200/60 flex flex-col group ";
                    if (i > 0) {
                      borderClasses += "border-t ";
                    }
                    if (i % 2 !== 0) {
                      borderClasses += "md:border-l ";
                    }
                    if (i >= 2) {
                      borderClasses += "md:border-t ";
                    } else {
                      borderClasses += "md:border-t-0 ";
                    }

                    return (
                      <div
                        key={i}
                        className={borderClasses}
                      >
                        {/* Top Half: Illustration Area with light background */}
                        <div className="bg-slate-50/40 py-12 px-8 flex items-center justify-center min-h-[240px]">
                          {getImageUrl(step.image_path) ? (
                            <div className="relative w-48 h-48 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center overflow-hidden shadow-inner">
                              <img
                                src={getImageUrl(step.image_path)}
                                alt={step.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          ) : (
                            <div className="relative w-48 h-48 flex items-center justify-center scale-95 md:scale-100">
                              {/* Outer dashed orbit circle */}
                              <div className="absolute inset-4 rounded-full border border-dashed border-emerald-600/10 animate-[spin_80s_linear_infinite]"></div>
                              {/* Inner orbit circle */}
                              <div className="absolute inset-10 rounded-full border border-emerald-600/10"></div>
                              
                              {/* Central green circle */}
                              <div className="relative w-20 h-20 rounded-full bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/15 z-10 transition-transform duration-500 group-hover:scale-105">
                                {i === 0 && <User className="w-9 h-9 text-white stroke-[1.75]" />}
                                {i === 1 && <Layout className="w-9 h-9 text-white stroke-[1.75]" />}
                                {i === 2 && <Shield className="w-9 h-9 text-white stroke-[1.75]" />}
                                {i === 3 && <Cpu className="w-9 h-9 text-white stroke-[1.75]" />}
                                {i > 3 && <Sparkles className="w-9 h-9 text-white stroke-[1.75]" />}
                              </div>

                              {/* Satellite Orbit Box 1 (Top Left) */}
                              <div className="absolute top-2 left-2 p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm z-20 transition-transform duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
                                {i === 0 && <Calendar className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                                {i === 1 && <Layers className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                                {i === 2 && <Phone className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                                {i === 3 && <Briefcase className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                                {i > 3 && <Check className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                              </div>

                              {/* Satellite Orbit Box 2 (Top Right) */}
                              <div className="absolute top-4 right-4 p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm z-20 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                                {i === 0 && <MessageSquare className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                                {i === 1 && <Cpu className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                                {i === 2 && <Mail className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                                {i === 3 && <Zap className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                                {i > 3 && <Settings className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                              </div>

                              {/* Satellite Orbit Box 3 (Bottom Right/Left) */}
                              <div className="absolute bottom-2 right-6 p-2.5 bg-white border border-slate-100 rounded-xl shadow-sm z-20 transition-transform duration-500 group-hover:translate-x-1 group-hover:translate-y-1">
                                {i === 0 && <Check className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                                {i === 1 && <MousePointer className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                                {i === 2 && <Clock className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                                {i === 3 && <Send className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                                {i > 3 && <Award className="w-5 h-5 text-emerald-650 stroke-[1.5]" />}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Bottom Half: Left-Aligned Text Content */}
                        <div className="bg-white p-8 sm:p-10 space-y-3 text-left flex-1 border-t border-slate-100">
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {t(step.title)}
                          </h3>
                          <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-normal">
                            {t(step.description)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-slate-50 border border-slate-200/60 border-dashed rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
                  <p className="text-sm text-slate-500 font-semibold">{t('Belum ada langkah cara kerja yang ditambahkan saat ini.')}</p>
                </div>
              )}
            </div>
          </section>
        )

      case 'about':
        return (
          <section key="about" id="about" className="py-24 bg-white w-full border-b border-slate-200/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase">{t('Tentang Kami')}</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  {renderFormattedText(site_config.about_title || 'Innovation meets precision.', true, lang)}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed font-normal">
                  {renderFormattedText(site_config.about_subtitle || 'Welcome to Fourplusone. We are a premier IT Software House dedicated to bridging the gap between complex business needs and elegant digital experiences.', false, lang)}
                </p>
              </div>

              {about_items.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {about_items.map((item, i) => (
                    <div
                      key={i}
                      className="group bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full text-left"
                    >
                      {getImageUrl(item.image_path) ? (
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                          <img
                            src={getImageUrl(item.image_path)}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        /* Default mock vector graphic illustration */
                        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-tr from-emerald-600/10 to-teal-500/10 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-all duration-500">
                          <Award className="w-12 h-12" />
                        </div>
                      )}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-2">
                        <div className="space-y-1">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {t(item.title)}
                          </h3>
                          <p className="text-sm text-slate-500 leading-relaxed font-normal">
                            {t(item.description)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-slate-200/60 border-dashed rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
                  <p className="text-sm text-slate-500 font-semibold">{t('Belum ada konten Tentang Kami saat ini.')}</p>
                </div>
              )}
            </div>
          </section>
        )

      case 'benefits':
        return (
          <section key="benefits" id="benefits" className="py-20 bg-[#FAF6F0] border-y border-slate-200/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                {/* Left Side: Mockup Illustration */}
                <div className="lg:col-span-5 flex justify-center lg:order-last">
                  <div className="relative w-full max-w-sm">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-600/10 to-teal-500/10 rounded-3xl filter blur-xl opacity-70"></div>
                    
                    {getImageUrl(why_choose_us.image_path) ? (
                      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
                        <img
                          src={getImageUrl(why_choose_us.image_path)}
                          alt="Benefit Side Flyer Mockup"
                          className="w-full h-auto rounded-xl object-cover"
                        />
                      </div>
                    ) : (
                      /* High Fidelity benefits folder flyer mockup graphic */
                      <div className="relative w-full aspect-[3/4] rounded-2xl border border-slate-200/80 bg-white shadow-2xl p-6 flex flex-col justify-between overflow-hidden group">
                        <div className="flex-1 flex flex-col justify-center gap-6">
                          <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-lg bg-emerald-505/10 flex items-center justify-center text-emerald-600">
                              <Award className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-800">{t('Cetak Kualitas HD')}</h4>
                              <p className="text-xs text-slate-500">{t('Warna cemerlang & akurat 99%.')}</p>
                            </div>
                          </div>
                          <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-600">
                              <Clock className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-800">{t('Express Delivery')}</h4>
                              <p className="text-xs text-slate-500">{t('Pengerjaan tepat waktu sesuai deadline.')}</p>
                            </div>
                          </div>
                          <div className="flex gap-4 items-start">
                            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                              <ThumbsUp className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-800">{t('Layanan Terbaik')}</h4>
                              <p className="text-xs text-slate-500">{t('Gratis revisi setup file cetak.')}</p>
                            </div>
                          </div>
                        </div>

                        <div className="border-t border-slate-100 pt-4 text-center">
                          <span className="text-xs font-bold text-emerald-600">PrintHub Printing House</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Features Checklist */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  <span className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase">{t('Keunggulan')}</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {t(why_choose_us.title)}
                  </h2>
                  <p className="text-base text-slate-600 leading-relaxed font-normal">
                    {t(why_choose_us.subtitle)}
                  </p>

                  <div className="space-y-4 pt-4">
                    {why_choose_us.features && why_choose_us.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-left">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 stroke-[3]" />
                        </div>
                        <span className="text-sm font-extrabold text-slate-900">{t(feature)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )

      case 'portfolio':
        return (
          <section key="portfolio" id="portfolio" className="py-24 bg-[#FCFAF7] border-b border-slate-200/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
                <span className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase">{t('Portofolio')}</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {renderFormattedText(site_config.portfolio_title || 'Hasil Cetakan Terbaik Kami', true, lang)}
                </h2>
                <p className="text-base text-slate-600">
                  {renderFormattedText(site_config.portfolio_subtitle || 'Berikut adalah beberapa galeri foto produk cetakan yang telah diselesaikan untuk klien-klien kami yang puas.', false, lang)}
                </p>
              </div>

              {/* Categories Tab Filters */}
              {portfolios.length > 0 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                  {portfolioCategories.map((cat, i) => (
                    <button
                      key={i}
                      onClick={() => setActivePortfolioTab(cat)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold tracking-tight transition-all duration-200 border ${
                        activePortfolioTab === cat
                          ? "bg-emerald-600 border-emerald-600 text-white shadow-md shadow-emerald-600/10"
                          : "bg-white border-slate-200 text-slate-600 hover:border-emerald-600 hover:text-emerald-600"
                      }`}
                    >
                      {t(cat)}
                    </button>
                  ))}
                </div>
              )}

              {/* Portfolio Dynamic Grid */}
              {portfolios.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredPortfolios.map((portfolio, i) => (
                    <div
                      key={i}
                      className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 aspect-[4/3] bg-slate-100"
                    >
                      <img
                        src={getImageUrl(portfolio.image_path)}
                        alt={portfolio.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 space-y-2">
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{t(portfolio.category)}</span>
                        <h3 className="text-white text-base font-extrabold tracking-tight">{t(portfolio.title)}</h3>
                        <div className="pt-2">
                          <a
                            href={getWhatsAppLink(t(`Halo PrintHub, saya tertarik dengan hasil cetakan portofolio "${portfolio.title}". Bisakah saya cetak custom yang mirip?`))}
                            target="_blank"
                            rel="noreferrer"
                            className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md tracking-wider uppercase inline-flex items-center gap-1.5"
                          >
                            <span>{t('Tanya Cetak')}</span>
                            <ChevronRight className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* Empty / skeleton layout invitation */
                <div className="bg-white border border-slate-200/60 border-dashed rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <Printer className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{t('Portofolio Sedang Diperbarui')}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-normal">
                    {t('Kami sedang memperbarui galeri cetakan digital terbaru kami. Hubungi admin kami untuk melihat katalog foto sampel cetakan stiker, brosur, atau banner lengkap!')}
                  </p>
                  <a
                    href={getWhatsAppLink(t("Halo PrintHub, saya ingin meminta katalog foto hasil cetakan sampel stiker & brosur."))}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md tracking-wider uppercase"
                  >
                    <Phone className="w-4 h-4 fill-white" />
                    <span>{t('Minta Katalog Sampel')}</span>
                  </a>
                </div>
              )}
            </div>
          </section>
        )

      case 'timeline':
        return (
          <section key="timeline" id="timeline" className="py-24 bg-[#FAF6F0] border-y border-slate-200/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
                <span className="text-xs font-extrabold tracking-widest text-emerald-650 uppercase">{t('Proses Kerja')}</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {renderFormattedText(site_config.order_steps_title || 'Cara Pemesanan Sangat Mudah', true, lang)}
                </h2>
                <p className="text-base text-slate-600">
                  {renderFormattedText(site_config.order_steps_subtitle || 'Cukup selesaikan 4 langkah mudah berikut untuk mewujudkan ide Anda dalam hasil cetak siap pakai.', false, lang)}
                </p>
              </div>

              {/* Timeline Grid Connector */}
              <div className="relative pt-6">
                {/* Desktop Connector Line */}
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-emerald-600/10 -translate-y-1/2 hidden lg:block -z-10"></div>
                
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {order_steps.map((step, i) => (
                    <div
                      key={i}
                      className="bg-white border border-emerald-600/20 rounded-2xl p-6 shadow-sm flex flex-col items-center text-center h-full group hover:border-emerald-600 hover:shadow-xl transition-all duration-300 relative pt-10"
                    >
                      {/* Step Icon Container (Centered & Offset top) */}
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-105 transition-transform">
                        {renderIcon(step.icon, "w-6 h-6")}
                      </div>

                      <div className="space-y-3 flex-1 flex flex-col justify-between w-full">
                        <div className="space-y-2">
                          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                            {t(step.title)}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed font-normal">
                            {t(step.description)}
                          </p>
                        </div>

                        {step.step_number === 1 && (
                          <div className="pt-4 border-t border-slate-100 mt-4 w-full">
                            <a
                              href={getWhatsAppLink(t("Halo PrintHub, saya ingin melakukan konsultasi cetak custom."))}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 justify-center w-full"
                            >
                              <span>{t('Hubungi WhatsApp')}</span>
                              <ChevronRight className="w-4 h-4" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )

      case 'testimonials':
        return (
          <section key="testimonials" id="testimonials" className="py-24 bg-[#FCFAF7] border-b border-slate-200/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <span className="text-xs font-extrabold tracking-widest text-emerald-650 uppercase">{t('Testimoni')}</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                  {renderFormattedText(site_config.testimonials_title || 'Apa Kata Pelanggan Setia Kami', true, lang)}
                </h2>
                <p className="text-base text-slate-600">
                  {renderFormattedText(site_config.testimonials_subtitle || 'Kelegaan dan kepuasan pelanggan adalah komitmen utama kami. Simak penilaian langsung mereka.', false, lang)}
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((test, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-100/80 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-emerald-500/10 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Stars Component */}
                      <div className="flex gap-1 text-amber-400">
                        {Array.from({ length: 5 }).map((_, starIndex) => (
                          <Star
                            key={starIndex}
                            className={`w-5 h-5 ${starIndex < test.stars ? "fill-amber-400 text-amber-400" : "text-slate-200"}`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {t(test.content)}
                      </p>
                    </div>

                    <div className="pt-4 mt-4">
                      <h4 className="text-sm font-extrabold text-slate-950">{t(test.client_name)}</h4>
                      <p className="text-xs font-semibold text-slate-500">{t(test.client_role) || t('Customer')}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mt-10">
                <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                <span className="w-2 h-2 rounded-full bg-slate-300"></span>
              </div>
            </div>
          </section>
        )

      case 'cta':
        return (
          <section key="cta" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 mt-24">
            <div className="bg-emerald-950 rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 to-teal-500/10 mix-blend-overlay"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  {t(cta_section.title) || t('Siap Mencetak Ide Anda?')}
                </h2>
                <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
                  {t(cta_section.subtitle) || t('Yuk, mulai konsultasi gratis dengan tim ahli kami untuk mendapatkan hasil terbaik untuk bisnismu!')}
                </p>
                
                <div className="flex flex-wrap justify-center gap-4 pt-4">
                  <a
                    href={resolveButtonUrl(cta_section.btn_url, 'whatsapp')}
                    target={getButtonTarget(cta_section.btn_url)}
                    rel={getButtonRel(cta_section.btn_url)}
                    className="px-8 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold text-sm shadow-md tracking-wider uppercase transition-all hover:scale-105 active:scale-95"
                  >
                    {t(cta_section.btn_text) || t('Pesan Sekarang')}
                  </a>
                  {isSectionActive('services') && (
                    <a
                      href="#services"
                      className="px-8 py-3.5 rounded-xl bg-transparent border-2 border-white hover:bg-white/10 text-white font-extrabold text-sm tracking-wider uppercase transition-all"
                    >
                      {t('Lihat Layanan')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </section>
        )

      case 'news':
        return (
          <section key="news" id="news" className="py-24 bg-slate-50 w-full border-b border-slate-200/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div className="space-y-4 max-w-3xl text-left">
                  <span className="text-xs font-extrabold tracking-widest text-emerald-650 uppercase">{t('Kabar Terbaru')}</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {t(site_config.news_title) || t('Berita & Informasi Terkini')}
                  </h2>
                  <p className="text-base text-slate-600">
                    {t(site_config.news_subtitle) || t('Ikuti perkembangan terbaru mengenai layanan, promo, and tips seputar percetakan digital kami.')}
                  </p>
                </div>
                {news.length > 0 && (
                  <button
                    onClick={navigateToNewsList}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/20 text-slate-700 hover:text-emerald-700 font-bold text-sm cursor-pointer transition-all h-11 bg-white shadow-sm self-start md:self-end"
                  >
                    <span>{t('Lihat Semua Berita')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {news.length > 0 ? (
                <div className="relative group">
                  {/* Left Floating Chevron */}
                  {news.length > itemsPerView && (
                    <button
                      onClick={() => setNewsStartIndex(prev => Math.max(0, prev - 1))}
                      disabled={newsStartIndex === 0}
                      className="absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/60 shadow-lg flex items-center justify-center text-slate-700 hover:text-emerald-600 hover:bg-white disabled:opacity-0 disabled:pointer-events-none transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  )}

                  {/* Right Floating Chevron */}
                  {news.length > itemsPerView && (
                    <button
                      onClick={() => setNewsStartIndex(prev => Math.min(news.length - itemsPerView, prev + 1))}
                      disabled={newsStartIndex >= news.length - itemsPerView}
                      className="absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/60 shadow-lg flex items-center justify-center text-slate-700 hover:text-emerald-600 hover:bg-white disabled:opacity-0 disabled:pointer-events-none transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer"
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}

                  <div className="overflow-hidden -mx-3 px-3 py-2">
                    <div 
                      className="flex flex-nowrap -mx-3 transition-transform duration-500 ease-in-out"
                      style={{ transform: `translate3d(-${newsStartIndex * (100 / itemsPerView)}%, 0, 0)` }}
                    >
                      {news.map((item, i) => (
                        <div key={i} className="w-full md:w-1/2 lg:w-1/3 px-3 flex-shrink-0">
                          <article className="bg-white border border-slate-100/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group text-left">
                            <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                              {item.thumbnail ? (
                                <img
                                  src={getImageUrl(item.thumbnail)}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-200 font-bold">{t('No Image')}</div>
                              )}
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                              <div className="space-y-2">
                                <span className="text-[10px] font-bold text-slate-400 block">{new Date(item.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                <h3 
                                  onClick={() => navigateToNewsDetail(item.slug)}
                                  className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
                                >
                                  {t(item.title)}
                                </h3>
                              </div>
                              <button
                                onClick={() => navigateToNewsDetail(item.slug)}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-750 group-hover:translate-x-0.5 cursor-pointer transition-all self-start"
                              >
                                <span>{t('Baca Selengkapnya')}</span>
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-200/60 border-dashed rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
                  <p className="text-sm text-slate-500 font-semibold">{t('Belum ada berita yang diterbitkan saat ini.')}</p>
                </div>
              )}
            </div>
          </section>
        )

      case 'activities':
        return (
          <section key="activities" id="activities" className="py-24 bg-[#FAF6F0] w-full border-b border-slate-200/40">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
                <div className="space-y-4 max-w-3xl text-left">
                  <span className="text-xs font-extrabold tracking-widest text-emerald-650 uppercase">{t('Kegiatan Kami')}</span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {t(site_config.activities_title) || t('Aktifitas & Dokumentasi')}
                  </h2>
                  <p className="text-base text-slate-600">
                    {t(site_config.activities_subtitle) || t('Dokumentasi portofolio kerja, kesibukan tim cetak, serta event penting yang kami hadiri.')}
                  </p>
                </div>
                {activities.length > 0 && (
                  <button
                    onClick={navigateToActivitiesList}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 hover:border-emerald-650 hover:bg-emerald-50/20 text-slate-700 hover:text-emerald-700 font-bold text-sm cursor-pointer transition-all h-11 bg-white shadow-sm self-start md:self-end"
                  >
                    <span>{t('Lihat Semua Aktifitas')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>

              {activities.length > 0 ? (
                <div className="relative group">
                  {/* Left Floating Chevron */}
                  {activities.length > itemsPerView && (
                    <button
                      onClick={() => setActivitiesStartIndex(prev => Math.max(0, prev - 1))}
                      disabled={activitiesStartIndex === 0}
                      className="absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/60 shadow-lg flex items-center justify-center text-slate-700 hover:text-emerald-600 hover:bg-white disabled:opacity-0 disabled:pointer-events-none transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer"
                      aria-label="Previous Slide"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                  )}

                  {/* Right Floating Chevron */}
                  {activities.length > itemsPerView && (
                    <button
                      onClick={() => setActivitiesStartIndex(prev => Math.min(activities.length - itemsPerView, prev + 1))}
                      disabled={activitiesStartIndex >= activities.length - itemsPerView}
                      className="absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/60 shadow-lg flex items-center justify-center text-slate-700 hover:text-emerald-600 hover:bg-white disabled:opacity-0 disabled:pointer-events-none transition-all duration-300 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 cursor-pointer"
                      aria-label="Next Slide"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  )}

                  <div className="overflow-hidden -mx-3 px-3 py-2">
                    <div 
                      className="flex flex-nowrap -mx-3 transition-transform duration-500 ease-in-out"
                      style={{ transform: `translate3d(-${activitiesStartIndex * (100 / itemsPerView)}%, 0, 0)` }}
                    >
                      {activities.map((item, i) => (
                        <div key={i} className="w-full md:w-1/2 lg:w-1/3 px-3 flex-shrink-0">
                          <article className="bg-white border border-slate-100/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group text-left">
                            <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                              {item.thumbnail ? (
                                <img
                                  src={getImageUrl(item.thumbnail)}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-200 font-bold">{t('No Image')}</div>
                              )}
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                              <div className="space-y-2">
                                <span className="text-[10px] font-bold text-slate-400 block">{new Date(item.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                <h3 
                                  onClick={() => navigateToActivityDetail(item.slug)}
                                  className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
                                >
                                  {t(item.title)}
                                </h3>
                              </div>
                              <button
                                onClick={() => navigateToActivityDetail(item.slug)}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-750 group-hover:translate-x-0.5 cursor-pointer transition-all self-start"
                              >
                                <span>{t('Lihat Detail')}</span>
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </article>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-200/60 border-dashed rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4">
                  <p className="text-sm text-slate-500 font-semibold">{t('Belum ada aktifitas yang didokumentasikan saat ini.')}</p>
                </div>
              )}
            </div>
          </section>
        )

      case 'contact':
        return renderContactForm()

      case 'branches':
        return renderBranchesSection()

      default:
        return null
    }
  }

  const renderContactForm = () => {
    return (
      <section id="contact" className="py-24 bg-slate-50 w-full border-t border-slate-200/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-stretch">
            {/* Left side: Contact Info Card */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-emerald-950 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-teal-500/10 mix-blend-overlay"></div>
              
              <div className="relative z-10 space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-extrabold tracking-widest text-emerald-400 uppercase">{t('contact_us')}</span>
                  <h2 className="text-3xl font-extrabold tracking-tight">{t(site_config.contact_title) || t('Kirimkan Pesan atau Konsultasi Gratis')}</h2>
                  <p className="text-sm text-emerald-100/80 leading-relaxed font-normal">
                    {t(site_config.contact_subtitle) || t('Punya pertanyaan mengenai bahan, ukuran cetakan, atau ingin mendiskusikan pesanan khusus (custom)? Isi formulir, tim ahli kami akan segera menghubungi Anda.')}
                  </p>
                </div>

                <div className="space-y-6">
                  {site_config.address && (
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-emerald-800/60 border border-emerald-700/50 flex items-center justify-center text-emerald-300 flex-shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{t('address')}</h4>
                        <p className="text-xs text-emerald-100/70 mt-1">{t(site_config.address)}</p>
                      </div>
                    </div>
                  )}

                  {site_config.email && (
                    <div className="flex gap-4 items-start">
                      <div className="w-10 h-10 rounded-xl bg-emerald-800/60 border border-emerald-700/50 flex items-center justify-center text-emerald-300 flex-shrink-0">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{t('our_email')}</h4>
                        <a href={`mailto:${site_config.email}`} className="text-xs text-emerald-100/70 hover:text-white transition-colors mt-1 block">
                          {site_config.email}
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-emerald-800/60 border border-emerald-700/50 flex items-center justify-center text-emerald-300 flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{t('wa_admin')}</h4>
                      <a href={getWhatsAppLink("Halo, saya ingin bertanya lebih lanjut...")} target="_blank" rel="noreferrer" className="text-xs text-emerald-100/70 hover:text-white transition-colors mt-1 block">
                        +{site_config.whatsapp_number}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-8 border-t border-emerald-800/30 mt-8 flex items-center justify-end text-xs text-emerald-300/60">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {t('online_realtime')}
                </span>
              </div>
            </div>

            {/* Right side: Interactive Form Card */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-sm flex flex-col justify-between">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="contact_name" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    {t('full_name')} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      id="contact_name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder={t('enter_full_name')}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm transition-all bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact_phone" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    {t('wa_phone_number')} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      id="contact_phone"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder={t('example_phone')}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm transition-all bg-slate-50/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="contact_message" className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                    {t('your_message')} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="contact_message"
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    placeholder={t('message_placeholder')}
                    rows="4"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm transition-all bg-slate-50/50 resize-y"
                  ></textarea>
                </div>

                {contactError && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-xs font-semibold animate-in fade-in duration-200">
                    {t(contactError)}
                  </div>
                )}

                {contactSuccess && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs font-semibold animate-in fade-in duration-200">
                    {t(contactSuccess)}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={contactLoading}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/15 hover:shadow-emerald-600/25 disabled:bg-slate-300 disabled:shadow-none hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  {contactLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t('sending')}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>{t('send_message_now')}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const renderBranchesSection = () => {
    if (branches.length === 0) return null
    const selectedBranch = branches.find(b => b.id === activeBranchId) || branches[0]

    return (
      <section id="branches" className="py-24 bg-slate-50 w-full border-t border-slate-200/40 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 font-sans">
          
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              {t(site_config.branches_badge) || t('Lokasi Cabang', 'Our Branch Locations')}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {t(site_config.branches_title) || t('Temukan Cabang Terdekat Kami', 'Find Our Nearest Branch')}
            </h2>
            <div className="w-16 h-1 bg-emerald-600 mx-auto mt-4 rounded-full"></div>
            <p className="text-base text-slate-600 pt-2">
              {t(site_config.branches_subtitle) || t('Kunjungi gerai fisik kami untuk berkonsultasi langsung atau mengambil pesanan Anda.', 'Visit our physical stores to consult directly or pick up your orders.')}
            </p>
          </div>

          {/* Grid layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch text-left">
            
            {/* Left Column: Branch selector */}
            <div className="lg:col-span-5 flex flex-col gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
              {branches.map((branch) => {
                const isActive = branch.id === selectedBranch?.id
                return (
                  <div
                    key={branch.id}
                    onClick={() => setActiveBranchId(branch.id)}
                    className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isActive
                        ? 'bg-white border-emerald-600 shadow-xl ring-1 ring-emerald-600'
                        : 'bg-white border-slate-200 hover:border-slate-350 hover:shadow-md'
                    }`}
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-extrabold text-slate-900 text-lg">
                          {t(branch.name)}
                        </h3>
                        {isActive && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] text-emerald-700 font-extrabold uppercase">
                            {t('Aktif', 'Active')}
                          </span>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <p className="text-sm text-slate-600 leading-relaxed flex gap-2">
                          <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span>{t(branch.address)}</span>
                        </p>

                        {branch.phone && (
                          <p className="text-sm text-slate-600 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>{branch.phone}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setActiveBranchId(branch.id)
                        }}
                        className={`text-xs font-black transition-colors ${
                          isActive ? 'text-emerald-750' : 'text-slate-500 hover:text-emerald-600'
                        }`}
                      >
                        {t('Lihat di Peta', 'View on Map')}
                      </button>
                      
                      {branch.phone && (
                        <a
                          href={`https://wa.me/${branch.phone.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-600 hover:text-emerald-755 hover:underline"
                        >
                          <Phone className="w-3.5 h-3.5 fill-emerald-600" />
                          <span>WhatsApp</span>
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right Column: Google Maps Iframe */}
            <div className="lg:col-span-7 h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-slate-200 relative bg-slate-100 flex items-center justify-center">
              {selectedBranch ? (
                <iframe
                  title={`Peta ${selectedBranch.name}`}
                  src={`https://maps.google.com/maps?q=${selectedBranch.latitude},${selectedBranch.longitude}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  className="w-full h-full border-0 absolute inset-0"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              ) : (
                <div className="text-slate-400 text-sm font-semibold">
                  {t('Memuat Peta...', 'Loading Map...')}
                </div>
              )}
            </div>

          </div>

        </div>
      </section>
    )
  }

  // Helper to render full News List page
  const renderNewsList = () => {
    const filteredNews = newsList.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left min-h-[60vh] animate-in fade-in duration-300">
        <div className="mb-10 space-y-4">
          <button 
            onClick={goHome} 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-650 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            &larr; {t('back_to_home')}
          </button>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('news_articles_title')}</h1>
          <p className="text-sm text-slate-600">{t('news_articles_subtitle')}</p>
          
          {/* Simple search bar */}
          <div className="pt-2 max-w-md">
            <input
              type="text"
              placeholder={t('search_news')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm transition-all"
            />
          </div>
        </div>

        {listLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        ) : filteredNews.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredNews.map((item, i) => (
              <article key={i} className="bg-white border border-slate-100/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  {item.thumbnail ? (
                    <img
                      src={getImageUrl(item.thumbnail)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-200 font-bold">No Image</div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 block">{new Date(item.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <h2 
                      onClick={() => navigateToNewsDetail(item.slug)}
                      className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {t(item.title)}
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateToNewsDetail(item.slug)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-750 cursor-pointer transition-all self-start"
                  >
                    <span>{t('read_more')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 font-medium">{t('no_news_match')}</p>
          </div>
        )}
      </div>
    )
  }

  // Helper to render full Activities List page
  const renderActivitiesList = () => {
    const filteredActivities = activitiesList.filter(item => 
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left min-h-[60vh] animate-in fade-in duration-300">
        <div className="mb-10 space-y-4">
          <button 
            onClick={goHome} 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-650 hover:text-emerald-600 transition-colors cursor-pointer"
          >
            &larr; {t('back_to_home')}
          </button>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{t('doc_activities_title')}</h1>
          <p className="text-sm text-slate-600">{t('doc_activities_subtitle')}</p>
          
          {/* Simple search bar */}
          <div className="pt-2 max-w-md">
            <input
              type="text"
              placeholder={t('search_activities')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 text-sm transition-all"
            />
          </div>
        </div>

        {listLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        ) : filteredActivities.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredActivities.map((item, i) => (
              <article key={i} className="bg-white border border-slate-100/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                <div className="relative aspect-[16/10] bg-slate-100 overflow-hidden">
                  {item.thumbnail ? (
                    <img
                      src={getImageUrl(item.thumbnail)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400 bg-slate-200 font-bold">No Image</div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-slate-400 block">{new Date(item.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    <h2 
                      onClick={() => navigateToActivityDetail(item.slug)}
                      className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {t(item.title)}
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateToActivityDetail(item.slug)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-750 cursor-pointer transition-all self-start"
                  >
                    <span>{t('view_details')}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-500 font-medium">{t('no_activities_match')}</p>
          </div>
        )}
      </div>
    )
  }

  // Helper to render Detail View page for news and activities
  const renderDetail = () => {
    if (detailLoading) {
      return (
        <div className="flex justify-center items-center min-h-[60vh]">
          <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
        </div>
      )
    }

    if (!detailItem) {
      return (
        <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
          <p className="text-slate-500 text-lg font-semibold">{t('content_not_found')}</p>
          <button onClick={goHome} className="px-6 py-2.5 rounded-xl bg-emerald-605 hover:bg-emerald-700 text-white font-bold text-sm cursor-pointer transition-all shadow-md">
            {t('back_to_home_main')}
          </button>
        </div>
      )
    }

    const isNews = currentPage === 'news-detail'
    const backAction = isNews ? navigateToNewsList : navigateToActivitiesList

    return (
      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-12 text-left animate-in fade-in duration-300 break-words">
        <div className="mb-8 space-y-4">
          <button 
            onClick={backAction} 
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-750 transition-colors cursor-pointer"
          >
            &larr; {t('back_to_list')}
          </button>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
            {t(detailItem.title)}
          </h1>

          <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase tracking-wide">
              {isNews ? t('news') : t('activities')}
            </span>
            <span>&bull;</span>
            <span>{new Date(detailItem.created_at).toLocaleDateString(lang === 'en' ? 'en-US' : 'id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          </div>
        </div>

        {detailItem.thumbnail && (
          <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-slate-200/50 bg-slate-100 max-h-[500px]">
            <img 
              src={getImageUrl(detailItem.thumbnail)} 
              alt={detailItem.title}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        <div className="bg-white border border-slate-200/60 rounded-3xl p-8 sm:p-10 shadow-sm mb-12 overflow-hidden">
          <div 
            className="html-content break-words"
            dangerouslySetInnerHTML={{ __html: translateText(detailItem.description, lang) }} 
          />
        </div>

        <div className="border-t border-slate-200 pt-8 flex items-center justify-between">
          <button 
            onClick={backAction} 
            className="px-6 py-3 rounded-xl border border-slate-200 hover:border-emerald-600 hover:bg-slate-50 text-slate-700 font-bold text-sm cursor-pointer transition-all"
          >
            &larr; {t('back_to_list')}
          </button>
          
          <a
            href={getWhatsAppLink(t(`Halo, saya membaca artikel "${detailItem.title}" di website Anda dan ingin bertanya mengenai hal ini...`))}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md hover:scale-[1.01] transition-all"
          >
            <MessageSquare className="w-4 h-4 fill-white" />
            <span>{t('ask_admin_wa')}</span>
          </a>
        </div>
      </article>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-emerald-600 selection:text-white">
      
      {/* 1. STICKY HEADER & NAVBAR */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#" onClick={goHome} className="flex items-center gap-3 group">
            {getImageUrl(site_config.logo) ? (
              <img src={getImageUrl(site_config.logo)} alt={site_config.site_name} className="h-10 w-auto object-contain" />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
                ND
              </div>
            )}
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-600 transition-colors">
              {site_config.site_name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" onClick={goHome} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('home')}</a>
            {isSectionActive('about') && <a href="#about" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('about')}</a>}
            {isSectionActive('services') && <a href="#services" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('services')}</a>}
            {isSectionActive('benefits') && <a href="#benefits" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('benefits')}</a>}
            {isSectionActive('portfolio') && <a href="#portfolio" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('portfolio')}</a>}
            {isSectionActive('timeline') && <a href="#timeline" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('timeline')}</a>}
            {isSectionActive('work_steps') && <a href="#work_steps" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('work_steps')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('work_steps')}</a>}
            {isSectionActive('testimonials') && <a href="#testimonials" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('testimonials')}</a>}
            {isSectionActive('news') && <a href="#news" onClick={(e) => { e.preventDefault(); navigateToNewsList(); }} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('news')}</a>}
            {isSectionActive('activities') && <a href="#activities" onClick={(e) => { e.preventDefault(); navigateToActivitiesList(); }} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('activities')}</a>}
            {isSectionActive('branches') && <a href="#branches" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('branches')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('Cabang', 'Branches')}</a>}
            <a href="#contact" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">{t('contact')}</a>
          </nav>

          {/* WhatsApp Header Button & Language Toggle */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => {
                const nextLang = lang === 'id' ? 'en' : 'id';
                setLang(nextLang);
                if (activePortfolioTab === 'Semua' || activePortfolioTab === 'All') {
                  setActivePortfolioTab(nextLang === 'en' ? 'All' : 'Semua');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border border-slate-200 hover:border-emerald-600 text-xs font-bold text-slate-700 hover:text-emerald-700 transition-all shadow-sm active:scale-95 cursor-pointer bg-white"
            >
              <Globe className="w-4 h-4 text-slate-500 hover:text-emerald-600" />
              <span>{lang === 'id' ? 'ID' : 'EN'}</span>
            </button>
            <a
              href={getWhatsAppLink("Halo PrintHub, saya ingin melakukan pemesanan...")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>{t('contact_us')}</span>
            </a>
          </div>

          {/* Mobile Menu Icon */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 p-2 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-2 flex flex-col shadow-inner animate-in fade-in duration-200">
            <a
              href="#"
              onClick={goHome}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              {t('home')}
            </a>
            {isSectionActive('about') && (
              <a
                href="#about"
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('landing'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
              >
                {t('about')}
              </a>
            )}
            {isSectionActive('services') && (
              <a
                href="#services"
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('landing'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
              >
                {t('services')}
              </a>
            )}
            {isSectionActive('benefits') && (
              <a
                href="#benefits"
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('landing'); setTimeout(() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
              >
                {t('benefits')}
              </a>
            )}
            {isSectionActive('portfolio') && (
              <a
                href="#portfolio"
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('landing'); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
              >
                {t('portfolio')}
              </a>
            )}
            {isSectionActive('timeline') && (
              <a
                href="#timeline"
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('landing'); setTimeout(() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
              >
                {t('timeline')}
              </a>
            )}
            {isSectionActive('work_steps') && (
              <a
                href="#work_steps"
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('landing'); setTimeout(() => document.getElementById('work_steps')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
              >
                {t('work_steps')}
              </a>
            )}
            {isSectionActive('testimonials') && (
              <a
                href="#testimonials"
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('landing'); setTimeout(() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
              >
                {t('testimonials')}
              </a>
            )}
            {isSectionActive('news') && (
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigateToNewsList(); }}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
              >
                {t('news')}
              </a>
            )}
            {isSectionActive('activities') && (
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); navigateToActivitiesList(); }}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
              >
                {t('activities')}
              </a>
            )}
            {isSectionActive('branches') && (
              <a
                href="#branches"
                onClick={() => { setMobileMenuOpen(false); setCurrentPage('landing'); setTimeout(() => document.getElementById('branches')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
                className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
              >
                {t('Cabang', 'Branches')}
              </a>
            )}
            <a
              href="#contact"
              onClick={() => { setMobileMenuOpen(false); setCurrentPage('landing'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50); }}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              {t('contact')}
            </a>
            
            {/* Language Selector for Mobile */}
            <div className="flex items-center justify-between px-3 py-2 border-t border-slate-100 mt-2">
              <span className="text-sm font-semibold text-slate-500">Language / Bahasa</span>
              <button
                onClick={() => {
                  const nextLang = lang === 'id' ? 'en' : 'id';
                  setLang(nextLang);
                  if (activePortfolioTab === 'Semua' || activePortfolioTab === 'All') {
                    setActivePortfolioTab(nextLang === 'en' ? 'All' : 'Semua');
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 bg-white"
              >
                <Globe className="w-4 h-4 text-slate-500" />
                <span>{lang === 'id' ? 'ID' : 'EN'}</span>
              </button>
            </div>

            <a
              href={getWhatsAppLink("Halo PrintHub, saya ingin melakukan pemesanan...")}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md"
            >
              <Phone className="w-5 h-5 fill-white" />
              <span>{t('contact_wa')}</span>
            </a>
          </div>
        )}
      </header>

      {currentPage === 'landing' ? (
        sections.map((sec) => sec.is_active && renderSectionByKey(sec.section_key))
      ) : currentPage === 'news-list' ? (
        renderNewsList()
      ) : currentPage === 'activity-list' ? (
        renderActivitiesList()
      ) : (currentPage === 'news-detail' || currentPage === 'activity-detail') ? (
        renderDetail()
      ) : null}

      {/* 9. WhatsApp Sticky Floating Button with Pulse Animation */}
      <a
        href={getWhatsAppLink("Halo PrintHub, saya ingin bertanya tentang cetak custom...")}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all group flex items-center justify-center"
        aria-label="Pesan Instant via WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-600/30 animate-ping group-hover:hidden"></span>
        <MessageSquare className="w-7 h-7 fill-white" />
      </a>

      {/* 10. DYNAMIC FOOTER */}
      <footer className="bg-emerald-950 text-slate-400 border-t border-emerald-900/20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
            {/* Brand block */}
            <div className="lg:col-span-5 space-y-4">
              <a href="#" onClick={goHome} className="flex items-center gap-3 group">
                {getImageUrl(site_config.logo) ? (
                  <img src={getImageUrl(site_config.logo)} alt={site_config.site_name} className="h-10 w-auto object-contain" />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform">
                    ND
                  </div>
                )}
                <span className="text-xl font-bold tracking-tight text-white group-hover:text-emerald-500 transition-colors">
                  {site_config.site_name}
                </span>
              </a>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                {t(site_config?.footer_description || "Menyediakan layanan cetak banner, stiker kemasan, brosur, kartu nama, dan aneka merchandise digital berkualitas tinggi dengan pengerjaan kilat.")}
              </p>
              
              {/* Social links */}
              <div className="flex gap-4 pt-2">
                {site_config.facebook_url && (
                  <a href={site_config.facebook_url} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors" aria-label="Facebook">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                    </svg>
                  </a>
                )}
                {site_config.instagram_url && (
                  <a href={site_config.instagram_url} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors" aria-label="Instagram">
                    <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </a>
                )}
                {site_config.twitter_url && (
                  <a href={site_config.twitter_url} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 text-slate-400 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors" aria-label="Twitter">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Quick Links Block */}
            <div className="lg:col-span-3 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t('navigation')}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" onClick={goHome} className="hover:text-emerald-500 transition-colors">{t('home')}</a></li>
                {isSectionActive('about') && <li><a href="#about" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="hover:text-emerald-500 transition-colors">{t('about')}</a></li>}
                {isSectionActive('services') && <li><a href="#services" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="hover:text-emerald-500 transition-colors">{t('printing_services')}</a></li>}
                {isSectionActive('benefits') && <li><a href="#benefits" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="hover:text-emerald-500 transition-colors">{t('our_advantages')}</a></li>}
                {isSectionActive('portfolio') && <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="hover:text-emerald-500 transition-colors">{t('portfolio')}</a></li>}
                {isSectionActive('timeline') && <li><a href="#timeline" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('timeline')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="hover:text-emerald-500 transition-colors">{t('timeline')}</a></li>}
                {isSectionActive('branches') && <li><a href="#branches" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('branches')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="hover:text-emerald-500 transition-colors">{t('Cabang', 'Branches')}</a></li>}
                {isSectionActive('news') && <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToNewsList(); }} className="hover:text-emerald-500 transition-colors">{t('news')}</a></li>}
                {isSectionActive('activities') && <li><a href="#" onClick={(e) => { e.preventDefault(); navigateToActivitiesList(); }} className="hover:text-emerald-500 transition-colors">{t('activities')}</a></li>}
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); setCurrentPage('landing'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50); }} className="hover:text-emerald-500 transition-colors">{t('contact')}</a></li>
              </ul>
            </div>

            {/* Contact info block */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">{t('contact_us')}</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                {site_config.address && (
                  <li className="flex gap-3 items-start">
                    <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span>{t(site_config.address)}</span>
                  </li>
                )}
                {site_config.email && (
                  <li className="flex gap-3 items-center">
                    <Mail className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <a href={`mailto:${site_config.email}`} className="hover:text-emerald-500 transition-colors">{site_config.email}</a>
                  </li>
                )}
                <li className="flex gap-3 items-center">
                  <Phone className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                  <a href={getWhatsAppLink(t("Halo PrintHub, saya ingin memesan cetakan."))} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">
                    +{site_config.whatsapp_number}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <span>&copy; {new Date().getFullYear()} {site_config.site_name}. All rights reserved.</span>
            <div className="flex gap-4">
              <span>{t('Managed by Four Plus One')}</span>
              <span>&bull;</span>
              <span>{t('Design Premium')}</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
