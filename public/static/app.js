// TA-PARAWIS Frontend JavaScript

let allDestinations = [];

// Load destinations when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadDestinations();
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    // Search input enter key
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchDestinations();
            }
        });
    }

    // Category filter change
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', function() {
            searchDestinations();
        });
    }
}

// Load all destinations
async function loadDestinations() {
    try {
        const response = await fetch('/api/destinations');
        const result = await response.json();
        
        if (result.success) {
            allDestinations = result.data;
            displayDestinations(allDestinations);
        } else {
            console.error('Failed to load destinations');
        }
    } catch (error) {
        console.error('Error loading destinations:', error);
        displayError('Gagal memuat destinasi. Silakan coba lagi.');
    }
}

// Search destinations
async function searchDestinations() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    
    const query = searchInput ? searchInput.value : '';
    const category = categoryFilter ? categoryFilter.value : '';
    
    try {
        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (category) params.append('category', category);
        
        const response = await fetch(`/api/search?${params}`);
        const result = await response.json();
        
        if (result.success) {
            displayDestinations(result.data);
            
            // Update results info
            const resultsInfo = document.getElementById('resultsInfo');
            if (resultsInfo) {
                resultsInfo.textContent = `Menampilkan ${result.total} destinasi`;
            }
        }
    } catch (error) {
        console.error('Error searching destinations:', error);
        displayError('Gagal mencari destinasi. Silakan coba lagi.');
    }
}

// Display destinations
function displayDestinations(destinations) {
    const grid = document.getElementById('destinationGrid');
    if (!grid) return;
    
    if (destinations.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-6xl mb-4">🔍</div>
                <h3 class="text-xl font-semibold mb-2">Tidak ada destinasi ditemukan</h3>
                <p class="text-gray-600">Coba ubah kata kunci pencarian atau filter kategori</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = destinations.map(destination => `
        <div class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-2">
            <div class="relative">
                <img 
                    src="${destination.image}" 
                    alt="${destination.name}"
                    class="w-full h-48 object-cover"
                    onerror="this.src='https://via.placeholder.com/500x300/4F46E5/FFFFFF?text=${encodeURIComponent(destination.name)}'"
                />
                <div class="absolute top-4 right-4 bg-white px-2 py-1 rounded-full text-sm font-semibold">
                    ⭐ ${destination.rating}
                </div>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-2">
                    <h4 class="text-xl font-bold text-gray-800">${destination.name}</h4>
                    <span class="text-lg font-bold text-indigo-600">${destination.price}</span>
                </div>
                <p class="text-gray-600 mb-2">📍 ${destination.location}</p>
                <p class="text-gray-700 mb-4 line-clamp-3">${destination.description}</p>
                <div class="flex justify-between items-center">
                    <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        ${destination.category}
                    </span>
                    <button 
                        onclick="viewDestination(${destination.id})"
                        class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                    >
                        Lihat Detail
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// View destination details
async function viewDestination(id) {
    try {
        const response = await fetch(`/api/destinations/${id}`);
        const result = await response.json();
        
        if (result.success) {
            showDestinationModal(result.data);
        } else {
            alert('Destinasi tidak ditemukan');
        }
    } catch (error) {
        console.error('Error loading destination details:', error);
        alert('Gagal memuat detail destinasi');
    }
}

// Show destination modal
function showDestinationModal(destination) {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.onclick = function(e) {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    };
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="relative">
                <img 
                    src="${destination.image}" 
                    alt="${destination.name}"
                    class="w-full h-64 object-cover rounded-t-lg"
                    onerror="this.src='https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=${encodeURIComponent(destination.name)}'"
                />
                <button 
                    onclick="document.body.removeChild(this.closest('.fixed'))"
                    class="absolute top-4 right-4 bg-white text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
                >
                    ✕
                </button>
            </div>
            <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h2 class="text-2xl font-bold text-gray-800 mb-2">${destination.name}</h2>
                        <p class="text-gray-600 flex items-center">
                            📍 ${destination.location}
                        </p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-bold text-indigo-600 mb-1">${destination.price}</div>
                        <div class="text-yellow-500">⭐ ${destination.rating}/5</div>
                    </div>
                </div>
                
                <div class="mb-4">
                    <span class="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                        ${destination.category}
                    </span>
                </div>
                
                <p class="text-gray-700 mb-6 leading-relaxed">${destination.description}</p>
                
                <div class="flex gap-4">
                    <button 
                        onclick="bookDestination(${destination.id})"
                        class="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition duration-300 font-semibold"
                    >
                        Pesan Sekarang
                    </button>
                    <button 
                        onclick="shareDestination(${destination.id})"
                        class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-300"
                    >
                        Bagikan
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Book destination (placeholder)
function bookDestination(id) {
    alert('Fitur pemesanan akan segera hadir! Silakan hubungi kami melalui kontak yang tersedia.');
}

// Share destination
function shareDestination(id) {
    const destination = allDestinations.find(d => d.id === id);
    if (destination) {
        if (navigator.share) {
            navigator.share({
                title: `${destination.name} - TA-PARAWIS`,
                text: `Jelajahi keindahan ${destination.name} di ${destination.location}`,
                url: window.location.href
            });
        } else {
            const text = `Jelajahi keindahan ${destination.name} di ${destination.location} - ${window.location.href}`;
            navigator.clipboard.writeText(text).then(() => {
                alert('Link telah disalin ke clipboard!');
            }).catch(() => {
                alert(`Bagikan destinasi ini:\n\n${text}`);
            });
        }
    }
}

// Display error message
function displayError(message) {
    const grid = document.getElementById('destinationGrid');
    if (grid) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12">
                <div class="text-6xl mb-4">⚠️</div>
                <h3 class="text-xl font-semibold mb-2 text-red-600">Terjadi Kesalahan</h3>
                <p class="text-gray-600">${message}</p>
                <button 
                    onclick="loadDestinations()" 
                    class="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                    Coba Lagi
                </button>
            </div>
        `;
    }
}

// Make searchDestinations available globally
window.searchDestinations = searchDestinations;

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

console.log('🌴 TA-PARAWIS Tourism Application loaded successfully!');