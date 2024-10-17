document.addEventListener('DOMContentLoaded', function() {
    // Hero image cycling
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;
    
    function cycleHeroImages() {
        if (heroImages.length === 0) return; // Prevent errors if no images
        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }
    
    if (heroImages.length > 0) {
        heroImages[0].classList.add('active');
        setInterval(cycleHeroImages, 5000);
    }

    // Services section animation
    const servicesSection = document.querySelector('#services-overview'); // Corrected selector
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (servicesSection && serviceCards.length > 0) {
        const servicesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    serviceCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                    servicesObserver.unobserve(servicesSection);
                }
            });
        }, { threshold: 0.1 });
        servicesObserver.observe(servicesSection);
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.style.maxHeight;
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                if (q.nextElementSibling) {
                    q.nextElementSibling.style.maxHeight = null;
                }
            });
            if (!isOpen) {
                question.classList.add('active');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + "px";
                }
            }
        });
    });

    // Form validation
    function validateForm(form) {
        let isValid = true;
        form.querySelectorAll('[required]').forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
                showError(field, 'This field is required');
            } else {
                field.classList.remove('error');
                removeError(field);
            }
        });
        return isValid;
    }

    function showError(field, message) {
        let errorElement = field.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        errorElement.textContent = message;
    }

    function removeError(field) {
        const errorElement = field.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.remove();
        }
    }

    // Form submission (Booking and Waiver)
    ['booking-form', 'waiverForm'].forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                if (validateForm(this)) {
                    const submitButton = this.querySelector('button[type="submit"]');
                    if (submitButton) {
                        submitButton.disabled = true;
                        submitButton.textContent = 'Submitting...';
                    }
                    setTimeout(() => {
                        alert(formId === 'booking-form' ? 'Thank you for booking! We\'ll be in touch soon.' : 'Thank you! Your waiver form has been submitted.');
                        this.reset();
                        if (submitButton) {
                            submitButton.disabled = false;
                            submitButton.textContent = formId === 'booking-form' ? 'Book Now' : 'Submit Waiver';
                        }
                    }, 2000);
                }
            });
        }
    });

    // Lazy loading images
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    document.querySelectorAll('img[data-src]').forEach(img => lazyLoadObserver.observe(img));

    // Animated counters
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let count = 0;
                const updateCounter = () => {
                    const increment = target / 200;
                    if (count < target) {
                        count += increment;
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
                observer.unobserve(counter);
            }
        });
    });
    document.querySelectorAll('.counter').forEach(counter => counterObserver.observe(counter));

    // Testimonial slider
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        let currentTestimonial = 0;

        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.transform = `translateX(${100 * (i - index)}%)`;
            });
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        showTestimonial(currentTestimonial);
        setInterval(nextTestimonial, 5000);

        const nextButton = testimonialSlider.querySelector('.next-testimonial');
        const prevButton = testimonialSlider.querySelector('.prev-testimonial');
        
        if (nextButton) nextButton.addEventListener('click', nextTestimonial);
        if (prevButton) prevButton.addEventListener('click', prevTestimonial);
    }

    // Dynamic copyright year
    const copyrightYear = document.querySelector('.copyright-year');
    if (copyrightYear) {
        copyrightYear.textContent = new Date().getFullYear();
    }

    // Add loaded class to body after a short delay
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);

    // Hide loader after page load
    window.addEventListener('load', function() {
        const loaderContainer = document.querySelector('.loader-container');
        if (loaderContainer) {
            loaderContainer.style.display = 'none';
        } else {
            console.warn('Loader container not found.');
        }
    });

    // Improve scroll performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function() {
                scrollTimeout = null;
                // Intensive updates here
            }, 66);
        }
    }, false);

    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value)) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            } else {
                showError(emailInput, 'Please enter a valid email address');
            }
        });
    }
});
