function getZero(item) {
    if(item >= 0 && item < 10) {
        return `0${item}`;
    } else {
        return item;
    }
}

function timer(deadLine) {

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
}

export default timer;
export {getZero};