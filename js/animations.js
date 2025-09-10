
// Animations JavaScript for Sahil Bajaj Portfolio Website - OPTIMIZED VERSION

// Remove duplicate DOMContentLoaded listeners - this is now handled in main.js
// Only keep the core animation functions

// Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const companies = [
        'EY India', 'Deloitte', 'Mercedes Benz', 'BMW India', 'Google India',
        'Microsoft', 'Amazon', 'Tata Group', 'Reliance', 'Infosys',
        'Wipro', 'TCS', 'HCL', 'Tech Mahindra', 'Accenture',
        'Cognizant', 'Capgemini', 'IBM', 'Oracle', 'SAP'
    ];
    
    let currentIndex = 0;
    let currentText = '';
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeWriter() {
        const currentCompany = companies[currentIndex];
        
        if (isDeleting) {
            currentText = currentCompany.substring(0, currentText.length - 1);
            typingSpeed = 50;
        } else {
            currentText = currentCompany.substring(0, currentText.length + 1);
            typingSpeed = 100;
        }
        
        typewriterElement.textContent = currentText;
        
        if (!isDeleting && currentText === currentCompany) {
            typingSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && currentText === '') {
            isDeleting = false;
            currentIndex = (currentIndex + 1) % companies.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeWriter, typingSpeed);
    }
    
    // Start typewriter after a delay
    setTimeout(typeWriter, 1000);
}

// Advanced Scroll Animations
function initAdvancedAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // Add animation class based on data attribute
                const animationType = element.dataset.animation || 'fadeInUp';
                element.classList.add(`animate-${animationType}`);
                
                // Stagger children animations
                if (element.classList.contains('stagger-children')) {
                    const children = element.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('animate');
                        }, index * 100);
                    });
                }
                
                // Text reveal animation
                if (element.classList.contains('text-reveal')) {
                    animateTextReveal(element);
                }
                
                observer.unobserve(element);
            }
        });
    }, observerOptions);
    
    // Observe elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-animation], .stagger-children, .text-reveal');
    animatedElements.forEach(el => observer.observe(el));
}

// Text Reveal Animation
function animateTextReveal(element) {
    const text = element.textContent;
    element.textContent = '';
    element.classList.add('active');
    
    const words = text.split(' ');
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        element.appendChild(span);
        
        setTimeout(() => {
            span.style.transition = 'all 0.6s ease';
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Gallery Animations with Performance Optimization
function initGalleryAnimations() {
    const galleries = document.querySelectorAll('.horizontal-gallery');
    
    galleries.forEach(gallery => {
        const items = gallery.querySelectorAll('.gallery-item');
        
        items.forEach((item, index) => {
            // Add staggered entrance animation
            item.style.opacity = '0';
            item.style.transform = 'translateX(50px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.6s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 150);
            
            // Add hover effects with performance optimization
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) translateY(-5px)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) translateY(0)';
                this.style.boxShadow = 'none';
            });
        });
        
        // Smooth scrolling for horizontal galleries with throttling
        let isDown = false;
        let startX;
        let scrollLeft;
        
        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.classList.add('active');
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });
        
        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.classList.remove('active');
        });
        
        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.classList.remove('active');
        });
        
        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            gallery.scrollLeft = scrollLeft - walk;
        });
    });
    
    // Gallery videos: hover/tap logic handled below
    const galleryVideos = document.querySelectorAll('.gallery-video');
}

