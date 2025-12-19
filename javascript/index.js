document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.testimonials-track');
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    let isAnimating = false;

    // Переключение слайда с анимацией
    function goToSlide(slideIndex, direction = 'next') {
        if (isAnimating || slideIndex === currentSlide) return;
        
        isAnimating = true;
        
        // Анимация исчезновения текущего слайда
        slides[currentSlide].classList.add('slide-out');
        if (direction === 'prev') {
            slides[currentSlide].classList.add('reverse');
        }
        
        // Установить новый активный слайд
        currentSlide = slideIndex;
        
        // Через короткую задержку - показать новый слайд
        setTimeout(() => {
            // Убрать классы анимации со всех слайдов
            slides.forEach(slide => {
                slide.classList.remove('active', 'slide-out', 'reverse');
            });
            
            // Показать новый слайд
            slides[currentSlide].classList.add('active');
            
            // Обновить положение трека для горизонтального слайдера
            track.style.transform = `translateX(-${currentSlide * 100}%)`;
            
            isAnimating = false;
        }, 150);
    }

    // Следующий слайд
    function nextSlide() {
        let nextIndex = currentSlide + 1;
        if (nextIndex >= totalSlides) {
            nextIndex = 0;
        }
        goToSlide(nextIndex, 'next');
    }

    // Предыдущий слайд
    function prevSlide() {
        let prevIndex = currentSlide - 1;
        if (prevIndex < 0) {
            prevIndex = totalSlides - 1;
        }
        goToSlide(prevIndex, 'prev');
    }

    // Обработчики событий для кнопок
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Автопереключение слайдов каждые 5 секунд
    let autoSlideInterval = setInterval(nextSlide, 3000);

    // Пауза автопрокрутки при наведении на слайдер
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 3000);
    });

});