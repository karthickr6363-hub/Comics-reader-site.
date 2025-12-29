/* ===================================
   ComicVerse - Reader JavaScript
   =================================== */

// Reader Controls
let isHeaderVisible = true;
let isFooterVisible = true;

// Toggle Header/Footer on Click
document.addEventListener('click', function(e) {
    if (!e.target.closest('.reader-header') && !e.target.closest('.reader-footer')) {
        const header = document.querySelector('.reader-header');
        const footer = document.querySelector('.reader-footer');
        
        if (header && footer) {
            if (isHeaderVisible && isFooterVisible) {
                header.classList.add('hidden');
                footer.classList.add('hidden');
                isHeaderVisible = false;
                isFooterVisible = false;
            } else {
                header.classList.remove('hidden');
                footer.classList.remove('hidden');
                isHeaderVisible = true;
                isFooterVisible = true;
            }
        }
    }
});

// Fullscreen Toggle
const fullscreenBtn = document.getElementById('fullscreenBtn');
if (fullscreenBtn) {
    fullscreenBtn.addEventListener('click', function() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.log('Error attempting to enable fullscreen:', err);
            });
        } else {
            document.exitFullscreen();
        }
    });
}

// Settings Modal
const settingsBtn = document.getElementById('settingsBtn');
if (settingsBtn) {
    settingsBtn.addEventListener('click', function() {
        const modal = new bootstrap.Modal(document.getElementById('settingsModal'));
        modal.show();
    });
}

// Reading Mode Change
document.querySelectorAll('select').forEach(select => {
    if (select.closest('#settingsModal')) {
        select.addEventListener('change', function() {
            const readerMode = document.querySelector('.reader-mode');
            if (this.value === 'Vertical Scroll') {
                readerMode.classList.remove('horizontal', 'single');
                readerMode.classList.add('vertical');
            } else if (this.value === 'Horizontal Scroll') {
                readerMode.classList.remove('vertical', 'single');
                readerMode.classList.add('horizontal');
            } else if (this.value === 'Single Page') {
                readerMode.classList.remove('vertical', 'horizontal');
                readerMode.classList.add('single');
            }
        });
    }
});

// Background Theme Change
document.querySelectorAll('.reader-mode .btn-outline-dark, .reader-mode .btn-outline-light, .reader-mode .btn-outline-secondary').forEach(btn => {
    btn.addEventListener('click', function() {
        const readerMode = document.querySelector('.reader-mode');
        readerMode.classList.remove('theme-dark', 'theme-light', 'theme-sepia');
        
        if (this.classList.contains('btn-outline-dark')) {
            readerMode.classList.add('theme-dark');
        } else if (this.classList.contains('btn-outline-light')) {
            readerMode.classList.add('theme-light');
        } else if (this.classList.contains('btn-outline-secondary')) {
            readerMode.classList.add('theme-sepia');
        }
    });
});

// Chapter Navigation
const prevChapter = document.getElementById('prevChapter');
const nextChapter = document.getElementById('nextChapter');

if (prevChapter) {
    prevChapter.addEventListener('click', function() {
        // Add previous chapter navigation logic
        console.log('Previous chapter');
    });
}

if (nextChapter) {
    nextChapter.addEventListener('click', function() {
        // Add next chapter navigation logic
        console.log('Next chapter');
    });
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    if (document.querySelector('.reader-mode')) {
        switch(e.key) {
            case 'ArrowLeft':
                if (prevChapter) prevChapter.click();
                break;
            case 'ArrowRight':
                if (nextChapter) nextChapter.click();
                break;
            case 'f':
            case 'F':
                if (fullscreenBtn) fullscreenBtn.click();
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
                break;
        }
    }
});

// Scroll Progress Indicator
let scrollProgress = 0;
const readerContent = document.querySelector('.reader-content');

if (readerContent) {
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        scrollProgress = (scrollTop / scrollHeight) * 100;
        
        // Update progress bar if exists
        const progressBar = document.querySelector('.reading-progress');
        if (progressBar) {
            progressBar.style.width = scrollProgress + '%';
        }
    });
}

// Auto-hide Header/Footer on Scroll
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.reader-header');
    const footer = document.querySelector('.reader-footer');
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        if (header) header.classList.add('hidden');
        if (footer) footer.classList.add('hidden');
    } else {
        // Scrolling up
        if (header) header.classList.remove('hidden');
        if (footer) footer.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});

// Touch Gestures for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left - next chapter
            if (nextChapter) nextChapter.click();
        } else {
            // Swipe right - previous chapter
            if (prevChapter) prevChapter.click();
        }
    }
}

// Initialize Reader
document.addEventListener('DOMContentLoaded', function() {
    console.log('Comic Reader initialized');
    
    // Set default theme
    const readerMode = document.querySelector('.reader-mode');
    if (readerMode && !readerMode.classList.contains('theme-dark') && 
        !readerMode.classList.contains('theme-light') && 
        !readerMode.classList.contains('theme-sepia')) {
        readerMode.classList.add('theme-dark');
    }
});





