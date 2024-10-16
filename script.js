// Main JavaScript file for Downtown Doggies

document.addEventListener('DOMContentLoaded', function() {
    // Add content-loaded class to body
    document.body.classList.add('content-loaded');

    // Service card animations
    const serviceCards = document.querySelectorAll('.service-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    serviceCards.forEach(card => {
        observer.observe(card);
        card.addEventListener('mouseenter', () => card.style.transform = 'translateY(-10px)');
        card.addEventListener('mouseleave', () => card.style.transform = 'translateY(0)');
    });

    // CTA button hover effect
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => button.style.transform = 'translateY(-3px)');
        button.addEventListener('mouseleave', () => button.style.transform = 'translateY(0)');
    });

    // Fade-in animations for various elements
    const fadeElements = document.querySelectorAll('.section-title, .lead, .text-content p, .services-highlight, .cta-button, .about-cta-button');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // Gallery item hover effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.style.zIndex = '10';
            item.querySelector('img').style.transform = 'scale(1.1)';
        });
        item.addEventListener('mouseout', () => {
            item.style.zIndex = '1';
            item.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // Paw print animation
    function createPawPrint() {
        const pawPrint = document.createElement('div');
        pawPrint.classList.add('paw-print');
        pawPrint.style.top = `${Math.random() * 80}%`;
        pawPrint.style.left = '-40px';
        pawPrint.style.animationDuration = `${15 + Math.random() * 10}s`;
        
        const pawPrintContainer = document.getElementById('paw-print-container');
        if (pawPrintContainer) {
            pawPrintContainer.appendChild(pawPrint);
            pawPrint.addEventListener('animationend', () => pawPrint.remove());
        }
    }

    function startPawPrints() {
        setInterval(createPawPrint, 2000);
    }

    startPawPrints();

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (validateEmail(email)) {
                alert(`Thank you for subscribing with: ${email}`);
                this.reset();
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Email validation function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Social links hover effect
    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseover', () => link.style.transform = 'translateY(-5px) rotate(5deg)');
        link.addEventListener('mouseout', () => link.style.transform = 'translateY(0) rotate(0deg)');
    });

    // Waiver form validation and submission
    const waiverForm = document.getElementById('waiverForm');
    if (waiverForm) {
        waiverForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let valid = true;

            waiverForm.querySelectorAll('.input-error').forEach(el => el.classList.remove('input-error'));

            waiverForm.querySelectorAll('input[required], textarea[required], select[required]').forEach(input => {
                if (!input.value.trim()) {
                    valid = false;
                    input.classList.add('input-error');
                }
            });

            if (valid) {
                alert('Thank you! Your waiver form has been submitted.');
                waiverForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }

    // Hero image cycling
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;
    function cycleHeroImages() {
        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }

    if (heroImages.length > 0) {
        heroImages[0].classList.add('active');
        setInterval(cycleHeroImages, 5000);
    }

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.style.display === 'block';

            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
            document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));

            if (!isOpen) {
                answer.style.display = 'block';
                question.classList.add('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                lazyImageObserver.unobserve(img);
            }
        });
    });
    lazyImages.forEach(img => lazyImageObserver.observe(img));

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonialIndex = 0;

    function showNextTestimonial() {
        testimonials[currentTestimonialIndex].classList.remove('active');
        currentTestimonialIndex = (currentTestimonialIndex + 1) % testimonials.length;
        testimonials[currentTestimonialIndex].classList.add('active');
    }

    if (testimonials.length > 0) {
        testimonials[0].classList.add('active');
        setInterval(showNextTestimonial, 5000);
    }

    // Service area map interaction
    const mapSection = document.querySelector('.map-section');
    const mapOverlay = document.querySelector('.map-overlay');
    if (mapSection && mapOverlay) {
        mapSection.addEventListener('mouseenter', () => mapOverlay.style.opacity = '1');
        mapSection.addEventListener('mouseleave', () => mapOverlay.style.opacity = '0');
    }

    // Dynamic copyright year
    const copyrightYear = document.querySelector('.copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Form input animation
    const formInputs = document.querySelectorAll('.form-input');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.labels[0].classList.add('active');
        });
        input.addEventListener('blur', () => {
            if (input.value === '') {
                input.labels[0].classList.remove('active');
            }
        });
    });

    // Service card flip effect
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Animated counter for statistics
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60 fps
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            el.textContent = Math.round(current);
        }, 16);
    }

    const counterElements = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
});
// Services Page Specific Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for service links
    const serviceLinks = document.querySelectorAll('.service-link');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Form validation and submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                // Simulating form submission
                alert('Booking submitted successfully! We will contact you shortly.');
                bookingForm.reset();
            }
        });
    }

    function validateForm() {
        let isValid = true;
        const requiredFields = bookingForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            alert('Please fill in all required fields.');
        }

        return isValid;
    }

    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Pricing toggle (if you want to add monthly/yearly pricing option)
    const pricingToggle = document.getElementById('pricing-toggle');
    const priceElements = document.querySelectorAll('.price');
    if (pricingToggle) {
        pricingToggle.addEventListener('change', function() {
            priceElements.forEach(el => {
                const monthlyPrice = el.getAttribute('data-monthly');
                const yearlyPrice = el.getAttribute('data-yearly');
                el.textContent = this.checked ? yearlyPrice : monthlyPrice;
            });
        });
    }

    // Animated counter for statistics (if you want to add a statistics section)
    function animateCounter(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const duration = 2000; // ms
        const step = target / (duration / 16); // 60 fps
        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                clearInterval(timer);
                current = target;
            }
            el.textContent = Math.round(current);
        }, 16);
    }

    const counterElements = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counterElements.forEach(el => counterObserver.observe(el));
});