// Gallery Arrow Navigation - OPTIMIZED
function initGalleryNavigation() {
    const galleries = [
        // Corporate Events - 2 rows
        { id: 'corporate-gallery-1', leftArrow: 'corporate-arrow-left-1', rightArrow: 'corporate-arrow-right-1' },
        { id: 'corporate-gallery-2', leftArrow: 'corporate-arrow-left-2', rightArrow: 'corporate-arrow-right-2' },
        
        // Weddings - 2 rows
        { id: 'wedding-gallery-1', leftArrow: 'wedding-arrow-left-1', rightArrow: 'wedding-arrow-right-1' },
        { id: 'wedding-gallery-2', leftArrow: 'wedding-arrow-left-2', rightArrow: 'wedding-arrow-right-2' },
        
        // Celebrity/Lifestyle - 3 rows
        { id: 'celebrity-gallery-1', leftArrow: 'celebrity-arrow-left-1', rightArrow: 'celebrity-arrow-right-1' },
        { id: 'celebrity-gallery-2', leftArrow: 'celebrity-arrow-left-2', rightArrow: 'celebrity-arrow-right-2' },
        { id: 'celebrity-gallery-3', leftArrow: 'celebrity-arrow-left-3', rightArrow: 'celebrity-arrow-right-3' },
        
        // Car & Bike Events - 1 row
        { id: 'car-bike-gallery-1', leftArrow: 'car-bike-arrow-left-1', rightArrow: 'car-bike-arrow-right-1' },
        
        // Sports Events - 1 row
        { id: 'sports-gallery-1', leftArrow: 'sports-arrow-left-1', rightArrow: 'sports-arrow-right-1' },
        
        // Concert Fest - 1 row
        { id: 'concert-gallery-1', leftArrow: 'concert-arrow-left-1', rightArrow: 'concert-arrow-right-1' }
    ];

    galleries.forEach(gallery => {
        const galleryElement = document.getElementById(gallery.id);
        const leftArrow = document.getElementById(gallery.leftArrow);
        const rightArrow = document.getElementById(gallery.rightArrow);

        if (!galleryElement || !leftArrow || !rightArrow) return;

        // Scroll amount (width of 2-3 gallery items)
        const scrollAmount = 800;

        // Left arrow click
        leftArrow.addEventListener('click', () => {
            galleryElement.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Right arrow click
        rightArrow.addEventListener('click', () => {
            galleryElement.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update arrow states on scroll with throttling
        let scrollTimeout;
        galleryElement.addEventListener('scroll', () => {
            if (scrollTimeout) clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
            updateArrowStates(galleryElement, leftArrow, rightArrow);
            }, 16); // ~60fps
        });

        // Initial arrow state
        updateArrowStates(galleryElement, leftArrow, rightArrow);
    });
}

// Update arrow states based on scroll position
function updateArrowStates(gallery, leftArrow, rightArrow) {
    const isAtStart = gallery.scrollLeft <= 0;
    const isAtEnd = gallery.scrollLeft >= gallery.scrollWidth - gallery.clientWidth - 1;

    leftArrow.disabled = isAtStart;
    rightArrow.disabled = isAtEnd;
}

// Hover Effects - OPTIMIZED
function initHoverEffects() {
    // Button hover effects
    const buttons = document.querySelectorAll('.cta-button, .submit-button');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(255, 215, 0, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Card hover effects
    const cards = document.querySelectorAll('.testimonial-card, .gallery-item-large');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Navigation link hover effects
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--accent-gold)';
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = 'var(--text-primary)';
            }
            this.style.transform = 'translateY(0)';
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Counter Animation with Easing
function animateCounterWithEasing(element, target, duration = 2000) {
    const counterElement = element.querySelector('.counter-number');
    const start = 0;
    const startTime = performance.now();
    
    function easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutQuart(progress);
        const current = Math.floor(start + (target - start) * easedProgress);
        
        counterElement.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Floating Animation for Elements
function initFloatingAnimations() {
    const floatingElements = document.querySelectorAll('.floating');
    
    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.2}s`;
        element.classList.add('animate-float');
    });
}

// Glow Effects
function initGlowEffects() {
    const glowElements = document.querySelectorAll('.glow');
    
    glowElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 0 30px var(--accent-gold)';
            this.style.transform = 'scale(1.05)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.boxShadow = 'none';
            this.style.transform = 'scale(1)';
        });
    });
}

// Loading Animations
function initLoadingAnimations() {
    const loadingElements = document.querySelectorAll('.loading');
    
    loadingElements.forEach(element => {
        element.classList.add('animate-loading');
        
        // Simulate loading completion
        setTimeout(() => {
            element.classList.remove('loading');
            element.classList.add('loaded');
        }, 2000);
    });
}

// Scroll Progress Indicator
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-gold), #FFA500);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// Magnetic Effect for Buttons
function initMagneticEffect() {
    const magneticElements = document.querySelectorAll('.magnetic');
    
    magneticElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize all animation features
// This block is now redundant as DOMContentLoaded is handled in main.js
// document.addEventListener('DOMContentLoaded', function() {
//     initFloatingAnimations();
//     initGlowEffects();
//     initLoadingAnimations();
//     initScrollProgress();
//     initMagneticEffect();
//     initDelayedAnimations();
//     initGalleryNavigation(); // Initialize gallery navigation
    
//     // Add magnetic class to buttons
//     const buttons = document.querySelectorAll('.cta-button, .submit-button');
//     buttons.forEach(button => button.classList.add('magnetic'));
    
//     // Add floating class to scroll indicator
//     const scrollIndicator = document.querySelector('.scroll-indicator');
//     if (scrollIndicator) {
//         scrollIndicator.classList.add('floating');
//     }
    
//     // Add glow class to stars
//     const stars = document.querySelectorAll('.stars i');
//     stars.forEach(star => star.classList.add('glow'));
// });

// Delayed animations for hero section
function initDelayedAnimations() {
    const delayedElements = document.querySelectorAll('.animate-on-scroll');
    
    delayedElements.forEach(element => {
        const delay = parseInt(element.dataset.delay) || 0;
        
        // Start animation after page load + delay
        setTimeout(() => {
            element.classList.add('animate');
        }, delay);
    });
    
    // Force animation to start even if page loads slowly
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content .animate-on-scroll');
        heroElements.forEach(element => {
            if (!element.classList.contains('animate')) {
                element.classList.add('animate');
            }
        });
    }, 5000); // Fallback after 5 seconds
}

// Performance optimization for animations
function optimizeAnimations() {
    // Use transform and opacity for better performance
    const animatedElements = document.querySelectorAll('[data-animation]');
    
    animatedElements.forEach(element => {
        element.style.willChange = 'transform, opacity';
        
        // Clean up will-change after animation
        element.addEventListener('transitionend', function() {
            this.style.willChange = 'auto';
        });
    });
}

// Initialize performance optimizations
// This block is now redundant as DOMContentLoaded is handled in main.js
// document.addEventListener('DOMContentLoaded', optimizeAnimations);

// Add CSS for new animation classes
const additionalStyles = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-gold), #FFA500);
        z-index: 9999;
        transition: width 0.1s ease;
    }
    
    .magnetic {
        transition: transform 0.1s ease;
    }
    
    .floating {
        animation: float 3s ease-in-out infinite;
    }
    
    .glow {
        transition: all 0.3s ease;
    }
    
    .horizontal-gallery.active {
        cursor: grabbing;
        cursor: -webkit-grabbing;
    }
    
    .horizontal-gallery.active .gallery-item {
        cursor: grabbing;
        cursor: -webkit-grabbing;
    }
    
    .text-reveal span {
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s ease;
    }
    
    .text-reveal.active span {
        opacity: 1;
        transform: translateY(0);
    }
    
    .stagger-children > * {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .stagger-children > *.animate {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Inject additional styles
    const animationsStyleSheet = document.createElement('style');
    animationsStyleSheet.textContent = additionalStyles;
    document.head.appendChild(animationsStyleSheet);

// Export functions for use in main.js
window.initTypewriter = initTypewriter;
window.initGalleryAnimations = initGalleryAnimations;
window.initGalleryNavigation = initGalleryNavigation;
window.initHoverEffects = initHoverEffects; 

// Hover-to-play for gallery videos (first two per section can autoplay; rest play on hover)
(function(){
    if (typeof document === 'undefined') return;
    function setupHoverPlay(sectionEl){
        if(!sectionEl) return;
        const videos = sectionEl.querySelectorAll('.gallery-video');
        videos.forEach((vid, idx) => {
            // ensure muted & inline
            try { vid.muted = true; vid.playsInline = true; } catch(e){}
            // hover handlers
            vid.addEventListener('mouseenter', () => {
                try { if (vid.readyState < 2) vid.load(); vid.play().catch(()=>{}); } catch(e){}
            });
            vid.addEventListener('mouseleave', () => {
                try { vid.pause(); } catch(e){}
            });
            // mobile: tap to toggle
            vid.addEventListener('touchstart', () => {
                try { if (vid.paused) { if (vid.readyState < 2) vid.load(); vid.play().catch(()=>{}); } else { vid.pause(); } } catch(e){}
            }, { passive: true });
        });
    }
    document.addEventListener('DOMContentLoaded', function(){
        document.querySelectorAll('.corporate-section, .weddings-section, .celebrities-section, .sports-section, .concert-section')
            .forEach(setupHoverPlay);
    });
})(); 

// R2 video loading: videos now load directly from R2 CDN

// Gallery videos now load directly from R2 CDN - no fallbacks needed