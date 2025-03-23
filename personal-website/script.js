document.addEventListener('DOMContentLoaded', function() {
    try {
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }

        // Home section hover effect
        const homeSection = document.querySelector('.home-section');
        const cursorEffect = document.querySelector('.cursor-effect');

        if (homeSection && cursorEffect) {
            let isInHomeSection = false;

            // Show effect only when mouse is in home section
            homeSection.addEventListener('mouseenter', () => {
                isInHomeSection = true;
                cursorEffect.style.opacity = '1';
            });

            homeSection.addEventListener('mouseleave', () => {
                isInHomeSection = false;
                cursorEffect.style.opacity = '0';
            });

            // Update cursor effect position
            document.addEventListener('mousemove', (e) => {
                if (!isInHomeSection) return;

                const rect = homeSection.getBoundingClientRect();
                const x = e.clientX;
                const y = e.clientY - rect.top;

                cursorEffect.style.setProperty('--mouse-x', `${x}px`);
                cursorEffect.style.setProperty('--mouse-y', `${y}px`);
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;

                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    // Close mobile menu if open
                    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                    }

                    // Smooth scroll to target with offset for header
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Animate sections on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Add animation classes to sections
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.6s ease-out';
            observer.observe(section);
        });

    } catch (error) {
        console.error('Error initializing scripts:', error);
    }
});