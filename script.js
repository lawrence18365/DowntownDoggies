// main.js
document.addEventListener('DOMContentLoaded', function() {
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
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', () => ctaButton.style.transform = 'translateY(-3px)');
        ctaButton.addEventListener('mouseleave', () => ctaButton.style.transform = 'translateY(0)');
    }

    // Fade-in animations for various elements
    const fadeElements = document.querySelectorAll('.section-title, .lead, .text-content p, .services-highlight, .cta-button');
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
        item.addEventListener('mouseover', () => item.style.zIndex = '10');
        item.addEventListener('mouseout', () => item.style.zIndex = '1');
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
            alert(`Thank you for subscribing with: ${email}`);
            this.reset();
        });
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
});
