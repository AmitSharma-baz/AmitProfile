// COVID Service Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeGalleryFilters();
    initializeImageModal();
    initializeCounterAnimations();
    initializeScrollAnimations();
    initializeNavigation();

    // Gallery Filter Functionality
    function initializeGalleryFilters() {
        const filterButtons = document.querySelectorAll('.gallery-filters .filter-btn');
        const galleryItems = document.querySelectorAll('.covid-gallery-item');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter gallery items
                filterGalleryItems(filter, galleryItems);
            });
        });
    }

    // Filter Gallery Items
    function filterGalleryItems(filter, items) {
        items.forEach(item => {
            const category = item.getAttribute('data-category');
            
            // Add filtering animation
            item.classList.add('filtering');
            
            setTimeout(() => {
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.classList.remove('filtered-out');
                    setTimeout(() => {
                        item.classList.remove('filtering');
                    }, 50);
                } else {
                    item.classList.add('filtered-out');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            }, 150);
        });
    }

    // Image Modal Functionality
    function initializeImageModal() {
        const galleryItems = document.querySelectorAll('.covid-gallery-item');
        const modal = new bootstrap.Modal(document.getElementById('covidImageModal'));
        const modalImage = document.getElementById('modalCovidImage');
        const modalTitle = document.getElementById('modalImageTitle');
        const modalDescription = document.getElementById('modalImageDescription');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const overlay = item.querySelector('.gallery-overlay');
                const title = overlay.querySelector('h5').textContent;
                const description = overlay.querySelector('p').textContent;
                
                // Update modal content
                modalImage.src = img.src;
                modalImage.alt = img.alt;
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                
                // Show modal
                modal.show();
            });
        });
        
        // Handle image loading error in modal
        modalImage.addEventListener('error', function() {
            this.onerror = null;
            
            // Create canvas placeholder for modal
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 600;
            const ctx = canvas.getContext('2d');
            
            // Draw placeholder
            ctx.fillStyle = '#f5821f';
            ctx.fillRect(0, 0, 800, 600);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 36px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('COVID Relief Photo', 400, 280);
            ctx.fillText('Coming Soon', 400, 330);
            
            this.src = canvas.toDataURL();
        });
    }

    // Counter Animations
    function initializeCounterAnimations() {
        const counters = document.querySelectorAll('[data-count]');
        let countersAnimated = false;
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !countersAnimated) {
                    countersAnimated = true;
                    animateCounters();
                }
            });
        }, { threshold: 0.5 });
        
        const impactSection = document.querySelector('.covid-impact');
        if (impactSection) {
            counterObserver.observe(impactSection);
        }
        
        function animateCounters() {
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-count'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    counter.textContent = Math.floor(current);
                }, 16);
            });
        }
    }

    // Scroll Animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Animate elements on scroll
        const animateElements = document.querySelectorAll('.service-card, .impact-card, .testimonial-card, .covid-gallery-item');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
        });
    }

    // Navigation Handling
    function initializeNavigation() {
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Handle navigation links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only prevent default for anchor links
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetSection = document.querySelector(href);
                    
                    if (targetSection) {
                        const offsetTop = targetSection.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                    }
                }
                // For external links, allow normal navigation
            });
        });

        // Mobile menu handling
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Close mobile menu when any link is clicked
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Keyboard navigation for modal
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('covidImageModal');
        if (modal.classList.contains('show')) {
            if (e.key === 'Escape') {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                modalInstance.hide();
            }
        }
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Impact card animations
    const impactCards = document.querySelectorAll('.impact-card');
    impactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.impact-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.impact-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Testimonial card effects
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const quote = this.querySelector('.fa-quote-left');
            quote.style.transform = 'scale(1.2)';
            quote.style.color = '#f5821f';
        });
        
        card.addEventListener('mouseleave', function() {
            const quote = this.querySelector('.fa-quote-left');
            quote.style.transform = 'scale(1)';
        });
    });

    // Lazy loading for images (if needed)
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    // Initialize lazy loading
    initializeLazyLoading();

    // Print functionality
    function printCovidService() {
        window.print();
    }

    // Add print button functionality if needed
    const printBtn = document.getElementById('printCovidBtn');
    if (printBtn) {
        printBtn.addEventListener('click', printCovidService);
    }

    // Share functionality
    function shareCovidService() {
        if (navigator.share) {
            navigator.share({
                title: 'COVID-19 Relief Service - Amit Sharma',
                text: 'See how Amit Sharma served the community during COVID-19 pandemic',
                url: window.location.href
            });
        } else {
            // Fallback to copying URL
            navigator.clipboard.writeText(window.location.href);
            showNotification('Link copied to clipboard!', 'success');
        }
    }

    // Add share button functionality if needed
    const shareBtn = document.getElementById('shareCovidBtn');
    if (shareBtn) {
        shareBtn.addEventListener('click', shareCovidService);
    }

    // Notification system
    function showNotification(message, type) {
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        const bgColor = type === 'success' ? '#4CAF50' : '#2196F3';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 3000);
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        });
    }

    // Performance optimization
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

    // Optimized scroll handler
    const debouncedScroll = debounce(() => {
        // Any additional scroll-based functionality
    }, 10);

    window.addEventListener('scroll', debouncedScroll);
});