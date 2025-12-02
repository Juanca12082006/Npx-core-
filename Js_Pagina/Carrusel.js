const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const carouselContainer = document.querySelector(".carousel-container");
const video = document.getElementById("carouselVideo");

let index = 0;
let autoSlideInterval;
let videoPlayed = false;

function showSlide(i) {
    const width = slides[0].clientWidth;
    carouselContainer.style.transform = `translateX(${-i * width}px)`;

    // Si estamos en el primer slide (video) y no se ha reproducido
    if (i === 0 && video && !videoPlayed) {
        playVideo();
    } else {
        pauseVideo();
    }
}

function playVideo() {
    if (video) {
        video.currentTime = 0;
        video.play().catch(e => {
            console.log("Error al reproducir video:", e);
            // Si no se puede reproducir, avanza automáticamente después de 4 segundos
            setTimeout(() => {
                nextSlide();
            }, 4000);
        });
    }
}

function pauseVideo() {
    if (video) {
        video.pause();
    }
}

function nextSlide() {
    index = (index + 1) % slides.length;
    showSlide(index);
}

function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    showSlide(index);
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 4000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
    }
}

// Event listeners para botones
nextBtn.addEventListener("click", () => {
    stopAutoSlide();
    nextSlide();
    // Reiniciar auto-slide después de la interacción manual
    if (index !== 0) {
        startAutoSlide();
    }
});

prevBtn.addEventListener("click", () => {
    stopAutoSlide();
    prevSlide();
    // Reiniciar auto-slide después de la interacción manual
    if (index !== 0) {
        startAutoSlide();
    }
});

// Cuando el video termina, avanza al siguiente slide
if (video) {
    video.addEventListener("ended", () => {
        videoPlayed = true;
        nextSlide();
        startAutoSlide();
    });

    // Intentar reproducir el video cuando cargue la página
    video.addEventListener("loadeddata", () => {
        if (index === 0) {
            playVideo();
        }
    });
}

// Iniciar el video si estamos en el primer slide
if (index === 0 && video) {
    playVideo();
}

// Recalcular posición en resize para mantener la responsividad
window.addEventListener("resize", () => {
    showSlide(index);
});

