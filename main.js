const listaDePalabras = ["javascript", "desarrollar", "aplicacion", "programar", "informacion"]
let palabraOriginal = elegirPalabraAleatoria(); //palabra_a_Adivinar
const palabraOculta = Array(palabraOriginal.length).fill("_"); //representacion inicial de la palabra
let intentos = 0; //contador de intentos
const maxIntentos = 8; //maximos intentos

    

//selecciond de elemntos
const palabraAdivinar = document.getElementById('palabra_a_adivinar');
const botones = document.querySelectorAll('.letras button');
const imagen  = document.getElementById('imagen');
const botonReiniciar = document.getElementById('reiniciar');

function click () {
    
}


function elegirPalabraAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * listaDePalabras.length);
    return listaDePalabras[indiceAleatorio];
}


//mostrar palabra oculta
function actualizarPalabra () {
    palabraAdivinar.innerHTML = palabraOculta.map(letra => `<span>${letra}</span>`).join("");
}

//comprobar si la letra esta en la palabra
function verificarLetra (letra, boton) {
    let acierto = false;

    palabraOriginal.split("").forEach((char,index) => {
        if(char.toLowerCase() === letra.toLowerCase()) {
            palabraOculta[index] = char;
            acierto = true;
        }
    });
    actualizarPalabra();
    if(acierto) {
        boton.style.backgroundColor = 'green';
    } else {
        boton.style.backgroundColor = 'red';
        intentos++;
        actualizarImagen();
    }
    boton.disabled = 'true';
    verificarResultado();
}


function actualizarImagen() {
    // Generar la ruta correcta de la imagen basada en el número de intentos
    if (intentos <= maxIntentos) {
        imagen.src =  `img/img${intentos + 1}.png.png` // Cambiar la imagen según el intento
        console.log("Imagen cambiada a:", imagen.src); 
    } else {
        console.log("Número de intentos fuera del rango permitido.");
    }
}


function verificarResultado() {
    if(!palabraOculta.includes("_")) {
        alert("Felicitaciones ganaste!!!");
        desactivarBotones();
    } else if(intentos >= maxIntentos) {
        alert("Lo siento, perdiste");
        desactivarBotones();
    }
}

function desactivarBotones() {
    botones.forEach(boton => (boton.disabled = true));
  }

  function reiniciarJUego() {
    palabraOriginal = elegirPalabraAleatoria();
    palabraOculta.length = 0;
    palabraOculta.push(...Array(palabraOriginal.length).fill("_"));
    intentos = 0;
    imagen.src = "img/img1.png.png";
    actualizarPalabra();
   
  

  botones.forEach(boton => {
    boton.disabled = false;
    boton.style.backgroundColor='';
  });
}

botonReiniciar.addEventListener('click', reiniciarJUego);

  botones.forEach(boton => {
    boton.addEventListener("click", () => verificarLetra(boton.textContent, boton));
  });

  actualizarPalabra();
