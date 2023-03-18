import calc from './modules/calc';
import slides from './modules/slides';
import card from './modules/card';
import modal from './modules/modal';
import tabs from './modules/tabs';
import timer from './modules/timer';
import forms from './modules/forms';

window.addEventListener('DOMContentLoaded', function() {
    calc();
    card('http://localhost:3000/menu', 'menu__item', '.menu .container');
    modal('.modal', '[data-modal]');
    slides({
        slidesElem: '.offer__slide',
        prevBtnElem: '.offer__slider-prev',
        counterElem: '#current',
        nextBtnElem: '.offer__slider-next',
        totalElem: '#total'
    });
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('2023-03-20');
    forms(document.querySelector('.modal'), 'http://localhost:3000/requests');
});