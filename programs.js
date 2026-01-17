// Programs Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initializeProgramsFilter();
    initializeScrollAnimations();
    initializeCounterAnimations();
    initializeNavigation();
    initializeProgramCards();
    initializeProgramImageViewer();

    // Programs Filter Functionality
    function initializeProgramsFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const programCards = document.querySelectorAll('.program-card');
        
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter program cards
                filterPrograms(filter, programCards);
            });
        });
    }

    // Filter Programs
    function filterPrograms(filter, cards) {
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            // Add filtering animation
            card.classList.add('filtering');
            
            setTimeout(() => {
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    card.classList.remove('filtered-out');
                    setTimeout(() => {
                        card.classList.remove('filtering');
                        card.classList.add('show');
                    }, 50);
                } else {
                    card.classList.add('filtered-out');
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            }, 150);
        });
        
        // Update programs count
        updateProgramsCount(filter, cards);
    }

    // Update Programs Count
    function updateProgramsCount(filter, cards) {
        let visibleCount = 0;
        cards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                visibleCount++;
            }
        });
        
        // Update count display if element exists
        const countElement = document.getElementById('programsCount');
        if (countElement) {
            countElement.textContent = visibleCount;
        }
    }

    // Initialize Program Cards
    function initializeProgramCards() {
        const programCards = document.querySelectorAll('.program-card');
        
        // Add hover effects
        programCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
            
            // Add click functionality for future expansion
            card.addEventListener('click', function() {
                const programTitle = this.querySelector('h4').textContent;
                console.log('Program clicked:', programTitle);
                // Future: Open detailed view or modal
            });
        });
        
        // Show all cards initially
        setTimeout(() => {
            programCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('show');
                }, index * 100);
            });
        }, 500);
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
        const animateElements = document.querySelectorAll('.program-card, .stat-card');
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease';
            observer.observe(el);
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
        
        const statsSection = document.querySelector('.programs-stats');
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
            });
        });

        // Mobile menu handling
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            });
        });
    }

    // Search Functionality (if implemented)
    function initializeSearch() {
        const searchInput = document.getElementById('programsSearch');
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                const searchTerm = e.target.value.toLowerCase();
                const programCards = document.querySelectorAll('.program-card');
                
                programCards.forEach(card => {
                    const title = card.querySelector('h4').textContent.toLowerCase();
                    const description = card.querySelector('.program-description').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || description.includes(searchTerm)) {
                        card.style.display = 'block';
                        card.classList.remove('filtered-out');
                    } else {
                        card.style.display = 'none';
                        card.classList.add('filtered-out');
                    }
                });
            }, 300));
        }
    }

    // Program Categories Data
    const programCategories = {
        'political': {
            name: 'Political Activities',
            icon: 'fas fa-flag',
            color: '#FF6B6B',
            count: 0
        },
        'social': {
            name: 'Social Welfare',
            icon: 'fas fa-heart',
            color: '#4ECDC4',
            count: 0
        },
        'health': {
            name: 'Health & Medical',
            icon: 'fas fa-medkit',
            color: '#45B7D1',
            count: 0
        },
        'environment': {
            name: 'Environment',
            icon: 'fas fa-leaf',
            color: '#96CEB4',
            count: 0
        },
        'cultural': {
            name: 'Cultural & Religious',
            icon: 'fas fa-music',
            color: '#FFEAA7',
            count: 0
        },
        'awareness': {
            name: 'Awareness Campaigns',
            icon: 'fas fa-bullhorn',
            color: '#DDA0DD',
            count: 0
        }
    };

    // Count programs by category
    function countProgramsByCategory() {
        const programCards = document.querySelectorAll('.program-card');
        
        // Reset counts
        Object.keys(programCategories).forEach(key => {
            programCategories[key].count = 0;
        });
        
        // Count programs
        programCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (programCategories[category]) {
                programCategories[category].count++;
            }
        });
        
        return programCategories;
    }

    // Generate category statistics
    function generateCategoryStats() {
        const categories = countProgramsByCategory();
        console.log('Program Categories:', categories);
        return categories;
    }

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or reset filters
            const activeFilter = document.querySelector('.filter-btn.active');
            if (activeFilter && activeFilter.getAttribute('data-filter') !== 'all') {
                document.querySelector('.filter-btn[data-filter="all"]').click();
            }
        }
    });

    // Print functionality
    function printPrograms() {
        window.print();
    }

    // Export programs data
    function exportProgramsData() {
        const programCards = document.querySelectorAll('.program-card');
        const programsData = {
            title: "Amit Sharma - Programs & Initiatives",
            totalPrograms: programCards.length,
            categories: generateCategoryStats(),
            programs: []
        };
        
        programCards.forEach(card => {
            const program = {
                title: card.querySelector('h4').textContent,
                description: card.querySelector('.program-description').textContent,
                category: card.getAttribute('data-category'),
                tag: card.querySelector('.program-tag').textContent
            };
            programsData.programs.push(program);
        });
        
        const dataStr = JSON.stringify(programsData, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = 'amit-sharma-programs.json';
        link.click();
        
        URL.revokeObjectURL(url);
    }

    // Add export functionality if button exists
    const exportBtn = document.getElementById('exportProgramsBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportProgramsData);
    }

    // Add print functionality if button exists
    const printBtn = document.getElementById('printProgramsBtn');
    if (printBtn) {
        printBtn.addEventListener('click', printPrograms);
    }

    // Initialize search if implemented
    initializeSearch();

    // Generate initial statistics
    generateCategoryStats();

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

    // Performance monitoring
    function trackPerformance() {
        const loadTime = performance.now();
        console.log(`Programs page loaded in ${loadTime.toFixed(2)}ms`);
        
        // Track user interactions
        let interactionCount = 0;
        document.addEventListener('click', () => {
            interactionCount++;
        });
        
        // Log interactions after 30 seconds
        setTimeout(() => {
            console.log(`User interactions: ${interactionCount}`);
        }, 30000);
    }

    // Initialize performance tracking
    trackPerformance();

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

    // Show welcome message
    setTimeout(() => {
        showNotification('Explore our comprehensive programs and initiatives!', 'success');
    }, 1000);

    // Initialize Program Image Viewer
    function initializeProgramImageViewer() {
        const viewImageButtons = document.querySelectorAll('.view-images-btn');
        const modal = document.getElementById('programImagesModal');
        const modalTitle = document.getElementById('programImagesModalLabel');
        const carouselContent = document.getElementById('programCarouselContent');
        const thumbnailsContainer = document.getElementById('programThumbnails');
        const imageTitle = document.getElementById('programImageTitle');
        const imageDescription = document.getElementById('programImageDescription');
        const imageCounter = document.getElementById('programImageCounter');

        // Add click event listeners to all "View Images" buttons
        viewImageButtons.forEach(button => {
            button.addEventListener('click', function() {
                const programFolder = this.getAttribute('data-program');
                const programTitle = this.getAttribute('data-title');
                
                // Show loading state
                showLoadingState();
                
                // Load images for the selected program
                loadProgramImages(programFolder, programTitle);
            });
        });

        function showLoadingState() {
            modalTitle.textContent = 'Loading Images...';
            carouselContent.innerHTML = `
                <div class="carousel-item active">
                    <div class="d-flex justify-content-center align-items-center" style="height: 400px;">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            `;
            thumbnailsContainer.innerHTML = '';
            imageTitle.textContent = '';
            imageDescription.textContent = '';
            imageCounter.textContent = '';
            
            // Show modal
            const bootstrapModal = new bootstrap.Modal(modal);
            bootstrapModal.show();
        }

        function loadProgramImages(programFolder, programTitle) {
            // Define possible image patterns based on the folder structure
            const imagePatterns = [
                // Standard numbered patterns
                '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg',
                // Hundred series
                '100.jpg', '101.jpg', '102.jpg', '103.jpg', '104.jpg', '105.jpg', '106.jpg', '107.jpg', '108.jpg', '109.jpg', '110.jpg',
                '111.jpg', '112.jpg', '113.jpg', '114.jpg', '115.jpg', '116.jpg', '117.jpg', '118.jpg', '119.jpg', '120.jpg',
                '121.jpg', '122.jpg', '123.jpg', '124.jpg', '125.jpg', '126.jpg',
                // Two hundred series
                '200.jpg', '201.jpg', '202.jpg', '203.jpg', '204.jpg', '205.jpg', '206.jpg', '207.jpg', '208.jpg', '209.jpg',
                '210.jpg', '211.jpg', '212.jpg', '213.jpg', '214.jpg', '215.jpg', '216.jpg', '217.jpg', '218.jpg',
                // Three hundred series
                '300.jpg', '301.jpg', '302.jpg', '303.jpg', '304.jpg', '305.jpg', '306.jpg', '307.jpg', '308.jpg', '309.jpg',
                '310.jpg', '311.jpg', '312.jpg', '313.jpg',
                // Four hundred series
                '400.jpg', '401.jpg', '402.jpg', '403.jpg', '404.jpg', '405.jpg', '406.jpg', '407.jpg', '408.jpg', '409.jpg',
                '410.jpg', '411.jpg', '412.jpg', '413.jpg', '414.jpg', '415.jpg', '416.jpg', '417.jpg',
                // Five hundred series
                '500.jpg', '501.jpg', '502.jpg', '503.jpg', '504.jpg', '505.jpg', '506.jpg', '507.jpg', '508.jpg', '509.jpg',
                '510.jpg', '511.jpg', '512.jpg', '513.jpg',
                // Six hundred series
                '600.jpg', '601.jpg', '602.jpg', '603.jpg', '604.jpg', '605.jpg', '606.jpg', '607.jpg', '608.jpg', '609.jpg',
                '610.jpg', '611.jpg', '612.jpg', '613.jpg',
                // Seven hundred series
                '700.jpg', '701.jpg', '702.jpg', '703.jpg', '704.jpg', '705.jpg', '706.jpg', '707.jpg', '708.jpg', '709.jpg',
                '710.jpg', '711.jpg', '712.jpg', '713.jpg', '714.jpg', '715.jpg', '716.jpg', '717.jpg',
                // Eight hundred series
                '800.jpg', '801.jpg', '802.jpg', '803.jpg', '804.jpg', '805.jpg', '806.jpg',
                // Nine hundred series
                '900.jpg', '901.jpg', '902.jpg', '903.jpg', '904.jpg', '905.jpg', '906.jpg', '907.jpg',
                // One thousand series
                '1001.jpg', '1002.jpg',
                // Special named files
                '_1.jpg', '_2.jpg', '_3.jpg', '_4.jpg', '_5.jpg',
                // Descriptive names (some examples from the folders)
                '1 sikshan warg 2022.jpg',
                '3 missed call abhiyan.jpg',
                '5 health check up camp.jpg',
                '9 vikshit bharata ambassdor.jpg',
                '306991066_5688359241216406_3759433685934263783_n.jpg',
                '448927665_8006478259404481_8529713078344673153_n.jpg'
            ];

            // For BAG PREPARATION BJP NEW VOTER folder, use the actual Facebook image names
            if (programFolder === 'BAG PREPARATION BJP NEW VOTER') {
                const facebookImages = [
                    '435114393_25293300186983193_8737710416280928347_n.jpg',
                    '435156166_25293297740316771_3008269945594161953_n.jpg',
                    '435161691_25293298526983359_1051700895404671593_n.jpg',
                    '435717941_25293296970316848_2746766148477077662_n.jpg',
                    '436227856_25293297280316817_2763388403652419614_n.jpg',
                    '437865211_25293296590316886_2997432126732489906_n.jpg',
                    '437919228_25293300613649817_1292358479872658038_n.jpg',
                    '438029694_25293299243649954_6629929805893513234_n.jpg',
                    '438224889_25293299693649909_841426132935899590_n.jpg'
                ];
                loadImagesFromList(programFolder, programTitle, facebookImages);
                return;
            }

            // Load images using the pattern approach
            loadImagesFromPatterns(programFolder, programTitle, imagePatterns);
        }

        function loadImagesFromList(programFolder, programTitle, imageList) {
            const validImages = [];
            let loadedCount = 0;
            const totalImages = imageList.length;

            imageList.forEach((imageName, index) => {
                const img = new Image();
                const imagePath = `assets/programs/${programFolder}/${imageName}`;
                
                img.onload = function() {
                    validImages.push({
                        src: imagePath,
                        name: imageName,
                        index: index
                    });
                    loadedCount++;
                    
                    if (loadedCount === totalImages) {
                        // Sort by index to maintain order
                        validImages.sort((a, b) => a.index - b.index);
                        displayImages(programTitle, validImages);
                    }
                };
                
                img.onerror = function() {
                    loadedCount++;
                    if (loadedCount === totalImages) {
                        // Sort by index to maintain order
                        validImages.sort((a, b) => a.index - b.index);
                        displayImages(programTitle, validImages);
                    }
                };
                
                img.src = imagePath;
            });
        }

        function loadImagesFromPatterns(programFolder, programTitle, patterns) {
            const validImages = [];
            let checkedCount = 0;
            const totalPatterns = patterns.length;

            patterns.forEach((pattern, index) => {
                const img = new Image();
                const imagePath = `assets/programs/${programFolder}/${pattern}`;
                
                img.onload = function() {
                    validImages.push({
                        src: imagePath,
                        name: pattern,
                        index: index
                    });
                    checkedCount++;
                    
                    if (checkedCount === totalPatterns) {
                        // Sort by index to maintain order
                        validImages.sort((a, b) => a.index - b.index);
                        displayImages(programTitle, validImages);
                    }
                };
                
                img.onerror = function() {
                    checkedCount++;
                    if (checkedCount === totalPatterns) {
                        // Sort by index to maintain order
                        validImages.sort((a, b) => a.index - b.index);
                        displayImages(programTitle, validImages);
                    }
                };
                
                img.src = imagePath;
            });
        }

        function displayImages(programTitle, images) {
            modalTitle.textContent = programTitle;
            
            if (images.length === 0) {
                // No images found
                carouselContent.innerHTML = `
                    <div class="carousel-item active">
                        <div class="d-flex justify-content-center align-items-center flex-column" style="height: 400px;">
                            <i class="fas fa-images fa-4x text-muted mb-3"></i>
                            <h5 class="text-muted">No images available</h5>
                            <p class="text-muted">Images for this program will be added soon.</p>
                        </div>
                    </div>
                `;
                thumbnailsContainer.innerHTML = '';
                imageCounter.textContent = '0 images';
                return;
            }

            // Create carousel items
            let carouselHTML = '';
            images.forEach((image, index) => {
                const activeClass = index === 0 ? 'active' : '';
                carouselHTML += `
                    <div class="carousel-item ${activeClass}">
                        <img src="${image.src}" class="d-block w-100" alt="${programTitle} - Image ${index + 1}"
                             style="height: 500px; object-fit: contain; background: #f8f9fa;">
                    </div>
                `;
            });
            carouselContent.innerHTML = carouselHTML;

            // Create thumbnails
            let thumbnailsHTML = '<div class="row g-2">';
            images.forEach((image, index) => {
                const activeClass = index === 0 ? 'active' : '';
                thumbnailsHTML += `
                    <div class="col-2">
                        <img src="${image.src}" class="img-fluid thumbnail ${activeClass}" 
                             data-bs-target="#programImagesCarousel" data-bs-slide-to="${index}"
                             alt="Thumbnail ${index + 1}"
                             style="height: 60px; object-fit: cover; cursor: pointer; border: 2px solid ${index === 0 ? 'var(--primary)' : 'transparent'}; border-radius: 5px;">
                    </div>
                `;
            });
            thumbnailsHTML += '</div>';
            thumbnailsContainer.innerHTML = thumbnailsHTML;

            // Update image info
            updateImageInfo(programTitle, 1, images.length);

            // Add thumbnail click handlers
            const thumbnails = thumbnailsContainer.querySelectorAll('.thumbnail');
            thumbnails.forEach((thumb, index) => {
                thumb.addEventListener('click', function() {
                    // Remove active class from all thumbnails
                    thumbnails.forEach(t => {
                        t.classList.remove('active');
                        t.style.border = '2px solid transparent';
                    });
                    
                    // Add active class to clicked thumbnail
                    this.classList.add('active');
                    this.style.border = '2px solid var(--primary)';
                    
                    // Update image info
                    updateImageInfo(programTitle, index + 1, images.length);
                });
            });

            // Listen for carousel slide events
            const carousel = document.getElementById('programImagesCarousel');
            carousel.addEventListener('slid.bs.carousel', function(e) {
                const activeIndex = e.to;
                
                // Update thumbnails
                thumbnails.forEach((thumb, index) => {
                    if (index === activeIndex) {
                        thumb.classList.add('active');
                        thumb.style.border = '2px solid var(--primary)';
                    } else {
                        thumb.classList.remove('active');
                        thumb.style.border = '2px solid transparent';
                    }
                });
                
                // Update image info
                updateImageInfo(programTitle, activeIndex + 1, images.length);
            });
        }

        function updateImageInfo(programTitle, currentIndex, totalImages) {
            imageTitle.textContent = programTitle;
            imageDescription.textContent = `Viewing program activities and community engagement`;
            imageCounter.textContent = `${currentIndex} of ${totalImages}`;
        }
    }
});