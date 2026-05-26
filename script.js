const translations = {
    en: {
        nav_home: "Home",
        nav_about: "About",
        nav_projects: "Projects",
        nav_contact: "Contact",
        hero_prefix: "Hi, I'm ",
        hero_subtitle: "A passionate Data Science & Fintech MSc student with a strong will to build innovative products.",
        download_cv: "Download Resume",
        about_title: "About Me",
        about_background: "Background",
        about_text_before: "At ",
        about_text_after: " years old, I'm pursuing my Master's in Data Science and Fintech, building upon my strong foundation in Computer Sciences. My passion lies in creating innovative solutions.",
        hero_education: "Education",
        education_master: "Double MSc in Data Science & Fintech",
        education_master_status: "Currently enrolled - Second Year",
        education_bachelor: "Bachelor's in Computer Sciences",
        education_bachelor_status: "Successfully completed",
        hero_projects: "My Projects",
        draftslab_description: "A screenwriting platform designed to streamline the writing process, offering a user-friendly interface and powerful tools for writers.",
        synapsx_description: "A sophisticated trading website that provides users with powerful tools and insights for making informed trading decisions.",
        cosmicadventures_description: "An engaging game prototype that takes players on an exciting journey through space, featuring unique gameplay mechanics and immersive experiences.",
        wondernova_description: "An automated travel engine to help planning of trips.",
        stulyzer_description: "A platform to summarize and create study sheets for students.",
        vetura_description: "A platform that connects veterinarians and pet owners. It helps clinics manage medical records, appointments, and communications, while giving pet owners easy access to their animal's health information.",
        hero_contact: "Get In Touch",
        footer_text: "Wail Ameur. All rights reserved."
    },
    fr: {
        nav_home: "Accueil",
        nav_about: "À propos",
        nav_projects: "Projets",
        nav_contact: "Contact",
        hero_prefix: " ",
        hero_subtitle: "Étudiant en Master Data Science & Fintech avec une forte volonté de créer des produits innovants.",
        download_cv: "Télécharger CV",
        about_title: "À propos de moi",
        about_background: "Parcours",
        about_text_before: "À ",
        about_text_after: " ans, je poursuis un Master en Data Science et Fintech, en m'appuyant sur de solides bases en informatique. Ma passion est de créer des solutions innovantes.",
        hero_education: "Études",
        education_master: "Double Master en Data Science et Fintech",
        education_master_status: "En cours - Deuxième année",
        education_bachelor: "Licence informatique",
        education_bachelor_status: "Obtenue en 2024",
        hero_projects: "Mes projets",
        draftslab_description: "Une plateforme de scénarisation conçue pour simplifier le processus d'écriture, offrant une interface conviviale et des outils puissants pour les auteurs.",
        synapsx_description: "Une plateforme de trading sophistiquée offrant des outils et des analyses puissants pour prendre des décisions éclairées.",
        cosmicadventures_description: "Un prototype de jeu immersif qui emmène les joueurs dans une aventure spatiale excitante avec des mécaniques de gameplay uniques.",
        wondernova_description: "Un moteur de voyage automatisé pour faciliter la planification des voyages.",
        stulyzer_description: "Une plateforme pour résumer et créer des fiches de révision pour les étudiants.",
        vetura_description: "Une plateforme qui met en relation vétérinaires et propriétaires d'animaux. Elle aide les cliniques à gérer les dossiers médicaux, les rendez-vous et les communications, tout en offrant aux propriétaires un accès facile aux informations de santé de leurs animaux.",
        hero_contact: "Me contacter",
        footer_text: "Wail Ameur. Tous droits réservés."
    }
};

let currentLang = "en";

function updateLanguage(lang) {
    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    // Save user preference
    localStorage.setItem("lang", lang);
}

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
}

document.addEventListener('DOMContentLoaded', function() {
    try {
        
        // Load saved language
        const savedLang = localStorage.getItem("lang");
        if (savedLang) {
            currentLang = savedLang;
        } else {
            const browserLang = navigator.language || navigator.userLanguage;
            if (browserLang.startsWith("fr")) {
                currentLang = "fr";
            } else {
                currentLang = "en";
            }
        }

        // Toggle buttons
        const langBtn = document.getElementById("lang-toggle");
        const langBtnMobile = document.getElementById("lang-toggle-mobile");
        const downloadBtn = document.getElementById("download-btn");

        updateLanguage(currentLang);
        
        // Sync UI with current language (without toggling)
        const label = currentLang === "en" ? "FR" : "EN";

        if (langBtn) langBtn.textContent = label;
        if (langBtnMobile) langBtnMobile.textContent = label;

        if (downloadBtn) {
            if (currentLang === "fr") {
                downloadBtn.href = "attachments/Wail_Ameur_CV.pdf";
                downloadBtn.download = "Wail_Ameur_CV.pdf";
            } else {
                downloadBtn.href = "attachments/Wail_Ameur_Resume.pdf";
                downloadBtn.download = "Wail_Ameur_Resume.pdf";
            }
        }
        
        const toggleLang = () => {
            currentLang = currentLang === "en" ? "fr" : "en";
            updateLanguage(currentLang);

            const label = currentLang === "en" ? "FR" : "EN";

            if (langBtn) langBtn.textContent = label;
            if (langBtnMobile) langBtnMobile.textContent = label;

            if (downloadBtn) {
                if (currentLang === "fr") {
                    downloadBtn.href = "attachments/Wail_Ameur_CV.pdf";
                    downloadBtn.download = "Wail_Ameur_CV.pdf";
                } else {
                    downloadBtn.href = "attachments/Wail_Ameur_Resume.pdf";
                    downloadBtn.download = "Wail_Ameur_Resume.pdf";
                }
            }
        };

        // Desktop
        if (langBtn) langBtn.addEventListener("click", toggleLang);

        // Mobile
        if (langBtnMobile) langBtnMobile.addEventListener("click", toggleLang);



        const birthDate = "2003-08-23";
        const age = calculateAge(birthDate);

        const ageElement = document.getElementById("age");
        if (ageElement) {
            ageElement.textContent = age;
        }

        const yearElement = document.getElementById("current-year");
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }


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
            const isDark = root.classList.contains('dark');

            // Desktop
            const moon = document.getElementById('icon-moon');
            const sun = document.getElementById('icon-sun');

            // Mobile
            const moonMobile = document.getElementById('icon-moon-mobile');
            const sunMobile = document.getElementById('icon-sun-mobile');

            // Desktop icons
            if (moon && sun) {
                moon.classList.toggle('hidden', isDark);
                sun.classList.toggle('hidden', !isDark);
            }

            // Mobile icons
            if (moonMobile && sunMobile) {
                moonMobile.classList.toggle('hidden', isDark);
                sunMobile.classList.toggle('hidden', !isDark);
            }
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