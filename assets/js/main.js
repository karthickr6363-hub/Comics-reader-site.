/* ===================================
   ComicVerse - Main JavaScript
   =================================== */

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('mainNav');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll Reveal Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
});

// Comic Card Hover Effects
document.querySelectorAll('.comic-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Search Functionality
const searchInputs = document.querySelectorAll('input[type="text"][placeholder*="Search"]');
searchInputs.forEach(input => {
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            // Add search functionality here
            console.log('Searching for:', this.value);
        }
    });
});

// Newsletter Form
document.querySelectorAll('form').forEach(form => {
    const emailInput = form.querySelector('input[type="email"]');
    if (emailInput && form.querySelector('button[type="button"]')) {
        const subscribeBtn = form.querySelector('button[type="button"]');
        subscribeBtn.addEventListener('click', function() {
            const email = emailInput.value;
            if (email && email.includes('@')) {
                alert('Thank you for subscribing!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
});

// Filter Functionality
document.querySelectorAll('.filter-bar select').forEach(select => {
    select.addEventListener('change', function() {
        // Add filter functionality here
        console.log('Filter changed:', this.value);
    });
});

// Genre Card Animations
document.querySelectorAll('.genre-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.genre-icon');
        if (icon) {
            icon.style.transform = 'scale(1.2) rotate(5deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.genre-icon');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Pricing Card Hover
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(-10px)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        if (!this.classList.contains('featured')) {
            this.style.transform = 'translateY(0)';
        }
    });
});

// Contact Form Validation
const contactForms = document.querySelectorAll('.contact-form-card form');
contactForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputs = this.querySelectorAll('input, textarea');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value) {
                isValid = false;
                input.classList.add('is-invalid');
            } else {
                input.classList.remove('is-invalid');
            }
        });
        
        if (isValid) {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }
    });
});

// Auth Form Validation
const authForms = document.querySelectorAll('.auth-card form');
authForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]');
        const password = this.querySelector('input[type="password"]');
        
        if (email && password) {
            if (email.value && password.value) {
                // Add authentication logic here
                console.log('Form submitted');
            }
        }
    });
});

// Lazy Loading Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Mobile Menu Close on Click (exclude dropdown toggles)
document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Don't close menu if clicking on a dropdown toggle
        if (this.classList.contains('dropdown-toggle') || this.hasAttribute('data-bs-toggle')) {
            return;
        }
        
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
    });
});

// Add Animation Classes on Scroll
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.comic-card, .feature-card, .genre-card');
    elements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            setTimeout(() => {
                el.classList.add('animate-fade-in-up');
            }, index * 100);
        }
    });
});

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', function() {
    // Add any initialization code here
    console.log('ComicVerse loaded successfully!');
});




