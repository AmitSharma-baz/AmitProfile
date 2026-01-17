// Timeline Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Timeline photos data - organized by year
    const timelinePhotos = {
        '2018': [
            {
                src: 'assets/timeline/2018-1.jpg',
                title: 'First BJP Membership',
                description: 'Joining BJP as a volunteer and taking the membership oath'
            },
            {
                src: 'assets/timeline/2018-2.jpg',
                title: 'Community Volunteer Work',
                description: 'Early days of community service in Ward 30'
            },
            {
                src: 'assets/timeline/2018-3.jpg',
                title: 'Local Development Programs',
                description: 'Participating in local community development initiatives'
            }
        ],
        '2019': [
            {
                src: 'assets/timeline/2019-1.jpg',
                title: 'Youth Coordinator Appointment',
                description: 'Being appointed as Youth Coordinator for Ward 30'
            },
            {
                src: 'assets/timeline/2019-2.jpg',
                title: 'First Blood Donation Camp',
                description: 'Organizing the first successful blood donation camp'
            },
            {
                src: 'assets/timeline/2019-3.jpg',
                title: 'Community Outreach',
                description: 'Regular community meetings and outreach programs'
            },
            {
                src: 'assets/timeline/2019-4.jpg',
                title: 'Youth Mobilization',
                description: 'Mobilizing youth for various social causes'
            }
        ],
        '2020': [
            {
                src: 'assets/timeline/2020-1.jpg',
                title: 'COVID Relief Distribution',
                description: 'Distributing food packets during the pandemic lockdown'
            },
            {
                src: 'assets/timeline/2020-2.jpg',
                title: 'Medical Assistance',
                description: 'Coordinating medical assistance for COVID patients'
            },
            {
                src: 'assets/timeline/2020-3.jpg',
                title: 'Safety Measures',
                description: 'Implementing safety measures in the community'
            },
            {
                src: 'assets/timeline/2020-4.jpg',
                title: 'Essential Services',
                description: 'Ensuring essential services reach every household'
            }
        ],
        '2021': [
            {
                src: 'assets/timeline/2021-1.jpg',
                title: 'Election Campaign Launch',
                description: 'Launching BJP election campaign in Ward 30'
            },
            {
                src: 'assets/timeline/2021-2.jpg',
                title: 'Rally Organization',
                description: 'Organizing successful political rallies'
            },
            {
                src: 'assets/timeline/2021-3.jpg',
                title: 'Voter Awareness',
                description: 'Conducting voter awareness and education programs'
            },
            {
                src: 'assets/timeline/2021-4.jpg',
                title: 'Door-to-Door Campaign',
                description: 'Personal connect through door-to-door campaigning'
            },
            {
                src: 'assets/timeline/2021-5.jpg',
                title: 'Election Victory',
                description: 'Celebrating successful election results'
            }
        ],
        '2022': [
            {
                src: 'assets/timeline/2022-1.jpg',
                title: 'BJP Gujarat Recognition',
                description: 'Receiving recognition from BJP Gujarat leadership'
            },
            {
                src: 'assets/timeline/2022-2.jpg',
                title: 'Youth Leadership Award',
                description: 'Being honored for outstanding youth leadership'
            },
            {
                src: 'assets/timeline/2022-3.jpg',
                title: 'Blood Donation Program Expansion',
                description: 'Expanding blood donation program across Surat'
            },
            {
                src: 'assets/timeline/2022-4.jpg',
                title: 'Community Service Recognition',
                description: 'Recognition ceremony for community service'
            }
        ],
        '2023': [
            {
                src: 'assets/timeline/2023-1.jpg',
                title: 'Yuva Mahamantri Oath',
                description: 'Taking oath as BJP Yuva Mahamantri for Ward 30'
            },
            {
                src: 'assets/timeline/2023-2.jpg',
                title: 'Youth Development Launch',
                description: 'Launching comprehensive youth development programs'
            },
            {
                src: 'assets/timeline/2023-3.jpg',
                title: 'Party Leadership Meeting',
                description: 'Strategic meeting with BJP leadership'
            },
            {
                src: 'assets/timeline/2023-4.jpg',
                title: 'Constituency Strengthening',
                description: 'Working to strengthen party presence in Ward 30'
            }
        ],
        '2024': [
            {
                src: 'assets/timeline/2024-1.jpg',
                title: 'Digital Initiative Launch',
                description: 'Launching digital platforms for better connectivity'
            },
            {
                src: 'assets/timeline/2024-2.jpg',
                title: 'Health Camp Organization',
                description: 'Regular health camps for community wellness'
            },
            {
                src: 'assets/timeline/2024-3.jpg',
                title: 'Youth Employment Program',
                description: 'Creating employment opportunities for local youth'
            },
            {
                src: 'assets/timeline/2024-4.jpg',
                title: 'Infrastructure Development',
                description: 'Working on infrastructure development projects'
            },
            {
                src: 'assets/timeline/2024-5.jpg',
                title: 'Community Development',
                description: 'Ongoing community development initiatives'
            }
        ]
    };

    // Initialize timeline animations
    initializeTimelineAnimations();
    
    // Initialize photo modal functionality
    initializePhotoModal();
    
    // Initialize counter animations
    initializeCounterAnimations();
    
    // Initialize scroll animations
    initializeScrollAnimations();

    // Timeline Animation
    function initializeTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);
        
        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }

    // Photo Modal Functionality
    function initializePhotoModal() {
        const photoButtons = document.querySelectorAll('.view-photos-btn');
        const photoModal = new bootstrap.Modal(document.getElementById('photoModal'));
        const modalTitle = document.getElementById('photoModalLabel');
        const carouselContent = document.getElementById('carouselContent');
        const thumbnailsContainer = document.getElementById('photoThumbnails');
        
        photoButtons.forEach(button => {
            button.addEventListener('click', function() {
                const year = this.getAttribute('data-timeline');
                const title = this.getAttribute('data-title');
                const photos = timelinePhotos[year] || [];
                
                if (photos.length === 0) {
                    showNotification('Photos for this timeline period will be added soon!', 'info');
                    return;
                }
                
                // Update modal title
                modalTitle.textContent = title;
                
                // Clear existing content
                carouselContent.innerHTML = '';
                thumbnailsContainer.innerHTML = '';
                
                // Add photos to carousel
                photos.forEach((photo, index) => {
                    // Carousel item
                    const carouselItem = document.createElement('div');
                    carouselItem.className = `carousel-item ${index === 0 ? 'active' : ''}`;
                    
                    const img = document.createElement('img');
                    img.className = 'd-block w-100';
                    img.alt = photo.title;
                    img.style.height = '500px';
                    img.style.objectFit = 'cover';
                    img.style.borderRadius = '10px';
                    
                    // Handle image loading
                    const testImg = new Image();
                    testImg.onload = function() {
                        img.src = photo.src;
                    };
                    
                    testImg.onerror = function() {
                        // Create canvas placeholder
                        const canvas = document.createElement('canvas');
                        canvas.width = 800;
                        canvas.height = 500;
                        const ctx = canvas.getContext('2d');
                        
                        // Draw placeholder
                        ctx.fillStyle = '#f5821f';
                        ctx.fillRect(0, 0, 800, 500);
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 32px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText('Photo Coming Soon', 400, 250);
                        
                        img.src = canvas.toDataURL();
                    };
                    
                    testImg.src = photo.src;
                    
                    const caption = document.createElement('div');
                    caption.className = 'photo-caption';
                    caption.innerHTML = `
                        <h5>${photo.title}</h5>
                        <p>${photo.description}</p>
                    `;
                    
                    carouselItem.appendChild(img);
                    carouselItem.appendChild(caption);
                    carouselContent.appendChild(carouselItem);
                    
                    // Thumbnail
                    const thumbnail = document.createElement('img');
                    thumbnail.alt = photo.title;
                    thumbnail.className = `thumbnail-img ${index === 0 ? 'active' : ''}`;
                    
                    // Handle thumbnail loading
                    const testThumb = new Image();
                    testThumb.onload = function() {
                        thumbnail.src = photo.src;
                    };
                    
                    testThumb.onerror = function() {
                        // Create small canvas placeholder
                        const canvas = document.createElement('canvas');
                        canvas.width = 80;
                        canvas.height = 60;
                        const ctx = canvas.getContext('2d');
                        
                        // Draw placeholder
                        ctx.fillStyle = '#f5821f';
                        ctx.fillRect(0, 0, 80, 60);
                        ctx.fillStyle = '#ffffff';
                        ctx.font = 'bold 10px Arial';
                        ctx.textAlign = 'center';
                        ctx.fillText('Soon', 40, 30);
                        
                        thumbnail.src = canvas.toDataURL();
                    };
                    
                    testThumb.src = photo.src;
                    
                    thumbnail.addEventListener('click', () => {
                        // Remove active class from all thumbnails
                        document.querySelectorAll('.thumbnail-img').forEach(thumb => {
                            thumb.classList.remove('active');
                        });
                        // Add active class to clicked thumbnail
                        thumbnail.classList.add('active');
                        
                        // Navigate to corresponding carousel item
                        const carousel = bootstrap.Carousel.getInstance(document.getElementById('photoCarousel'));
                        carousel.to(index);
                    });
                    thumbnailsContainer.appendChild(thumbnail);
                });
                
                // Show modal
                photoModal.show();
                
                // Handle carousel slide events to update thumbnails
                const carouselElement = document.getElementById('photoCarousel');
                carouselElement.addEventListener('slide.bs.carousel', function(event) {
                    // Update active thumbnail
                    document.querySelectorAll('.thumbnail-img').forEach((thumb, index) => {
                        thumb.classList.toggle('active', index === event.to);
                    });
                });
            });
        });
        
        // Handle image loading errors
        document.addEventListener('error', function(e) {
            if (e.target.tagName === 'IMG' && e.target.src.includes('timeline/')) {
                // Prevent infinite loop by removing error handler
                e.target.onerror = null;
                
                // Create canvas placeholder
                const canvas = document.createElement('canvas');
                canvas.width = 600;
                canvas.height = 400;
                const ctx = canvas.getContext('2d');
                
                // Draw placeholder
                ctx.fillStyle = '#f5821f';
                ctx.fillRect(0, 0, 600, 400);
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 28px Arial';
                ctx.textAlign = 'center';
                ctx.fillText('Photo Coming Soon', 300, 200);
                
                e.target.src = canvas.toDataURL();
                e.target.alt = 'Photo will be added soon';
            }
        }, true);
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
        
        const statsSection = document.querySelector('.timeline-stats');
        if (statsSection) {
            counterObserver.observe(statsSection);
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
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Navbar scroll effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Notification system (reuse from main script)
    function showNotification(message, type) {
        // Remove existing notifications
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles
        const bgColor = type === 'success' ? '#4CAF50' : type === 'info' ? '#2196F3' : '#f44336';
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
        
        // Auto remove after 4 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 300);
            }
        }, 4000);
        
        // Close button functionality
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

    // Timeline item hover effects
    const timelineCards = document.querySelectorAll('.timeline-card');
    timelineCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Keyboard navigation for photo modal
    document.addEventListener('keydown', function(e) {
        const modal = document.getElementById('photoModal');
        if (modal.classList.contains('show')) {
            const carousel = bootstrap.Carousel.getInstance(document.getElementById('photoCarousel'));
            
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                carousel.prev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                carousel.next();
            } else if (e.key === 'Escape') {
                const modalInstance = bootstrap.Modal.getInstance(modal);
                modalInstance.hide();
            }
        }
    });

    // Lazy loading for timeline images (if implemented)
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

    // Initialize lazy loading if needed
    initializeLazyLoading();

    // Print functionality (optional)
    function printTimeline() {
        window.print();
    }

    // Export timeline data (optional)
    function exportTimelineData() {
        const timelineData = {
            title: "Amit Sharma - Political Journey Timeline",
            items: Array.from(document.querySelectorAll('.timeline-item')).map(item => ({
                year: item.dataset.year,
                title: item.querySelector('.timeline-event-title').textContent,
                description: item.querySelector('.timeline-description').textContent,
                highlights: Array.from(item.querySelectorAll('.highlight-tag')).map(tag => tag.textContent)
            }))
        };
        
        const dataStr = JSON.stringify(timelineData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'amit-sharma-timeline.json';
        link.click();
        
        URL.revokeObjectURL(url);
    }

    // Add export functionality to a button if needed
    const exportBtn = document.getElementById('exportTimelineBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportTimelineData);
    }
});

// Utility function to create timeline folders
function createTimelineFolders() {
    const years = ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
    console.log('Timeline photo folders needed:');
    years.forEach(year => {
        console.log(`assets/timeline/${year}/`);
    });
}