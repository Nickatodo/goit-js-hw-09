// Se importan las bibliotecas flatpickr y notiflix
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Funcion "convertMs" entregada en la tarea, para convertir de
// "milisegundos" a "dias, horas, minutos y segundos".
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

// Funcion para añadir un cero con al principio de los valores de 
// un digito, el cual se muestra en el temporizador.
function addLeadingZero(value) { 
  return value.toString().padStart(2, '0');
}

// Se crean las variables para fecha seleccionada, actual y el 
// temporizador.
let selectedDate = new Date();
let currentDate = new Date();
let countTimer = {};

// Se guardan en una variable los selectores del codigo html,
// para el boton y los span de numeros.
const referencia = {
  button: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
}

// Se deshabilita el boton de start.
referencia.button.setAttribute('disabled', true);

// Se ingresan las opciones necesarias para usar flatpickr.
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    if (selectedDate > currentDate) {
      // Se habilita el boton en caso de fecha correcta.
      referencia.button.removeAttribute('disabled');
    } else {
      // Alerta de error, por ingresar una fecha pasada.
      Notiflix.Notify.warning('Seleccione una fecha en el futuro');
    }
  },
};

// Funcion para usar flatpickr.
flatpickr('#datetime-picker', options);

// "Event Listener" al hacer click en el boton.
referencia.button.addEventListener('click', onBtnClick);

// Funcion que inicia el temporizador.
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

// Se configura el temporizador, para añadir un "cero" en caso de 
// ser necesario.
function upDateTime(countTimer) { 
    referencia.days.textContent = addLeadingZero(countTimer.days);
    referencia.hours.textContent = addLeadingZero(countTimer.hours);
    referencia.minutes.textContent = addLeadingZero(countTimer.minutes);
    referencia.seconds.textContent = addLeadingZero(countTimer.seconds);
}