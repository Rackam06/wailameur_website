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

        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
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

            const createShootingStar = (e) => {
                if (!isInHomeSection) return;

                const now = Date.now();
                if (now - lastStarTime < starInterval) return;
                lastStarTime = now;

                const rect = homeSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const movement = smoothMovement(e.clientX, e.clientY);
                const normalizedSpeed = Math.min(movement.speed, 30) / 30;

                // Create shooting star trail
                const star = document.createElement('div');
                star.className = 'shooting-star';
                
                // Dynamic length based on speed
                const length = 60 + (normalizedSpeed * 120);
                const height = 2 + (normalizedSpeed * 2);
                
                star.style.width = `${length}px`;
                star.style.height = `${height}px`;
                star.style.left = `${x}px`;
                star.style.top = `${y}px`;
                
                // Set angle and distance for animation
                const angle = movement.angle + (Math.random() * 0.4 - 0.2); // Small random variation
                const distance = 200 + (normalizedSpeed * 300);
                
                star.style.setProperty('--angle', `${angle}rad`);
                star.style.setProperty('--distance', `${distance}px`);

                starsContainer.appendChild(star);

                // Create comet particles for more dynamic movement
                if (normalizedSpeed > 0.15) {
                    const particleCount = Math.min(Math.floor(normalizedSpeed * 4) + 2, 8);
                    for (let i = 0; i < particleCount; i++) {
                        setTimeout(() => {
                            const particle = document.createElement('div');
                            particle.className = 'comet-particle';
                            
                            // Spread particles along the trail
                            const trailOffset = (i / particleCount) * length * 0.3;
                            const particleX = x - Math.cos(angle) * trailOffset + (Math.random() * 20 - 10);
                            const particleY = y - Math.sin(angle) * trailOffset + (Math.random() * 20 - 10);
                            
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

                // Cleanup star trail
                star.addEventListener('animationend', () => star.remove());

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
                    createShootingStar(e);
                });
            });

            // Click effect - create a burst of shooting stars
            homeSection.addEventListener('click', (e) => {
                const rect = homeSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Create multiple shooting stars in different directions
                for (let i = 0; i < 8; i++) {
                    setTimeout(() => {
                        const star = document.createElement('div');
                        star.className = 'shooting-star';
                        
                        const angle = (i / 8) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
                        const length = 80 + Math.random() * 60;
                        const distance = 250 + Math.random() * 200;
                        
                        star.style.width = `${length}px`;
                        star.style.height = '3px';
                        star.style.left = `${x}px`;
                        star.style.top = `${y}px`;
                        star.style.setProperty('--angle', `${angle}rad`);
                        star.style.setProperty('--distance', `${distance}px`);
                        
                        starsContainer.appendChild(star);
                        star.addEventListener('animationend', () => star.remove());

                        // Add particles for each star
                        for (let j = 0; j < 3; j++) {
                            setTimeout(() => {
                                const particle = document.createElement('div');
                                particle.className = 'comet-particle';
                                particle.style.left = `${x + Math.random() * 20 - 10}px`;
                                particle.style.top = `${y + Math.random() * 20 - 10}px`;
                                particle.style.setProperty('--px', Math.cos(angle) * 0.8);
                                particle.style.setProperty('--py', Math.sin(angle) * 0.8);
                                
                                starsContainer.appendChild(particle);
                                particle.addEventListener('animationend', () => particle.remove());
                            }, j * 50);
                        }
                    }, i * 80);
                }
            });
        }

    } catch (error) {
        console.error('Error initializing scripts:', error);
    }
});