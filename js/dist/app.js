"use strict";

new WOW().init();
init();

function init() {
  var smoothLinks = document.querySelectorAll('a[href^="#"]');
  var sliderArrows = document.querySelectorAll('.slider-arrow');
  window.addEventListener('scroll', function () {
    animateHeader();
  });
  smoothScroll(smoothLinks);
  slideWithArrows(sliderArrows);
  mobileNavigation();
}

function animateHeader() {
  var currentY = pageYOffset;
  var header = document.querySelector('.page-header');

  var isOffset = function isOffset() {
    return currentY >= header.getBoundingClientRect().height;
  };

  if (isOffset()) {
    header.classList.add('fixed');
  } else {
    header.classList.remove('fixed');
  }

  return;
}

function mobileNavigation() {
  var mobileButton = document.querySelector('.mobile-btn');
  var nav = document.querySelector('.page-nav');

  var isActive = function isActive(element) {
    return element.className.indexOf('active') !== -1;
  };

  mobileButton.addEventListener('click', function () {
    if (isActive(nav)) {
      nav.classList.remove('active');
      mobileButton.classList.remove('active');
    } else {
      nav.classList.add('active');
      mobileButton.classList.add('active');
    }
  });
}

function smoothScroll(smoothLinks) {
  var mobileButton = document.querySelector('.mobile-btn');
  var nav = document.querySelector('.page-nav');

  var isActive = function isActive(element) {
    return element.className.includes('active');
  };

    for(var i = 0; i < smoothLinks.length; i++) {
      smoothLinks[i].addEventListener('click', function (e) {
        e.preventDefault();
        var id = e.currentTarget.getAttribute('href');
        document.querySelector(id).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
  
        if (isActive(nav)) {
          nav.classList.remove('active');
          mobileButton.classList.remove('active');
        }
      });
    }
}

function slideWithArrows(sliderArrows) {
  var slides = document.getElementsByClassName('slide');

  var clearActiveSlides = function clearActiveSlides() {
    for(var i = 0; i < slides.length; i++) {
      slides[i].classList.remove('active');
    }
  };

  
  for(var i = 0; i < sliderArrows.length; i++) {
    sliderArrows[i].addEventListener('click', function (e) {
        var activeSlide = document.querySelector('.slide.active');
        var target = e.currentTarget;
  
        if (target.className.indexOf('arrow-right') !== -1) {
          var next = activeSlide.nextElementSibling;
          if (!next) return;
          clearActiveSlides();
          next.classList.add('active');
        } else if (target.className.indexOf('arrow-left') !== -1) {
          var prev = activeSlide.previousElementSibling;
          if (!prev) return;
          clearActiveSlides();
          prev.classList.add('active');
        }
  
        return;
      });
    }
}