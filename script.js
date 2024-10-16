document.addEventListener('DOMContentLoaded', function() {
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
  });

  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
    });
  });

  const ctaButton = document.querySelector('.cta-button');
  ctaButton.addEventListener('mouseenter', () => {
    ctaButton.style.transform = 'translateY(-3px)';
  });
  
  ctaButton.addEventListener('mouseleave', () => {
    ctaButton.style.transform = 'translateY(0)';
  });
});
      document.addEventListener('DOMContentLoaded', () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.section-title, .lead, .text-content p, .services-highlight, .cta-button').forEach(el => {
            observer.observe(el);
        });

        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('mouseover', () => {
                item.style.zIndex = '10';
            });
            item.addEventListener('mouseout', () => {
                item.style.zIndex = '1';
            });
        });

        function createPawPrint() {
            const pawPrint = document.createElement('div');
            pawPrint.classList.add('paw-print');
            pawPrint.style.top = `${Math.random() * 80}%`;  // Adjusted to keep prints more in view
            pawPrint.style.left = '-40px';  // Start off-screen
            pawPrint.style.animationDuration = `${15 + Math.random() * 10}s`;
            document.getElementById('paw-print-container').appendChild(pawPrint);

            pawPrint.addEventListener('animationend', () => {
                pawPrint.remove();
            });
        }

        function startPawPrints() {
            setInterval(createPawPrint, 2000);
        }

        startPawPrints();
    });
    document.addEventListener('DOMContentLoaded', () => {
      const serviceCards = document.querySelectorAll('.service-card');
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.8s ${entry.target.dataset.delay} ease forwards`;
          }
        });
      }, { threshold: 0.1 });
      
      serviceCards.forEach((card, index) => {
        card.dataset.delay = `${0.2 + index * 0.1}s`;
        observer.observe(card);
      });
    });
 document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with: ${email}`);
        this.reset();
    });

    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });
        link.addEventListener('mouseout', function() {
            this.style.transform = 'translateY(0) rotate(0deg)';
        });
    });
});
        // Waiver Form Validation and Submission
document.addEventListener('DOMContentLoaded', function() {
    const waiverForm = document.getElementById('waiverForm');

    waiverForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Perform form validation
        const formData = new FormData(waiverForm);
        let valid = true;

        // Clear previous error states
        waiverForm.querySelectorAll('.input-error').forEach(function(el) {
            el.classList.remove('input-error');
        });

        // Validate required fields
        waiverForm.querySelectorAll('input[required], textarea[required], select[required]').forEach(function(input) {
            if (!input.value.trim()) {
                valid = false;
                input.classList.add('input-error');
            }
        });

        if (valid) {
            // Submit form data via AJAX or fetch
            // For demonstration, we'll display a success message
            alert('Thank you! Your waiver form has been submitted.');
            waiverForm.reset();
        } else {
            alert('Please fill in all required fields.');
        }
    });
});

         document.addEventListener('DOMContentLoaded', function() {
                const ctaSection = document.querySelector('.cta-section');
                const numPawPrints = 15;
    
                for (let i = 0; i < numPawPrints; i++) {
                    createPawPrint();
                }
    
                function createPawPrint() {
                    const pawPrint = document.createElement('div');
                    pawPrint.classList.add('paw-print');
                    pawPrint.style.left = `${Math.random() * 100}%`;
                    pawPrint.style.top = `${Math.random() * 100}%`;
                    pawPrint.style.transform = `rotate(${Math.random() * 360}deg)`;
                    ctaSection.appendChild(pawPrint);
    
                    animatePawPrint(pawPrint);
                }
    
                function animatePawPrint(pawPrint) {
                    const duration = 5000 + Math.random() * 5000;
                    const keyframes = [
                        { opacity: 0, transform: 'translateY(0) rotate(0deg)' },
                        { opacity: 0.2, transform: `translateY(-${20 + Math.random() * 30}px) rotate(${Math.random() * 360}deg)` },
                        { opacity: 0, transform: `translateY(-${50 + Math.random() * 50}px) rotate(${Math.random() * 360}deg)` }
                    ];
    
                    pawPrint.animate(keyframes, {
                        duration: duration,
                        iterations: Infinity,
                        delay: Math.random() * 2000
                    });
                }
            });
          // Hero image cycling
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;
    function cycleHeroImages() {
        heroImages[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[currentImageIndex].classList.add('active');
    }
    
    // Set the first image as active
    heroImages[0].classList.add('active');
    
    // Cycle images every 5 seconds
    setInterval(cycleHeroImages, 5000);
    
    // FAQ functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = answer.style.display === 'block';
    
            // Close all other answers
            document.querySelectorAll('.faq-answer').forEach(a => {
                a.style.display = 'none';
            });
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
            });
    
            // Toggle the clicked question
            if (!isOpen) {
                answer.style.display = 'block';
                question.classList.add('active');
            }
        });
    });
        </script>
           <script>
        window.addEventListener('load', function() {
            const loaderContainer = document.querySelector('.loader-container');
            const content = document.body.children;
            
            setTimeout(function() {
                loaderContainer.style.opacity = '0';
                loaderContainer.style.visibility = 'hidden';
                for (let i = 1; i < content.length; i++) {
                    content[i].style.opacity = '1';
                }
            }, 2000); // Adjust this delay as needed
        });
