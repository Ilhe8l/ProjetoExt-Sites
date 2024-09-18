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
        
            
        });

        document.addEventListener('DOMContentLoaded', function() {
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            const navLinks = document.querySelector('.nav-links');
        
            mobileMenuToggle.addEventListener('click', function() {
                navLinks.classList.toggle('active');
                mobileMenuToggle.classList.toggle('active');
            });
        
            // Fechar o menu ao clicar em um link
            const navLinkItems = document.querySelectorAll('.nav-links a');
            navLinkItems.forEach(function(link) {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                });
            });
        });