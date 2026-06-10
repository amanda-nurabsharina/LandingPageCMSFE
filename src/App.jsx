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
  Star,
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Award,
  ThumbsUp,
  Clock,
  Send,
  Loader2
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
  // In production, automatically fallback to the current server origin domain
  return window.location.origin
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
  }
  return icons[iconName] || <Printer className={className} />
}

function App() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activePortfolioTab, setActivePortfolioTab] = useState('Semua')

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800">
        <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mb-4" />
        <p className="text-lg font-medium animate-pulse">Menghubungkan ke database NandaDigital...</p>
      </div>
    )
  }

  // Fallback data in case the API is unreachable (so the frontend still loads beautifully!)
  const landingData = data || {
    site_config: {
      site_name: 'NandaDigital',
      whatsapp_number: '628123456789',
      email: 'info@nandadigital.com',
      address: 'Jl. Percetakan Indah No. 45, Jakarta Selatan',
      facebook_url: '#',
      instagram_url: '#',
      twitter_url: '#',
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
      { step_number: 4, title: 'Selesai', description: 'Hasil cetakan siap diambil atau dikirim langsung ke alamat Anda dengan aman.', icon: 'check' }
    ],
    portfolios: [],
    testimonials: [
      { client_name: 'Rian Diantono', client_role: 'Pemilik Kedai Kopi', stars: 5, content: 'Sangat puas dengan cetakan stiker kemasan cup kopi saya. Warnanya tajam, tidak luntur bila terkena air, dan pengerjaannya sangat cepat!' }
    ]
  }

  const { site_config, hero_section, why_choose_us, statistics, services, order_steps, portfolios, testimonials } = landingData

  // WhatsApp redirection generator
  const getWhatsAppLink = (message = "Halo NandaDigital, saya ingin memesan cetakan...") => {
    const cleanNumber = site_config.whatsapp_number.replace(/\D/g, '')
    return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
  }

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-emerald-600 selection:text-white">
      
      {/* 1. STICKY HEADER & NAVBAR */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-3 group">
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
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Home</a>
            <a href="#services" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Layanan</a>
            <a href="#benefits" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Keunggulan</a>
            <a href="#portfolio" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Portofolio</a>
            <a href="#timeline" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Cara Pesan</a>
            <a href="#testimonials" className="text-sm font-semibold text-slate-600 hover:text-emerald-600 transition-colors">Testimoni</a>
          </nav>

          {/* WhatsApp Header Button */}
          <div className="hidden md:flex items-center">
            <a
              href={getWhatsAppLink("Halo NandaDigital, saya ingin melakukan pemesanan...")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-md shadow-emerald-600/10 hover:shadow-emerald-600/20 active:scale-95 transition-all"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Hubungi Kami</span>
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
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              Home
            </a>
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              Layanan
            </a>
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              Keunggulan
            </a>
            <a
              href="#portfolio"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              Portofolio
            </a>
            <a
              href="#timeline"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              Cara Pesan
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
            >
              Testimoni
            </a>
            <a
              href={getWhatsAppLink("Halo NandaDigital, saya ingin melakukan pemesanan...")}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold shadow-md"
            >
              <Phone className="w-5 h-5 fill-white" />
              <span>Hubungi via WhatsApp</span>
            </a>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-emerald-50/40 via-white to-slate-50">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.emerald.50),white)] opacity-30"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {hero_section.badge && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/60 border border-emerald-200/50 text-emerald-800 text-xs font-extrabold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 animate-pulse" />
                  <span>{hero_section.badge}</span>
                </div>
              )}
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {hero_section.title.split(' ').map((word, i) => (
                  <span key={i} className={i >= 3 ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500 block sm:inline" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h1>

              <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {hero_section.subtitle}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a
                  href={getWhatsAppLink(`Halo NandaDigital, saya tertarik untuk memesan layanan percetakan Anda. Mohon dibantu.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-base font-bold shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <span>{hero_section.primary_btn_text || 'Pesan Sekarang'}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={hero_section.secondary_btn_url || '#services'}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-slate-200 hover:border-emerald-600 hover:bg-emerald-50/30 text-slate-700 hover:text-emerald-700 text-base font-bold hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  {hero_section.secondary_btn_text || 'Layanan Kami'}
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
                      alt="NandaDigital Printing Machine Banner"
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
                      <span className="text-xs font-bold text-slate-400 tracking-wider uppercase">Suppliyam Print Engine</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center relative py-6">
                      <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-xl flex items-center justify-center text-white scale-95 group-hover:scale-100 group-hover:rotate-3 transition-all duration-500">
                        <Printer className="w-16 h-16 animate-bounce" />
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
                      <span className="text-xs font-semibold text-emerald-600">Ready to print</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DYNAMIC STATISTICS BAR */}
      <section className="relative z-10 -mt-10 w-full bg-emerald-800 py-10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat, i) => (
            <div key={i} className="text-center px-4 space-y-1 py-2 sm:py-0">
              <span className="block text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                {stat.value}
              </span>
              <span className="block text-xs font-bold text-emerald-100/90 uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* 4. LAYANAN (SERVICES) SECTION */}
      <section id="services" className="py-24 bg-[#f0f8e8] w-full border-b border-emerald-600/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-extrabold tracking-widest text-emerald-700 uppercase">Layanan Kami</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Solusi Percetakan Cetak Custom Lengkap
            </h2>
            <p className="text-base text-slate-600">
              Kami siap mencetak berbagai produk kebutuhan branding, promosi, dan bisnis Anda dengan mesin berteknologi canggih.
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
                      {service.title}
                    </h3>
                    <p className={`text-sm leading-relaxed font-normal ${isFirst ? 'text-emerald-100/90' : 'text-slate-600'}`}>
                      {service.description}
                    </p>
                  </div>

                  <div className={`pt-6 border-t mt-6 flex items-center justify-between ${isFirst ? 'border-emerald-500/30' : 'border-slate-50'}`}>
                    <a
                      href={getWhatsAppLink(`Halo NandaDigital, saya ingin berkonsultasi tentang cetak custom ${service.title}.`)}
                      target="_blank"
                      rel="noreferrer"
                      className={`inline-flex items-center gap-1 text-xs font-bold ${isFirst ? 'text-white hover:text-emerald-100' : 'text-emerald-600 group-hover:text-emerald-700'}`}
                    >
                      <span>Pesan Sekarang</span>
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

      {/* 5. MENGAPA MEMILIH KAMI (BENEFITS) SECTION */}
      <section id="benefits" className="py-20 bg-slate-100/50 border-y border-slate-200/50">
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
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">Cetak Kualitas HD</h4>
                          <p className="text-xs text-slate-500">Warna cemerlang & akurat 99%.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-600">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">Express Delivery</h4>
                          <p className="text-xs text-slate-500">Pengerjaan tepat waktu sesuai deadline.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                          <ThumbsUp className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">Layanan Terbaik</h4>
                          <p className="text-xs text-slate-500">Gratis revisi setup file cetak.</p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 text-center">
                      <span className="text-xs font-bold text-emerald-600">NandaDigital Printing House</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side: Features Checklist */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <span className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase">Keunggulan</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {why_choose_us.title}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed font-normal">
                {why_choose_us.subtitle}
              </p>

              <div className="space-y-4 pt-4">
                {why_choose_us.features && why_choose_us.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 text-left">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                    <span className="text-sm font-extrabold text-slate-900">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PORTFOLIO GRID SECTION */}
      <section id="portfolio" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase">Portofolio</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hasil Cetakan Terbaik Kami
          </h2>
          <p className="text-base text-slate-600">
            Berikut adalah beberapa galeri foto produk cetakan yang telah diselesaikan untuk klien-klien kami yang puas.
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
                {cat}
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
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">{portfolio.category}</span>
                  <h3 className="text-white text-base font-extrabold tracking-tight">{portfolio.title}</h3>
                  <div className="pt-2">
                    <a
                      href={getWhatsAppLink(`Halo NandaDigital, saya tertarik dengan hasil cetakan portofolio "${portfolio.title}". Bisakah saya cetak custom yang mirip?`)}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md tracking-wider uppercase inline-flex items-center gap-1.5"
                    >
                      <span>Tanya Cetak</span>
                      <ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty / skeleton layout invitation */
          <div className="bg-white border border-slate-200/60 border-dashed rounded-3xl p-12 text-center max-w-xl mx-auto space-y-4 shadow-sm animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
              <Printer className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Portofolio Sedang Diperbarui</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-normal">
              Kami sedang memperbarui galeri cetakan digital terbaru kami. Hubungi admin kami untuk melihat katalog foto sampel cetakan stiker, brosur, atau banner lengkap!
            </p>
            <a
              href={getWhatsAppLink("Halo NandaDigital, saya ingin meminta katalog foto hasil cetakan sampel stiker & brosur.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md tracking-wider uppercase"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Minta Katalog Sampel</span>
            </a>
          </div>
        )}
      </section>

      {/* 7. CARA PEMESANAN (TIMELINE) SECTION */}
      <section id="timeline" className="py-24 bg-slate-50/50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
            <span className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase">Proses Kerja</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Cara Pemesanan Sangat Mudah
            </h2>
            <p className="text-base text-slate-600">
              Cukup selesaikan 4 langkah mudah berikut untuk mewujudkan ide Anda dalam hasil cetak siap pakai.
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
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed font-normal">
                        {step.description}
                      </p>
                    </div>

                    {step.step_number === 1 && (
                      <div className="pt-4 border-t border-slate-100 mt-4 w-full">
                        <a
                          href={getWhatsAppLink("Halo NandaDigital, saya ingin melakukan konsultasi cetak custom.")}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:text-emerald-700 justify-center w-full"
                        >
                          <span>Hubungi WhatsApp</span>
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

      {/* 8. TESTIMONIAL SLIDER/GRID SECTION */}
      <section id="testimonials" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-extrabold tracking-widest text-emerald-600 uppercase">Testimoni</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Apa Kata Pelanggan Setia Kami
          </h2>
          <p className="text-base text-slate-600">
            Kelegaan dan kepuasan pelanggan adalah komitmen utama kami. Simak penilaian langsung mereka.
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
                  {test.content}
                </p>
              </div>

              <div className="pt-4 mt-4">
                <h4 className="text-sm font-extrabold text-slate-950">{test.client_name}</h4>
                <p className="text-xs font-semibold text-slate-500">{test.client_role || 'Customer'}</p>
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
      </section>

      {/* 8.5 DYNAMIC CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="bg-[#295213] rounded-3xl p-12 text-center text-white relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/30 to-teal-500/10 mix-blend-overlay"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Siap Mencetak Ide Anda?
            </h2>
            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-normal">
              Yuk, mulai konsultasi gratis dengan tim ahli kami untuk mendapatkan hasil terbaik untuk bisnismu!
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a
                href={getWhatsAppLink("Halo NandaDigital, saya ingin konsultasi cetak custom.")}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 rounded-xl bg-white hover:bg-emerald-50 text-emerald-950 font-extrabold text-sm shadow-md tracking-wider uppercase transition-all hover:scale-105 active:scale-95"
              >
                Pesan Sekarang
              </a>
              <a
                href="#services"
                className="px-8 py-3.5 rounded-xl bg-transparent border-2 border-white hover:bg-white/10 text-white font-extrabold text-sm tracking-wider uppercase transition-all"
              >
                Lihat Layanan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. WhatsApp Sticky Floating Button with Pulse Animation */}
      <a
        href={getWhatsAppLink("Halo NandaDigital, saya ingin bertanya tentang cetak custom...")}
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
              <a href="#" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-xl shadow-md">
                  ND
                </div>
                <span className="text-xl font-bold tracking-tight text-white">
                  {site_config.site_name}
                </span>
              </a>
              <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
                Menyediakan layanan cetak banner, stiker kemasan, brosur, kartu nama, dan aneka merchandise digital berkualitas tinggi dengan pengerjaan kilat.
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
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navigasi</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-emerald-500 transition-colors">Home</a></li>
                <li><a href="#services" className="hover:text-emerald-500 transition-colors">Layanan Cetak</a></li>
                <li><a href="#benefits" className="hover:text-emerald-500 transition-colors">Keunggulan Kami</a></li>
                <li><a href="#portfolio" className="hover:text-emerald-500 transition-colors">Portofolio</a></li>
              </ul>
            </div>

            {/* Contact info block */}
            <div className="lg:col-span-4 space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Hubungi Kami</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                {site_config.address && (
                  <li className="flex gap-3 items-start">
                    <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span>{site_config.address}</span>
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
                  <a href={getWhatsAppLink("Halo NandaDigital, saya ingin memesan cetakan.")} target="_blank" rel="noreferrer" className="hover:text-emerald-500 transition-colors">
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
              <span>Managed by FourPlusOne</span>
            
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default App
