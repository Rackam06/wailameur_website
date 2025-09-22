document.addEventListener('DOMContentLoaded', function() {
    try {
        // Theme: initialize from localStorage or system preference
        const root = document.documentElement;
        const getStoredTheme = () => localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const applyTheme = (theme) => {
            if (theme === 'dark') {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
            updateToggleIcons();
        };

        const initTheme = () => {
            const saved = getStoredTheme();
            if (saved) {
                applyTheme(saved);
            } else {
                applyTheme(prefersDark ? 'dark' : 'light');
            }
        };

        const toggleTheme = () => {
            const isDark = root.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateToggleIcons();
        };

        const updateToggleIcons = () => {
            const moon = document.getElementById('icon-moon');
            const sun = document.getElementById('icon-sun');
            if (!moon || !sun) return;
            const isDark = root.classList.contains('dark');
            // Show opposite icon of current theme to indicate action
            moon.classList.toggle('hidden', isDark); // hide moon on dark
            sun.classList.toggle('hidden', !isDark); // show sun on dark
        };

        initTheme();
        // Wire up toggles (desktop + mobile)
        const toggleBtn = document.getElementById('theme-toggle');
        const toggleBtnMobile = document.getElementById('theme-toggle-mobile');
        if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);
        if (toggleBtnMobile) toggleBtnMobile.addEventListener('click', toggleTheme);

        // Apple-style mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                const isOpen = mobileMenu.classList.contains('open');
                
                if (isOpen) {
                    // Close menu
                    mobileMenu.classList.remove('open');
                    mobileMenuButton.classList.remove('active');
                } else {
                    // Open menu
                    mobileMenu.classList.add('open');
                    mobileMenuButton.classList.add('active');
                }
            });

            // Close menu when clicking on links
            const mobileMenuLinks = mobileMenu.querySelectorAll('a');
            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.remove('open');
                    mobileMenuButton.classList.remove('active');
                });
            });
        }

        // Navigation animation on scroll
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;
        let isScrollingUp = false;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            isScrollingUp = currentScrollY < lastScrollY;

            // Don't hide nav at the top of the page
            if (currentScrollY < 100) {
                header.classList.remove('nav-hidden');
                header.classList.add('nav-visible');
            } else {
                header.classList.toggle('nav-hidden', !isScrollingUp);
                header.classList.toggle('nav-visible', isScrollingUp);
            }

            lastScrollY = currentScrollY;
        };

        // Add styles for nav animation
        const style = document.createElement('style');
        style.textContent = `
            header {
                transition: transform 0.3s ease, opacity 0.3s ease;
            }
            .nav-hidden {
                transform: translateY(-100%);
                opacity: 0;
            }
            .nav-visible {
                transform: translateY(0);
                opacity: 1;
            }
        `;
        document.head.appendChild(style);

        // Add scroll event listener with requestAnimationFrame
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Initialize nav state
        header.classList.add('nav-visible');

        // Apple-style scroll reveal animations
        const initScrollReveal = () => {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            }, observerOptions);

            // Observe all elements with .reveal class
            const revealElements = document.querySelectorAll('.reveal');
            revealElements.forEach(el => observer.observe(el));
        };

        // Initialize scroll reveal
        initScrollReveal();

        // Cosmic shooting stars animation
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            let isInHomeSection = false;
            let lastMouseX = 0;
            let lastMouseY = 0;
            let lastStarTime = 0;
            const starInterval = 80; // Faster for more responsive stars
            let velocityX = 0;
            let velocityY = 0;

            // Create stars container
            let starsContainer = document.querySelector('.stars-container');
            if (!starsContainer) {
                starsContainer = document.createElement('div');
                starsContainer.className = 'stars-container';
                homeSection.appendChild(starsContainer);
            }

            // Smooth movement tracking for velocity-based effects
            const smoothMovement = (currentX, currentY) => {
                const dx = currentX - lastMouseX;
                const dy = currentY - lastMouseY;
                
                velocityX = velocityX * 0.7 + dx * 0.3;
                velocityY = velocityY * 0.7 + dy * 0.3;

                return {
                    speed: Math.sqrt(velocityX * velocityX + velocityY * velocityY),
                    angle: Math.atan2(velocityY, velocityX),
                    dx: velocityX,
                    dy: velocityY
                };
            };

            const createSparkleStars = (e) => {
                if (!isInHomeSection) return;

                const now = Date.now();
                if (now - lastStarTime < starInterval) return;
                lastStarTime = now;

                const rect = homeSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const movement = smoothMovement(e.clientX, e.clientY);
                const normalizedSpeed = Math.min(movement.speed, 30) / 30;

                // Create sparkle stars around mouse position
                const starCount = Math.floor(normalizedSpeed * 3) + 1; // 1-4 stars based on speed
                
                for (let i = 0; i < starCount; i++) {
                    setTimeout(() => {
                        const star = document.createElement('div');
                        star.className = 'sparkle-star';
                        
                        // Random position around mouse with small offset
                        const offsetX = (Math.random() - 0.5) * 40;
                        const offsetY = (Math.random() - 0.5) * 40;
                        
                        star.style.left = `${x + offsetX}px`;
                        star.style.top = `${y + offsetY}px`;
                        
                        starsContainer.appendChild(star);
                        star.addEventListener('animationend', () => star.remove());
                    }, i * 100); // Stagger star creation for nice effect
                }

                // Keep the comet particles as they work well
                if (normalizedSpeed > 0.15) {
                    const particleCount = Math.min(Math.floor(normalizedSpeed * 4) + 2, 8);
                    for (let i = 0; i < particleCount; i++) {
                        setTimeout(() => {
                            const particle = document.createElement('div');
                            particle.className = 'comet-particle';
                            
                            // Spread particles around mouse position
                            const particleX = x + (Math.random() * 60 - 30);
                            const particleY = y + (Math.random() * 60 - 30);
                            
                            particle.style.left = `${particleX}px`;
                            particle.style.top = `${particleY}px`;
                            
                            // Random particle movement
                            const px = (Math.random() - 0.5) * 2;
                            const py = (Math.random() - 0.5) * 2;
                            particle.style.setProperty('--px', px);
                            particle.style.setProperty('--py', py);
                            
                            starsContainer.appendChild(particle);
                            particle.addEventListener('animationend', () => particle.remove());
                        }, i * 50); // Stagger particle creation
                    }
                }

                // Update position tracking
                lastMouseX = e.clientX;
                lastMouseY = e.clientY;
            };

            // Track mouse enter/leave
            homeSection.addEventListener('mouseenter', () => {
                isInHomeSection = true;
                velocityX = 0;
                velocityY = 0;
            });

            homeSection.addEventListener('mouseleave', () => {
                isInHomeSection = false;
            });

            // Throttled mousemove with RAF for smooth performance
            let animationFrame;
            document.addEventListener('mousemove', (e) => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
                animationFrame = requestAnimationFrame(() => {
                    createSparkleStars(e);
                });
            });

            // Click effect - create a burst of sparkle stars
            homeSection.addEventListener('click', (e) => {
                const rect = homeSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Create multiple sparkle stars in a burst pattern
                for (let i = 0; i < 12; i++) {
                    setTimeout(() => {
                        const star = document.createElement('div');
                        star.className = 'sparkle-star';
                        
                        // Create stars in expanding circle
                        const angle = (i / 12) * Math.PI * 2;
                        const radius = 30 + Math.random() * 60;
                        const starX = x + Math.cos(angle) * radius;
                        const starY = y + Math.sin(angle) * radius;
                        
                        star.style.left = `${starX}px`;
                        star.style.top = `${starY}px`;
                        
                        starsContainer.appendChild(star);
                        star.addEventListener('animationend', () => star.remove());

                        // Add particles for each star
                        for (let j = 0; j < 2; j++) {
                            setTimeout(() => {
                                const particle = document.createElement('div');
                                particle.className = 'comet-particle';
                                particle.style.left = `${starX + Math.random() * 20 - 10}px`;
                                particle.style.top = `${starY + Math.random() * 20 - 10}px`;
                                particle.style.setProperty('--px', Math.cos(angle) * 0.5);
                                particle.style.setProperty('--py', Math.sin(angle) * 0.5);
                                
                                starsContainer.appendChild(particle);
                                particle.addEventListener('animationend', () => particle.remove());
                            }, j * 100);
                        }
                    }, i * 60);
                }
            });
        }

    } catch (error) {
        console.error('Error initializing scripts:', error);
    }
});