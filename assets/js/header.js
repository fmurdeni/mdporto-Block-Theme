/**
 * MDPorto Header Scroll Animation
 * 
 * This script handles the header animation when scrolling:
 * - Transparent background when at top, white background when scrolled
 * - Hides the header when scrolling down
 * - Shows the header immediately when scrolling up (at any position)
 * - Detects hero banners and adds appropriate class for white logo styling
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const header = document.querySelector('.mdporto-sticky-header');
        if (!header) return;
        
        // Set header height as CSS variable for body padding
        document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
        
        // Check if page has a hero banner
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            document.body.classList.add('page-with-hero-banner');
        }
        
        let lastScrollY = window.scrollY;
        let isScrollingDown = false;
        
        // Initial state
        if (lastScrollY > 0) {
            header.classList.add('show');
            header.classList.add('scrolled');
        }
        
        // Main scroll handler with debounce for performance
        function onScroll() {
            const currentScrollY = window.scrollY;
            
            // Determine scroll direction
            isScrollingDown = currentScrollY > lastScrollY;
            
            // Apply appropriate class based on scroll direction
            if (isScrollingDown && currentScrollY > header.offsetHeight) {
                header.classList.add('hide');
                header.classList.remove('show');
            } else if (!isScrollingDown) {
                // Immediately show header when scrolling up, at any position
                header.classList.remove('hide');
                header.classList.add('show');
            }
            
            // Add or remove scrolled class based on scroll position
            if (currentScrollY > 10) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Update last scroll position
            lastScrollY = currentScrollY;
        }
        
        // Run once on page load to set initial state
        onScroll();
        
        // Use passive event listener for better performance
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Handle window resize to update header height variable
        window.addEventListener('resize', function() {
            document.documentElement.style.setProperty('--header-height', header.offsetHeight + 'px');
        }, { passive: true });
    });
})();
