const canvas = document.getElementById("fuegos");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let particles = [];
function firework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height / 2;
  for (let i = 0; i < 40; i++) {
    particles.push({
      x, y,
      vx:(Math.random()-0.5)*4,
      vy:(Math.random()-0.5)*4,
      a:1,
      c:`hsl(${Math.random()*360},100%,60%)`
    });
  }
}
function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particles.forEach((p,i)=>{
    ctx.fillStyle=p.c;
    ctx.globalAlpha=p.a;
    ctx.beginPath();
    ctx.arc(p.x,p.y,3,0,Math.PI*2);
    ctx.fill();
    p.x+=p.vx;
    p.y+=p.vy;
    p.a-=0.015;
    if(p.a<=0) particles.splice(i,1);
  });
  requestAnimationFrame(animate);
}

const mensajes = {
  es: {
    titulo:"¡Adiós, 2025!",
    destino:"¿Para quién es esta carta?",
    amigos:"Amigos",
    conocidos:"Conocidos",
    boton:"Despedir el año",
    textoAmigos:`Si estás leyendo esto, es porque fuiste parte de mi 2025...\n\nGracias por estar, por sumar, por acompañar.\n\nQue el 2026 nos encuentre más fuertes y más tranquilos.\n\nFeliz Año Nuevo 🎉`,
    textoConocidos:`El 2025 se despide y quería dejar un pequeño mensaje.\n\nGracias por compartir este tiempo en el mundo conmigo.\n\nQue el 2026 venga con calma y buenas oportunidades.\n\nFeliz Año Nuevo 🎉`
  },
  en: {
    titulo:"Goodbye, 2025!",
    destino:"Who is this letter for?",
    amigos:"Friends",
    conocidos:"Acquaintances",
    boton:"Farewell the year",
    textoAmigos:`If you are reading this, you were part of my 2025...\n\nThank you for being there.\n\nMay 2026 be kinder.\n\nHappy New Year 🎉`,
    textoConocidos:`2025 is ending and I wanted to say thank you.\n\nMay 2026 bring peace and good moments.\n\nHappy New Year 🎉`
  },
  de: {
    titulo:"Auf Wiedersehen, 2025!",
    destino:"Für wen ist dieser Brief?",
    amigos:"Freunde",
    conocidos:"Bekannte",
    boton:"Jahr verabschieden",
    textoAmigos:`Wenn du das liest, warst du Teil meines 2025...\n\nDanke fürs Dasein.\n\nFrohes neues Jahr 🎉`,
    textoConocidos:`2025 geht zu Ende.\n\nDanke für diese gemeinsame Zeit.\n\nFrohes neues Jahr 🎉`
  }
};

let idioma;

const inicio = document.getElementById("inicio");
const selectorIdioma = document.getElementById("selectorIdioma");
const selectorDestino = document.getElementById("selectorDestinatario");
const pregunta = document.getElementById("preguntaDestino");
const carta = document.getElementById("carta");
const mensaje = document.getElementById("mensaje");

document.querySelectorAll("#selectorIdioma button").forEach(b=>{
  b.onclick=()=>{
    idioma = mensajes[b.dataset.idioma];
    selectorIdioma.style.display="none";
    selectorDestino.style.display="flex";
    pregunta.textContent = idioma.destino;
    btnAmigos.textContent = idioma.amigos;
    btnConocidos.textContent = idioma.conocidos;
  };
});

btnAmigos.onclick=()=>mostrarCarta(idioma.textoAmigos);
btnConocidos.onclick=()=>mostrarCarta(idioma.textoConocidos);

function mostrarCarta(texto){
  inicio.style.display="none";
  carta.style.display="block";
  canvas.style.display="block";
  animate();
  setInterval(firework,800);
  document.getElementById("tituloCarta").textContent=idioma.titulo;
  despedirBtn.textContent=idioma.boton;
  document.body.style.overflow="auto";
  mostrarParrafos(texto);
}

function mostrarParrafos(texto){
  mensaje.innerHTML="";
  texto.split("\n\n").forEach((t,i)=>{
    const p=document.createElement("p");
    p.textContent=t;
    p.style.animation=`aparecer .6s ease forwards`;
    p.style.animationDelay=`${i*0.6}s`;
    mensaje.appendChild(p);
  });
}
