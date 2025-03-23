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

        // Enhanced splash effect with random colors
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            let isInHomeSection = false;
            let lastMouseX = 0;
            let lastMouseY = 0;
            let lastSplashTime = 0;
            const splashInterval = 80; // Increased interval for slower effect
            let currentHue = Math.random() * 360; // Random starting hue

            // Create splash container if it doesn't exist
            let splashContainer = document.querySelector('.splash-container');
            if (!splashContainer) {
                splashContainer = document.createElement('div');
                splashContainer.className = 'splash-container';
                homeSection.appendChild(splashContainer);
            }

            // Function to get smooth random color
            const getNextColor = () => {
                // Smoothly transition to a new random hue
                const targetHue = (currentHue + (Math.random() * 60 - 30)) % 360;
                currentHue = targetHue;
                return currentHue;
            };

            const createSplashEffect = (e) => {
                if (!isInHomeSection) return;

                const now = Date.now();
                if (now - lastSplashTime < splashInterval) return;
                lastSplashTime = now;

                const rect = homeSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Calculate mouse speed
                const dx = e.clientX - lastMouseX;
                const dy = e.clientY - lastMouseY;
                const speed = Math.sqrt(dx * dx + dy * dy);
                const normalizedSpeed = Math.min(speed, 100) / 100;

                // Create main splash
                const splash = document.createElement('div');
                splash.className = 'splash';
                
                // Size based on movement speed
                const size = 200 + (speed * 2); // Increased base size
                splash.style.width = `${size}px`;
                splash.style.height = `${size}px`;
                splash.style.left = `${x - size/2}px`;
                splash.style.top = `${y - size/2}px`;

                // Get smooth random color
                const hue = getNextColor();
                const saturation = 70 + (normalizedSpeed * 20);
                const lightness = 50 + (normalizedSpeed * 10);
                
                splash.style.background = `
                    radial-gradient(circle at center,
                        hsla(${hue}, ${saturation}%, ${lightness}%, 0.6) 0%,
                        hsla(${hue + 30}, ${saturation}%, ${lightness - 10}%, 0.4) 25%,
                        hsla(${hue + 60}, ${saturation - 10}%, ${lightness - 20}%, 0.2) 50%,
                        transparent 70%
                    )
                `;

                splashContainer.appendChild(splash);

                // Create particles
                const particleCount = Math.min(Math.floor(speed / 5), 8);
                for (let i = 0; i < particleCount; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'splash-particle';
                    
                    // Random position around cursor
                    const angle = (i / particleCount) * Math.PI * 2;
                    const distance = Math.random() * 40;
                    const particleX = x + Math.cos(angle) * distance;
                    const particleY = y + Math.sin(angle) * distance;
                    
                    particle.style.left = `${particleX}px`;
                    particle.style.top = `${particleY}px`;
                    
                    // Random movement direction influenced by cursor movement
                    const particleDx = Math.cos(angle) + (dx / 100);
                    const particleDy = Math.sin(angle) + (dy / 100);
                    particle.style.setProperty('--dx', particleDx);
                    particle.style.setProperty('--dy', particleDy);
                    
                    // Dynamic color for particles
                    const particleHue = hue + Math.random() * 30;
                    particle.style.background = `
                        radial-gradient(circle at center,
                            hsla(${particleHue}, ${saturation}%, ${lightness}%, 0.8) 0%,
                            hsla(${particleHue}, ${saturation}%, ${lightness - 10}%, 0.6) 50%,
                            transparent 100%
                        )
                    `;
                    
                    splashContainer.appendChild(particle);
                    
                    // Cleanup
                    particle.addEventListener('animationend', () => particle.remove());
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
            });

            homeSection.addEventListener('mouseleave', () => {
                isInHomeSection = false;
            });

            // Throttled mousemove
            let isThrottled = false;
            document.addEventListener('mousemove', (e) => {
                if (!isThrottled) {
                    createSplashEffect(e);
                    isThrottled = true;
                    setTimeout(() => {
                        isThrottled = false;
                    }, 16);
                }
            });

            // Add click effect
            homeSection.addEventListener('click', (e) => {
                const rect = homeSection.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                // Create a larger splash on click
                const splash = document.createElement('div');
                splash.className = 'splash';
                const size = 400; // Increased size for click effect
                splash.style.width = `${size}px`;
                splash.style.height = `${size}px`;
                splash.style.left = `${x - size/2}px`;
                splash.style.top = `${y - size/2}px`;

                const hue = getNextColor();
                splash.style.background = `
                    radial-gradient(circle at center,
                        hsla(${hue}, 70%, 60%, 0.8) 0%,
                        hsla(${hue + 30}, 70%, 50%, 0.6) 25%,
                        hsla(${hue + 60}, 60%, 40%, 0.4) 50%,
                        transparent 70%
                    )
                `;
                splashContainer.appendChild(splash);
                splash.addEventListener('animationend', () => splash.remove());

                // Create more particles for click effect
                for (let i = 0; i < 16; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'splash-particle';
                    const angle = (i / 16) * Math.PI * 2;
                    const distance = Math.random() * 80;
                    const particleX = x + Math.cos(angle) * distance;
                    const particleY = y + Math.sin(angle) * distance;
                    particle.style.left = `${particleX}px`;
                    particle.style.top = `${particleY}px`;
                    particle.style.setProperty('--dx', Math.cos(angle) * 2);
                    particle.style.setProperty('--dy', Math.sin(angle) * 2);

                    const particleHue = hue + Math.random() * 60;
                    particle.style.background = `
                        radial-gradient(circle at center,
                            hsla(${particleHue}, 70%, 60%, 0.9) 0%,
                            hsla(${particleHue}, 70%, 50%, 0.7) 50%,
                            transparent 100%
                        )
                    `;

                    splashContainer.appendChild(particle);
                    particle.addEventListener('animationend', () => particle.remove());
                }
            });
        }

        // Keep all other existing functionality
    } catch (error) {
        console.error('Error initializing scripts:', error);
    }
});