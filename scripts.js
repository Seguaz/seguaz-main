// ========================================
// CUSTOM CURSOR
// ========================================
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    // Main cursor follows immediately
    cursorX += (mouseX - cursorX) * 0.3;
    cursorY += (mouseY - cursorY) * 0.3;
    
    // Follower has delay
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Expand cursor on hover
document.querySelectorAll('a, button, .service-card, .skill-item').forEach(elem => {
    elem.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    elem.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
});

// ========================================
// ANIMATED PARTICLES BACKGROUND
// ========================================
const canvas = document.getElementById('particlesCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }
    
    draw() {
        const theme = document.documentElement.getAttribute('data-theme');
        ctx.fillStyle = theme === 'dark' ? 'rgba(88, 166, 255, 0.5)' : 'rgba(66, 133, 244, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}

const particles = [];
for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach((particle, i) => {
        particle.update();
        particle.draw();
        
        // Connect nearby particles
        particles.slice(i + 1).forEach(otherParticle => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 120) {
                const theme = document.documentElement.getAttribute('data-theme');
                ctx.strokeStyle = theme === 'dark' 
                    ? `rgba(88, 166, 255, ${0.2 * (1 - distance / 120)})`
                    : `rgba(66, 133, 244, ${0.2 * (1 - distance / 120)})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particle.x, particle.y);
                ctx.lineTo(otherParticle.x, otherParticle.y);
                ctx.stroke();
            }
        });
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// ========================================
// TYPING EFFECT
// ========================================
const typingTexts = [
    'Full Stack Web Developer',
    'Creative Problem Solver',
    'IT Solutions Expert',
    'Responsive Design Specialist'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseTime = 2000;

function typeEffect() {
    const subtitle = document.getElementById('typingSubtitle');
    const currentText = typingTexts[textIndex];
    
    if (!isDeleting) {
        subtitle.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeEffect, pauseTime);
            return;
        }
    } else {
        subtitle.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        
        if (charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % typingTexts.length;
        }
    }
    
    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
}

// Start typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(typeEffect, 500);
});

// ========================================
// 3D TILT EFFECT ON CARDS
// ========================================
document.querySelectorAll('[data-tilt]').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// ========================================
// THEME TOGGLE FUNCTIONALITY
// ========================================
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme preference or default to 'light'
const currentTheme = localStorage.getItem('theme') || 'light';

// Apply saved theme on page load
document.documentElement.setAttribute('data-theme', currentTheme);

// Theme toggle function with animation
function toggleTheme() {
    // Get current theme
    const theme = document.documentElement.getAttribute('data-theme');
    
    // Determine new theme
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Add rotation animation to button
    themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
    
    // Apply new theme after short delay for smooth transition
    setTimeout(() => {
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Reset button transform
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    }, 150);
    
    // Add celebratory effect
    createSparkles();
}

// Add event listener to theme toggle button
themeToggle.addEventListener('click', toggleTheme);

// ========================================
// SPARKLE EFFECT ON THEME CHANGE
// ========================================
function createSparkles() {
    const colors = ['#4285F4', '#58a6ff', '#79c0ff', '#a5d8ff'];
    const sparkleCount = 12;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.top = themeToggle.offsetTop + 30 + 'px';
        sparkle.style.right = '50px';
        sparkle.style.width = '8px';
        sparkle.style.height = '8px';
        sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '9999';
        sparkle.style.boxShadow = '0 0 10px currentColor';
        
        document.body.appendChild(sparkle);
        
        // Animate sparkle
        const angle = (Math.PI * 2 * i) / sparkleCount;
        const velocity = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        
        sparkle.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 1 
            },
            { 
                transform: `translate(${tx}px, ${ty}px) scale(0)`,
                opacity: 0 
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0, .9, .57, 1)'
        }).onfinish = () => sparkle.remove();
    }
}

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// SCROLL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.service-card, .skill-item');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
});

// ========================================
// PARALLAX EFFECT ON SCROLL
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-content');
    const heroSection = document.querySelector('.hero-section');
    const servicesSection = document.querySelector('.services-section');
    
    // Get the position where services section starts
    const servicesTop = servicesSection.offsetTop;
    const windowHeight = window.innerHeight;
    const fadeDistance = 200; // Distance before services section to start fading
    
    // Calculate when to start and end fade
    const fadeStart = servicesTop - windowHeight + fadeDistance;
    const fadeEnd = servicesTop - windowHeight / 2;
    
    if (scrolled <= fadeStart) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
        heroSection.classList.remove('fade-out');
    } else if (scrolled >= fadeEnd) {
        heroSection.classList.add('fade-out');
    } else {
        // Calculate opacity between fadeStart and fadeEnd
        const fadeProgress = (scrolled - fadeStart) / (fadeEnd - fadeStart);
        const opacity = 1 - fadeProgress;
        const translateY = fadeProgress * -50;
        heroSection.style.opacity = opacity;
        heroSection.style.transform = `translateY(${translateY}px)`;
    }
    
    // Parallax effect for hero content
    parallaxElements.forEach(element => {
        const speed = 0.3;
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ========================================
// TYPING EFFECT (Optional Enhancement)
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ========================================
// KEYBOARD ACCESSIBILITY
// ========================================
themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleTheme();
    }
});

// ========================================
// LANGUAGE TOGGLE FUNCTIONALITY
// ========================================
const languageToggle = document.getElementById('languageToggle');

// Check for saved language preference or default to 'en'
const currentLanguage = localStorage.getItem('language') || 'en';

// Apply saved language on page load
document.documentElement.setAttribute('lang', currentLanguage);

// Language toggle function
function toggleLanguage() {
    const lang = document.documentElement.getAttribute('lang');
    const newLang = lang === 'en' ? 'es' : 'en';
    
    // Add rotation animation
    languageToggle.style.transform = 'rotate(-360deg) scale(1.2)';
    
    // Apply new language
    setTimeout(() => {
        document.documentElement.setAttribute('lang', newLang);
        localStorage.setItem('language', newLang);
        
        // Update page content
        updatePageContent(newLang);
        
        // Reset button transform
        setTimeout(() => {
            languageToggle.style.transform = '';
        }, 300);
    }, 150);
}

// Update page content based on language
function updatePageContent(lang) {
    const translations = {
        en: {
            'hero-title-prefix': "Hi! I'm",
            'hero-description': 'I create custom web solutions and provide quality IT services. Specialized in clean code, responsive design, and exceptional user experiences.',
            'get-in-touch': 'Get in Touch',
            'view-services': 'View Services',
            'buy-coffee': 'Buy Me a Coffee',
            'services-title': 'What I Offer',
            'web-dev-title': 'Web Development',
            'web-dev-desc': 'Custom websites with clean, optimized code using modern technologies like HTML5, CSS3, JavaScript, React, and Vue.js.',
            'web-design-title': 'Web Design',
            'web-design-desc': 'Modern, intuitive, and responsive interfaces that connect with your audience and work perfectly on all devices.',
            'it-services-title': 'IT Services',
            'it-services-desc': 'Computer repair, technical consulting, and continuous support. Quick and effective solutions with warranty included.',
            'skills-title': 'Technologies & Tools',
            'contact-title': "Let's Work Together",
            'contact-intro': "I'm always open to new projects and collaborations. Whether you need a professional website, technical advice, or IT support, I'm here to help!",
            'email-me': 'Email Me',
            'footer-text': '© 2025 Seguaz. Available for freelance projects.',
            'footer-made': 'Made with',
            'footer-by': 'by Seguaz'
        },
        es: {
            'hero-title-prefix': '¡Hola! Soy',
            'hero-description': 'Creo soluciones web personalizadas y proporciono servicios de TI de calidad. Especializada en código limpio, diseño responsivo y experiencias de usuario excepcionales.',
            'get-in-touch': 'Ponte en Contacto',
            'view-services': 'Ver Servicios',
            'buy-coffee': 'Cómprame un Café',
            'services-title': 'Mis Servicios',
            'web-dev-title': 'Desarrollo Web',
            'web-dev-desc': 'Sitios web personalizados con código limpio y optimizado usando tecnologías modernas como HTML5, CSS3, JavaScript, React y Vue.js.',
            'web-design-title': 'Diseño Web',
            'web-design-desc': 'Interfaces modernas, intuitivas y responsivas que conectan con tu audiencia y funcionan perfectamente en todos los dispositivos.',
            'it-services-title': 'Servicios de TI',
            'it-services-desc': 'Reparación de computadoras, asesoramiento técnico y soporte continuo. Soluciones rápidas y efectivas con garantía incluida.',
            'skills-title': 'Tecnologías y Herramientas',
            'contact-title': 'Trabajemos Juntos',
            'contact-intro': '¡Siempre estoy abierta a nuevos proyectos y colaboraciones! Ya sea que necesites un sitio web profesional, asesoramiento técnico o soporte de TI, ¡estoy aquí para ayudarte!',
            'email-me': 'Envíame un Email',
            'footer-text': '© 2025 Seguaz. Disponible para proyectos freelance.',
            'footer-made': 'Hecho con',
            'footer-by': 'por Seguaz'
        }
    };

    // Update elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update page title
    const pageTitle = lang === 'en' 
        ? 'Seguaz - Full Stack Developer | Web Design & Development'
        : 'Seguaz - Desarrolladora Full Stack | Diseño y Desarrollo Web';
    document.title = pageTitle;
}

// Add event listener to language toggle button
languageToggle.addEventListener('click', toggleLanguage);

// Keyboard accessibility for language toggle
languageToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleLanguage();
    }
});

// ========================================
// CONSOLE EASTER EGG
// ========================================
console.log('%c👋 Hi there, curious developer!', 'color: #4285F4; font-size: 20px; font-weight: bold;');
console.log('%cLike what you see? Let\'s work together!', 'color: #666; font-size: 14px;');
console.log('%c📧 noeseguaz@gmail.com', 'color: #4285F4; font-size: 14px;');
