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

        // Enhanced splash effect with random colors
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            let isInHomeSection = false;
            let lastMouseX = 0;
            let lastMouseY = 0;
            let lastSplashTime = 0;
            const splashInterval = 120;
            let velocityX = 0;
            let velocityY = 0;

            // Create splash container
            let splashContainer = document.querySelector('.splash-container');
            if (!splashContainer) {
                splashContainer = document.createElement('div');
                splashContainer.className = 'splash-container';
                homeSection.appendChild(splashContainer);
            }

            // Function to generate random color
            const getRandomColor = () => {
                // Array of pleasant color ranges [hueStart, hueEnd]
                const colorRanges = [
                    [0, 60],    // Red to Yellow
                    [180, 240], // Cyan to Blue
                    [270, 300], // Purple
                    [120, 150], // Green to Teal
                    [20, 40],   // Orange
                    [280, 320]  // Pink to Purple
                ];
                
                const range = colorRanges[Math.floor(Math.random() * colorRanges.length)];
                const hue = range[0] + Math.random() * (range[1] - range[0]);
                const saturation = 60 + Math.random() * 20; // 60-80%
                const lightness = 50 + Math.random() * 20;  // 50-70%
                
                return {
                    hue,
                    saturation,
                    lightness
                };
            };

            // Smooth movement tracking
            const smoothMovement = (currentX, currentY) => {
                const dx = currentX - lastMouseX;
                const dy = currentY - lastMouseY;
                
                velocityX = velocityX * 0.8 + dx * 0.2;
                velocityY = velocityY * 0.8 + dy * 0.2;

                return {
                    speed: Math.sqrt(velocityX * velocityX + velocityY * velocityY),
                    dx: velocityX,
                    dy: velocityY
                };
            };

            const createSplashEffect = (e) => {
                if (!isInHomeSection) return;

                const now = Date.now();
                if (now - lastSplashTime < splashInterval) return;
                lastSplashTime = now;

                const rect = homeSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const movement = smoothMovement(e.clientX, e.clientY);
                const normalizedSpeed = Math.min(movement.speed, 50) / 50;

                // Create main splash
                const splash = document.createElement('div');
                splash.className = 'splash';
                
                const size = 200 + (normalizedSpeed * 100);
                splash.style.width = `${size}px`;
                splash.style.height = `${size}px`;
                splash.style.left = `${x - size/2}px`;
                splash.style.top = `${y - size/2}px`;

                // Get random color
                const color = getRandomColor();
                
                splash.style.background = `
                    radial-gradient(circle at center,
                        hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, 0.4) 0%,
                        hsla(${color.hue}, ${color.saturation}%, ${color.lightness - 10}%, 0.3) 25%,
                        hsla(${color.hue}, ${color.saturation - 10}%, ${color.lightness - 20}%, 0.2) 50%,
                        transparent 70%
                    )
                `;

                splashContainer.appendChild(splash);

                // Create particles only if movement is significant
                if (normalizedSpeed > 0.2) {
                    const particleCount = Math.min(Math.floor(normalizedSpeed * 6), 6);
                    for (let i = 0; i < particleCount; i++) {
                        const particle = document.createElement('div');
                        particle.className = 'splash-particle';
                        
                        const angle = (i / particleCount) * Math.PI * 2;
                        const distance = Math.random() * 30;
                        const particleX = x + Math.cos(angle) * distance;
                        const particleY = y + Math.sin(angle) * distance;
                        
                        particle.style.left = `${particleX}px`;
                        particle.style.top = `${particleY}px`;
                        
                        const particleDx = Math.cos(angle) + (movement.dx / 100);
                        const particleDy = Math.sin(angle) + (movement.dy / 100);
                        particle.style.setProperty('--dx', particleDx);
                        particle.style.setProperty('--dy', particleDy);
                        
                        // Slightly vary particle color
                        const particleHue = color.hue + (Math.random() * 30 - 15);
                        particle.style.background = `
                            radial-gradient(circle at center,
                                hsla(${particleHue}, ${color.saturation}%, ${color.lightness}%, 0.6) 0%,
                                hsla(${particleHue}, ${color.saturation}%, ${color.lightness - 10}%, 0.4) 50%,
                                transparent 100%
                            )
                        `;
                        
                        splashContainer.appendChild(particle);
                        particle.addEventListener('animationend', () => particle.remove());
                    }
                }

                // Cleanup
                splash.addEventListener('animationend', () => splash.remove());

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

            // Throttled mousemove with RAF
            let animationFrame;
            document.addEventListener('mousemove', (e) => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame);
                }
                animationFrame = requestAnimationFrame(() => {
                    createSplashEffect(e);
                });
            });

            // Click effect with random colors
            homeSection.addEventListener('click', (e) => {
                const rect = homeSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const splash = document.createElement('div');
                splash.className = 'splash';
                const size = 400;
                splash.style.width = `${size}px`;
                splash.style.height = `${size}px`;
                splash.style.left = `${x - size/2}px`;
                splash.style.top = `${y - size/2}px`;

                const color = getRandomColor();
                splash.style.background = `
                    radial-gradient(circle at center,
                        hsla(${color.hue}, ${color.saturation}%, ${color.lightness}%, 0.6) 0%,
                        hsla(${color.hue}, ${color.saturation}%, ${color.lightness - 10}%, 0.4) 25%,
                        hsla(${color.hue}, ${color.saturation - 10}%, ${color.lightness - 20}%, 0.2) 50%,
                        transparent 70%
                    )
                `;
                splashContainer.appendChild(splash);
                splash.addEventListener('animationend', () => splash.remove());

                for (let i = 0; i < 12; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'splash-particle';
                    const angle = (i / 12) * Math.PI * 2;
                    const distance = Math.random() * 60;
                    const particleX = x + Math.cos(angle) * distance;
                    const particleY = y + Math.sin(angle) * distance;
                    particle.style.left = `${particleX}px`;
                    particle.style.top = `${particleY}px`;
                    particle.style.setProperty('--dx', Math.cos(angle) * 1.5);
                    particle.style.setProperty('--dy', Math.sin(angle) * 1.5);

                    const particleHue = color.hue + (Math.random() * 30 - 15);
                    particle.style.background = `
                        radial-gradient(circle at center,
                            hsla(${particleHue}, ${color.saturation}%, ${color.lightness}%, 0.7) 0%,
                            hsla(${particleHue}, ${color.saturation}%, ${color.lightness - 10}%, 0.5) 50%,
                            transparent 100%
                        )
                    `;

                    splashContainer.appendChild(particle);
                    particle.addEventListener('animationend', () => particle.remove());
                }
            });
        }

    } catch (error) {
        console.error('Error initializing scripts:', error);
    }
});