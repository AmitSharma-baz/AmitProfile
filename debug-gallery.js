// Debug script for gallery images
console.log('Starting gallery debug...');

// Test if we can access the COVID images
const testImages = [
    'assets/covid/covid-hero.jpg',
    'assets/covid/1.jpg',
    'assets/covid/2.jpg',
    'assets/covid/3.jpg'
];

function testImageAccess() {
    console.log('Testing image access...');
    
    testImages.forEach((imagePath, index) => {
        const img = new Image();
        
        img.onload = function() {
            console.log(`✅ SUCCESS: ${imagePath} loaded successfully`);
            console.log(`   Dimensions: ${this.naturalWidth}x${this.naturalHeight}`);
        };
        
        img.onerror = function() {
            console.error(`❌ FAILED: ${imagePath} could not be loaded`);
            
            // Try to fetch the image to get more detailed error info
            fetch(imagePath)
                .then(response => {
                    if (!response.ok) {
                        console.error(`   HTTP Error: ${response.status} ${response.statusText}`);
                    } else {
                        console.log(`   Fetch successful but image loading failed`);
                    }
                })
                .catch(error => {
                    console.error(`   Fetch Error: ${error.message}`);
                });
        };
        
        console.log(`Testing: ${imagePath}`);
        img.src = imagePath;
    });
}

// Test current directory structure
function testDirectoryAccess() {
    console.log('Testing directory access...');
    
    // Try to fetch a known file to test server access
    fetch('gallery.html')
        .then(response => {
            if (response.ok) {
                console.log('✅ Server is accessible');
            } else {
                console.error('❌ Server access issue:', response.status);
            }
        })
        .catch(error => {
            console.error('❌ Server connection error:', error);
        });
}

// Check if we're running from file:// protocol
function checkProtocol() {
    console.log('Current protocol:', window.location.protocol);
    console.log('Current origin:', window.location.origin);
    
    if (window.location.protocol === 'file:') {
        console.warn('⚠️  Running from file:// protocol - this may cause image loading issues');
        console.log('   Consider running from a local web server (http://localhost)');
    }
}

// Run all tests
checkProtocol();
testDirectoryAccess();
setTimeout(testImageAccess, 1000);

// Export for manual testing
window.debugGallery = {
    testImages,
    testImageAccess,
    testDirectoryAccess,
    checkProtocol
};

console.log('Debug script loaded. Use window.debugGallery for manual testing.');