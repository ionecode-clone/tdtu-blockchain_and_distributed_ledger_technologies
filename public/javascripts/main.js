/**
* Template Name: Restaurantly
* Updated: Sep 20 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function (e) {
        e.stopPropagation();
        menuFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        menuIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate glightbox 
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Events slider
   */
  new Swiper('.events-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  const inputField = $('.p-quantity');
  const minusButton = $('#button-addon1');
  const plusButton = $('#button-addon2');

  minusButton.click(function () {
    const currentValue = parseInt(inputField.val());
    if (currentValue > 1) {
      inputField.val(currentValue - 1);
    }
  });

  plusButton.click(function () {
    var currentValue = parseInt(inputField.val());
    inputField.val(currentValue + 1);
  });

  const fullHeight = function () {
    $('.js-fullheight').css('height', $(window).height());
    $(window).resize(function () {
      $('.js-fullheight').css('height', $(window).height());
    });
  };

  fullHeight();

  $(document).on("click", ".toggle-password", function () {
    $(this).toggleClass("fa-eye fa-eye-slash");
    const input = $($(this).attr("toggle"));
    input.attr("type") == "password" ? input.attr("type", "text") : input.attr("type", "password")
  });

  $('.4j1hj41').hide().slideDown(500).delay(1500).slideUp(500);
  let validPwdField = false, validCPwdField = false

  $('#password-field').on('input', function () {
    let pwdLen = $(this).val().length;

    if (pwdLen < 6) {
      validPwdField = false

      if ($(this).closest('.form-group').find('.error').length === 0) {
        $(this).closest('.form-group').find('.error').remove();
        // $(this).closest('.form-group')
        //   .append(`<div class='error' style='position: absolute; top: 50px;' ><p class='text-danger'><i><b>* The password must be longer than 6 characters.</i></b></p></div>`);
        let errorDiv =
          $(`<div class='error' style='position: absolute; top: 50px; display: none;'>
          <p class='text-danger'><i><b>* Mật khẩu phải có ít nhất 6 ký tự</i></b></p></div>`)
            .hide();
        $(this).closest('.form-group').append(errorDiv);
        errorDiv.slideDown();
      }
    } else {
      $(this).closest('.form-group').find('.error').css({ left: 0, opacity: 1 }).animate({
        left: "50%",
        opacity: 0
      }, 500, function () {
        $(this).remove();
      });

      validPwdField = true
    }
  });

  $('#confirm-password-field').on('input', function () {
    let cpwdLen = $(this).val().length;
    let cpwd = $(this).val();
    let pwd = $('#password-field').val();

    if (cpwd !== pwd) {
      validCPwdField = false
      if ($(this).closest('.form-group').find('.error').length === 0) {
        $(this).closest('.form-group').find('.error').remove();

        let errorDiv =
          $(`<div class='error' style='position: absolute; top: 50px; display: none;'>
        <p class='text-danger'><i><b>* Mật khẩu và xác nhận mật khẩu không khớp</i></b></p></div>`)
            .hide();
        $(this).closest('.form-group').append(errorDiv);
        errorDiv.slideDown();
      }
    } else {
      $(this).closest('.form-group').find('.error').css({ left: 0, opacity: 1 }).animate({
        left: "50%",
        opacity: 0
      }, 500, function () {
        $(this).remove();
      });

      validCPwdField = true
    }

    if (validCPwdField && validPwdField) {
      $('.3j1h51h5').prop('disabled', false)
    } else {
      $('.3j1h51h5').prop('disabled', true)
    }
  });

  $(".clickable-row").click(function () {
    window.location = $(this).data("href");
  });
})()