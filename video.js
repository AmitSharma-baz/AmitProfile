// Video Page JavaScript

document.addEventListener('DOMContentLoaded', function () {

    // Gallery data - all timeline photos organized by year
    // Gallery data is now loaded from video-data.js
    // Ensure videoData exists
    // Check if global data is loaded
    if (typeof videoData === 'undefined') {
        console.error('Gallery data not loaded! Make sure video-data.js is included.');
        return;
    }


    // Flatten all photos into a single array
    let allVideos = [];
    Object.keys(videoData).forEach(year => {
        allVideos = allVideos.concat(videoData[year]);
    });

    // Current state
    let currentFilter = 'all';
    let currentVideoIndex = 0;
    let filteredVideos = allVideos;

    // Initialize gallery
    initializeGallery();
    initializeFilters();
    initializeModal();
    initializeStats();
    trackGalleryViews();

    // Initialize Gallery
    function initializeGallery() {
        const container = document.getElementById('videoContainer');
        const loadingIndicator = document.getElementById('loadingIndicator');
        const noVideoMessage = document.getElementById('noVideoMessage');

        // Show loading initially
        loadingIndicator.style.display = 'block';

        // Simulate loading delay
        setTimeout(() => {
            loadingIndicator.style.display = 'none';

            if (allVideos.length === 0) {
                noVideoMessage.classList.remove('d-none');
                return;
            }

            renderVideoGallery(allVideos);
        }, 1000);
    }

    // Render Gallery
    function renderVideoGallery(videos) {
        const container = document.getElementById('videoContainer');
        container.innerHTML = '';

        if (videos.length === 0) {
            document.getElementById('noVideoMessage').classList.remove('d-none');
            return;
        }

        document.getElementById('noVideoMessage').classList.add('d-none');

        videos.forEach((video, index) => {
            const galleryItem = createVideoItem(video, index);
            container.appendChild(galleryItem);
        });

        // Animate items
        setTimeout(() => {
            const items = container.querySelectorAll('.video-item');
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('show');
                }, index * 100);
            });
        }, 100);
    }

    // Create Gallery Item
        function createVideoItem(video, index) {
        const colDiv = document.createElement('div');
        colDiv.className = 'col-lg-4 col-md-6 col-sm-12';

        const galleryItem = document.createElement('div');
        galleryItem.className = 'video-item';
        galleryItem.dataset.year = video.year;
        galleryItem.dataset.index = index;

        const vid = document.createElement('video');
        vid.muted = true;
        vid.loop = true;
        vid.title = video.title;
        vid.style.width = '100%';
        vid.style.height = '250px';
        vid.style.objectFit = 'cover';
        
        // Adding a thumbnail for the video if we want, but letting browser generate one is fine too.
        vid.src = video.src;
        // Preload metadata
        vid.preload = 'metadata';

        // Hover effect to play video thumbnail
        galleryItem.addEventListener('mouseenter', () => {
            vid.play().catch(e => console.log('Autoplay prevented', e));
        });
        galleryItem.addEventListener('mouseleave', () => {
            vid.pause();
        });

        galleryItem.innerHTML = `
            <div class="gallery-overlay">
                <h5>${video.title}</h5>
                <p>${video.description}</p>
                <span class="year-badge">${video.year === 'covid' ? 'COVID Relief' : video.year}</span>
                <i class="fas fa-play mt-2" style="font-size: 24px;"></i>
            </div>
        `;

        galleryItem.insertBefore(vid, galleryItem.firstChild);

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
            filteredVideos = allVideos;
        } else {
            filteredVideos = allVideos.filter(video => video.year === filter);
        }

        // Add filtering animation
        const items = document.querySelectorAll('.video-item');
        items.forEach(item => {
            item.classList.add('filtering');
        });

        setTimeout(() => {
            renderVideoGallery(filteredVideos);
        }, 300);
    }

    // Initialize Modal
    function initializeModal() {
        const modal = new bootstrap.Modal(document.getElementById('videoModal'));
        const modalVideo = document.getElementById('modalVideo');
        const videoTitle = document.getElementById('videoTitle');
        const videoDescription = document.getElementById('videoDescription');
        const videoCounter = document.getElementById('videoCounter');
        const videoYear = document.getElementById('videoYear');
        const prevBtn = document.getElementById('prevVideo');
        const nextBtn = document.getElementById('nextVideo');

        
        document.getElementById('videoModal').addEventListener('hidden.bs.modal', function () {
            const modalVideo = document.getElementById('modalVideo');
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.src = '';
            }
        });
        
        // Navigation buttons

        prevBtn.addEventListener('click', () => {
            navigateModal(-1);
        });

        nextBtn.addEventListener('click', () => {
            navigateModal(1);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            const modalElement = document.getElementById('videoModal');
            if (modalElement.classList.contains('show')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    navigateModal(-1);
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    navigateModal(1);
                } else if (e.key === 'Escape') {
                    modalVideo.pause();
                    modal.hide();
                }
            }
        });
    }

    // Open Modal
    function openModal(index) {
        currentVideoIndex = index;
        updateModalContent();

        const modal = bootstrap.Modal.getInstance(document.getElementById('videoModal')) ||
            new bootstrap.Modal(document.getElementById('videoModal'));
        modal.show();
    }

    // Navigate Modal
    function navigateModal(direction) {
        const newIndex = currentVideoIndex + direction;

        if (newIndex >= 0 && newIndex < filteredVideos.length) {
            currentVideoIndex = newIndex;
            updateModalContent();
        }
    }

    // Update Modal Content
        function updateModalContent() {
        const video = filteredVideos[currentVideoIndex];
        const modalVideo = document.getElementById('modalVideo');
        const videoTitle = document.getElementById('videoTitle');
        const videoDescription = document.getElementById('videoDescription');
        const videoCounter = document.getElementById('videoCounter');
        const videoYear = document.getElementById('videoYear');
        const prevBtn = document.getElementById('prevVideo');
        const nextBtn = document.getElementById('nextVideo');

        // Update info
        videoTitle.textContent = video.title;
        videoDescription.textContent = video.description;
        videoCounter.textContent = `${currentVideoIndex + 1} of ${filteredVideos.length}`;
        videoYear.textContent = video.year === 'covid' ? 'COVID Relief' : video.year;

        // Update navigation buttons
        prevBtn.disabled = currentVideoIndex === 0;
        nextBtn.disabled = currentVideoIndex === filteredVideos.length - 1;

        modalVideo.src = video.src;
        modalVideo.play().catch(e => console.log(e));
    }

    // Initialize Stats
    function initializeStats() {
        const totalVideosElement = document.getElementById('totalVideos');
        const viewsCountElement = document.getElementById('viewsCount');

        // Animate total photos counter
        animateCounter(totalVideosElement, allVideos.length);

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
                const searchResults = allVideos.filter(photo =>
                    video.title.toLowerCase().includes(searchTerm) ||
                    video.description.toLowerCase().includes(searchTerm) ||
                    video.year.includes(searchTerm)
                );
                renderVideoGallery(searchResults);
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
        link.href = video.src;
        link.download = `${video.title.replace(/\s+/g, '_')}_${video.year}.jpg`;
        link.click();
    }

    // Share Image (if implemented)
    function shareImage(photo) {
        if (navigator.share) {
            navigator.share({
                title: video.title,
                text: video.description,
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