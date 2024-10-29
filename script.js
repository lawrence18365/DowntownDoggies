document.addEventListener('DOMContentLoaded', function() {
    // Font Awesome Debug - Add this first
    console.log('=== Font Awesome Debug Start ===');
    const icons = document.querySelectorAll('.service-icon i');
    
    if (icons.length === 0) {
        console.error('No Font Awesome icons found in DOM');
    }
    
    icons.forEach((icon, index) => {
        console.log(`Icon ${index + 1}:`);
        console.log('- Classes:', icon.className);
        console.log('- Font family:', window.getComputedStyle(icon).fontFamily);
        console.log('- Display:', window.getComputedStyle(icon).display);
        console.log('- Visibility:', window.getComputedStyle(icon).visibility);
        console.log('- Parent element:', icon.parentElement.outerHTML);
    });

    // Force Font Awesome icons to render
    setTimeout(() => {
        icons.forEach(icon => {
            icon.style.cssText = `
                font-family: "Font Awesome 6 Free" !important;
                font-weight: 900 !important;
                font-style: normal !important;
                font-size: 2rem !important;
                line-height: 1 !important;
                -webkit-font-smoothing: antialiased !important;
                -moz-osx-font-smoothing: grayscale !important;
                display: inline-block !important;
                visibility: visible !important;
            `;
        });
        console.log('Forced Font Awesome styles applied');
    }, 500);

    // Initialize Reviews Carousel
    function initReviewsCarousel() {
        const carousel = document.querySelector('.review-carousel');
        if (!carousel) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.style.cursor = 'grabbing';
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.style.cursor = 'grab';
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });

        // Add touch events for mobile
        carousel.addEventListener('touchstart', (e) => {
            isDown = true;
            startX = e.touches[0].pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('touchend', () => {
            isDown = false;
        });

        carousel.addEventListener('touchmove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.touches[0].pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    }

    // Initialize core elements
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

        // Failsafe
        setTimeout(hideLoader, 3000);
    }

    // Navigation functionality
    if (navToggle && navMenu && navOverlay) {
        function toggleMenu() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        }

        navToggle.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
        handleScroll();
    }

    // GSAP animations
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

    // Modal functionality
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.modal-close');

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.dataset.modal === 'privacy' ? 'privacyModal' : 'termsModal';
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.classList.add('show');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) closeModal(modal);
        });
    });

    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('show')) closeModal(modal);
            });
        }
    });
  // Initialize all components
    initReviewsCarousel();

    // Error handling
    window.addEventListener('error', function(event) {
        console.error('Script error:', event.message, 'at', event.filename, ':', event.lineno);
    }, true);

    // Final Font Awesome check
    window.addEventListener('load', () => {
        console.log('=== Final Font Awesome Check ===');
        const iconsAfterLoad = document.querySelectorAll('.service-icon i');
        iconsAfterLoad.forEach((icon, index) => {
            console.log(`Icon ${index + 1} after load:`, {
                classes: icon.className,
                computedStyle: window.getComputedStyle(icon)
            });
        });
    });
});
