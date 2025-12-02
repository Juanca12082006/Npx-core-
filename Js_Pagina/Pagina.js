// Funcionalidad del menú hamburguesa

const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.querySelector('.header');

// Toggle del menú al hacer clic en hamburguesa
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    nav.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevenir scroll del body cuando el menú está abierto
    document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
});

// Cerrar menú al hacer clic en overlay
overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Cerrar menú al hacer clic en cualquier enlace
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Cerrar menú al presionar ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
        hamburger.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ===== FUNCIONALIDAD: OCULTAR/MOSTRAR NAVBAR CON SCROLL =====

let lastScrollTop = 0;
const scrollThreshold = 100; // Pixeles de scroll antes de activar el efecto

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Agregar sombra cuando hay scroll
    if (currentScroll > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Ocultar/mostrar header basado en dirección del scroll
    if (currentScroll > scrollThreshold) {
        if (currentScroll > lastScrollTop) {
            // Scroll hacia ABAJO - Ocultar header
            header.classList.add('hidden');
        } else {
            // Scroll hacia ARRIBA - Mostrar header
            header.classList.remove('hidden');
        }
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
}, false);

