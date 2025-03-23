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

        // Enhanced splash effect
        const homeSection = document.querySelector('#home');
        if (homeSection) {
            let isInHomeSection = false;
            let lastMouseX = 0;
            let lastMouseY = 0;
            let lastSplashTime = 0;
            const splashInterval = 30; // Reduced interval for more frequent splashes

            // Create splash container if it doesn't exist
            let splashContainer = document.querySelector('.splash-container');
            if (!splashContainer) {
                splashContainer = document.createElement('div');
                splashContainer.className = 'splash-container';
                homeSection.appendChild(splashContainer);
            }

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
                const size = 150 + (speed * 3);
                splash.style.width = `${size}px`;
                splash.style.height = `${size}px`;
                splash.style.left = `${x - size/2}px`;
                splash.style.top = `${y - size/2}px`;

                // Dynamic color based on position and speed
                const hue = ((x / rect.width) * 20 + 200) % 360; // Blue range
                const saturation = 70 + (normalizedSpeed * 30);
                const lightness = 50 + (normalizedSpeed * 20);
                
                splash.style.background = `
                    radial-gradient(circle at center,
                        hsla(${hue}, ${saturation}%, ${lightness}%, 0.8) 0%,
                        hsla(${hue}, ${saturation}%, ${lightness - 10}%, 0.6) 25%,
                        hsla(${hue}, ${saturation - 10}%, ${lightness - 20}%, 0.4) 50%,
                        transparent 70%
                    )
                `;

                splashContainer.appendChild(splash);

                // Create particles
                const particleCount = Math.min(Math.floor(speed / 3), 12);
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
                    const particleDx = Math.cos(angle) + (dx / 50);
                    const particleDy = Math.sin(angle) + (dy / 50);
                    particle.style.setProperty('--dx', particleDx);
                    particle.style.setProperty('--dy', particleDy);
                    
                    // Dynamic color for particles
                    particle.style.background = `
                        radial-gradient(circle at center,
                            hsla(${hue}, ${saturation}%, ${lightness}%, 1) 0%,
                            hsla(${hue}, ${saturation}%, ${lightness - 10}%, 0.8) 50%,
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
                const size = 300;
                splash.style.width = `${size}px`;
                splash.style.height = `${size}px`;
                splash.style.left = `${x - size/2}px`;
                splash.style.top = `${y - size/2}px`;
                splash.style.background = `
                    radial-gradient(circle at center,
                        rgba(52, 152, 219, 0.9) 0%,
                        rgba(41, 128, 185, 0.7) 25%,
                        rgba(44, 62, 80, 0.5) 50%,
                        transparent 70%
                    )
                `;
                splashContainer.appendChild(splash);
                splash.addEventListener('animationend', () => splash.remove());

                // Create more particles for click effect
                for (let i = 0; i < 20; i++) {
                    const particle = document.createElement('div');
                    particle.className = 'splash-particle';
                    const angle = (i / 20) * Math.PI * 2;
                    const distance = Math.random() * 60;
                    const particleX = x + Math.cos(angle) * distance;
                    const particleY = y + Math.sin(angle) * distance;
                    particle.style.left = `${particleX}px`;
                    particle.style.top = `${particleY}px`;
                    particle.style.setProperty('--dx', Math.cos(angle) * 2);
                    particle.style.setProperty('--dy', Math.sin(angle) * 2);
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