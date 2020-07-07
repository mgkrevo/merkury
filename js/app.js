new WOW().init();

window.addEventListener('scroll', () => {
    animateHeader();
});

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