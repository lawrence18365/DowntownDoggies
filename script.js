document.addEventListener('DOMContentLoaded', function() {
    const loaderContainer = document.querySelector('.loader-container');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navOverlay = document.querySelector('.nav-overlay');
    const header = document.querySelector('header');
    
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

if (navToggle && navMenu && navOverlay) {
        function toggleMenu() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        }

        navToggle.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);

        // Close menu when clicking on a menu item
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });

        console.log('Navigation functionality initialized');
    } else {
        console.error('One or more navigation elements are missing');
    }

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header scroll effect
    if (header) {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
                header.classList.remove('transparent');
            } else {
                header.classList.remove('scrolled');
                header.classList.add('transparent');
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial call to set correct state on page load
        handleScroll();
    }

    // GSAP animations (if GSAP is available)
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        try {
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
        } catch (error) {
            console.error('Error initializing GSAP animations:', error);
        }
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
        if (!answer) return;
        
        const isOpen = question.classList.contains('active');
        
        // Close all other questions
        faqQuestions.forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                const qAnswer = q.nextElementSibling;
                if (qAnswer) qAnswer.style.maxHeight = null;
            }
        });
        
        // Toggle the clicked question
        if (!isOpen) {
            question.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            question.classList.remove('active');
            answer.style.maxHeight = null;
        }
    });
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
                const target = parseInt(counter.getAttribute('data-target'), 10);
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
        const sliderInterval = setInterval(nextTestimonial, 5000);

        const nextButton = testimonialSlider.querySelector('.next-testimonial');
        const prevButton = testimonialSlider.querySelector('.prev-testimonial');
        
        if (nextButton) nextButton.addEventListener('click', () => {
            clearInterval(sliderInterval);
            nextTestimonial();
        });
        if (prevButton) prevButton.addEventListener('click', () => {
            clearInterval(sliderInterval);
            prevTestimonial();
        });
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

    // Error handling for third-party scripts
    window.addEventListener('error', function(event) {
        console.error('Script error:', event.message, 'at', event.filename, ':', event.lineno);
    }, true);
});
// Form Validation and Submission Handler
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waiverForm');
    const progressBar = document.querySelector('.progress-bar');
    let formFields;
    let currentProgress = 0;

    // Initialize the form
    function initForm() {
        formFields = form.querySelectorAll('input, select, textarea');
        setupFieldValidation();
        setupProgressTracking();
        setupFloatingLabels();
    }

    // Setup field validation
    function setupFieldValidation() {
        formFields.forEach(field => {
            field.addEventListener('blur', (e) => validateField(e.target));
            field.addEventListener('input', (e) => {
                if (e.target.classList.contains('input-error')) {
                    validateField(e.target);
                }
            });
        });
    }

    // Validate individual field
    function validateField(field) {
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) errorMessage.remove();

        if (field.required && !field.value) {
            showError(field, 'This field is required');
            return false;
        }

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    showError(field, 'Please enter a valid email address');
                    return false;
                }
                break;

            case 'tel':
                const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                if (!phoneRegex.test(field.value)) {
                    showError(field, 'Please enter a valid phone number');
                    return false;
                }
                break;

            case 'number':
                if (field.id === 'petAge' && (field.value < 0 || field.value > 30)) {
                    showError(field, 'Please enter a valid age between 0 and 30');
                    return false;
                }
                break;
        }

        field.classList.remove('input-error');
        return true;
    }

    // Show error message
    function showError(field, message) {
        field.classList.add('input-error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.insertBefore(errorDiv, field.nextSibling);

        // Animate the error message
        field.classList.add('shake');
        setTimeout(() => field.classList.remove('shake'), 500);
    }

    // Setup progress tracking
    function setupProgressTracking() {
        formFields.forEach(field => {
            field.addEventListener('input', updateProgress);
        });
    }

    // Update progress bar
    function updateProgress() {
        let filledFields = 0;
        formFields.forEach(field => {
            if (field.value.trim() !== '') filledFields++;
        });

        const progress = (filledFields / formFields.length) * 100;
        progressBar.style.width = `${progress}%`;
    }

    // Setup floating labels
    function setupFloatingLabels() {
        document.querySelectorAll('.float-label input').forEach(input => {
            input.addEventListener('focus', e => {
                e.target.parentNode.classList.add('active');
            });

            input.addEventListener('blur', e => {
                if (!e.target.value) {
                    e.target.parentNode.classList.remove('active');
                }
            });
        });
    }

    // Show toast notification
    function showToast(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        const container = document.querySelector('.toast-container') || 
            (() => {
                const cont = document.createElement('div');
                cont.className = 'toast-container';
                document.body.appendChild(cont);
                return cont;
            })();

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'toast-slide-out 0.3s ease forwards';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Form submission handler
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Validate all fields
        let isValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) isValid = false;
        });

        if (!isValid) {
            showToast('Please fix the errors before submitting', 'error');
            return;
        }

        // Show loading state
        form.classList.add('form-loading');
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        form.appendChild(spinner);

        try {
            // Simulate form submission (replace with actual API call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Success handling
            showToast('Waiver submitted successfully!', 'success');
            form.reset();
            updateProgress();

            // Optional: Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });

        } catch (error) {
            showToast('Error submitting form. Please try again.', 'error');
        } finally {
            // Remove loading state
            form.classList.remove('form-loading');
            spinner.remove();
        }
    });

    // Initialize form handling
    initForm();

    // Optional: Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
});

// Optional: Add autosave functionality
const autoSave = {
    key: 'waiver_form_autosave',
    
    save: debounce(function(form) {
        const formData = {};
        form.querySelectorAll('input, select, textarea').forEach(field => {
            formData[field.name] = field.value;
        });
        localStorage.setItem(this.key, JSON.stringify(formData));
    }, 1000),

    load: function(form) {
        const saved = localStorage.getItem(this.key);
        if (saved) {
            const formData = JSON.parse(saved);
            Object.keys(formData).forEach(key => {
                const field = form.querySelector(`[name="${key}"]`);
                if (field) field.value = formData[key];
            });
        }
    },

    clear: function() {
        localStorage.removeItem(this.key);
    }
};

// Utility function for debouncing
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enable autosave
const form = document.getElementById('waiverForm');
if (form) {
    autoSave.load(form);
    form.addEventListener('input', () => autoSave.save(form));
    form.addEventListener('submit', () => autoSave.clear());
}
