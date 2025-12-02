
const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const carouselContainer = document.querySelector(".carousel-container");

let index = 0;

function showSlide(i) {
    const width = slides[0].clientWidth;
    carouselContainer.style.transform = `translateX(${-i * width}px)`;
}

nextBtn.addEventListener("click", () => {
    index = (index + 1) % slides.length;
    showSlide(index);
});

prevBtn.addEventListener("click", () => {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
});

// Auto-slide cada 4 segundos
setInterval(() => {
    index = (index + 1) % slides.length;
    showSlide(index);
}, 4000);

// Recalcular posición en resize para mantener la responsividad
window.addEventListener("resize", () => {
    showSlide(index);
});

