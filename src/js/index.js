import Swiper from 'swiper';
import './../scss/index.scss';

(function() {
	'use strict';

	const html = document.querySelector('html');
	html.style.overflowY = 'hidden';

	const initialPreloader = () => {
		const preloader = document.querySelector('.preloader');

		window.addEventListener('load', e => {
			html.style.overflowY = 'auto';
			preloader.classList.add('loaded__hidding');
			preloader.classList.add('loaded');
		});
	};

	const initialSwiper = sliders => {
		if (window.innerWidth >= 320 && window.innerWidth <= 520) {
			for (let [container, pagination] of sliders) {
				new Swiper(container, {
					slidesPerView: 1,
					pagination: {
						el: pagination,
						clickable: true
					},
					breakpoints: {
						320: {
							slidesPerView: 1,
							  spaceBetween: 16
						}
					}
				});
			}
		}
	};
	
	const initialBtnsReadmores = () => {
		const btnsReadmore = document.querySelectorAll('.btn-readmore');
		btnsReadmore.forEach(btn => {
			let count = 2;
			const elems = btn.previousElementSibling.querySelectorAll('.slider__item--hidden');
			btn.addEventListener('click', e => {
				btn.children[0].textContent = count++ % 2 === 0 ? 'Скрыть все' : 'Показать все';
				elems.forEach(elem => {
					elem.classList.toggle('slider__item--show');
					btn.previousElementSibling.classList.toggle('is-active');
					elem.classList.toggle('slider__item--hidden');
				});
			});
		});
	};
	
	const initialBtnsOpenMenu = () => {
		const btnsOpenMenu = document.querySelectorAll('.btn-circle--open');
		btnsOpenMenu.forEach(btn => {
			btn.addEventListener('click', e => {
				const data = btn.dataset.menu;

				if (data) {
					const menu = document.querySelector(`.${data}`);
					menu.classList.remove(`${data}--hidden`);
					html.style.overflow = 'hidden';
				}
			});
		});
	};
	
	const initialBtnsCloseModal = () => {
		const btnsCloseMenu = document.querySelectorAll('.btn-circle--icon--close');
		btnsCloseMenu.forEach(btn => {
			btn.addEventListener('click', e => {
				const menu = btn.dataset.menu;

				if (menu) {
					html.style.overflow = 'auto';
					document.querySelector(`.${btn.dataset.menu}`).classList.add(`${menu}--hidden`);
				}
			});
		});
	};
	
	/*const swiperSliders = document.querySelectorAll('.swiper-slide');
	swiperSliders.forEach(slider => {
		slider.classList.add('slider__item');
	});*/

	const sliders = [
		['.swiper-container1', '.swiper-pagination1'],
		['.swiper-container2', '.swiper-pagination2'],
		['.swiper-container3', '.swiper-pagination3']
	];

	window.addEventListener('resize', e => initialSwiper(sliders));

	initialPreloader();
	initialBtnsReadmores();
	initialBtnsOpenMenu();
	initialBtnsCloseModal();
	initialSwiper(sliders);
}());



