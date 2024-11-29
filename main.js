document.addEventListener('DOMContentLoaded', () => {
    const section1 = document.getElementById('section1');
    const btn_principal = document.getElementById('button1');
    const section2 = document.getElementById('section2');
    const section3 = document.getElementById('section3');
    const section4 = document.getElementById('section4');
    const section5 = document.getElementById('section5');
    const buttonsCategorias = document.querySelectorAll('.btn_categorias');
    const buttonIniciar = document.getElementById('iniciar');
    const palabraSpan = document.getElementById('palabra_a_adivinar');
    const letrasBotones = document.querySelectorAll('#section3 .letras button');
    const imgPlay = document.getElementById('img-play');
    const buttonVolver = document.getElementById('iniciarg'); // Botón "Volver a intentar"
    const buttonVolverPerder = document.getElementById('iniciarP');

    const categorias = {
        aleatorio: ['Celebración', 'Desarmados', 'Importante', 'Energizante', 'Fortaleza', 'Independencia'],
        informatica: ['Programador', 'Desarrollar', 'Conexiones', 'Ciberseguro', 'Protocolos', 'Computadora', 'Autenticación'],
        deporte: ['Baloncesto', 'Futbolista', 'Entrenador', 'Atletismo', 'Ciclismo', 'Básquetbol'],
        musica: ['Guitarrera', 'Compositora', 'Melódicas', 'Instrumento', 'Cantantera', 'Contrabajo', 'Orquestal', 'Sinfónica', 'Pianista', 'Acordeón'],
    };

    const imagenesErrores = [
        'img/img1.png.png',
        'img/img2.png.png',
        'img/img3.png.png',
        'img/img4.png.png',
        'img/img5.png.png',
        'img/img6.png.png',
        'img/img7.png.png',
    ];

    let categoriaSeleccionada = null;
    let palabraSeleccionada = null;
    let errores = 0;

    // Navegar a sección 2 (cuando se hace clic en "Iniciar Juego")
    btn_principal.addEventListener('click', () => {
        section1.style.display = 'none'; // Ocultar sección 1
        section2.style.display = 'block'; // Mostrar sección 2
    });

    // Selección de categorías
    buttonsCategorias.forEach(button => {
        button.addEventListener('click', () => {
            buttonsCategorias.forEach(btn => btn.style.border = 'none');
            button.style.border = '1px solid black';
            categoriaSeleccionada = button.id.replace('btn_', '');
        });
    });

    // Iniciar juego
    buttonIniciar.addEventListener('click', () => {
        if (!categoriaSeleccionada) {
            alert('Por favor, selecciona una categoría antes de iniciar :)');
            return;
        }

        // Reiniciar variables
        errores = 0;
        imgPlay.src = imagenesErrores[0]; // Imagen inicial
        palabraSpan.innerHTML = ''; // Limpiar palabra a adivinar

        // Seleccionar una palabra aleatoria
        const palabras = categorias[categoriaSeleccionada];
        palabraSeleccionada = palabras[Math.floor(Math.random() * palabras.length)].toUpperCase();
        console.log('Palabra seleccionada:', palabraSeleccionada);

        palabraSpan.innerHTML = palabraSeleccionada
            .split('')
            .map(char => char === ' ' ? '&nbsp;' : '_')
            .map(char => `<span>${char}</span>`)
            .join(''); // Generar palabra con guiones bajos

        // Cambiar de sección: Ocultar sección 2 y mostrar la sección 3
        section2.style.display = 'none'; // Ocultar sección 2
        section3.style.display = 'block'; // Mostrar sección 3
        section4.style.display = 'none';
        section5.style.display = 'none';

        // Habilitar nuevamente los botones de letras
        letrasBotones.forEach(button => {
            button.disabled = false;
            button.style.backgroundColor = ''; // Restablecer color
        });
    });

    // Manejo de clic en las letras
    letrasBotones.forEach(button => {
        button.addEventListener('click', () => {
            const letra = button.textContent.toUpperCase();
            button.disabled = true;
            console.log('Letra presionada:', letra);

            if (palabraSeleccionada.includes(letra)) {
                button.style.backgroundColor = 'green';

                const spans = palabraSpan.querySelectorAll('span');
                palabraSeleccionada.split('').forEach((char, index) => {
                    if (char === letra) {
                        spans[index].textContent = letra;
                    }
                });

                // Verifica si la palabra fue completamente adivinada
                if (![...palabraSpan.querySelectorAll('span')].some(span => span.textContent === '_')) {
                    section3.style.display = 'none';
                    section4.style.display = 'block'; // section de ganaste!
                }

            } else {
                button.style.backgroundColor = 'red';

                // Incrementar errores y actualizar imagen
                errores++;
                if (errores < imagenesErrores.length) {
                    imgPlay.src = imagenesErrores[errores]; // Cambiar imagen según el error
                } else {
                    section3.style.display = 'none';
                    section5.style.display = 'block'; // Muestra sección de derrota
                }
            }
        });
    });
    // Manejo de clic para reiniciar el juego
buttonVolverPerder.addEventListener('click', () => {
    // Resetear el juego
    section3.style.display = 'none';
    section4.style.display = 'none';
    section5.style.display = 'none';
    section2.style.display = 'block'; // Mostrar la sección de selección de categoría

    // Limpiar los estados
    categoriaSeleccionada = null;
    palabraSeleccionada = null;
    errores = 0;

    // Limpiar la palabra a adivinar
    palabraSpan.innerHTML = '';

    // Habilitar todos los botones de letras nuevamente
    letrasBotones.forEach(button => {
        button.disabled = false;
        button.style.backgroundColor = ''; // Restablecer el color de los botones
    });
});
  
    // Volver a intentar
    buttonVolver.addEventListener('click', () => {
        // Resetear el juego
        section3.style.display = 'none';
        section4.style.display = 'none';
        section5.style.display = 'none';
        section2.style.display = 'block'; // Mostrar la sección de selección de categoría

        // Limpiar los estados
        categoriaSeleccionada = null;
        palabraSeleccionada = null;
        errores = 0;

        // Limpiar la palabra a adivinar
        palabraSpan.innerHTML = '';

        // Habilitar todos los botones de letras nuevamente
        letrasBotones.forEach(button => {
            button.disabled = false;
            button.style.backgroundColor = ''; // Restablecer el color de los botones
        });
    });
});
