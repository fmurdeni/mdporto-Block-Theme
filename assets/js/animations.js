/**
 * MDPorto Animations and Interactive Elements
 * 
 * This script handles animations, scroll reveals, and interactive elements
 * to create a more attractive and modern web developer portfolio.
 */

(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Initialize scroll reveal animations
        initScrollReveal();
        
        // Initialize typing animation for hero section
        initTypingAnimation();
        
        // Initialize project showcase
        initProjectShowcase();
        
        // Initialize skill bars animation
        initSkillBars();
        
        // Add interactive elements
        addInteractiveElements();
    });
    
    /**
     * Initialize scroll reveal animations
     */
    function initScrollReveal() {
        const revealElements = document.querySelectorAll('.reveal');
        
        function checkReveal() {
            const windowHeight = window.innerHeight;
            const revealPoint = 150;
            
            revealElements.forEach(element => {
                const revealTop = element.getBoundingClientRect().top;
                
                if (revealTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                } else {
                    // Optional: uncomment to make elements animate every time they enter viewport
                    // element.classList.remove('active');
                }
            });
        }
        
        // Check on load
        checkReveal();
        
        // Check on scroll
        window.addEventListener('scroll', checkReveal);
    }
    
    /**
     * Initialize typing animation for hero section
     */
    function initTypingAnimation() {
        const typingElement = document.querySelector('.typing-text');
        if (!typingElement) return;
        
        const phrases = [
            'Web Developer',
            'WordPress Expert',
            'Shopify Developer', 
            'Laravel Developer',
            'Full Stack Developer'
        ];
        
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentPhrase = phrases[currentPhraseIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                typingElement.textContent = currentPhrase.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                // Pause at the end of typing
                isDeleting = true;
                typingSpeed = 1500;
            } else if (isDeleting && currentCharIndex === 0) {
                // Move to next phrase
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start typing animation
        setTimeout(type, 1000);
    }
    
    /**
     * Initialize project showcase with filtering and animation
     */
    function initProjectShowcase() {
        const filterButtons = document.querySelectorAll('.portfolio-filter button');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (!filterButtons.length || !portfolioItems.length) return;
        
        // Setup portfolio items for modal interaction
        setupPortfolioModal();
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filterValue = this.getAttribute('data-filter');
                
                // Filter portfolio items
                portfolioItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    /**
     * Setup portfolio modal functionality
     */
        function setupPortfolioModal() {
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
     * Initialize skill bars animation
     */
    function initSkillBars() {
        const skillBars = document.querySelectorAll('.skill-bar-progress');
        
        if (!skillBars.length) return;
        
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const barTop = bar.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (barTop < windowHeight - 100) {
                    // Use data-width attribute for the new design
                    const percentage = bar.getAttribute('data-width') || bar.getAttribute('data-percentage');
                    if (percentage) {
                        bar.style.width = percentage + '%';
                    }
                }
            });
        }
        
        // Animate on scroll
        window.addEventListener('scroll', animateSkillBars);
        
        // Initial check
        setTimeout(animateSkillBars, 500);
    }
    
    /**
     * Add interactive elements and effects
     */
    function addInteractiveElements() {
        // Add hover effects to cards
        const cards = document.querySelectorAll('.wp-block-column');
        cards.forEach(card => {
            card.classList.add('hover-card');
        });
        
        // Add floating animation to selected images
        const floatingImages = document.querySelectorAll('.floating-image');
        floatingImages.forEach(img => {
            img.classList.add('floating');
        });
        
        // Add parallax effect to hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.pageYOffset;
                heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            });
        }
    }
})();
