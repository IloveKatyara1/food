window.addEventListener('DOMContentLoaded', function() {
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
        
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
	});

    // timer

    let deadLine = '2023-03-20';

    let days, hours, minutes, seconds;

    function calcIntervalOfDate(end) {
        let time = Date.parse(end) - Date.parse(new Date());

        if (time <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        } else {
            days = Math.floor(time / (1000 * 60 * 60 * 24));
            hours = Math.floor((time / (1000 * 60 * 60)) % 24);
            minutes = Math.floor((time / (1000 * 60)) % 60);
            seconds = Math.floor((time / 1000) % 60);
        }

        return {
            'time': time,
            'days': days,
            'hours': hours,  
            'minutes': minutes,    
            'seconds': seconds  
        };
    }

    function getZero(item) {
        if(item >= 0 && item < 10) {
            return `0${item}`;
        } else {
            return item;
        }
    }

    function addTimer(end) {
        const timer = document.querySelector('.timer'),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerId = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = calcIntervalOfDate(end);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.time == 0) {
                clearInterval(timerId);
            }
        }
    }

    addTimer(deadLine);

    function showModal() {
        modal.classList.add('show');

        document.body.style.overflow = 'hidden';

        // clearInterval(timeoutId);
        window.removeEventListener('scroll', showModalByScroll);
    }

    function removeModal() {
        modal.classList.remove('show');

        document.body.style.overflow = 'visible';
    }

    const btnShowModal = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    btnShowModal.forEach(btn => {
        btn.addEventListener('click', showModal);
    });

    modal.addEventListener('click', e => {
        if(e.target === modal || e.target.className === 'modal__close') {
            removeModal();
        }
    });

    window.addEventListener('keydown', e => {
        if(e.key === 'Escape' && modal.classList.contains('show')) {
            removeModal();
        }
    });

    // const timeoutId = setTimeout(showModal, 5000);

    function showModalByScroll() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
            showModal();

            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    window.addEventListener('scroll', showModalByScroll);

    class AddNewCard {
      constructor(img, title, text, price, alt, parent, ...classes) {
        this.img = img;
        this.title = title;
        this.text = text;
        this.price = price;
        this.alt = alt;
        this.classes = classes;
        this.parent = document.querySelector(parent);
        this.dolar = 40;
        this.changeToUAH();
      }
    
      changeToUAH() {
        this.price = this.price * this.dolar;
      }
    
      render() {
        function addClasses(classes) {
          classes.forEach(item => div.classList.add(item));
        }
    
        const div = document.createElement('div');
    
        let calc = 0;
    
        if (this.classes.length == 0) {
          div.classList.add('menu__item');
        } else {
          this.classes.forEach(item => {
            if (item == 'menu__item') {
              addClasses(this.classes);
            } else {
              calc += 1;
    
              if (this.classes.length - calc <= 0) {
                this.classes.unshift('menu__item');
    
                addClasses(this.classes);
              }
            }
          });
        }
    
        div.innerHTML = `
          <img src="${this.img}" alt="${this.alt}">
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.text}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
        `;
    
        this.parent.append(div);
      }
    }
    
    const getData = async (url) => {
      const res = await fetch(url);
    
      if (!res.ok) {
        throw new Error(`Сталася помилка ${res.status}, детальніше дивитися в консолі`);
      }
    
      return await res.json();
    };
    
    getData('http://localhost:3000/menu')
      .then(data => {
        data.forEach(({ img, title, descr: text, price, altimg: alt }) => {
          new AddNewCard(img, title, text, price, alt, '.menu .container', 'menu__item').render();
        });
      });
    
    const forms = this.document.querySelectorAll('form');

    const massage = {
        loading: 'icons/spinner.svg',
        success: 'заявка відправлена, чикайте дзвінка',
        failure: 'щось пішло не так, попробуйте пізніше'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers:{
                'Content-type': 'application/json',
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                addThanksModal(massage.success);
            })
            .catch(() => addThanksModal(massage.failure))
            .finally(() => {
                massageBlock.remove();
                form.reset();
            });

            const massageBlock = document.createElement('img');
            massageBlock.src = massage.loading;
        
            form.append(massageBlock);
        });
    }

    function addThanksModal(message) {
        const dialog = document.querySelector('.modal__dialog');
        dialog.classList.add('hide');

        showModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close">×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        modal.append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();

            dialog.classList.remove('hide');
            removeModal();
        }, 4000);
    }

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

    const slides = document.querySelectorAll('.offer__slide'),
          prevBtn = document.querySelector('.offer__slider-prev'),
          nextBtn = document.querySelector('.offer__slider-next'),
          counter = document.querySelector('#current'),
          total = document.querySelector('#total');

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
});