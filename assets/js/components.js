/**
 * MDPorto Interactive Components
 * 
 * This script handles interactive components like sliders, testimonials,
 * and other dynamic elements for a modern web developer portfolio.
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {       
        
        // Initialize code particles for developer hero section
        initCodeParticles();
        
        // Initialize project modal
        initProjectModal();
        
        // Initialize contact form validation
        initContactForm();
    });
    
    /**
     * Initialize code particles for developer hero section
     */
    function initCodeParticles() {
        const heroSection = document.querySelector('.hero-developer');
        if (!heroSection) return;
        
        // Hapus container lama jika ada
        const oldContainer = document.querySelector('.code-particles');
        if (oldContainer) {
            oldContainer.remove();
        }
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'code-particles';
        
        // Atur style untuk full width
        particlesContainer.style.position = 'absolute';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '50%';
        particlesContainer.style.transform = 'translateX(-50%)';
        particlesContainer.style.width = '100vw';
        particlesContainer.style.height = '100%';
        particlesContainer.style.overflow = 'visible';
        particlesContainer.style.zIndex = '1';
        particlesContainer.style.opacity = '0.6';
        particlesContainer.style.pointerEvents = 'none';
        
        heroSection.appendChild(particlesContainer);
        
        // Code snippets to display as particles
        const codeSnippets = [
            '&lt;div&gt;', '&lt;/div&gt;', '&lt;span&gt;', '&lt;/span&gt;', '&lt;section&gt;', '&lt;/section&gt;', 
            '&lt;?php', '?&gt;',
            'function()', 'return',
            '{', '}', '()', '=>',
            'const', 'let', 'var',
            'if', 'else', 'for', 'while',
            'import', 'export', 'from',
            '.css', '.js', '.php', '.html',
            '&lt;header&gt;', '&lt;footer&gt;',
            '&lt;html&gt;', '&lt;body&gt;',
            'addEventListener', 'click', 'submit',
            'querySelector', 'getElementById',
            'console.log', 'fetch()', 'async', 'await',
            'Promise', 'then', 'catch',
            'React', 'Vue', 'Shopify', 'WordPress', 'WooCommerce', 'Laravel', 'Lumen'
        ];
        
        // Buat grid untuk distribusi partikel yang lebih merata
        const viewportWidth = window.innerWidth;
        const viewportHeight = heroSection.getBoundingClientRect().height;
        
        // Bagi area menjadi sel-sel grid
        const gridCols = 6; // Jumlah kolom dalam grid
        const gridRows = 5; // Jumlah baris dalam grid
        const cellWidth = viewportWidth / gridCols;
        const cellHeight = viewportHeight / gridRows;
        
        // Simpan posisi yang sudah digunakan untuk mencegah tumpang tindih
        const usedPositions = [];
        const minDistance = 100; // Jarak minimum antar partikel
        
        // Create 30 particles with better distribution
        for (let i = 0; i < 30; i++) {
            // Tentukan sel grid untuk partikel ini
            const gridX = i % gridCols;
            const gridY = Math.floor(i / gridCols) % gridRows;
            
            // Buat partikel dengan posisi dalam sel grid yang ditentukan
            createCodeParticle(particlesContainer, codeSnippets, gridX, gridY, cellWidth, cellHeight, usedPositions, minDistance);
        }
    }
    
    /**
     * Create a single code particle with grid-based positioning
     */
    function createCodeParticle(container, snippets, gridX, gridY, cellWidth, cellHeight, usedPositions, minDistance) {
        const particle = document.createElement('div');
        particle.className = 'code-particle';
        
        // Tentukan posisi dalam sel grid dengan randomisasi terbatas
        // Gunakan margin dalam sel untuk mencegah partikel terlalu dekat dengan tepi
        const margin = 40;
        
        // Cari posisi yang tidak terlalu dekat dengan partikel lain
        let attempts = 0;
        let posX, posY;
        let validPosition = false;
        
        while (!validPosition && attempts < 10) {
            // Posisi dasar dalam sel grid
            posX = (gridX * cellWidth) + margin + (Math.random() * (cellWidth - (margin * 2)));
            posY = (gridY * cellHeight) + margin + (Math.random() * (cellHeight - (margin * 2)));
            
            // Periksa jarak dengan posisi yang sudah digunakan
            validPosition = true;
            for (let i = 0; i < usedPositions.length; i++) {
                const dx = posX - usedPositions[i].x;
                const dy = posY - usedPositions[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < minDistance) {
                    validPosition = false;
                    break;
                }
            }
            
            attempts++;
        }
        
        // Simpan posisi yang digunakan
        usedPositions.push({ x: posX, y: posY });
        
        // Random code snippet
        const snippet = snippets[Math.floor(Math.random() * snippets.length)];
        
        // Ukuran font yang bervariasi untuk kedalaman
        const fontSize = Math.floor(Math.random() * 4) + 10; // 10px - 13px
        
        // Set particle properties
        particle.innerHTML = snippet;
        particle.style.left = posX + 'px';
        particle.style.top = posY + 'px'; // Gunakan pixel untuk posisi yang lebih presisi
        particle.style.opacity = Math.random() * 0.5 + 0.1;
        particle.style.transform = 'rotate(' + (Math.random() * 40 - 20) + 'deg)';
        particle.style.fontSize = fontSize + 'px';
        particle.style.whiteSpace = 'nowrap'; // Mencegah text wrapping
        particle.style.position = 'absolute';
        
        // Add to container
        container.appendChild(particle);
        
        // Animate particle
        animateParticle(particle, posX, posY);
    }
    
    /**
     * Animate a code particle with smoother movement
     */
    function animateParticle(particle, startX, startY) {
        // Random speed - lebih lambat untuk animasi yang lebih halus
        const speed = Math.random() * 0.2 + 0.05;
        
        // Random direction dengan kecenderungan bergerak ke atas
        const directionX = Math.random() * 2 - 1; // -1 hingga 1
        const directionY = -(Math.random() * 0.5 + 0.5); // -0.5 hingga -1 (selalu ke atas)
        
        // Posisi awal
        let posX = startX;
        let posY = startY;
        
        // Tambahkan variasi pergerakan
        const oscillationX = Math.random() * 10 + 5; // Amplitudo osilasi horizontal
        const oscillationSpeed = Math.random() * 0.002 + 0.001; // Kecepatan osilasi
        const startTime = Date.now();
        
        // Animation function
        function move() {
            const elapsed = Date.now() - startTime;
            
            // Update position with smooth movement
            posX += directionX * speed;
            posY += directionY * speed;
            
            // Tambahkan gerakan osilasi horizontal
            const oscillation = Math.sin(elapsed * oscillationSpeed) * oscillationX;
            
            // Check boundaries - wrap around with offset to prevent clustering
            const viewportWidth = window.innerWidth;
            const viewportHeight = document.querySelector('.hero-developer').getBoundingClientRect().height;
            
            if (posX > viewportWidth + 50) posX = -50;
            if (posX < -50) posX = viewportWidth + 50;
            if (posY < -50) posY = viewportHeight + 20; // Muncul kembali di bawah
            
            // Apply new position
            particle.style.left = (posX + oscillation) + 'px';
            particle.style.top = posY + 'px';
            
            // Continue animation
            requestAnimationFrame(move);
        }
        
        // Start animation
        requestAnimationFrame(move);
    }
    
    /**
     * Initialize project modal
     */
    function initProjectModal() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        if (!portfolioItems.length) return;
        
        // Create modal container if it doesn't exist
        let modal = document.querySelector('.project-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.className = 'project-modal';
            modal.innerHTML = `
                <div class="project-modal-content">
                    <span class="project-modal-close">&times;</span>
                    <div class="project-modal-body"></div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        
        const modalContent = modal.querySelector('.project-modal-body');
        const closeBtn = modal.querySelector('.project-modal-close');
        
        // Close modal when clicking the close button
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
        
        // Close modal when clicking outside the content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Add click event to portfolio items
        portfolioItems.forEach(item => {
            item.addEventListener('click', function() {
                // Get project data
                const title = this.querySelector('.portfolio-item-title').textContent;
                const category = this.querySelector('.portfolio-item-category').textContent;
                const image = this.querySelector('.portfolio-item-image').src;
                const description = this.getAttribute('data-description') || 'No description available.';
                const technologies = this.getAttribute('data-technologies') || 'HTML, CSS, JavaScript';
                const link = this.getAttribute('data-link') || '#';
                
                // Populate modal content
                modalContent.innerHTML = `
                    <div class="project-modal-header">
                        <h2>${title}</h2>
                        <span class="project-modal-category">${category}</span>
                    </div>
                    <div class="project-modal-image">
                        <img src="${image}" alt="${title}">
                    </div>
                    <div class="project-modal-info">
                        <div class="project-modal-description">
                            <h3>Project Description</h3>
                            <p>${description}</p>
                        </div>
                        <div class="project-modal-technologies">
                            <h3>Technologies Used</h3>
                            <p>${technologies}</p>
                        </div>
                        <div class="project-modal-actions">
                            <a href="${link}" class="project-modal-link" target="_blank">View Project</a>
                        </div>
                    </div>
                `;
                
                // Show modal
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });
    }
    
    /**
     * Initialize contact form validation
     */
    function initContactForm() {
        const form = document.querySelector('.modern-contact-form');
        if (!form) return;
        
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Get form fields
            const nameField = form.querySelector('input[name="name"]');
            const emailField = form.querySelector('input[name="email"]');
            const messageField = form.querySelector('textarea[name="message"]');
            
            // Validate name
            if (nameField && !nameField.value.trim()) {
                markInvalid(nameField, 'Please enter your name');
                isValid = false;
            } else if (nameField) {
                markValid(nameField);
            }
            
            // Validate email
            if (emailField) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailField.value.trim()) {
                    markInvalid(emailField, 'Please enter your email');
                    isValid = false;
                } else if (!emailPattern.test(emailField.value)) {
                    markInvalid(emailField, 'Please enter a valid email');
                    isValid = false;
                } else {
                    markValid(emailField);
                }
            }
            
            // Validate message
            if (messageField && !messageField.value.trim()) {
                markInvalid(messageField, 'Please enter your message');
                isValid = false;
            } else if (messageField) {
                markValid(messageField);
            }
            
            // Prevent form submission if invalid
            if (!isValid) {
                e.preventDefault();
            }
        });
        
        // Mark field as invalid
        function markInvalid(field, message) {
            field.classList.add('is-invalid');
            
            // Add error message if it doesn't exist
            let errorElement = field.nextElementSibling;
            if (!errorElement || !errorElement.classList.contains('form-error')) {
                errorElement = document.createElement('div');
                errorElement.className = 'form-error';
                field.parentNode.insertBefore(errorElement, field.nextSibling);
            }
            
            errorElement.textContent = message;
        }
        
        // Mark field as valid
        function markValid(field) {
            field.classList.remove('is-invalid');
            
            // Remove error message if it exists
            const errorElement = field.nextElementSibling;
            if (errorElement && errorElement.classList.contains('form-error')) {
                errorElement.remove();
            }
        }
    }
})();
