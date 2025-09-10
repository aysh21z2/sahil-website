// Main JavaScript for Sahil Bajaj Portfolio Website - OPTIMIZED VERSION

// Single consolidated DOMContentLoaded listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing optimized website...');
    
    // Initialize all features
    initNavigation();
    initHeroVideo();
    initSmoothScrolling();
    initScrollEffects();
    initLazyLoading();
    initContactForm();
    // optimizeInitialLoad(); // disabled for Drive links
    initScrollBoosterGalleries();

    // Font preview removed for production
    
    // Initialize animations (from animations.js)
    if (window.initTypewriter) initTypewriter();
    if (window.initGalleryAnimations) initGalleryAnimations();
    if (window.initGalleryNavigation) initGalleryNavigation();
    if (window.initHoverEffects) initHoverEffects();
    
    console.log('✅ Website initialization complete');
});

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        lastScrollTop = scrollTop;
    }, { passive: true });

    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink) navLink.classList.add('active');
            }
        });
    }, { passive: true });
}

// Hero video autoplay fix
function initHeroVideo() {
    const heroVideo = document.querySelector('.hero-video');
    if (heroVideo) {
        // Force the hero video to play
        heroVideo.play().catch(function(error) {
            console.log('Hero video autoplay failed:', error);
            // Try again after user interaction
            document.addEventListener('click', function() {
                heroVideo.play().catch(e => console.log('Hero video play failed:', e));
            }, { once: true });
        });
        
        // Ensure video loops and is muted
        heroVideo.loop = true;
        heroVideo.muted = true;
        heroVideo.autoplay = true;
    }
}

// Smooth scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll effects with throttling
function initScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        // Counter animations
        const counters = document.querySelectorAll('.counter-item');
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0 && !counter.classList.contains('animate')) {
                counter.classList.add('animate');
                animateCounter(counter);
            }
        });
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }, { passive: true });
}

// Counter animation
function animateCounter(counter) {
    const target = parseInt(counter.dataset.target);
    const counterElement = counter.querySelector('.counter-number');
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counterElement.textContent = Math.floor(current);
    }, 20);
}

// Lazy loading for images and videos
function initLazyLoading() {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyVideos = document.querySelectorAll('video[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    }, { threshold: 0.1, rootMargin: '50px' });
    
    const videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                const source = video.querySelector('source');
                if (source && !source.src) {
                    source.src = video.dataset.src;
                    video.load();
                }
                videoObserver.unobserve(video);
            }
        });
    }, { threshold: 0.1, rootMargin: '100px' });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    lazyVideos.forEach(video => videoObserver.observe(video));
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const submitButton = this.querySelector('.submit-button');
            const originalText = submitButton.innerHTML;
            
            // Show loading state
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                alert('Thank you for your inquiry! We will get back to you soon.');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Performance optimization: Reduce initial load
function optimizeInitialLoad() {
    // Only load first 3 videos in each gallery initially
    const galleries = document.querySelectorAll('.horizontal-gallery');
    galleries.forEach(gallery => {
        const videos = gallery.querySelectorAll('.gallery-video');
        videos.forEach((video, index) => {
            if (index >= 3) {
                // Lazy load videos after the first 3
                const source = video.querySelector('source');
                if (source && source.src) {
                    video.setAttribute('data-src', source.src);
                    source.removeAttribute('src');
                }
            }
        });
    });
}

// Temporary: font preview toggle per section
// font preview toggle removed

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Utility function for throttling
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Add CSS for error states
const errorStyles = `
    .field-error {
        color: #ff6b6b;
        font-size: 0.875rem;
        margin-top: 0.25rem;
    }
    
    .form-group input.error,
    .form-group textarea.error,
    .form-group select.error {
        border-color: #ff6b6b;
        box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.1);
    }
    
    .submit-button:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .navbar.scrolled {
        background: rgba(15, 15, 15, 0.98);
        backdrop-filter: blur(20px);
    }
    
    .nav-link.active {
        color: var(--accent-gold);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;

// Inject error styles
    const mainStyleSheet = document.createElement('style');
    mainStyleSheet.textContent = errorStyles;
    document.head.appendChild(mainStyleSheet);

// Performance optimization: Use passive event listeners
document.addEventListener('scroll', throttle(function() {
    // Scroll event handlers
}, 16), { passive: true });

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Handle responsive adjustments
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}, 250));

// Preload critical resources
function preloadResources() {
    const criticalImages = [
        'assets/images/impact-bg.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Performance optimization: Load all videos for presentation
function optimizeInitialLoad() {
    // Force load ALL videos and images immediately
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(video => {
        video.preload = 'auto';
        video.load();
        const source = video.querySelector('source');
        if (source && source.src) {
            video.load();
        }
    });
    
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.loading = 'eager';
        if (img.src) {
            // Force image load
            const newImg = new Image();
            newImg.src = img.src;
        }
    });
    
    // Load ALL videos immediately for presentation
    const galleries = document.querySelectorAll('.horizontal-gallery');
    galleries.forEach(gallery => {
        const videos = gallery.querySelectorAll('.gallery-video');
        videos.forEach((video) => {
            // Ensure all videos are loaded
            const source = video.querySelector('source');
            if (source && !source.src && video.getAttribute('data-src')) {
                source.src = video.getAttribute('data-src');
                video.load();
            }
        });
    });
}

// Call optimization
// optimizeInitialLoad(); // disabled for Drive links

// ScrollBooster init
function initScrollBoosterGalleries() {
    const galleries = document.querySelectorAll('.sb-gallery:not([data-scrollboosted])');
    if (!galleries.length) return;

    galleries.forEach((gallery) => {
        const track = gallery.querySelector('.sb-track') || gallery;

        // Initialize drag boost only if the library is loaded
        if (window.ScrollBooster) {
            new ScrollBooster({
                viewport: gallery,
                content: track,
                direction: 'horizontal',
                scrollMode: 'native',
                bounce: false,
                textSelection: false,
                pointerMode: 'mouse-touch'
            });
        }

        // Always map vertical wheel to horizontal scroll
        gallery.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                gallery.scrollLeft += e.deltaY;
                e.preventDefault();
            }
        }, { passive: false });

        gallery.setAttribute('data-scrollboosted', 'true');
    });
}