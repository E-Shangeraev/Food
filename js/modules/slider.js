function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    const slides = document.querySelectorAll(slide),
          slider = document.querySelector(container),
          prev = document.querySelector(prevArrow),
          next = document.querySelector(nextArrow),
          total = document.querySelector(totalCounter),
          current = document.querySelector(currentCounter),
          slidesWrapper = document.querySelector(wrapper),
          slidesField = document.querySelector(field),
          width = window.getComputedStyle(slidesWrapper).width;
  //   width = slidesWrapper.offsetWidth;

    let slideIndex = 1;


    // Slider #1

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent  = `0${slides.length}`;
    // } else {
    //     total.textContent  = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }

    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent  = `0${slideIndex}`;
    //     } else {
    //         current.textContent  = slideIndex;
    //     }
    // }

    // function plusSlides(n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', () => {
    //     plusSlides(1);
    // });


    //Slider #2
    let offset = 0;

    if (slides.length < 10) {
    total.textContent  = `0${slides.length}`;
    current.textContent  = `0${slideIndex}`;
    } else {
    total.textContent  = slides.length;
    current.textContent  = slideIndex;
    }

    slidesField.style.cssText = `
    display: flex; 
    transition: ease 0.5s;
    width: ${100 * slides.length}%;
    `;

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
    slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
        
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if (i == 0) {
        dot.style.opacity = '1';
    }

    indicators.append(dot);
    dots.push(dot);
    }

    function setActiveDot() {
    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[slideIndex - 1].style.opacity = '1';
    }

    function changeCurrentNum() {
    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }
    }

    function removeNumFromStr(str) {
    return +str.replace(/\D/g, '');
    }


    next.addEventListener('click', () => {
    if (offset == removeNumFromStr(width) * (slides.length - 1)) {
        offset = 0;
    } else {
        offset += removeNumFromStr(width);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == slides.length) {
        slideIndex = 1;
    } else {
        slideIndex++;
    }

    changeCurrentNum();
    setActiveDot();
    });

    prev.addEventListener('click', () => {
    if (offset == 0) {
        offset = removeNumFromStr(width) * (slides.length - 1);
    } else {
        offset -= removeNumFromStr(width);
    }
    
    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex == 1) {
        slideIndex = slides.length;
    } else {
        slideIndex--;
    }

    if (slides.length < 10) {
        current.textContent = `0${slideIndex}`;
    } else {
        current.textContent = slideIndex;
    }

    changeCurrentNum();
    setActiveDot();
    });

    dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
        const slideTo = e.target.getAttribute('data-slide-to');

        slideIndex = slideTo;
        offset = removeNumFromStr(width) * (slideTo - 1);

        slidesField.style.transform = `translateX(-${offset}px)`;

        changeCurrentNum();
        setActiveDot();
    });
    });
}

export default slider;