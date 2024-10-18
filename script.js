document.addEventListener('DOMContentLoaded', function() {
    const loaderContainer = document.querySelector('.loader-container');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    // Loader functionality
    if (loaderContainer) {
        loaderContainer.style.display = 'flex';
        
        function hideLoader() {
            document.body.classList.add('loaded');
            setTimeout(() => {
                loaderContainer.style.display = 'none';
            }, 500);
        }

        if (document.readyState === 'complete') {
            hideLoader();
        } else {
            window.addEventListener('load', hideLoader);
        }
    }

    // Hamburger Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close the menu after clicking
                if (navMenu) navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            }
        });
    });

    // Header scroll effect
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // GSAP animations (if GSAP is available)
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);

        gsap.utils.toArray('.animate-on-scroll').forEach((element) => {
            gsap.from(element, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });
        });
    }

    // Hero image slider
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;

    function cycleHeroImages() {
        if (heroImages.length === 0) return;
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
    if ('IntersectionObserver' in window) {
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
    }

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

    // Team member bio expansion
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const expandedBio = this.nextElementSibling;
            if (expandedBio && expandedBio.classList.contains('expanded-bio')) {
                expandedBio.style.display = expandedBio.style.display === 'none' ? 'block' : 'none';
                this.textContent = this.textContent === 'Read More' ? 'Read Less' : 'Read More';
            }
        });
    });

    // Pricing toggle
    const pricingSwitch = document.getElementById('pricing-switch');
    if (pricingSwitch) {
        pricingSwitch.addEventListener('change', function() {
            const monthlyPrices = document.querySelectorAll('.price .monthly');
            const yearlyPrices = document.querySelectorAll('.price .yearly');
            const isYearly = this.checked;

            monthlyPrices.forEach(price => price.style.display = isYearly ? 'none' : 'inline');
            yearlyPrices.forEach(price => price.style.display = isYearly ? 'inline' : 'none');
        });
    }

    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });

    // Testimonials page specific code
    const testimonialCards = document.querySelectorAll('.testimonial-card:not(.placeholder)');
    
    if (testimonialCards.length > 0) {
        const testimonialObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        testimonialCards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(50px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            testimonialObserver.observe(card);
        });
    }

    // Share Your Story button
    const shareStoryButton = document.querySelector('.testimonials-cta .cta-button');
    if (shareStoryButton) {
        shareStoryButton.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Thank you for wanting to share your story! This feature is coming soon.');
        });
    }
});
