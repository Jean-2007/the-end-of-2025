const inicio = document.getElementById("inicio");
const selectorIdioma = document.getElementById("selectorIdioma");
const selectorDestino = document.getElementById("selectorDestino");
const pregunta = document.getElementById("pregunta");
const btnAmigos = document.getElementById("btnAmigos");
const btnConocidos = document.getElementById("btnConocidos");
const contenido = document.getElementById("contenido");
const canvas = document.getElementById("fuegos");
const ctx = canvas.getContext("2d");

let idiomaActual = null;

/* ================= MENSAJES ================= */

const mensajes = {
  es: {
    destino: "¿Qué somos?",
    amigos: "Amigos",
    conocidos: "Conocidos",

    amigosTexto: `
      <h1>¡Adiós, 2025!</h1>

      <p>Si estás leyendo esto, es porque de alguna forma fuiste parte de mi 2025.
      Tal vez estuvimos cerca, tal vez no tanto, pero en algún punto compartimos
      tiempo, palabras, risas, silencios o simplemente presencia. Y eso ya cuenta.</p>

      <p>Este año fue intenso. A ratos bonito, a ratos caótico, a ratos agotador.
      No siempre salió todo bien, no siempre supimos qué hacer,
      pero aquí estamos, llegando al final, que no es poca cosa.</p>

      <p>Quería despedir el año diciendo gracias.
      Gracias por estar, por sumar, por acompañar de la forma que pudiste
      y también por enseñarme cosas, incluso sin darte cuenta.
      Cada persona deja algo, aunque no lo sepa.</p>

      <p>Ahora toca cerrar este capítulo y darle espacio al siguiente.
      Que el 2026 nos trate mejor, o al menos que nos encuentre más fuertes,
      más tranquilos y un poco más fieles a lo que somos.</p>

      <p>Te deseo un año con risas reales, decisiones valientes
      y momentos que valgan la pena recordar.</p>

      <p><strong>Feliz Año Nuevo 🎉</strong></p>
    `,

    conocidosTexto: `
      <h1>¡Adiós, 2025!</h1>

      <p>El 2025 está por despedirse, y quería tomar un momento para reconocer
      que fue un año de todo un poco: desafíos, aprendizajes, risas y cambios.</p>

      <p>Aunque no nos conozcamos demasiado, de alguna forma formaste parte de este año
      y eso ya merece un pequeño agradecimiento.</p>

      <p>Que el 2026 nos encuentre más fuertes, con nuevas oportunidades
      y suficientes momentos que nos hagan sonreír de verdad.</p>

      <p>Gracias por estar, aunque sea de forma lejana,
      y por compartir este tiempo en el mundo conmigo.</p>

      <p><strong>Feliz Año Nuevo 🎉</strong></p>
    `
  },

  en: {
    destino: "What are we?",
    amigos: "Friends",
    conocidos: "Acquaintances",

    amigosTexto: `
      <h1>Goodbye, 2025</h1>

      <p>If you’re reading this, it means you were part of my 2025 in some way.
      Maybe closely, maybe from a distance, but at some point we shared time,
      words, laughter, silence, or simply presence. And that already matters.</p>

      <p>This year was intense. Sometimes beautiful, sometimes chaotic,
      sometimes exhausting. Not everything went right,
      but here we are, reaching the end. That counts.</p>

      <p>Thank you for being there, for adding something,
      even if you didn’t realize it.</p>

      <p>May 2026 treat us better, or at least find us stronger,
      calmer, and more honest with ourselves.</p>

      <p><strong>Happy New Year 🎉</strong></p>
    `,

    conocidosTexto: `
      <h1>Goodbye, 2025</h1>

      <p>As 2025 comes to an end, I wanted to take a moment to acknowledge
      that it was a year full of challenges, learning, laughter, and change.</p>

      <p>Even if we don’t know each other well,
      you were still part of this year in some way,
      and that deserves a small thank you.</p>

      <p>May 2026 bring strength, new opportunities,
      and moments that genuinely make us smile.</p>

      <p><strong>Happy New Year 🎉</strong></p>
    `
  },

  de: {
    destino: "Was sind wir?",
    amigos: "Freunde",
    conocidos: "Bekannte",

    amigosTexto: `
      <h1>Auf Wiedersehen, 2025</h1>

      <p>Wenn du das liest, warst du auf die eine oder andere Weise Teil meines Jahres.
      Vielleicht nah, vielleicht eher aus der Ferne,
      aber wir haben Zeit, Worte oder Momente geteilt.</p>

      <p>Dieses Jahr war intensiv. Manchmal schön,
      manchmal chaotisch, manchmal anstrengend.
      Nicht alles lief gut, aber wir sind hier.</p>

      <p>Danke fürs Dasein, fürs Mitgehen
      und für alles, was du beigetragen hast.</p>

      <p><strong>Frohes neues Jahr 🎉</strong></p>
    `,

    conocidosTexto: `
      <h1>Auf Wiedersehen, 2025</h1>

      <p>Das Jahr neigt sich dem Ende zu,
      und ich wollte kurz innehalten und Danke sagen.</p>

      <p>Auch wenn wir uns nicht besonders gut kennen,
      warst du Teil dieses Jahres.</p>

      <p>Möge 2026 neue Chancen, Ruhe
      und echte schöne Momente bringen.</p>

      <p><strong>Frohes neues Jahr 🎉</strong></p>
    `
  }
};

/* ================= LÓGICA ================= */

document.querySelectorAll("#selectorIdioma button").forEach(b => {
  b.onclick = () => {
    idiomaActual = mensajes[b.dataset.idioma];

    document.getElementById("tituloIdioma").remove();
    selectorIdioma.style.display = "none";

    pregunta.textContent = idiomaActual.destino;
    btnAmigos.textContent = idiomaActual.amigos;
    btnConocidos.textContent = idiomaActual.conocidos;
    selectorDestino.classList.remove("oculto");
  };
});

btnAmigos.onclick = () => mostrarMensaje(idiomaActual.amigosTexto);
btnConocidos.onclick = () => mostrarMensaje(idiomaActual.conocidosTexto);

function mostrarMensaje(texto) {
  inicio.style.display = "none";
  contenido.innerHTML = texto;
  iniciarFuegos();
}

/* ================= FUEGOS ================= */

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

let particles = [];

function iniciarFuegos() {
  canvas.style.display = "block";
  setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    for (let i = 0; i < 40; i++) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        life: 100
      });
    }
  }, 800);
  animate();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx;
    p.y += p.vy;
    p.life--;
    ctx.fillStyle = "white";
    ctx.fillRect(p.x, p.y, 2, 2);
    if (p.life <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
