// Create floating particles with controlled animation
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30; // Reduced number of particles
    const colors = ['#00F5FF', '#9F7AEA'];

    // Clear existing particles
    particlesContainer.innerHTML = '';

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Position particles within viewport bounds
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Smaller particles
        const size = Math.random() * 1 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = `${Math.random() * 3}s`;
        particle.style.animationDuration = `${Math.random() * 3 + 3}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Create subtle matrix rain effect
function createMatrixRain() {
    const matrixContainer = document.createElement('div');
    matrixContainer.className = 'matrix-rain';
    document.body.appendChild(matrixContainer);

    const columns = Math.floor(window.innerWidth / 30);
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
        const column = document.createElement('div');
        column.className = 'matrix-column';
        column.style.left = `${i * 30}px`;
        matrixContainer.appendChild(column);
    }

    function rain() {
        const maxDrops = 30; // Reduced number of drops
        
        for (let i = 0; i < drops.length; i++) {
            const column = document.querySelectorAll('.matrix-column')[i];
            
            // Clean up old drops
            while (column.children.length > maxDrops) {
                column.removeChild(column.firstChild);
            }
            
            const drop = document.createElement('div');
            drop.className = 'matrix-drop';
            drop.style.top = `${drops[i] * 20}px`;
            drop.textContent = String.fromCharCode(33 + Math.random() * 94);
            drop.style.color = `hsl(${Math.random() * 30 + 150}, 100%, 50%)`;
            column.appendChild(drop);
            
            // Remove drop after animation
            setTimeout(() => {
                if (drop.parentNode === column) {
                    column.removeChild(drop);
                }
            }, 2000);

            if (drops[i] * 20 > window.innerHeight && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(rain, 100); // Slower rain effect
}

// Add subtle hover effect
function addHoverEffect() {
    const elements = document.querySelectorAll('.tech-item, .team-member, .contact-form');
    
    elements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Create subtle glow effect
            const glow = document.createElement('div');
            glow.className = 'hover-glow';
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
            element.appendChild(glow);
            
            // Remove glow after animation
            setTimeout(() => {
                glow.remove();
            }, 500);
        });
    });
}

// Add subtle holographic effect
function addHolographicEffect() {
    const holographicTexts = document.querySelectorAll('h1, h2, h3');
    
    holographicTexts.forEach(text => {
        text.classList.add('holographic');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    text.style.opacity = '1';
                    text.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(text);
    });
}

// Add smooth scrolling with parallax
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Add scroll effect to navbar with blur
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 50) {
        navbar.style.background = `rgba(10, 10, 26, ${Math.min(0.95, 0.9 + scrollPosition / 1000)})`;
        navbar.style.backdropFilter = `blur(${Math.min(10, scrollPosition / 50)}px)`;
    } else {
        navbar.style.background = 'rgba(10, 10, 26, 0.9)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Add typing effect with controlled animation
const heroText = document.querySelector('.hero-content h1');
const heroSubtext = document.querySelector('.hero-content p');
const texts = [
    'Welcome to Atmanic Labs',
    'Pioneering the Future of Technology'
];

let i = 0;
let j = 0;
let currentText = '';
let isDeleting = false;
let isPaused = false;

function typeWriter() {
    if (isPaused) return;
    
    if (i < texts.length) {
        if (!isDeleting && j <= texts[i].length) {
            currentText = texts[i].substring(0, j);
            if (i === 0) {
                heroText.textContent = currentText;
            } else {
                heroSubtext.textContent = currentText;
            }
            j++;
            setTimeout(typeWriter, 100);
        } else if (isDeleting && j >= 0) {
            currentText = texts[i].substring(0, j);
            if (i === 0) {
                heroText.textContent = currentText;
            } else {
                heroSubtext.textContent = currentText;
            }
            j--;
            setTimeout(typeWriter, 50);
        } else if (j === texts[i].length + 1) {
            isDeleting = true;
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                typeWriter();
            }, 2000);
        } else if (j === -1) {
            isDeleting = false;
            i++;
            if (i === texts.length) {
                i = 0;
            }
            isPaused = true;
            setTimeout(() => {
                isPaused = false;
                typeWriter();
            }, 500);
        }
    }
}

// Add hover effect to buttons with ripple
const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.05) translateZ(20px)';
        button.style.boxShadow = '0 0 30px var(--accent-color)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1) translateZ(0)';
        button.style.boxShadow = 'none';
    });
    
    button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        button.appendChild(ripple);
        
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Neural Network Animation
function initNeuralNetwork() {
    const canvas = document.getElementById('neuralCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let connections = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
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
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(159, 122, 234, 0.5)';
            ctx.fill();
        }
    }
    
    function init() {
        resizeCanvas();
        particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
    }
    
    function connectParticles() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(159, 122, 234, ${0.2 * (1 - distance/100)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    window.addEventListener('resize', init);
    init();
    animate();
}

// Parallax Effect
function initParallax() {
    document.addEventListener('mousemove', (e) => {
        const particles = document.querySelectorAll('.tech-particle');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        particles.forEach(particle => {
            const speed = particle.getAttribute('data-speed');
            const x = (window.innerWidth - mouseX * speed) * 0.1;
            const y = (window.innerHeight - mouseY * speed) * 0.1;
            particle.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.team-member, .product-showcase, .market-card').forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', () => {
    initNeuralNetwork();
    initParallax();
    initScrollAnimations();
    
    // Clear any existing particles and effects
    const existingParticles = document.querySelector('.particles');
    if (existingParticles) {
        existingParticles.remove();
    }
    const existingMatrix = document.querySelector('.matrix-rain');
    if (existingMatrix) {
        existingMatrix.remove();
    }
    
    createParticles();
    createMatrixRain();
    addHoverEffect();
    addHolographicEffect();
    
    // Start typing effect after a short delay
    setTimeout(() => {
        typeWriter();
    }, 1000);
    
    // Add initial animations with controlled timing
    document.querySelectorAll('.tech-item, .team-member').forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * index);
    });

    // Add smooth scroll to View our Product button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            const productSection = document.getElementById('solution');
            if (productSection) {
                productSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Add smooth scroll to nav links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Add this to your existing styles
const style = document.createElement('style');
style.textContent = `
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease-out;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .team-member.animate-in {
        animation: fadeInScale 0.8s ease-out forwards;
    }
    
    @keyframes fadeInScale {
        0% {
            opacity: 0;
            transform: scale(0.8) translateY(30px);
        }
        100% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
`;
document.head.appendChild(style); 