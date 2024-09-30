document.addEventListener('DOMContentLoaded', () => {
    // Efeito de parallax
    const parallax = () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    };

    window.addEventListener('scroll', parallax);

    // Funcionalidade do menu hamburguer
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle da navegação
        nav.classList.toggle('nav-active');

        // Animação dos links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Animação do burger
        burger.classList.toggle('toggle');
    });

    // Rolagem suave para links de navegação
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

    // Observer de interseção para animações de seção
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

    // Funcionalidade do carrossel
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.nav-dot');
    let currentSlide = 0;

    function showSlide(index) {
        carousel.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Avanço automático do carrossel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);

    // Carrossel de imagens do projeto
    const imageSlides = document.querySelectorAll('.image-slide');
    const imageDots = document.querySelectorAll('.project-images .nav-dot');
    let currentImageSlide = 0;

    function showImageSlide(n) {
        imageSlides[currentImageSlide].classList.remove('active');
        imageDots[currentImageSlide].classList.remove('active');
        currentImageSlide = (n + imageSlides.length) % imageSlides.length;
        imageSlides[currentImageSlide].classList.add('active');
        imageDots[currentImageSlide].classList.add('active');
    }

    imageDots.forEach((dot, index) => {
        dot.addEventListener('click', () => showImageSlide(index));
    });

    // Mostrar a primeira imagem ao carregar
    showImageSlide(0);

    setInterval(() => showImageSlide(currentImageSlide + 1), 5000);

    // Slider de vídeos do projeto
    const videoSlides = document.querySelectorAll('.video-slide');
    const prevButton = document.querySelector('.prev-slide');
    const nextButton = document.querySelector('.next-slide');
    let currentVideoSlide = 0;

    function showVideoSlide(n) {
        videoSlides[currentVideoSlide].classList.remove('active');
        currentVideoSlide = (n + videoSlides.length) % videoSlides.length;
        videoSlides[currentVideoSlide].classList.add('active');
    }

    prevButton.addEventListener('click', () => showVideoSlide(currentVideoSlide - 1));
    nextButton.addEventListener('click', () => showVideoSlide(currentVideoSlide + 1));

    // Mostrar o primeiro vídeo ao carregar
    showVideoSlide(0);

    // Manipulação de envio de formulário
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        alert(`Mensagem enviada por: ${name} (${email})\n\nMensagem: ${message}`);
        contactForm.reset();
    });

    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(newsletterForm);
        const email = formData.get('email');

        alert(`Obrigado por se inscrever, ${email}!`);
        newsletterForm.reset();
    });

    // Funcionalidade do slider de cards
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

    // Envio de formulário com EmailJS
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        emailjs.send('service_mmh4vff', 'template_ntjv2is', templateParams)
            .then(function(response) {
                console.log('SUCESSO!', response.status, response.text);
            }, function(error) {
                console.log('FALHOU...', error);
            });
    });
});