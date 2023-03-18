function calc() {
    function pasteDataInCalc() {
        function dataForEach(data) {
            const items = document.querySelectorAll(data);

            items.forEach(item => {
                item.classList.remove('calculating__choose-item_active');
    
                if(item.getAttribute('data-gender') == sex) {       
                    sex = item.getAttribute('data-gender');
                    
                    item.classList.add('calculating__choose-item_active');
                } else if (item.getAttribute('data-datalis') == activity) {  
                    activity = item.getAttribute('data-datalis');
                    
                    item.classList.add('calculating__choose-item_active');
                }
            });
        }
        
        dataForEach('#gender .calculating__choose-item');
        dataForEach('.calculating__choose_big .calculating__choose-item');

        caloriesInputs.forEach(input => { 
            if(input.getAttribute('id') == 'height') {
                input.value = localStorage.getItem('height');
            } else if(input.getAttribute('id') == 'weight') {
                input.value = localStorage.getItem('weight');
            } else if(input.getAttribute('id') == 'age') {
                input.value = localStorage.getItem('age');
            }
        });
    }

    const res = document.querySelector('.calculating__result span'),
          caloriesInputs = document.querySelectorAll('.calculating__field input');
    let sex, height, weight, age, activity;

    if(localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');

        pasteDataInCalc();
    } else {
        localStorage.setItem('sex', 'woman');
        
        sex = localStorage.getItem('sex');
    }

    if(localStorage.getItem('height')) {
        height = localStorage.getItem('height');

        pasteDataInCalc();
    } 
       
    if(localStorage.getItem('weight')) {
        weight = localStorage.getItem('weight');

        pasteDataInCalc();
    }   
     
    if(localStorage.getItem('age')) {
        age = localStorage.getItem('age');

        pasteDataInCalc();
    }

    if(localStorage.getItem('activity')) {
        activity = localStorage.getItem('activity');

        pasteDataInCalc();
    } else {
        localStorage.setItem('activity', 1.375);

        activity = localStorage.getItem('activity');
    }
    
    function getTotalCal() {
        if(!sex || !height || !weight || !age || !activity) {
            res.innerHTML = '___';
            return;
        }

        if (sex == 'man') {
            res.innerHTML = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * activity);
        } else {
            res.innerHTML = Math.round((447.6  + (9.2  * weight) + (3.1 * height) - (4.3 * age)) * activity);
        }
    }

    getTotalCal();

    caloriesInputs.forEach(input => {
        input.addEventListener('input', () => {
            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            if(input.getAttribute('id') == 'height') {
                localStorage.setItem('height', +input.value);

                height = +input.value;
            } else if(input.getAttribute('id') == 'weight') {
                localStorage.setItem('weight', +input.value);

                weight = +input.value;
            } else if(input.getAttribute('id') == 'age') {
                localStorage.setItem('age', +input.value);

                age = +input.value;
            }
            getTotalCal();
        });
    });

    function getDataAbautPersonCal(nodeList) {
        const items = document.querySelectorAll(nodeList);

        items.forEach(item => {
            item.addEventListener('click', (e) => {
                items.forEach(item => {
                    item.classList.remove('calculating__choose-item_active');
                });

                item.classList.add('calculating__choose-item_active');

                if(item.getAttribute('data-gender')) {
                    localStorage.setItem('sex', item.getAttribute('data-gender'));

                    sex = item.getAttribute('data-gender');
                } else {
                    localStorage.setItem('activity', item.getAttribute('data-datalis'));

                    activity = item.getAttribute('data-datalis');
                }
                getTotalCal();
            });
        });
    }

    getDataAbautPersonCal('#gender .calculating__choose-item');
    getDataAbautPersonCal('.calculating__choose_big .calculating__choose-item');
}

export default calc;