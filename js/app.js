/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isWebp": () => (/* binding */ isWebp)
/* harmony export */ });
// проверка поддержки webp, добавление класса webp или no-webp
function isWebp() {
   //проверка поддержки webp
   function testWebP(callback) {

      var webP = new Image();
      webP.onload = webP.onerror = function () {
         callback(webP.height == 2);
      };
      webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
   }

   //добавление класса
   testWebP(function (support) {
      if (support == true) {
         document.querySelector('body').classList.add('webp');
      } else {
         document.querySelector('body').classList.add('no-webp');
      }
   });
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_functions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


_modules_functions_js__WEBPACK_IMPORTED_MODULE_0__.isWebp();

const body = document.querySelector('body');

//-------------------------------Прелоадер и плавное появление блоков---------------------------------
if (document.readyState === "complete") {
   init();
} else {
   window.addEventListener("load", init);
}

function init() {
   let preloader = document.querySelector('.preloader');
   if (preloader) {
      setTimeout(() => {
         preloader.classList.add('hidden-preloader');

         function onEntry(entry) {
            entry.forEach(change => {
               if (change.isIntersecting) {
                  change.target.classList.add('element-show');
               }
            });
         }

         let options = { threshold: [0.1] };
         let observer = new IntersectionObserver(onEntry, options);
         let elements = document.querySelectorAll('.element-animation');
         for (let elm of elements) {
            observer.observe(elm);
         }
      }, 1600);
   }
}

/*------------------------------Header Menu---------------------------*/
const burgerIcon = document.querySelector('.burger-icon');
const headerMenu = document.querySelector('.header__menu');
const menuLinks = document.querySelectorAll('.menu__link');

if (burgerIcon && headerMenu && body) {
   burgerIcon.addEventListener('click', function () {
      headerMenu.classList.toggle('open');
      burgerIcon.classList.toggle('active');
      body.classList.toggle('catalog2-opened');
   });

   menuLinks.forEach(link => {
      link.addEventListener('click', function () {
         if (window.innerWidth <= 950) {
            headerMenu.classList.remove('open');
            burgerIcon.classList.remove('active');
            body.classList.remove('catalog2-opened');
         }
      });
   });
}

/*------------------------------Menu Catalog---------------------------*/
(function () {
   document.querySelectorAll('.catalog__menu-link').forEach(button => {
      button.addEventListener('click', function () {
         document.querySelectorAll('.catalog__menu-link').forEach(btn => {
            btn.classList.remove('active', 'active-prev', 'active-next');
         });

         document.querySelectorAll('.catalog__products').forEach(content => {
            content.classList.remove('show');
         });

         this.classList.add('active');

         const prevButton = this.previousElementSibling;
         if (prevButton) {
            prevButton.classList.add('active-prev');
         }

         const nextButton = this.nextElementSibling;
         if (nextButton) {
            nextButton.classList.add('active-next');
         }

         const category = this.getAttribute('data-category');
         const contentToShow = document.querySelector(`.catalog__products[data-content="${category}"]`);
         if (contentToShow) {
            contentToShow.classList.add('show');
         }
      });
   });
})();

(function () {
   document.addEventListener('DOMContentLoaded', function () {
      const tabs = document.querySelectorAll('.catalog__tab');
      const contents = document.querySelectorAll('.catalog__content');

      tabs.forEach(tab => {
         tab.addEventListener('click', function () {
            const category = this.getAttribute('data-tab-category');

            contents.forEach(content => {
               content.classList.remove('show');
            });

            const activeContent = document.querySelector(`.catalog__content[data-tab-content="${category}"]`);
            if (activeContent) {
               activeContent.classList.add('show');
            }

            tabs.forEach(tab => {
               tab.parentElement.classList.remove('active');
            });

            this.parentElement.classList.add('active');

            const firstMenuLink = activeContent.querySelector('.catalog__menu-link');
            const firstProduct = activeContent.querySelector('.catalog__products');

            if (firstMenuLink) {
               firstMenuLink.classList.add('active');
            }

            if (firstProduct) {
               firstProduct.classList.add('show');
            }
         });
      });
   });
})();


/*------------------------------Category Slider---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   var swiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      spaceBetween: 10,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
   });
});

/*------------------------------Catalog menu---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const menuContainer = document.querySelector('.catalog__menu');
   const menuTitle = document.querySelector('.catalog__menu-title');
   const menuLinks = document.querySelector('.catalog__menu-links');
   const body = document.querySelector('body');

   if (menuContainer && menuTitle && menuLinks && body) {
      const buttons = menuLinks.querySelectorAll('button');

      function toggleMenu() {
         if (window.innerWidth <= 1000) {
            menuLinks.classList.toggle('open');
            menuContainer.classList.toggle('active');
            body.classList.toggle('catalog-opened');
         }
      }

      function closeMenu() {
         if (window.innerWidth <= 1000) {
            menuLinks.classList.remove('open');
            menuContainer.classList.remove('active');
            body.classList.remove('catalog-opened');
         }
      }

      menuTitle.addEventListener('click', toggleMenu);

      buttons.forEach(function (button) {
         button.addEventListener('click', closeMenu);
      });

      window.addEventListener('resize', function () {
         if (window.innerWidth > 1000) {
            closeMenu();
         }
      });
   }
});


/*------------------------------Testimonials---------------------------*/
const gallerySliderElement = document.querySelector('.testimonials__items-slider');
if (gallerySliderElement) {
   const gallerySlider = new Swiper('.testimonials__items-slider', {
      loop: true,
      navigation: {
         nextEl: '.testimonials__all-next',
         prevEl: '.testimonials__all-prev',
      },
      freeMode: false,
      spaceBetween: 15,
      watchOverflow: true,
      grabCursor: false,
      breakpoints: {
         320: {
            slidesPerView: 1.2,
         },
         700: {
            slidesPerView: 2,
         },
         992: {
            slidesPerView: 3,
         }
      },
   });
}

/*------------------------------Faq---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const faqItems = document.querySelectorAll('.faq__item');

   faqItems.forEach(item => {
      const question = item.querySelector('.faq__question');
      question.addEventListener('click', () => {
         const answer = item.querySelector('.faq__answer');
         const isActive = item.classList.contains('active');

         faqItems.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq__answer').classList.remove('show');
         });

         if (!isActive) {
            item.classList.add('active');
            answer.classList.add('show');
         }
      });
   });
});


/*------------------------------Попап корзины---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const links = document.querySelectorAll('.open-cart-popup');

   links.forEach(function (link) {
      link.addEventListener('click', function (event) {
         event.preventDefault();
         const cartPopup = document.querySelector('.cart-popup');
         if (cartPopup) {
            cartPopup.classList.add('open');
         }
         body.classList.add('cart-opened');
      });
   });

   const closeButton = document.querySelector('.cart-popup__close');
   if (closeButton) {
      closeButton.addEventListener('click', function () {
         const cartPopup = document.querySelector('.cart-popup');
         if (cartPopup) {
            cartPopup.classList.remove('open');
         }
         body.classList.remove('cart-opened');
      });
   }
});

/*------------------------------Попап слайдер---------------------------*/
var swiper = new Swiper(".cart-popup__slider-thumb", {
   loop: false,
   spaceBetween: 10,
   freeMode: true,
   watchSlidesProgress: true,
   navigation: {
      nextEl: ".cart-popup__slider-next",
   },
   breakpoints: {
      320: {
         direction: 'horizontal',
         slidesPerView: 4,

      },
      600: {
         direction: 'vertical',
         slidesPerView: 5,

      }
   },
});
var swiper2 = new Swiper(".cart-popup__slider", {
   loop: false,
   spaceBetween: 0,
   slidesPerView: 1,
   thumbs: {
      swiper: swiper,
   },
   breakpoints: {
      320: {
         direction: 'horizontal',
      },
      600: {
         direction: 'vertical',
      }
   },
});

/*------------------------------Попап оплаты---------------------------*/
document.querySelector('.cart-popup__order-link').addEventListener('click', function (event) {
   event.preventDefault();
   document.querySelector('.cart-popup').classList.remove('open');
   document.querySelector('.pay-popup').classList.add('open');
});

document.querySelector('.pay-popup__close').addEventListener('click', function (event) {
   event.preventDefault();
   document.querySelector('.pay-popup').classList.remove('open');
   body.classList.remove('cart-opened');
});


/*------------------------------Маска номера---------------------------*/
document.addEventListener('DOMContentLoaded', function () {
   const maskOptions = {
      mask: '+{7}(000)000-00-00'
   };

   const elements = document.querySelectorAll('.tel-mask');
   elements.forEach(function (element) {
      IMask(element, maskOptions);
   });
});
})();

/******/ })()
;