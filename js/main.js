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
    initGalleryViewMore();
    initVideoHoverLoading();
    initLightbox();

    // Font preview removed for production
    
    // Initialize animations (from animations.js)
    if (window.initTypewriter) initTypewriter();
    if (window.initGalleryAnimations) initGalleryAnimations();
    if (window.initGalleryNavigation) initGalleryNavigation();
    if (window.initHoverEffects) initHoverEffects();
    
    console.log('✅ Website initialization complete');
});

// Video hover loading functionality for performance optimization
function initVideoHoverLoading() {
    console.log('🎬 Initializing video hover loading...');
    
    // Get all video elements
    const videos = document.querySelectorAll('video.gallery-video');
    
    videos.forEach(video => {
        // Store original source for lazy loading
        const source = video.querySelector('source');
        if (!source) return;
        
        const originalSrc = source.src;
        const originalType = source.type;
        
        // Remove src initially to prevent loading
        source.removeAttribute('src');
        video.load(); // Reset video element
        
        // Add hover event listeners
        const galleryItem = video.closest('.gallery-item');
        if (!galleryItem) return;
        
        let isLoaded = false;
        let loadTimeout;
        
        // Load video on hover
        galleryItem.addEventListener('mouseenter', function() {
            if (isLoaded) return;
            
            // Add small delay to prevent accidental loading
            loadTimeout = setTimeout(() => {
                if (!isLoaded) {
                    source.src = originalSrc;
                    source.type = originalType;
                    video.load();
                    isLoaded = true;
                    console.log('📹 Video loaded on hover:', originalSrc);
                }
            }, 300); // 300ms delay
        });
        
        // Cancel loading if user moves away quickly
        galleryItem.addEventListener('mouseleave', function() {
            if (loadTimeout) {
                clearTimeout(loadTimeout);
            }
        });
        
        // Load on click (for both mobile and lightbox)
        galleryItem.addEventListener('click', function(e) {
            if (!isLoaded) {
                source.src = originalSrc;
                source.type = originalType;
                video.load();
                isLoaded = true;
                console.log('📹 Video loaded on click:', originalSrc);
            }
            // Don't prevent default - let lightbox handle the click
        });
    });
    
    console.log(`✅ Video hover loading initialized for ${videos.length} videos`);
}

// Lightbox functionality for media viewing
function initLightbox() {
    console.log('🖼️ Initializing lightbox...');
    
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxContent = document.querySelector('.lightbox-content');
    const lightboxMedia = document.querySelector('.lightbox-media');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    
    if (!lightboxModal || !lightboxMedia) {
        console.log('❌ Lightbox elements not found');
        return;
    }
    
    let currentMediaIndex = 0;
    let currentMediaList = [];
    
    // Get all clickable media items
    const mediaItems = document.querySelectorAll('.gallery-item img, .gallery-item video');
    
    // Open lightbox
    function openLightbox(mediaElement, mediaList) {
        currentMediaList = mediaList;
        currentMediaIndex = mediaList.indexOf(mediaElement);
        
        if (currentMediaIndex === -1) return;
        
        displayMedia(mediaElement);
        lightboxModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
    
    // Display media in lightbox
    function displayMedia(mediaElement) {
        lightboxMedia.innerHTML = '';
        
        if (mediaElement.tagName === 'IMG') {
            const img = document.createElement('img');
            img.src = mediaElement.src;
            img.alt = mediaElement.alt || '';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '90vh';
            img.style.objectFit = 'contain';
            lightboxMedia.appendChild(img);
        } else if (mediaElement.tagName === 'VIDEO') {
            const video = document.createElement('video');
            video.controls = true;
            video.autoplay = true;
            video.muted = false;
            video.style.maxWidth = '100%';
            video.style.maxHeight = '90vh';
            
            const source = mediaElement.querySelector('source');
            if (source) {
                const newSource = document.createElement('source');
                newSource.src = source.src;
                newSource.type = source.type;
                video.appendChild(newSource);
            }
            
            lightboxMedia.appendChild(video);
        }
    }
    
    // Navigation functions
    function showPrev() {
        if (currentMediaIndex > 0) {
            currentMediaIndex--;
            displayMedia(currentMediaList[currentMediaIndex]);
        }
    }
    
    function showNext() {
        if (currentMediaIndex < currentMediaList.length - 1) {
            currentMediaIndex++;
            displayMedia(currentMediaList[currentMediaIndex]);
        }
    }
    
    // Close lightbox
    function closeLightbox() {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Pause any playing videos
        const video = lightboxMedia.querySelector('video');
        if (video) {
            video.pause();
        }
    }
    
    // Event listeners
    mediaItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.closest('[data-section]');
            const mediaList = section ? Array.from(section.querySelectorAll('.gallery-item img, .gallery-item video')) : [this];
            openLightbox(this, mediaList);
        });
    });
    
    // Close button
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // Close on background click
    if (lightboxModal) {
        lightboxModal.addEventListener('click', function(e) {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }
    
    // Navigation buttons
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', showPrev);
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', showNext);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightboxModal.style.display === 'flex') {
            switch(e.key) {
                case 'Escape':
                    closeLightbox();
                    break;
                case 'ArrowLeft':
                    showPrev();
                    break;
                case 'ArrowRight':
                    showNext();
                    break;
            }
        }
    });
    
    console.log('✅ Lightbox initialized');
}

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

