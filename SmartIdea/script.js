document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect
    const parallax = () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    };

    window.addEventListener('scroll', parallax);

    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    // Navigation toggle
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        burger.classList.toggle('toggle');
    });

    // Smooth scrolling for navigation links
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

    // Cards slider functionality
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

    // EmailJS form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();
        
        var templateParams = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        emailjs.send('service_mmh4vff', 'template_ntjv2is', templateParams)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                console.log('FAILED...', error);
            });
    });
});
