import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'

const app = new Hono()

// Enable CORS for API
app.use('/api/*', cors())

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))

// Use renderer for HTML pages
app.use(renderer)

// Mock data untuk destinasi wisata Indonesia
const destinations = [
  {
    id: 1,
    name: "Borobudur",
    location: "Magelang, Jawa Tengah",
    description: "Candi Buddha terbesar di dunia dengan arsitektur yang memukau dan nilai sejarah tinggi",
    image: "https://images.unsplash.com/photo-1539650116574-75c0c6d73dd3?w=500&h=300&fit=crop",
    price: "Rp 50.000",
    rating: 4.8,
    category: "Sejarah & Budaya"
  },
  {
    id: 2,
    name: "Raja Ampat",
    location: "Papua Barat",
    description: "Surga bawah laut dengan keanekaragaman hayati terkaya di dunia",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500&h=300&fit=crop",
    price: "Rp 2.500.000",
    rating: 4.9,
    category: "Alam & Laut"
  },
  {
    id: 3,
    name: "Tana Toraja",
    location: "Sulawesi Selatan", 
    description: "Budaya unik dengan upacara adat yang spektakuler dan rumah tradisional Tongkonan",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    price: "Rp 1.200.000",
    rating: 4.7,
    category: "Budaya & Tradisi"
  },
  {
    id: 4,
    name: "Danau Toba",
    location: "Sumatera Utara",
    description: "Danau vulkanik terbesar di Indonesia dengan pulau Samosir di tengahnya",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
    price: "Rp 800.000",
    rating: 4.6,
    category: "Alam & Danau"
  },
  {
    id: 5,
    name: "Bali - Ubud",
    location: "Bali",
    description: "Pusat seni dan budaya Bali dengan sawah terasering yang menawan",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=500&h=300&fit=crop",
    price: "Rp 1.500.000",
    rating: 4.8,
    category: "Alam & Budaya"
  },
  {
    id: 6,
    name: "Komodo Island",
    location: "Nusa Tenggara Timur",
    description: "Habitat asli komodo, kadal terbesar di dunia dan situs warisan dunia UNESCO",
    image: "https://images.unsplash.com/photo-1578662011714-0cbe07522553?w=500&h=300&fit=crop",
    price: "Rp 3.000.000",
    rating: 4.9,
    category: "Alam & Satwa"
  }
]

// API Routes
app.get('/api/destinations', (c) => {
  return c.json({ 
    success: true, 
    data: destinations,
    total: destinations.length 
  })
})

app.get('/api/destinations/:id', (c) => {
  const id = parseInt(c.req.param('id'))
  const destination = destinations.find(d => d.id === id)
  
  if (!destination) {
    return c.json({ success: false, message: 'Destinasi tidak ditemukan' }, 404)
  }
  
  return c.json({ success: true, data: destination })
})

app.get('/api/search', (c) => {
  const query = c.req.query('q')?.toLowerCase() || ''
  const category = c.req.query('category')?.toLowerCase() || ''
  
  let results = destinations
  
  if (query) {
    results = results.filter(d => 
      d.name.toLowerCase().includes(query) || 
      d.location.toLowerCase().includes(query) ||
      d.description.toLowerCase().includes(query)
    )
  }
  
  if (category && category !== 'semua') {
    results = results.filter(d => 
      d.category.toLowerCase().includes(category)
    )
  }
  
  return c.json({ 
    success: true, 
    data: results,
    total: results.length,
    query: { search: query, category }
  })
})

// Main page
app.get('/', (c) => {
  return c.render(
    <div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Navigation */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold text-indigo-600">TA-PARAWIS</h1>
                <span className="ml-2 text-sm text-gray-600">Tourism Indonesia</span>
              </div>
              <div className="flex items-center space-x-4">
                <a href="#destinations" className="text-gray-700 hover:text-indigo-600">Destinasi</a>
                <a href="#about" className="text-gray-700 hover:text-indigo-600">Tentang</a>
                <a href="#contact" className="text-gray-700 hover:text-indigo-600">Kontak</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Jelajahi Keindahan Indonesia
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Temukan destinasi wisata menakjubkan di Nusantara, dari Sabang sampai Merauke
            </p>
            <button 
              onClick={() => {document.getElementById('destinations').scrollIntoView({behavior: 'smooth'})}}
              className="bg-white text-indigo-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Mulai Jelajah
            </button>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold text-center mb-6">Cari Destinasi Impian Anda</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  id="searchInput"
                  type="text"
                  placeholder="Cari destinasi, kota, atau daerah..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <select
                  id="categoryFilter"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">Semua Kategori</option>
                  <option value="sejarah">Sejarah & Budaya</option>
                  <option value="alam">Alam & Laut</option>
                  <option value="budaya">Budaya & Tradisi</option>
                  <option value="danau">Alam & Danau</option>
                  <option value="satwa">Alam & Satwa</option>
                </select>
                <button
                  onClick={() => {window.searchDestinations()}}
                  className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
                >
                  Cari
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Destinations Section */}
        <section id="destinations" className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-center mb-12">Destinasi Populer</h3>
            <div id="destinationGrid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Content will be loaded by JavaScript */}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold mb-8">Tentang TA-PARAWIS</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              TA-PARAWIS adalah platform digital yang didedikasikan untuk memperkenalkan dan mempromosikan 
              keindahan destinasi wisata Indonesia. Dari candi bersejarah hingga pantai eksotis, 
              dari gunung yang menjulang hingga budaya yang kaya, kami menghadirkan pengalaman wisata 
              yang tak terlupakan di setiap perjalanan Anda.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">100+</div>
                <p className="text-gray-600">Destinasi Wisata</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">34</div>
                <p className="text-gray-600">Provinsi</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600 mb-2">24/7</div>
                <p className="text-gray-600">Layanan Informasi</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 bg-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 className="text-3xl font-bold mb-8">Hubungi Kami</h3>
            <p className="text-xl mb-8">
              Punya pertanyaan atau butuh rekomendasi destinasi? Kami siap membantu!
            </p>
            <div className="flex flex-col md:flex-row gap-8 justify-center">
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">Email</div>
                <p>info@ta-parawis.com</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">Telepon</div>
                <p>+62 21 1234 5678</p>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold mb-2">WhatsApp</div>
                <p>+62 812 3456 7890</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p>&copy; 2024 TA-PARAWIS. Jelajahi Indonesia dengan Bangga.</p>
          </div>
        </footer>
      </div>

      <script src="/static/app.js"></script>
    </div>
  )
})

export default app
