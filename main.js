const preguntas = [
  {
    pregunta: "¿Qué es el phishing?",
    opciones: [
      "Un videojuego online",
      "Una técnica de ataque para robar información",
      "Una herramienta de seguridad",
    ],
    correcta: 1,
  },
  {
    pregunta: "¿Qué significa 2FA?",
    opciones: [
      "Autenticación en dos factores",
      "Una contraseña fuerte",
      "Un software antivirus",
    ],
    correcta: 0,
  },
  {
    pregunta: "¿Por qué es importante actualizar el sistema operativo?",
    opciones: [
      "Para mejorar la velocidad del dispositivo",
      "Para recibir parches de seguridad",
      "Para cambiar el fondo de pantalla",
    ],
    correcta: 1,
  },
];

let indicePregunta = 0;

const modalBody = document.getElementById("modalBodyTest");
const btnVerificar = document.getElementById("btnVerificar");

function mostrarPregunta() {
  const p = preguntas[indicePregunta];
  let html = `<p>${p.pregunta}</p><select id="respuestaTest" class="form-select">`;
  p.opciones.forEach((opcion, i) => {
    html += `<option value="${i}">${opcion}</option>`;
  });
  html += `</select><div id="feedbackTest" class="mt-3"></div>`;
  modalBody.innerHTML = html;
}

function verificarRespuesta() {
  const select = document.getElementById("respuestaTest");
  const feedback = document.getElementById("feedbackTest");
  const respuestaSeleccionada = parseInt(select.value);
  const correcta = preguntas[indicePregunta].correcta;

  if (respuestaSeleccionada === correcta) {
    feedback.innerHTML = "<span class='text-success'>¡Correcto!</span>";
    indicePregunta++;
    if (indicePregunta < preguntas.length) {
      btnVerificar.disabled = true;
      setTimeout(() => {
        mostrarPregunta();
        btnVerificar.disabled = false;
      }, 1500);
    } else {
      modalBody.innerHTML = "<p>¡Has finalizado el test!</p>";
      btnVerificar.style.display = "none";
    }
  } else {
    feedback.innerHTML =
      "<span class='text-danger'>Incorrecto. Intenta de nuevo.</span>";
  }
}

btnVerificar.addEventListener("click", verificarRespuesta);

// Cada vez que se abre el modal, reiniciamos el test
document.getElementById("modalTest").addEventListener("show.bs.modal", () => {
  indicePregunta = 0;
  btnVerificar.style.display = "inline-block";
  btnVerificar.disabled = false;
  mostrarPregunta();
});
