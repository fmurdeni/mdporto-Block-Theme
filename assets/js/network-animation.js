document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah elemen hero-developer ada
    const heroSection = document.querySelector('.hero-developer');
    if (!heroSection) return;

    // Buat elemen canvas dengan pixel ratio yang benar
    const canvas = document.createElement('canvas');
    canvas.className = 'network-canvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw'; // Menggunakan viewport width
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    canvas.style.left = '50%';
    canvas.style.transform = 'translateX(-50%)'; // Memposisikan di tengah
    canvas.style.imageRendering = 'optimizeQuality';
    canvas.style.opacity = '0.5';
    
    // Tambahkan canvas ke network-bg
    const networkBg = document.querySelector('.network-bg');
    if (!networkBg) {
        // Buat network-bg jika belum ada
        const bg = document.createElement('div');
        bg.className = 'network-bg';
        heroSection.appendChild(bg);
        bg.appendChild(canvas);
    } else {
        networkBg.appendChild(canvas);
    }
    
    // Dapatkan konteks canvas dengan pixel ratio yang benar
    const ctx = canvas.getContext('2d', { alpha: true });
    
    // Jumlah node
    const nodeCount = 20; // Memperbanyak node agar terlihat lebih padat
    
    // Jarak untuk menghubungkan nodes
    const minDistance = 20; // Jarak minimal antar node yang terhubung (dikurangi)
    const maxDistance = 50; // Jarak maksimal antar node yang terhubung (dikurangi)
    
    // Buat array nodes dan koneksi
    const nodes = [];
    const connections = [];
    
    // Inisialisasi nodes
    function initNodes() {
        // Kosongkan array nodes
        nodes.splice(0, nodes.length);
        connections.splice(0, connections.length);
        
        // Buat nodes dengan posisi acak
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 4, // Ukuran minimal node = 4, lebih besar
                vx: Math.random() * 2.0 - 1.0, // Kecepatan jauh lebih cepat
                vy: Math.random() * 2.0 - 1.0, // Kecepatan jauh lebih cepat
                // Tambahkan properti untuk pergerakan yang lebih menarik
                orbitDirection: Math.random() < 0.5 ? 1 : -1, // Arah orbit acak (searah/berlawanan jarum jam)
                orbitSpeed: Math.random() * 0.003 + 0.001, // Kecepatan orbit yang bervariasi
                oscillationPhase: Math.random() * Math.PI * 2, // Fase awal untuk osilasi
                oscillationSpeed: Math.random() * 0.05 + 0.01, // Kecepatan osilasi
                oscillationAmplitude: Math.random() * 20 + 10, // Amplitudo osilasi
                connections: 0 // Jumlah koneksi yang dimiliki node
            });
        }
        
        // Buat jaringan terhubung menggunakan algoritma Minimum Spanning Tree
        // Pertama, hubungkan semua node dalam satu jalur
        for (let i = 0; i < nodes.length - 1; i++) {
            connections.push({
                source: i,
                target: i + 1,
                opacity: 0.1 
            });
            
            nodes[i].connections++;
            nodes[i + 1].connections++;
        }
        
        // Hubungkan node pertama dan terakhir untuk membuat lingkaran tertutop
        connections.push({
            source: 0,
            target: nodes.length - 1,
            opacity: 0.1
        });
        
        nodes[0].connections++;
        nodes[nodes.length - 1].connections++;
        
        // Tambahkan beberapa koneksi tambahan untuk membuat jaringan lebih kaya
        // tapi tetap terhubung sebagai satu jaringan dan batasi maksimal 4 koneksi per node
        for (let i = 0; i < nodes.length; i++) {
            // Hitung berapa banyak koneksi yang dibutuhkan untuk mencapai maksimal 4 koneksi
            const neededConnections = Math.max(0, 4 - nodes[i].connections);
            
            if (neededConnections > 0) {
                // Temukan node terdekat yang belum terhubung langsung
                let potentialConnections = findPotentialConnections(i, neededConnections);
                
                for (let j = 0; j < potentialConnections.length; j++) {
                    const targetIndex = potentialConnections[j];
                    
                    // Pastikan node target belum memiliki lebih dari 4 koneksi
                    if (nodes[targetIndex].connections < 4) {
                        // Tambahkan koneksi ke array connections
                        connections.push({
                            source: i,
                            target: targetIndex,
                            opacity: 0.1
                        });
                        
                        // Tingkatkan jumlah koneksi untuk kedua node
                        nodes[i].connections++;
                        nodes[targetIndex].connections++;
                    }
                }
            }
        }
    }
    
    // Fungsi untuk menemukan n node terdekat dari node dengan index nodeIndex
    function findClosestNodes(nodeIndex, n) {
        const distances = [];
        
        for (let i = 0; i < nodes.length; i++) {
            if (i !== nodeIndex) {
                const dx = nodes[nodeIndex].x - nodes[i].x;
                const dy = nodes[nodeIndex].y - nodes[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                distances.push({ index: i, distance: distance });
            }
        }
        
        // Urutkan berdasarkan jarak
        distances.sort((a, b) => a.distance - b.distance);
        
        // Ambil n node terdekat
        return distances.slice(0, n).map(d => d.index);
    }
    
    // Fungsi untuk menemukan node potensial untuk koneksi tambahan
    // dengan batasan jarak minimum dan maksimum
    function findPotentialConnections(nodeIndex, n) {
        // Dapatkan semua node yang belum terhubung langsung
        const unconnectedNodes = [];
        
        for (let i = 0; i < nodes.length; i++) {
            if (i !== nodeIndex) {
                // Cek apakah sudah ada koneksi langsung
                const alreadyConnected = connections.some(c => 
                    (c.source === nodeIndex && c.target === i) || 
                    (c.source === i && c.target === nodeIndex)
                );
                
                if (!alreadyConnected) {
                    // Hitung jarak
                    const dx = nodes[nodeIndex].x - nodes[i].x;
                    const dy = nodes[nodeIndex].y - nodes[i].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    // Hanya tambahkan jika dalam rentang jarak yang diinginkan
                    if (distance >= minDistance && distance <= maxDistance) {
                        unconnectedNodes.push(i);
                    }
                }
            }
        }
        
        // Jika tidak ada node yang memenuhi kriteria, coba dengan kriteria yang lebih longgar
        if (unconnectedNodes.length === 0) {
            for (let i = 0; i < nodes.length; i++) {
                if (i !== nodeIndex) {
                    // Cek apakah sudah ada koneksi langsung
                    const alreadyConnected = connections.some(c => 
                        (c.source === nodeIndex && c.target === i) || 
                        (c.source === i && c.target === nodeIndex)
                    );
                    
                    if (!alreadyConnected) {
                        unconnectedNodes.push(i);
                    }
                }
            }
        }
        
        // Jika masih tidak ada node yang belum terhubung, kembalikan array kosong
        if (unconnectedNodes.length === 0) {
            return [];
        }
        
        // Urutkan berdasarkan jarak
        const distances = [];
        for (let i = 0; i < unconnectedNodes.length; i++) {
            const targetIndex = unconnectedNodes[i];
            const dx = nodes[nodeIndex].x - nodes[targetIndex].x;
            const dy = nodes[nodeIndex].y - nodes[targetIndex].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Hitung skor berdasarkan seberapa dekat dengan jarak ideal
            // Jarak ideal adalah rata-rata dari minDistance dan maxDistance
            const idealDistance = (minDistance + maxDistance) / 2;
            const distanceScore = Math.abs(distance - idealDistance);
            
            distances.push({ index: targetIndex, distance: distance, score: distanceScore });
        }
        
        // Urutkan berdasarkan skor (semakin kecil skor, semakin baik)
        distances.sort((a, b) => a.score - b.score);
        
        // Kembalikan n node dengan skor terbaik
        return distances.slice(0, n).map(d => d.index);
    }
    
    // Atur ukuran canvas sesuai dengan ukuran viewport dengan mempertimbangkan pixel ratio
    function resizeCanvas() {
        // Dapatkan ukuran viewport
        const viewportWidth = window.innerWidth;
        const viewportHeight = heroSection.getBoundingClientRect().height;
        // Dapatkan device pixel ratio
        const dpr = window.devicePixelRatio || 1;
        
        // Atur ukuran CSS
        canvas.style.width = viewportWidth + 'px';
        canvas.style.height = viewportHeight + 'px';
        
        // Atur ukuran canvas dengan mempertimbangkan pixel ratio
        canvas.width = viewportWidth * dpr;
        canvas.height = viewportHeight * dpr;
        
        // Skala konteks sesuai dengan pixel ratio
        ctx.scale(dpr, dpr);
        
        // Bersihkan canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Reinisialisasi nodes
        initNodes();
        
        // Distribusikan node agar lebih merata
        distributeNodes();
    }
    
    // Fungsi untuk mendistribusikan node agar lebih merata
    function distributeNodes() {
        const width = canvas.width / window.devicePixelRatio;
        const height = canvas.height / window.devicePixelRatio;
        
        // Distribusi yang lebih merata di seluruh layar
        const margin = 50; // Margin dari tepi
        const usableWidth = width - (margin * 2);
        const usableHeight = height - (margin * 2);
        
        // Distribusi node menggunakan metode yang lebih acak tapi merata
        for (let i = 0; i < nodes.length; i++) {
            // Gunakan distribusi spiral untuk menghindari penumpukan
            const angle = i * (Math.PI * 2 / nodeCount) * 2.5; // Sudut dalam spiral
            const radius = (usableWidth / 3) * (i / nodeCount) + (usableWidth / 6); // Radius spiral
            
            // Posisi dasar spiral
            let baseX = width / 2 + Math.cos(angle) * radius;
            let baseY = height / 2 + Math.sin(angle) * radius;
            
            // Tambahkan sedikit randomisasi
            baseX += (Math.random() * usableWidth * 0.2) - (usableWidth * 0.1);
            baseY += (Math.random() * usableHeight * 0.2) - (usableHeight * 0.1);
            
            // Pastikan node tetap dalam area yang terlihat
            nodes[i].x = Math.max(margin, Math.min(width - margin, baseX));
            nodes[i].y = Math.max(margin, Math.min(height - margin, baseY));
            
            // Atur ulang kecepatan untuk distribusi awal yang lebih baik
            nodes[i].vx = (Math.random() * 1.0 - 0.5); // Kecepatan lebih lambat di awal
            nodes[i].vy = (Math.random() * 1.0 - 0.5);
        }
        
        // Periksa dan atur ulang jarak antar node yang terlalu dekat
        ensureMinimumDistance();
    }
    
    // Fungsi untuk memastikan jarak minimum antar node
    function ensureMinimumDistance() {
        const minInitialDistance = 40; // Jarak minimum antar node saat inisialisasi (dikurangi)
        let iterations = 0;
        const maxIterations = 20; // Batasi jumlah iterasi untuk mencegah loop tak terbatas
        
        while (iterations < maxIterations) {
            let moved = false;
            
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < minInitialDistance) {
                        // Jika terlalu dekat, dorong sedikit menjauh
                        const pushFactor = (minInitialDistance - distance) / minInitialDistance;
                        const pushX = dx * pushFactor * 0.5;
                        const pushY = dy * pushFactor * 0.5;
                        
                        nodes[i].x += pushX;
                        nodes[i].y += pushY;
                        nodes[j].x -= pushX;
                        nodes[j].y -= pushY;
                        
                        moved = true;
                    }
                }
            }
            
            if (!moved) break; // Berhenti jika tidak ada node yang bergerak
            iterations++;
        }
    }
    
    // Panggil resize saat halaman dimuat dan saat ukuran window berubah
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    initNodes();
    
    // Fungsi untuk menggambar nodes dan koneksi
    function drawNodes() {
        // Bersihkan canvas
        ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);
        
        // Gambar koneksi tetap
        for (let i = 0; i < connections.length; i++) {
            const sourceNode = nodes[connections[i].source];
            const targetNode = nodes[connections[i].target];
            
            // Gambar koneksi dengan opacity tetap
            ctx.save();
            ctx.strokeStyle = `rgba(255, 255, 255, ${connections[i].opacity})`; // Warna putih
            ctx.lineWidth = 1;
            
            ctx.beginPath();
            ctx.moveTo(sourceNode.x, sourceNode.y);
            ctx.lineTo(targetNode.x, targetNode.y);
            ctx.stroke();
            ctx.restore();
        }
        
        // Gambar nodes
        for (let i = 0; i < nodes.length; i++) {
            // Pastikan koordinat adalah bilangan bulat untuk rendering yang tajam
            const x = Math.round(nodes[i].x);
            const y = Math.round(nodes[i].y);
            const radius = Math.round(nodes[i].radius);
            
            // Efek 3D dengan multiple gradients dan shadows
            
            // 1. Gambar shadow untuk efek 3D
            ctx.save();
            ctx.beginPath();
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.fillStyle = 'rgba(100, 100, 100, 0.1)';
            ctx.arc(x, y, radius * 1.2, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.restore();
            
            // 2. Buat gradient untuk efek glow
            const glowGradient = ctx.createRadialGradient(
                x, y, 0,
                x, y, radius * 2
            );
            glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.5)');
            glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            // Gambar efek glow
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = glowGradient;
            ctx.arc(x, y, radius * 2, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.restore();
            
            // 3. Buat gradient untuk efek 3D pada node
            const nodeGradient = ctx.createRadialGradient(
                x - radius/3, y - radius/3, 0,
                x, y, radius
            );
            nodeGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            nodeGradient.addColorStop(0.5, 'rgba(240, 240, 240, 0.9)');
            nodeGradient.addColorStop(1, 'rgba(220, 220, 220, 0.8)');
            
            // Gambar node pusat dengan efek 3D
            ctx.save();
            ctx.beginPath();
            ctx.fillStyle = nodeGradient;
            ctx.arc(x, y, radius, 0, Math.PI * 2, false);
            ctx.fill();
            
            // 4. Tambahkan highlight untuk efek 3D
            ctx.beginPath();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            ctx.arc(x - radius/3, y - radius/3, radius/2, 0, Math.PI * 2, false);
            ctx.fill();
            ctx.restore();
            
            // Tambahkan pergerakan yang lebih menarik dan acak
            const canvasWidth = canvas.width / window.devicePixelRatio;
            const canvasHeight = canvas.height / window.devicePixelRatio;
            const centerX = canvasWidth / 2;
            const centerY = canvasHeight / 2;
            
            // Hitung jarak ke pusat
            const dx = centerX - nodes[i].x;
            const dy = centerY - nodes[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // Waktu untuk efek pergerakan berbasis waktu
            const time = performance.now() * 0.001; // Konversi ke detik
            
            // 1. Kurangi gaya orbital untuk mencegah penumpukan di tengah
            const orbitForce = nodes[i].orbitSpeed * 0.5; // Kurangi setengahnya
            nodes[i].vx += (dy / distance) * orbitForce * distance * nodes[i].orbitDirection;
            nodes[i].vy -= (dx / distance) * orbitForce * distance * nodes[i].orbitDirection;
            
            // 2. Tambahkan pergerakan osilasi horizontal dan vertikal yang lebih kuat
            // Osilasi horizontal
            const horizontalOsc = Math.sin(time * 0.3 + nodes[i].oscillationPhase) * 0.03;
            // Osilasi vertikal
            const verticalOsc = Math.cos(time * 0.2 + nodes[i].oscillationPhase + Math.PI/4) * 0.03;
            
            // Tambahkan osilasi ke kecepatan
            nodes[i].vx += horizontalOsc * canvasWidth * 0.05;
            nodes[i].vy += verticalOsc * canvasHeight * 0.05;
            
            // 3. Tambahkan pergerakan acak yang lebih signifikan
            if (Math.random() < 0.03) { // 3% kemungkinan per frame
                nodes[i].vx += (Math.random() * 0.8 - 0.4);
                nodes[i].vy += (Math.random() * 0.8 - 0.4);
            }
            
            // 4. Tambahkan gaya repulsif dari pusat untuk mencegah penumpukan
            const centerRepulsion = 0.0001;
            // Jika terlalu dekat dengan pusat, dorong menjauh
            if (distance < canvasWidth * 0.2) {
                const repulsionFactor = (1 - (distance / (canvasWidth * 0.2))) * centerRepulsion * distance;
                nodes[i].vx -= dx * repulsionFactor;
                nodes[i].vy -= dy * repulsionFactor;
            }
            
            // 5. Tambahkan gaya tarik ke tepi untuk mendorong node ke area luar
            const edgePull = 0.0002;
            // Hitung jarak ke tepi terdekat
            const distToEdgeX = Math.min(nodes[i].x, canvasWidth - nodes[i].x);
            const distToEdgeY = Math.min(nodes[i].y, canvasHeight - nodes[i].y);
            
            // Jika jauh dari tepi, berikan sedikit dorongan ke arah tepi
            if (distToEdgeX > canvasWidth * 0.3 && distToEdgeY > canvasHeight * 0.3) {
                const edgeAngle = Math.random() * Math.PI * 2; // Arah acak ke tepi
                nodes[i].vx += Math.cos(edgeAngle) * edgePull * distance;
                nodes[i].vy += Math.sin(edgeAngle) * edgePull * distance;
            }
            
            // 5. Batasi kecepatan maksimum
            const maxSpeed = 0.25;
            const currentSpeed = Math.sqrt(nodes[i].vx * nodes[i].vx + nodes[i].vy * nodes[i].vy);
            if (currentSpeed > maxSpeed) {
                nodes[i].vx = (nodes[i].vx / currentSpeed) * maxSpeed;
                nodes[i].vy = (nodes[i].vy / currentSpeed) * maxSpeed;
            }
            
            // Perbarui posisi
            nodes[i].x += nodes[i].vx;
            nodes[i].y += nodes[i].vy;
            
            // Pantulkan jika mencapai batas dengan efek yang lebih menarik
            if (nodes[i].x < 0 || nodes[i].x > canvasWidth) {
                nodes[i].vx *= -1.1; // Percepatan saat memantul
                nodes[i].vy += (Math.random() * 0.8 - 0.4); // Tambahkan lebih banyak random
                
                // Ubah arah orbit secara acak saat memantul (25% kemungkinan)
                if (Math.random() < 0.25) {
                    nodes[i].orbitDirection *= -1;
                }
                
                // Ubah fase osilasi untuk variasi lebih
                nodes[i].oscillationPhase = Math.random() * Math.PI * 2;
            }
            
            if (nodes[i].y < 0 || nodes[i].y > canvasHeight) {
                nodes[i].vy *= -1.1; // Percepatan saat memantul
                nodes[i].vx += (Math.random() * 0.8 - 0.4); // Tambahkan lebih banyak random
                
                // Ubah arah orbit secara acak saat memantul (25% kemungkinan)
                if (Math.random() < 0.25) {
                    nodes[i].orbitDirection *= -1;
                }
                
                // Ubah amplitudo osilasi untuk variasi lebih
                nodes[i].oscillationAmplitude = Math.random() * 20 + 10;
            }
        }
        
        // Tidak perlu memanggil requestAnimationFrame di sini
        // karena sudah ditangani oleh fungsi animate
    }
    
    // Mulai animasi dengan frame rate yang lebih tinggi
    let lastTime = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;
    
    function animate(timestamp) {
        // Hitung delta time untuk animasi yang konsisten
        if (!lastTime) lastTime = timestamp;
        const deltaTime = timestamp - lastTime;
        
        if (deltaTime >= frameInterval) {
            // Gambar nodes dan koneksi
            drawNodes();
            
            // Perbarui waktu terakhir
            lastTime = timestamp;
        }
        
        // Request animasi frame berikutnya
        requestAnimationFrame(animate);
    }
    
    // Mulai animasi dengan requestAnimationFrame
    requestAnimationFrame(animate);
});