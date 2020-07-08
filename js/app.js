new WOW().init();

init();

function init() {
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        animateHeader();
    });

    smoothScroll(smoothLinks);
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