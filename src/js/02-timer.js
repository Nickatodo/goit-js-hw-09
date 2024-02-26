import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) { 
    return value.toString().padStart(2, '0');
}

let selectedDate = new Date();
let currentDate = new Date();
let countTimer = {};

const referencia = {
    button: document.querySelector('button[data-start]'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
}

referencia.button.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    if (selectedDate > currentDate) {
      referencia.button.removeAttribute('disabled');
    } else {
      Notiflix.Notify.warning('"Seleccione una fecha en el futuro');
    }
  },
};

flatpickr('#datatime-picker', options);

referencia.button.addEventListener('click', onBtnClick);

function onBtnClick() { 
    const timerId = setInterval(() => { 
        currentDate = new Date();
        console.log(currentDate);
        if (currentDate < selectedDate) {
            console.log(selectedDate - currentDate);
            countTimer = convertMs(selectedDate - currentDate);
            upDateTime(countTimer);
            referencia.button.setAttribute('disabled', true);
        } else {
            clearInterval(timerId);
        }
    }, 1000);
}

function upDateTime(countTimer) { 
    referencia.days.textContent = addLeadingZero(countTimer.days);
    referencia.hours.textContent = addLeadingZero(countTimer.hours);
    referencia.minutes.textContent = addLeadingZero(countTimer.minutes);
    referencia.seconds.textContent = addLeadingZero(countTimer.seconds);
}