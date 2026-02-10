// Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', function () {

    // Gallery data - all timeline photos organized by year
    // Gallery data is now loaded from gallery-data.js
    // Ensure galleryData exists
    // Check if global data is loaded
    if (typeof galleryData === 'undefined') {
        console.error('Gallery data not loaded! Make sure gallery-data.js is included.');
        return;
    }


    // Flatten all photos into a single array
    let allPhotos = [];
    Object.keys(galleryData).forEach(year => {
        allPhotos = allPhotos.concat(galleryData[year]);
    });

    // Current state
    let currentFilter = 'all';
    let currentPhotoIndex = 0;
    let filteredPhotos = allPhotos;

    // Initialize gallery
    initializeGallery();
    initializeFilters();
    initializeModal();
    initializeStats();
    trackGalleryViews();

    // Initialize Gallery
    function initializeGallery() {
        const container = document.getElementById('galleryContainer');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const noImagesMessage = document.getElementById('noImagesMessage');

        // Show loading initially
        loadingIndicator.style.display = 'block';

        // Simulate loading delay
        setTimeout(() => {
            loadingIndicator.style.display = 'none';

            if (allPhotos.length === 0) {
                noImagesMessage.classList.remove('d-none');
                return;
            }

            renderGallery(allPhotos);
        }, 1000);
    }

    // Render Gallery
    function renderGallery(photos) {
        const container = document.getElementById('galleryContainer');
        container.innerHTML = '';

        if (photos.length === 0) {
            document.getElementById('noImagesMessage').classList.remove('d-none');
            return;
        }

        document.getElementById('noImagesMessage').classList.add('d-none');

        photos.forEach((photo, index) => {
            const galleryItem = createGalleryItem(photo, index);
            container.appendChild(galleryItem);
        });

        // Animate items
        setTimeout(() => {
            const items = container.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 100);
            });
        }, 100);
    }

    // Create Gallery Item
    function createGalleryItem(photo, index) {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-4 col-md-6 col-sm-12';

        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.year = photo.year;
        galleryItem.dataset.index = index;

        const img = document.createElement('img');
        img.alt = photo.title;
        img.style.width = '100%';
        img.style.height = '250px';
        img.style.objectFit = 'cover';

        // Create a simple placeholder without external API
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 250;
        const ctx = canvas.getContext('2d');

        // Draw placeholder with category info
        const isCovidPhoto = photo.year === 'covid';

        if (isCovidPhoto) {
            // COVID-specific placeholder with category-based colors
            const categoryColors = {
                'food-relief': '#28a745',
                'medical-aid': '#dc3545',
                'safety': '#ffc107',
                'emergency-response': '#fd7e14',
                'coordination': '#6f42c1',
                'community-support': '#20c997',
                'awareness': '#17a2b8',
                'sanitization': '#6c757d',
                'dedication': '#e83e8c',
                'default': '#dc3545'
            };

            const bgColor = categoryColors[photo.category] || categoryColors.default;

            // Gradient background
            const gradient = ctx.createLinearGradient(0, 0, 400, 250);
            gradient.addColorStop(0, bgColor);
            gradient.addColorStop(1, '#ffffff');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 400, 250);

            // Add COVID relief icon (heart)
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 40px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('♥', 200, 80);

            // Title
            ctx.font = 'bold 18px Arial';
            ctx.fillStyle = '#ffffff';
            ctx.fillText('COVID Relief Work', 200, 120);

            // Category
            ctx.font = 'bold 14px Arial';
            const categoryText = photo.category ? photo.category.replace('-', ' ').toUpperCase() : 'COMMUNITY SERVICE';
            ctx.fillText(categoryText, 200, 145);

            // Loading text
            ctx.font = '12px Arial';
            ctx.fillStyle = 'rgba(255,255,255,0.8)';
            ctx.fillText('Photo Loading...', 200, 170);

        } else {
            // Regular placeholder
            ctx.fillStyle = '#f5821f';
            ctx.fillRect(0, 0, 400, 250);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('Photo Coming Soon', 200, 125);
        }

        const placeholderDataUrl = canvas.toDataURL();

        // Set placeholder initially
        img.src = placeholderDataUrl;

        // Try to load actual image
        const actualImg = new Image();
        actualImg.onload = function () {
            // Image loaded successfully, replace placeholder
            img.src = photo.src;
            console.log('Successfully loaded:', photo.src);
        };

        actualImg.onerror = function () {
            // Keep placeholder and log error
            console.warn('Failed to load image:', photo.src);
            // Update placeholder to show it's a real photo that couldn't load
            if (isCovidPhoto) {
                const canvas2 = document.createElement('canvas');
                canvas2.width = 400;
                canvas2.height = 250;
                const ctx2 = canvas2.getContext('2d');

                const categoryColors = {
                    'food-relief': '#28a745',
                    'medical-aid': '#dc3545',
                    'safety': '#ffc107',
                    'emergency-response': '#fd7e14',
                    'coordination': '#6f42c1',
                    'community-support': '#20c997',
                    'awareness': '#17a2b8',
                    'sanitization': '#6c757d',
                    'dedication': '#e83e8c',
                    'default': '#dc3545'
                };

                const bgColor = categoryColors[photo.category] || categoryColors.default;

                // Gradient background
                const gradient = ctx2.createLinearGradient(0, 0, 400, 250);
                gradient.addColorStop(0, bgColor);
                gradient.addColorStop(1, '#ffffff');
                ctx2.fillStyle = gradient;
                ctx2.fillRect(0, 0, 400, 250);

                // Add COVID relief icon
                ctx2.fillStyle = '#ffffff';
                ctx2.font = 'bold 40px Arial';
                ctx2.textAlign = 'center';
                ctx2.fillText('♥', 200, 80);

                // Title
                ctx2.font = 'bold 16px Arial';
                ctx2.fillStyle = '#ffffff';
                ctx2.fillText('COVID Relief Photo', 200, 120);

                // Category
                ctx2.font = 'bold 12px Arial';
                const categoryText = photo.category ? photo.category.replace('-', ' ').toUpperCase() : 'COMMUNITY SERVICE';
                ctx2.fillText(categoryText, 200, 140);

                // Status
                ctx2.font = '11px Arial';
                ctx2.fillStyle = 'rgba(255,255,255,0.8)';
                ctx2.fillText('Image temporarily unavailable', 200, 165);

                img.src = canvas2.toDataURL();
            }
        };

        // Start loading the actual image
        actualImg.src = photo.src;

        galleryItem.innerHTML = `
            <div class="gallery-overlay">
                <h5>${photo.title}</h5>
                <p>${photo.description}</p>
                <span class="year-badge">${photo.year === 'covid' ? 'COVID Relief' : photo.year}</span>
            </div>
        `;

        galleryItem.insertBefore(img, galleryItem.firstChild);

        // Add click event
        galleryItem.addEventListener('click', () => {
            openModal(index);
        });

        colDiv.appendChild(galleryItem);
        return colDiv;
    }

    // Initialize Filters
    function initializeFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter photos
                filterGallery(filter);
            });
        });
    }

    // Filter Gallery
    function filterGallery(filter) {
        currentFilter = filter;

        if (filter === 'all') {
            filteredPhotos = allPhotos;
        } else {
            filteredPhotos = allPhotos.filter(photo => photo.year === filter);
        }

        // Add filtering animation
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            item.classList.add('filtering');
        });

        setTimeout(() => {
            renderGallery(filteredPhotos);
        }, 300);
    }

    // Initialize Modal
    function initializeModal() {
        const modal = new bootstrap.Modal(document.getElementById('imageModal'));
        const modalImage = document.getElementById('modalImage');
        const imageTitle = document.getElementById('imageTitle');
        const imageDescription = document.getElementById('imageDescription');
        const imageCounter = document.getElementById('imageCounter');
        const imageYear = document.getElementById('imageYear');
        const prevBtn = document.getElementById('prevImage');
        const nextBtn = document.getElementById('nextImage');

        // Navigation buttons
        prevBtn.addEventListener('click', () => {
            navigateModal(-1);
        });

        nextBtn.addEventListener('click', () => {
            navigateModal(1);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const modalElement = document.getElementById('imageModal');
            if (modalElement.classList.contains('show')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    navigateModal(-1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    navigateModal(1);
                } else if (e.key === 'Escape') {
                    modal.hide();
                }
            }
        });
    }

    // Open Modal
    function openModal(index) {
        currentPhotoIndex = index;
        updateModalContent();

        const modal = bootstrap.Modal.getInstance(document.getElementById('imageModal')) ||
            new bootstrap.Modal(document.getElementById('imageModal'));
        modal.show();
    }

    // Navigate Modal
    function navigateModal(direction) {
        const newIndex = currentPhotoIndex + direction;

        if (newIndex >= 0 && newIndex < filteredPhotos.length) {
            currentPhotoIndex = newIndex;
            updateModalContent();
        }
    }

    // Update Modal Content
    function updateModalContent() {
        const photo = filteredPhotos[currentPhotoIndex];
        const modalImage = document.getElementById('modalImage');
        const imageTitle = document.getElementById('imageTitle');
        const imageDescription = document.getElementById('imageDescription');
        const imageCounter = document.getElementById('imageCounter');
        const imageYear = document.getElementById('imageYear');
        const prevBtn = document.getElementById('prevImage');
        const nextBtn = document.getElementById('nextImage');

        // Update image and info
        modalImage.alt = photo.title;
        imageTitle.textContent = photo.title;
        imageDescription.textContent = photo.description;
        imageCounter.textContent = `${currentPhotoIndex + 1} of ${filteredPhotos.length}`;
        imageYear.textContent = photo.year === 'covid' ? 'COVID Relief' : photo.year;

        // Update navigation buttons
        prevBtn.disabled = currentPhotoIndex === 0;
        nextBtn.disabled = currentPhotoIndex === filteredPhotos.length - 1;

        // Handle image loading with canvas fallback
        const img = new Image();
        img.onload = function () {
            modalImage.src = photo.src;
            console.log('Modal image loaded:', photo.src);
        };

        img.onerror = function () {
            console.warn('Modal image failed to load:', photo.src);
            // Create canvas placeholder for modal
            const canvas = document.createElement('canvas');
            canvas.width = 800;
            canvas.height = 600;
            const ctx = canvas.getContext('2d');

            // Draw placeholder with appropriate styling
            const isCovidPhoto = photo.year === 'covid';
            ctx.fillStyle = isCovidPhoto ? '#dc3545' : '#f5821f';
            ctx.fillRect(0, 0, 800, 600);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 32px Arial';
            ctx.textAlign = 'center';

            if (isCovidPhoto) {
                ctx.fillText('COVID Relief Photo', 400, 280);
                ctx.font = 'bold 24px Arial';
                ctx.fillText('Image not available', 400, 320);
            } else {
                ctx.fillText('Photo Coming Soon', 400, 300);
            }

            modalImage.src = canvas.toDataURL();
        };

        img.src = photo.src;
    }

    // Initialize Stats
    function initializeStats() {
        const totalPhotosElement = document.getElementById('totalPhotos');
        const viewsCountElement = document.getElementById('viewsCount');

        // Animate total photos counter
        animateCounter(totalPhotosElement, allPhotos.length);

        // Get and display view count
        const views = getGalleryViews();
        animateCounter(viewsCountElement, views);
    }

    // Animate Counter
    function animateCounter(element, target) {
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // Track Gallery Views
    function trackGalleryViews() {
        let views = localStorage.getItem('galleryViews') || 0;
        views = parseInt(views) + 1;
        localStorage.setItem('galleryViews', views);
    }

    // Get Gallery Views
    function getGalleryViews() {
        return parseInt(localStorage.getItem('galleryViews') || 0);
    }

    // Lazy Loading (if implemented)
    function initializeLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Search Functionality (if implemented)
    function initializeSearch() {
        const searchInput = document.getElementById('gallerySearch');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                const searchResults = allPhotos.filter(photo =>
                    photo.title.toLowerCase().includes(searchTerm) ||
                    photo.description.toLowerCase().includes(searchTerm) ||
                    photo.year.includes(searchTerm)
                );
                renderGallery(searchResults);
            }, 300));
        }
    }

    // Debounce function
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

    // Download Image (if implemented)
    function downloadImage(photo) {
        const link = document.createElement('a');
        link.href = photo.src;
        link.download = `${photo.title.replace(/\s+/g, '_')}_${photo.year}.jpg`;
        link.click();
    }

    // Share Image (if implemented)
    function shareImage(photo) {
        if (navigator.share) {
            navigator.share({
                title: photo.title,
                text: photo.description,
                url: window.location.href
            });
        } else {
            // Fallback to copying URL
            navigator.clipboard.writeText(window.location.href);
            showNotification('Link copied to clipboard!', 'success');
        }
    }

    // Notification system (reuse from main script)
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

    // Initialize additional features
    initializeLazyLoading();
    initializeSearch();

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle navigation links properly
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
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

    // Stats animation on scroll
    const statsSection = document.querySelector('.gallery-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function (entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    initializeStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    }
});