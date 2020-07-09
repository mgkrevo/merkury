new WOW().init();

init();

function init() {
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    const sliderArrows = document.querySelectorAll('.slider-arrow');
    
    window.addEventListener('scroll', () => {
        animateHeader();
    });

    smoothScroll(smoothLinks);
    slideWithArrows(sliderArrows);
}

function animateHeader() {
    const currentY = pageYOffset;
    const header = document.querySelector('.page-header');

    let isOffset = () => currentY >= header.getBoundingClientRect().height;

    if(isOffset()) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }

    return;
}

function smoothScroll(smoothLinks) {
    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');

            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };
}

function slideWithArrows(sliderArrows) {
    const slides = document.getElementsByClassName('slide');
    const clearActiveSlides = () => {
        Array.from(slides).forEach((slide) => {
            slide.classList.remove('active'); 
        });
    }
    Array.from(sliderArrows).forEach((arrow) => {
        arrow.addEventListener('click', function(e) {
            const activeSlide = document.querySelector('.slide.active');
            let target = e.currentTarget;
            
            if(target.className.includes('arrow-right')) {
                const next = activeSlide.nextElementSibling;
                if(!next) return;
                
                clearActiveSlides();
                next.classList.add('active');
            } else if (target.className.includes('arrow-left')) {
                const prev = activeSlide.previousElementSibling;
                if(!prev) return;
                
                clearActiveSlides();
                prev.classList.add('active');
            } 

            return;
        });
    });
}