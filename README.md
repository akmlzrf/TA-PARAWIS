# TA-PARAWIS - Tourism Application Indonesia 🏝️

## Project Overview
- **Name**: TA-PARAWIS (Tourism Application - Pariwisata Indonesia)
- **Goal**: Platform digital untuk memperkenalkan dan mempromosikan destinasi wisata Indonesia
- **Features**: 
  - Galeri destinasi wisata interaktif
  - Pencarian dan filter destinasi
  - Detail destinasi dengan modal
  - Responsive design untuk mobile dan desktop
  - API endpoints untuk data destinasi

## URLs
- **Development**: https://3000-i4wyadqp5fvvgqerrru3i-6532622b.e2b.dev
- **API Health Check**: https://3000-i4wyadqp5fvvgqerrru3i-6532622b.e2b.dev/api/destinations
- **GitHub**: https://github.com/akmlzrf/TA-PARAWIS

## Tech Stack
- **Framework**: Hono (Edge-first web framework)
- **Runtime**: Cloudflare Workers/Pages
- **Frontend**: HTML, JavaScript (Vanilla), Tailwind CSS
- **Build Tool**: Vite
- **Process Manager**: PM2 (development)

## Data Architecture
- **Data Models**: Tourism destinations with properties (id, name, location, description, image, price, rating, category)
- **Storage**: In-memory data (6 popular Indonesian destinations)
- **API Structure**: RESTful endpoints for destinations and search
- **Categories**: Sejarah & Budaya, Alam & Laut, Budaya & Tradisi, Alam & Danau, Alam & Satwa

## Featured Destinations
1. **Borobudur** - Magelang, Jawa Tengah (Sejarah & Budaya)
2. **Raja Ampat** - Papua Barat (Alam & Laut)
3. **Tana Toraja** - Sulawesi Selatan (Budaya & Tradisi)
4. **Danau Toba** - Sumatera Utara (Alam & Danau)
5. **Bali - Ubud** - Bali (Alam & Budaya)
6. **Komodo Island** - Nusa Tenggara Timur (Alam & Satwa)

## API Endpoints
- `GET /` - Main tourism page
- `GET /api/destinations` - Get all destinations
- `GET /api/destinations/:id` - Get specific destination
- `GET /api/search?q=query&category=category` - Search destinations

## User Guide
1. **Beranda**: Lihat hero section dengan informasi utama tentang pariwisata Indonesia
2. **Pencarian**: Gunakan search bar untuk mencari destinasi berdasarkan nama, lokasi, atau deskripsi
3. **Filter**: Pilih kategori untuk memfilter destinasi berdasarkan jenis wisata
4. **Detail Destinasi**: Klik "Lihat Detail" untuk melihat informasi lengkap dalam modal
5. **Navigasi**: Gunakan menu navigasi untuk melompat ke bagian destinasi, tentang, atau kontak

## Features
### ✅ Currently Implemented
- [x] Responsive tourism website layout
- [x] Interactive destination gallery with cards
- [x] Search functionality by name, location, description
- [x] Category-based filtering
- [x] Destination detail modal with full information
- [x] Share functionality (native share API or clipboard)
- [x] Smooth scrolling navigation
- [x] Mobile-optimized design
- [x] API endpoints for destinations and search
- [x] Error handling and loading states
- [x] Indonesian localization

### 🚧 Not Yet Implemented
- [ ] Real booking functionality (currently shows placeholder)
- [ ] User authentication and accounts
- [ ] Payment processing integration
- [ ] Review and rating system
- [ ] Admin panel for destination management
- [ ] Database integration (currently using mock data)
- [ ] Image upload and management
- [ ] Multi-language support (English, other languages)

## Development Commands
```bash
# Install dependencies
npm install

# Build project
npm run build

# Start development server (sandbox)
pm2 start ecosystem.config.cjs

# Test application
curl http://localhost:3000

# Check logs
pm2 logs ta-parawis --nostream

# Stop application
pm2 stop ta-parawis
```

## Deployment
- **Platform**: Ready for Cloudflare Pages deployment
- **Status**: ✅ Active (Development)
- **Build Output**: `dist/` directory with optimized assets
- **Last Updated**: August 14, 2024

## Recommended Next Steps
1. **Database Integration**: Implement Cloudflare D1 for persistent data storage
2. **Admin Panel**: Create management interface for destinations
3. **User System**: Add authentication and user profiles
4. **Booking System**: Implement real reservation functionality
5. **Payment Gateway**: Integrate payment processing
6. **Content Management**: Add CMS for easy content updates
7. **SEO Optimization**: Enhance meta tags and schema markup
8. **Analytics**: Add visitor tracking and engagement metrics

## Development Notes
- Uses modern web standards and edge computing
- Optimized for fast loading and global distribution
- Responsive design tested on multiple screen sizes
- API follows RESTful conventions
- Code is well-structured and maintainable

---
**Created with ❤️ for Indonesian Tourism**