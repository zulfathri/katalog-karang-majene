document.addEventListener('DOMContentLoaded', () => {
    
    // --- Global Variables ---
    const mapCenter = [-3.5544, 118.9681]; // Titik tengah dari semua stasiun
    let map;
    let benthicChartInstance; // Variabel untuk menyimpan instance chart 1
    let lifeFormChartInstance; // Variabel untuk menyimpan instance chart 2
    
    const modal = document.getElementById("item-details-modal");
    const closeModalButton = document.querySelector(".close-button");
    const stationListContainer = document.getElementById("station-list");
    const toggleListButton = document.getElementById("toggle-list-btn");
    
    // --- Initialization ---
    initMap();
    populateStationList();

    // --- Event Listeners ---
    closeModalButton.onclick = () => {
        modal.style.display = "none";
    };

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    // Event listener BARU untuk tombol collapse sidebar
    toggleListButton.addEventListener('click', () => {
        // Cukup tambahkan/hapus class 'list-collapsed' pada elemen daftar
        stationListContainer.classList.toggle('list-collapsed');
        
        // Ganti teks tombolnya
        if (stationListContainer.classList.contains('list-collapsed')) {
            toggleListButton.textContent = '+';
            toggleListButton.title = 'Bentangkan Daftar';
        } else {
            toggleListButton.textContent = '-';
            toggleListButton.title = 'Ciutkan Daftar';
        }
    });
    // --- Functions ---
    
    /**
     * Inisialisasi peta Leaflet dan tambahkan marker untuk setiap stasiun.
     */
    function initMap() {
        map = L.map('map').setView(mapCenter, 13); // Angka 13 adalah level zoom

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Tambahkan marker untuk setiap stasiun
        stasiunData.forEach(stasiun => {
            const marker = L.marker(stasiun.koordinat).addTo(map);
            
            // Konten popup untuk marker
            const popupContent = `
                <h4>${stasiun.nama}</h4>
                <p><strong>Tutupan Karang (HC):</strong> ${stasiun.tutupanBenthic['CORAL (HC)'].toFixed(2)}%</p>
                <p><strong>Persentase Kerusakan:</strong> ${stasiun.persentaseKerusakan.toFixed(2)}%</p>
                <button class="popup-button" data-id="${stasiun.id}">Lihat Detail</button>
            `;
            
            marker.bindPopup(popupContent);

            // Event listener untuk tombol di dalam popup
            marker.on('popupopen', () => {
                document.querySelector(`.popup-button[data-id="${stasiun.id}"]`).addEventListener('click', () => {
                    displayStasiunDetails(stasiun);
                });
            });
        });
    }

    /**
     * Mengisi sidebar dengan daftar stasiun.
     */
    function populateStationList() {
        stationListContainer.innerHTML = ''; // Bersihkan daftar
        
        stasiunData.forEach(stasiun => {
            const stationItem = document.createElement('div');
            stationItem.className = 'station-item';
            stationItem.innerHTML = `<strong>${stasiun.nama}</strong>`;
            
            // Tambahkan event klik ke item daftar
            stationItem.addEventListener('click', () => {
                displayStasiunDetails(stasiun);
                map.setView(stasiun.koordinat, 15); // Zoom ke stasiun
            });
            
            stationListContainer.appendChild(stationItem);
        });
    }

    /**
     * Menampilkan detail stasiun yang dipilih di modal.
     * @param {object} stasiun - Objek data stasiun dari data.js
     */
    function displayStasiunDetails(stasiun) {
        // Update konten teks modal
        document.getElementById("modal-station-name").textContent = stasiun.nama;
        document.getElementById("modal-interpretation-text").textContent = stasiun.interpretasiEkologis;

        // --- Buat Grafik 1: Tutupan Benthic (Doughnut) ---
        const benthicCtx = document.getElementById('benthicChart').getContext('2d');
        const benthicData = stasiun.tutupanBenthic;
        
        // Hancurkan chart sebelumnya jika ada (mencegah error)
        if (benthicChartInstance) {
            benthicChartInstance.destroy();
        }
        
        benthicChartInstance = new Chart(benthicCtx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(benthicData),
                datasets: [{
                    label: 'Tutupan Benthic (%)',
                    data: Object.values(benthicData),
                    backgroundColor: [
                        '#00796B', // CORAL (HC) - Hijau Tua
                        '#E64A19', // DEAD CORAL (DC) - Merah/Oranye
                        '#303F9F', // SOFT CORAL (SC) - Biru Tua
                        '#689F38', // OTHER BIOTA (OT) - Hijau Muda
                        '#FBC02D', // SAND (S) - Kuning
                        '#616161'  // ROCK (RK) - Abu-abu
                    ],
                    borderColor: '#ffffff',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                        text: 'Komposisi Tutupan Benthic'
                    }
                }
            }
        });

        // --- Buat Grafik 2: Life Form Karang Keras (Bar) ---
        const lifeFormCtx = document.getElementById('lifeFormChart').getContext('2d');
        
        // Filter hanya life form karang keras (HC)
        const coralLifeForms = {};
        const coralKeys = [
            'Acropora Branching (ACB)', 'Acropora Encrusting (ACE)', 'Acropora Submassive (ACS)',
            'Coral Branching (CB)', 'Coral Encrusting (CE)', 'Coral Foliose (CF)',
            'Coral Heliopora (CHL)', 'Coral Massive (CM)', 'Coral Millepora (CME)',
            'Coral Mushroom (CMR)', 'Coral Submassive (CS)'
        ];

        coralKeys.forEach(key => {
            if (stasiun.lifeForm[key] !== undefined && stasiun.lifeForm[key] > 0) { // Hanya tampilkan yg nilainya > 0
                coralLifeForms[key] = stasiun.lifeForm[key];
            }
        });
        
        // Hancurkan chart sebelumnya jika ada
        if (lifeFormChartInstance) {
            lifeFormChartInstance.destroy();
        }
        
        lifeFormChartInstance = new Chart(lifeFormCtx, {
            type: 'bar',
            data: {
                // Ambil singkatan (e.g., "ACB") dari label
                labels: Object.keys(coralLifeForms).map(label => label.match(/\(([^)]+)\)/)[1]), 
                datasets: [{
                    label: 'Tutupan Life Form Karang Keras (%)',
                    data: Object.values(coralLifeForms),
                    backgroundColor: '#00796B', // Warna Hijau Karang
                    borderColor: '#004D40',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                indexAxis: 'y', // Membuatnya jadi horizontal bar chart
                scales: {
                    x: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Persentase Tutupan (%)'
                        }
                    }
                },
                plugins: {
                    legend: {
                        display: false // Sembunyikan legenda karena sudah jelas
                    },
                    title: {
                        display: false,
                        text: 'Komposisi Life Form Karang Keras'
                    }
                }
            }
        });
        
        // Tampilkan modal
        modal.style.display = "block";
    }

});
