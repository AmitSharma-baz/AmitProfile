// Gallery Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Gallery data - all timeline photos organized by year
    const galleryData = {
        'covid': [
            {
                src: 'assets/covid/covid-hero.jpg',
                title: 'COVID Relief Leadership',
                description: 'Leading community relief efforts during the pandemic crisis',
                year: 'covid',
                category: 'leadership'
            },
            {
                src: 'assets/covid/FoodDuringCovid.jpg',
                title: 'Food Distribution During COVID',
                description: 'Organizing food distribution for families affected by lockdown',
                year: 'covid',
                category: 'food-relief'
            },
            {
                src: 'assets/covid/FoodCooking.jpg',
                title: 'Community Kitchen Service',
                description: 'Setting up community kitchens for daily meal preparation',
                year: 'covid',
                category: 'food-relief'
            },
            {
                src: 'assets/covid/DonationFood.jpg',
                title: 'Food Donation Drive',
                description: 'Coordinating food donations from community members',
                year: 'covid',
                category: 'food-relief'
            },
            {
                src: 'assets/covid/FoodDuringCovid1.jpg',
                title: 'Food Relief Program Phase 1',
                description: 'First phase of comprehensive food distribution program',
                year: 'covid',
                category: 'food-relief'
            },
            {
                src: 'assets/covid/FoodDuringCovid2.jpg',
                title: 'Food Relief Program Phase 2',
                description: 'Expanding food distribution to reach more families',
                year: 'covid',
                category: 'food-relief'
            },
            {
                src: 'assets/covid/FoodDuringCovid3.jpg',
                title: 'Food Relief Program Phase 3',
                description: 'Continuous food support during extended lockdown',
                year: 'covid',
                category: 'food-relief'
            },
            {
                src: 'assets/covid/FoodDuringCovid4.jpg',
                title: 'Food Relief Program Phase 4',
                description: 'Final phase ensuring no family goes hungry',
                year: 'covid',
                category: 'food-relief'
            },
            {
                src: 'assets/covid/PeopleBusFacility.jpg',
                title: 'Bus Transportation Facility',
                description: 'Arranging bus transportation for stranded people during lockdown',
                year: 'covid',
                category: 'transportation'
            },
            {
                src: 'assets/covid/TicketDistribution.jpg',
                title: 'Train Ticket Distribution',
                description: 'Distributing train tickets to help people reach their homes',
                year: 'covid',
                category: 'transportation'
            },
            {
                src: 'assets/covid/TicketDistribution2.jpg',
                title: 'Train Ticket Distribution Drive 2',
                description: 'Second phase of ticket distribution for migrant workers',
                year: 'covid',
                category: 'transportation'
            },
            {
                src: 'assets/covid/TicketDistribution3.jpg',
                title: 'Train Ticket Distribution Drive 3',
                description: 'Continued efforts to help stranded workers return home',
                year: 'covid',
                category: 'transportation'
            },
            {
                src: 'assets/covid/TicketDistribution4.jpg',
                title: 'Train Ticket Distribution Drive 4',
                description: 'Ensuring every stranded person gets transportation help',
                year: 'covid',
                category: 'transportation'
            },
            {
                src: 'assets/covid/TicketDistribution5.jpg',
                title: 'Train Ticket Distribution Drive 5',
                description: 'Final phase of transportation assistance program',
                year: 'covid',
                category: 'transportation'
            },
            {
                src: 'assets/covid/TrainTicketOnMyNameTrain.jpg',
                title: 'Personal Train Ticket Arrangement',
                description: 'Personal involvement in arranging train tickets for stranded workers',
                year: 'covid',
                category: 'transportation'
            },
            {
                src: 'assets/covid/Ticket.jpg',
                title: 'Transportation Ticket Management',
                description: 'Managing and organizing transportation tickets for distribution',
                year: 'covid',
                category: 'transportation'
            },
            {
                src: 'assets/covid/LetterFromCollectorSendPeopleTrain.jpg',
                title: 'Official Letter from Collector',
                description: 'Official correspondence for arranging transportation for people',
                year: 'covid',
                category: 'official-work'
            },
            {
                src: 'assets/covid/TicketFromCollectorTome.jpg',
                title: 'Ticket Authorization from Collector',
                description: 'Official authorization received from Collector for ticket distribution',
                year: 'covid',
                category: 'official-work'
            },
            {
                src: 'assets/covid/Donation.jpg',
                title: 'Community Donation Drive',
                description: 'Organizing donation drives for COVID relief efforts',
                year: 'covid',
                category: 'community-support'
            },
            {
                src: 'assets/covid/IMG-20200526-WA0004.jpg',
                title: 'WhatsApp Coordination',
                description: 'Using digital platforms for effective relief coordination',
                year: 'covid',
                category: 'digital-coordination'
            },
            {
                src: 'assets/covid/Screenshot_20200428-191934_Gallery.jpg',
                title: 'Digital Documentation',
                description: 'Documenting relief work for transparency and accountability',
                year: 'covid',
                category: 'documentation'
            }
        ],
        '2018': [
            {
                src: 'assets/timeline/2018-1.jpg',
                title: 'First BJP Membership',
                description: 'Joining BJP as a volunteer and taking the membership oath',
                year: '2018'
            },
            {
                src: 'assets/timeline/2018-2.jpg',
                title: 'Community Volunteer Work',
                description: 'Early days of community service in Ward 30',
                year: '2018'
            },
            {
                src: 'assets/timeline/2018-3.jpg',
                title: 'Local Development Programs',
                description: 'Participating in local community development initiatives',
                year: '2018'
            }
        ],
        '2019': [
            {
                src: 'assets/timeline/2019-1.jpg',
                title: 'Youth Coordinator Appointment',
                description: 'Being appointed as Youth Coordinator for Ward 30',
                year: '2019'
            },
            {
                src: 'assets/timeline/2019-2.jpg',
                title: 'First Blood Donation Camp',
                description: 'Organizing the first successful blood donation camp',
                year: '2019'
            },
            {
                src: 'assets/timeline/2019-3.jpg',
                title: 'Community Outreach',
                description: 'Regular community meetings and outreach programs',
                year: '2019'
            },
            {
                src: 'assets/timeline/2019-4.jpg',
                title: 'Youth Mobilization',
                description: 'Mobilizing youth for various social causes',
                year: '2019'
            }
        ],
        '2020': [
            {
                src: 'assets/timeline/2020-1.jpg',
                title: 'COVID Relief Distribution',
                description: 'Distributing food packets during the pandemic lockdown',
                year: '2020'
            },
            {
                src: 'assets/timeline/2020-2.jpg',
                title: 'Medical Assistance',
                description: 'Coordinating medical assistance for COVID patients',
                year: '2020'
            },
            {
                src: 'assets/timeline/2020-3.jpg',
                title: 'Safety Measures',
                description: 'Implementing safety measures in the community',
                year: '2020'
            },
            {
                src: 'assets/timeline/2020-4.jpg',
                title: 'Essential Services',
                description: 'Ensuring essential services reach every household',
                year: '2020'
            }
        ],
        '2021': [
            {
                src: 'assets/timeline/2021-1.jpg',
                title: 'Election Campaign Launch',
                description: 'Launching BJP election campaign in Ward 30',
                year: '2021'
            },
            {
                src: 'assets/timeline/2021-2.jpg',
                title: 'Rally Organization',
                description: 'Organizing successful political rallies',
                year: '2021'
            },
            {
                src: 'assets/timeline/2021-3.jpg',
                title: 'Voter Awareness',
                description: 'Conducting voter awareness and education programs',
                year: '2021'
            },
            {
                src: 'assets/timeline/2021-4.jpg',
                title: 'Door-to-Door Campaign',
                description: 'Personal connect through door-to-door campaigning',
                year: '2021'
            },
            {
                src: 'assets/timeline/2021-5.jpg',
                title: 'Election Victory',
                description: 'Celebrating successful election results',
                year: '2021'
            }
        ],
        '2022': [
            {
                src: 'assets/timeline/2022-1.jpg',
                title: 'BJP Gujarat Recognition',
                description: 'Receiving recognition from BJP Gujarat leadership',
                year: '2022'
            },
            {
                src: 'assets/timeline/2022-2.jpg',
                title: 'Youth Leadership Award',
                description: 'Being honored for outstanding youth leadership',
                year: '2022'
            },
            {
                src: 'assets/timeline/2022-3.jpg',
                title: 'Blood Donation Program Expansion',
                description: 'Expanding blood donation program across Surat',
                year: '2022'
            },
            {
                src: 'assets/timeline/2022-4.jpg',
                title: 'Community Service Recognition',
                description: 'Recognition ceremony for community service',
                year: '2022'
            }
        ],
        '2023': [
            {
                src: 'assets/timeline/2023-1.jpg',
                title: 'Yuva Mahamantri Oath',
                description: 'Taking oath as BJP Yuva Mahamantri for Ward 30',
                year: '2023'
            },
            {
                src: 'assets/timeline/2023-2.jpg',
                title: 'Youth Development Launch',
                description: 'Launching comprehensive youth development programs',
                year: '2023'
            },
            {
                src: 'assets/timeline/2023-3.jpg',
                title: 'Party Leadership Meeting',
                description: 'Strategic meeting with BJP leadership',
                year: '2023'
            },
            {
                src: 'assets/timeline/2023-4.jpg',
                title: 'Constituency Strengthening',
                description: 'Working to strengthen party presence in Ward 30',
                year: '2023'
            }
        ],
        '2024': [
            {
                src: 'assets/timeline/2024-1.jpg',
                title: 'Digital Initiative Launch',
                description: 'Launching digital platforms for better connectivity',
                year: '2024'
            },
            {
                src: 'assets/timeline/2024-2.jpg',
                title: 'Health Camp Organization',
                description: 'Regular health camps for community wellness',
                year: '2024'
            },
            {
                src: 'assets/timeline/2024-3.jpg',
                title: 'Youth Employment Program',
                description: 'Creating employment opportunities for local youth',
                year: '2024'
            },
            {
                src: 'assets/timeline/2024-4.jpg',
                title: 'Infrastructure Development',
                description: 'Working on infrastructure development projects',
                year: '2024'
            },
            {
                src: 'assets/timeline/2024-5.jpg',
                title: 'Community Development',
                description: 'Ongoing community development initiatives',
                year: '2024'
            }
        ]
    };

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
        actualImg.onload = function() {
            // Image loaded successfully, replace placeholder
            img.src = photo.src;
            console.log('Successfully loaded:', photo.src);
        };
        
        actualImg.onerror = function() {
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
        img.onload = function() {
            modalImage.src = photo.src;
            console.log('Modal image loaded:', photo.src);
        };
        
        img.onerror = function() {
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
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Handle navigation links properly
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

    // Stats animation on scroll
    const statsSection = document.querySelector('.gallery-stats');
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
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