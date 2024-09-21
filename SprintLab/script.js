/*Slider*/
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const pagination = document.querySelector('.pagination');
    let currentIndex = 0;
    let startX = 0;
    let endX = 0;

    // Paginação dos pontos
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

    // Toques
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

    // Menu Mobile 
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Animação Suave da Navegação de Página
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

            // Fecha o Menu Após Clicar No LInk
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

// Revela os Itens com Animação
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
    revealElementsOnScroll();
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

/*Cards*/
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
    const SCROLL_SPEED = 3;
    const walk = (x - startX) * SCROLL_SPEED;
    sliderC.scrollLeft = scrollLeft - walk;
});

// Funcionalidade do Modal
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const closeBtn = document.getElementsByClassName("close")[0];

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        modalTitle.textContent = item.dataset.title;
        modalDescription.textContent = item.dataset.description;
        modal.style.display = "block";
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    });
});

closeBtn.onclick = function() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = "none";
        }, 300);
    }
}

/*Abrir Página*/
function abrirNovaPagina(Link) {
    window.open(Link, '_blank');
  }

const gallery = document.querySelector('.gallery');
let scrollAmount = 0;

function autoScroll() {
    scrollAmount += 1; // Velocidade de scroll
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
    autoScrollInterval = setInterval(autoScroll, 15);
};
