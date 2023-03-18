import {getData} from '../services/services';

function card(url, classBlock, parentElem) {
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
      
    getData(url)
        .then(data => {
          data.forEach(({ img, title, descr: text, price, altimg: alt }) => {
            new AddNewCard(img, title, text, price, alt, parentElem, classBlock).render();
        });
    });
}

export default card;