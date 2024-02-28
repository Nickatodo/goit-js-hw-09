// Se importan la libreria notiflix.
import Notiflix from 'notiflix';

// Se guarda en una variable el selector de html, con la clase form.
const form = document.querySelector('.form');

// Se añade el "Event Listener" al enviar el formulario.
form.addEventListener('submit', OnFormSubmit);

// Funcion proporcionada en la tarea, para crear las promesas.
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Funcion usada al enviar el formulario.
function OnFormSubmit(e) { 
  e.preventDefault();

  // Se crean las variables, para los datos recibidos del formulario.
  let delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  // Ciclo for para crear las promesas requeridas.
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        // Promesa creada con exito.
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        // Promesa rechazada.
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}
