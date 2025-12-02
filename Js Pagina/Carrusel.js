
    const slides = document.querySelectorAll(".slide");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let index = 0;

    function showSlide(i) {
        const width = slides[0].clientWidth;
        document.querySelector(".carousel-container").style.transform = `translateX(${-i * width}px)`;
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

