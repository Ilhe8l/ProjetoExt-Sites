document.addEventListener('DOMContentLoaded', () => {
    // Função genérica para criar um carrossel
    function createCarousel(containerSelector, slideSelector, dotSelector) {
        const container = document.querySelector(containerSelector);
        const slides = container.querySelectorAll(slideSelector);
        const dots = document.querySelectorAll(dotSelector);
        let currentSlide = 0;
        let startX;
        let isSwiping = false;

        function showSlide(index) {
            container.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                showSlide(currentSlide);
            });
        });

        // Touch events
        container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isSwiping = true;
        });

        container.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            const currentX = e.touches[0].clientX;
            const diff = startX - currentX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                isSwiping = false;
            }
        });

        container.addEventListener('touchend', () => {
            isSwiping = false;
        });

        // Mouse drag functionality
        let isDragging = false;
        let dragStartX;

        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            dragStartX = e.clientX;
            container.style.cursor = 'grabbing';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const dragEndX = e.clientX;
            const diff = dragStartX - dragEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                isDragging = false;
            }
        });

        container.addEventListener('mouseup', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseleave', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });

        // Avanço automático do carrossel
        //setInterval(nextSlide, 5000);

        // Mostrar o primeiro slide ao carregar
        showSlide(0);
    }

    // Inicializar carrosséis
    createCarousel('.prototype .carousel-container', '.carousel-slide', '.prototype .nav-dot');
    createCarousel('.project-images .carousel-container', '.carousel-slide', '.project-images .nav-dot');

    // Manter o código existente para o slider de vídeos do projeto
    const videoSlides = document.querySelectorAll('.video-slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentVideoSlide = 0;

    function showVideoSlide(n) {
        videoSlides[currentVideoSlide].style.display = 'none';
        currentVideoSlide = (n + videoSlides.length) % videoSlides.length;
        videoSlides[currentVideoSlide].style.display = 'block';
    }

    prevButton.addEventListener('click', () => showVideoSlide(currentVideoSlide - 1));
    nextButton.addEventListener('click', () => showVideoSlide(currentVideoSlide + 1));

    // Mostrar o primeiro vídeo ao carregar
    showVideoSlide(0);

    // Manter o código existente para o menu hamburguer
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            }
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
        burger.classList.toggle('toggle');
    });

    // Manter o código existente para rolagem suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Manter o código existente para animações de seção
    const sections = document.querySelectorAll('.about, .process, .prototype, .team, .testimonials, .contact');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Manter o código existente para o formulário de contato
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        var templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        emailjs.send('service_mmh4vff', 'template_ntjv2is', templateParams)
            .then(function(response) {
                console.log('SUCESSO!', response.status, response.text);
                alert('Mensagem enviada com sucesso!');
                contactForm.reset();
            }, function(error) {
                console.log('FALHOU...', error);
                alert('Falha ao enviar a mensagem. Por favor, tente novamente.');
            });
    });

    // Manter o código existente para o slider de cards
    const sliderC = document.querySelector('.gallery');
    let isDown = false;
    let startX;
    let scrollLeft;

    sliderC.addEventListener('mousedown', e => {
        isDown = true;
        sliderC.classList.add('active');
        startX = e.pageX - sliderC.offsetLeft;
        scrollLeft = sliderC.scrollLeft;
    });
    sliderC.addEventListener('mouseleave', () => {
        isDown = false;
        sliderC.classList.remove('active');
    });
    sliderC.addEventListener('mouseup', () => {
        isDown = false;
        sliderC.classList.remove('active');
    });
    sliderC.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderC.offsetLeft;
        const SCROLL_SPEED = 2;
        const walk = (x - startX) * SCROLL_SPEED;
        sliderC.scrollLeft = scrollLeft - walk;
    });
});