// Gallery View More functionality
function initGalleryViewMore() {
    const viewMoreBtn = document.getElementById('view-more-btn');
    const featuredGallery = document.getElementById('featured-gallery');
    
    if (!viewMoreBtn || !featuredGallery) return;
    
    // Get all media from all sections
    function getAllMedia() {
        const allMedia = [];
        
        // Corporate videos
        document.querySelectorAll('.corporate-section .gallery-item').forEach(item => {
            const video = item.querySelector('video');
            const img = item.querySelector('img');
            if (video) {
                allMedia.push({
                    type: 'video',
                    src: video.querySelector('source').src,
                    poster: video.poster,
                    category: 'Corporate Event'
                });
            } else if (img) {
                allMedia.push({
                    type: 'image',
                    src: img.src,
                    category: 'Corporate Event'
                });
            }
        });
        
        // Wedding videos and images
        document.querySelectorAll('.weddings-section .gallery-item').forEach(item => {
            const video = item.querySelector('video');
            const img = item.querySelector('img');
            if (video) {
                allMedia.push({
                    type: 'video',
                    src: video.querySelector('source').src,
                    poster: video.poster,
                    category: 'Wedding'
                });
            } else if (img) {
                allMedia.push({
                    type: 'image',
                    src: img.src,
                    category: 'Wedding'
                });
            }
        });
        
        // Celebrity images
        document.querySelectorAll('.celebrities-section .gallery-item').forEach(item => {
            const img = item.querySelector('img');
            const video = item.querySelector('video');
            if (img) {
                allMedia.push({
                    type: 'image',
                    src: img.src,
                    category: 'Celebrity Event'
                });
            } else if (video) {
                allMedia.push({
                    type: 'video',
                    src: video.querySelector('source').src,
                    poster: video.poster,
                    category: 'Celebrity Event'
                });
            }
        });
        
        // Automobile images
        document.querySelectorAll('.car-bike-section .gallery-item').forEach(item => {
            const img = item.querySelector('img');
            if (img) {
                allMedia.push({
                    type: 'image',
                    src: img.src,
                    category: 'Automobile Event'
                });
            }
        });
        
        // Sports images and videos
        document.querySelectorAll('.sports-section .gallery-item').forEach(item => {
            const video = item.querySelector('video');
            const img = item.querySelector('img');
            if (video) {
                allMedia.push({
                    type: 'video',
                    src: video.querySelector('source').src,
                    poster: video.poster,
                    category: 'Sports Event'
                });
            } else if (img) {
                allMedia.push({
                    type: 'image',
                    src: img.src,
                    category: 'Sports Event'
                });
            }
        });
        
        // Concert videos and images
        document.querySelectorAll('.concert-section .gallery-item').forEach(item => {
            const video = item.querySelector('video');
            const img = item.querySelector('img');
            if (video) {
                allMedia.push({
                    type: 'video',
                    src: video.querySelector('source').src,
                    poster: video.poster,
                    category: 'Concert & Fest'
                });
            } else if (img) {
                allMedia.push({
                    type: 'image',
                    src: img.src,
                    category: 'Concert & Fest'
                });
            }
        });
        
        return allMedia;
    }
    
    // Create gallery item HTML
    function createGalleryItem(media, index) {
        if (media.type === 'video') {
            return `
                <div class="gallery-item" data-index="${index}">
                    <video class="gallery-video" loading="lazy" playsinline muted poster="${media.poster}" preload="metadata">
                        <source src="${media.src}" type="video/mp4">
                    </video>
                </div>
            `;
        } else {
            return `
                <div class="gallery-item" data-index="${index}">
                    <img class="gallery-image" src="${media.src}" loading="lazy" alt="${media.category}">
                </div>
            `;
        }
    }
    
    // Show all media
    function showAllMedia() {
        const allMedia = getAllMedia();
        const currentItems = featuredGallery.querySelectorAll('.gallery-item').length;
        
        // If already showing all, scroll to top of gallery
        if (currentItems >= allMedia.length) {
            featuredGallery.scrollIntoView({ behavior: 'smooth' });
            return;
        }
        
        // Add remaining items
        const remainingMedia = allMedia.slice(currentItems);
        const newItemsHTML = remainingMedia.map((media, index) => 
            createGalleryItem(media, currentItems + index)
        ).join('');
        
        featuredGallery.insertAdjacentHTML('beforeend', newItemsHTML);
        
        // Update button text
        viewMoreBtn.innerHTML = 'Back to Top';
        
        // Scroll to new items
        setTimeout(() => {
            const newItems = featuredGallery.querySelectorAll('.gallery-item');
            if (newItems.length > 0) {
                newItems[newItems.length - 1].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                });
            }
        }, 100);
    }
    
    // Reset to featured view
    function showFeaturedOnly() {
        const allItems = featuredGallery.querySelectorAll('.gallery-item');
        const featuredCount = 12; // Show only first 12 items
        
        // Remove extra items
        for (let i = featuredCount; i < allItems.length; i++) {
            allItems[i].remove();
        }
        
        // Update button text
        viewMoreBtn.innerHTML = 'View More';
        
        // Scroll to top of gallery
        featuredGallery.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Event listener
    viewMoreBtn.addEventListener('click', function() {
        const currentItems = featuredGallery.querySelectorAll('.gallery-item').length;
        const allMedia = getAllMedia();
        
        if (currentItems < allMedia.length) {
            showAllMedia();
        } else {
            showFeaturedOnly();
        }
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