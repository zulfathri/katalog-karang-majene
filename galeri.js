document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.getElementById('gallery-grid');

    // Cek jika data ada dan grid ditemukan
    if (galeriData && galleryGrid) {
        
        // Loop melalui setiap item di data galeri
        galeriData.forEach(item => {
            // 1. Buat elemen kartu (card)
            const card = document.createElement('div');
            card.className = 'gallery-card';

            // 2. Buat elemen gambar
            const img = document.createElement('img');
            img.src = item.gambar;
            img.alt = item.nama;

            // 3. Buat kontainer konten teks
            const content = document.createElement('div');
            content.className = 'card-content';

            // 4. Buat judul
            const title = document.createElement('h3');
            title.textContent = item.nama;

            // 5. Buat paragraf deskripsi
            const description = document.createElement('p');
            description.textContent = item.deskripsi;

            // 6. Susun elemen-elemen
            content.appendChild(title);
            content.appendChild(description);
            
            card.appendChild(img);
            card.appendChild(content);

            // 7. Tambahkan kartu ke grid
            galleryGrid.appendChild(card);
        });

    } else {
        galleryGrid.innerHTML = "<p>Gagal memuat data galeri.</p>";
    }
});