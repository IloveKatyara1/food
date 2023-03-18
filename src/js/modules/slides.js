import {getZero} from './timer';

function slides({slidesElem, prevBtnElem, nextBtnElem, counterElem, totalElem}) {
    function changeSlide(pOrM) {
        slides[num].classList.remove('show');

        num += pOrM;

        if(num > slides.length - 1) {
            counter.textContent = getZero(1);
            num = 0;
        } else if(num < 0) {
            counter.textContent = getZero(slides.length);
            num = slides.length - 1;
        } else {
            counter.textContent = getZero(num + 1);
        }

        removeActiveIndicator();
        indicators[num].style.opacity = '1';

        slides[num].classList.add('show'); 
    }

    function removeActiveIndicator() {
        indicators.forEach(ind => ind.style.opacity = '.5');
    }

    const slides = document.querySelectorAll(slidesElem),
          prevBtn = document.querySelector(prevBtnElem),
          nextBtn = document.querySelector(nextBtnElem),
          counter = document.querySelector(counterElem),
          total = document.querySelector(totalElem);

    let num = 0;

    counter.textContent = getZero(num + 1);
    total.textContent = getZero(slides.length);

    slides[num].classList.add('show');

    prevBtn.addEventListener('click', () => changeSlide(-1));

    nextBtn.addEventListener('click', () => changeSlide(1));

    for (let i = 1; i <= slides.length; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');

        document.querySelector('.carousel-indicators').append(dot);
    }

    const indicators = document.querySelectorAll('.dot');
    indicators[0].style.opacity = '1';

    indicators.forEach((ind, i) => {
        ind.addEventListener('click', () => {
            removeActiveIndicator();

            indicators[i].style.opacity = '1';
            changeSlide(-num + i);
        });
    });
}

export default slides;