document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle menu for mobile devices
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Intersection Observer for section animations
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

    // Carousel functionality
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

    // Auto-advance carousel
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);

    // Form submission handling
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

    /*Cards */
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
    sliderC.addEventListener('mouseleave', _ => {
        isDown = false;
        sliderC.classList.remove('active');
    });
    sliderC.addEventListener('mouseup', _ => {
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

    /*Scroll Automático */
    /*const gallery = document.querySelector('.gallery');
    let scrollAmount = 0;

    function autoScroll() {
        scrollAmount += 3; // Velocidade de scroll
        if (scrollAmount >= gallery.scrollWidth - gallery.clientWidth) {
            scrollAmount = 0; // Volta ao início
        }
        gallery.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }

    gallery.addEventListener('click', () => {
        clearInterval(autoScrollInterval); // Para o scroll ao clicar na galeria
    });

    // Inicia o autoScroll quando a página carregar
    window.onload = () => {
        autoScrollInterval = setInterval(autoScroll, 30);
    };*/

});


