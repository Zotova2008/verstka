"use strict";

document.addEventListener('DOMContentLoaded', function () {

  // Меню
  var btnMenu = document.querySelector('.btn-dropdown');
  var menu = document.querySelector('.menu');
  var menuLinks = document.querySelectorAll('.menu__link');
  var modalButtons = document.querySelectorAll('.js-open-modal');
  var overlay = document.querySelector('.js-overlay-modal');
  var closeButtons = document.querySelectorAll('.js-modal-close');
  var body = document.querySelector('body');

  if (btnMenu && menu) {
    btnMenu.addEventListener('click', function (event) {
      event.preventDefault();
      menu.classList.toggle('menu__active');
    });

    if (menuLinks) {

      for (let menuLink of menuLinks) {
        menuLink.addEventListener('click', function (event) {
          event.preventDefault()

          const blockID = menuLink.getAttribute('href')
          menu.classList.remove('menu__active');
          document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
        })
      }
    };
  }

  // Конец Меню

  // Скрипт для модальных окон
  if (modalButtons && overlay) {
    modalButtons.forEach(function (item) {

      item.addEventListener('click', function (e) {
        e.preventDefault();

        var modalId = this.getAttribute('data-id'),
          modalElem = document.querySelector('.modal[data-id="' + modalId + '"]');

        modalElem.classList.add('active');
        overlay.classList.add('active');

        body.dataset.scrollY = getBodyScrollTop(); // сохраним значение скролла
        if (existVerticalScroll()) {
          body.classList.add('no-scroll');
          body.style.top = `-${body.dataset.scrollY}px`;
        }
      });

    });

    closeButtons.forEach(function (item) {

      item.addEventListener('click', function (e) {
        var parentModal = this.closest('.modal');

        parentModal.classList.remove('active');
        overlay.classList.remove('active');

        if (existVerticalScroll()) {
          body.classList.remove('no-scroll');
          window.scrollTo(0, body.dataset.scrollY);
        }

      });

    });

    document.body.addEventListener('keyup', function (e) {
      var key = e.keyCode;

      if (key == 27) {

        document.querySelector('.modal.active').classList.remove('active');
        document.querySelector('.overlay').classList.remove('active');

        if (existVerticalScroll()) {
          body.classList.remove('no-scroll');
          window.scrollTo(0, body.dataset.scrollY);
        }
      }
    }, false);

    overlay.addEventListener('click', function () {
      document.querySelector('.modal.active').classList.remove('active');

      if (existVerticalScroll()) {
        body.classList.remove('no-scroll');
        window.scrollTo(0, body.dataset.scrollY);
      }

      this.classList.remove('active');
    });
  }

  function existVerticalScroll() {
    return document.body.offsetHeight > window.innerHeight;
  }

  function getBodyScrollTop() {
    return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
  }

  // Конец Скрипт для модальных окон



});