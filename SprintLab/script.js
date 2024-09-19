/*const particlesContainer = document.querySelector('.info');

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 20 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.1})`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = '-10px';
    const duration = Math.random() * 10 + 5;
    particle.style.animation = `float-up ${duration}s linear forwards`;
    particlesContainer.appendChild(particle);

    // Remover partícula após a animação
    particle.addEventListener('animationend', () => {
        particle.style.opacity = 0;
        particle.style.transition = 'opacity 1s';
        setTimeout(() => {
            particle.remove();
        }, 1000);
    });
}

// Função para criar várias partículas inicialmente
function createInitialParticles() {
    for (let i = 0; i < 60; i++) {
        createParticle();
    }
}

createInitialParticles();

// Criar novas partículas continuamente
setInterval(() => {
    createParticle();
}, 500); // Ajuste o intervalo conforme necessário*/

document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const pagination = document.querySelector('.pagination');
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;

    // Create pagination dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        pagination.appendChild(dot);
    });

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlider();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlider();
    }

    // Handle touch events
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        if (startX > endX + 50) {
            showNextSlide();
        } else if (startX < endX - 50) {
            showPrevSlide();
        }
    });

});

document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-links a');

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    navLinkItems.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu after clicking a link
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Reveal animations on scroll
const revealElements = document.querySelectorAll('.reveal');
const revealElementsOnScroll = function() {
    for (let i = 0; i < revealElements.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = revealElements[i].getBoundingClientRect().top;
        const revealPoint = 150;

        if (revealTop < windowHeight - revealPoint) {
            revealElements[i].classList.add('active');
        } else {
            revealElements[i].classList.remove('active');
        }
    }
};

    window.addEventListener('scroll', revealElementsOnScroll);
    revealElementsOnScroll(); // Initial check on page load
});

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
        item.style.animation = `fadeIn 0.5s ease-out ${index * 0.5}s forwards`;
        item.style.opacity = '0';
        
        const dot = item.querySelector('.timeline-dot');
        dot.style.animationDelay = `${index * 0.2}s`;
        
        item.addEventListener('mouseenter', () => {
            dot.style.animation = 'none';
            setTimeout(() => {
                dot.style.animation = 'bounce 2s infinite';
            }, 10);
        });
    });
});
