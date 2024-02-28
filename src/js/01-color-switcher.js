// Se guardan en una variable los selectores del codigo html,
// para el body , el boton de inicio y termino.
const referencia = {
    body: document.querySelector('body'),
    dataStart: document.querySelector('button[data-start]'),
    dataStop: document.querySelector('button[data-stop]'),
};

// Se crea una variable vacia para guardar los datos de cambio de color
// y tiempo.
let tempoId = null;

// Se añaden los "Event Listener" al hacer click en los botones.
referencia.dataStart.addEventListener('click', onBtnStart);
referencia.dataStop.addEventListener('click', onBtnStop);

// Se agrega la funcion de cambio de color random, proporcianda en la 
// tarea.
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

// Funcion que crea el intervalo de 1 seg. para cambiar el color de fondo,
// guardandolo en la variable "tempoId".
// A su vez tambien deshabilita el boton de inicio y habilita el boton 
// de termino.
function onBtnStart() { 
    tempoId = setInterval(() => { 
        referencia.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    referencia.dataStop.removeAttribute('disabled');
    referencia.dataStart.setAttribute('disabled', true);
}

// Funcion que resetea la variable "tempoId"
// A su vez tambien habilita el boton de inicio y deshabilita el boton 
// de termino.
function onBtnStop() { 
    clearInterval(tempoId);
    referencia.dataStart.removeAttribute('disabled');
    referencia.dataStop.setAttribute('disabled', true);
}