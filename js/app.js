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
    mobileNavigation();
}

function animateHeader() {
    const currentY = pageYOffset;
    const header = document.querySelector('.page-header');

    const isOffset = () => currentY >= header.getBoundingClientRect().height;

    if(isOffset()) {
        header.classList.add('fixed');
    } else {
        header.classList.remove('fixed');
    }

    return;
}

function mobileNavigation() {
    const mobileButton = document.querySelector('.mobile-btn');
    const nav = document.querySelector('.page-nav');
    
    const isActive = (element) => element.className.includes('active');

    mobileButton.addEventListener('click', () => {
        if(isActive(nav)) {
            nav.classList.remove('active');
            mobileButton.classList.remove('active');
        } else {
            nav.classList.add('active');
            mobileButton.classList.add('active');
        }
    });
}

function smoothScroll(smoothLinks) {
    const mobileButton = document.querySelector('.mobile-btn');
    const nav = document.querySelector('.page-nav');
    
    const isActive = (element) => element.className.includes('active');

    for (let smoothLink of smoothLinks) {
        smoothLink.addEventListener('click', function (e) {
            e.preventDefault();
            const id = smoothLink.getAttribute('href');

            document.querySelector(id).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            if(isActive(nav)) {
                nav.classList.remove('active');
                mobileButton.classList.remove('active');
            }
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