const canvas = document.getElementById("fuegos");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

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

const textos = {
  es: {
    pregunta: "¿Para quién es esta carta?",
    amigos: "Amigos",
    conocidos: "Conocidos",
    titulo: "¡Adiós, 2025!",
    a: `Si estás leyendo esto, fuiste parte de mi 2025.\n\nGracias por estar.\n\nFeliz Año Nuevo 🎉`,
    c: `El 2025 se despide.\n\nGracias por compartir este tiempo.\n\nFeliz Año Nuevo 🎉`
  },
  en: {
    pregunta: "Who is this for?",
    amigos: "Friends",
    conocidos: "Acquaintances",
    titulo: "Goodbye, 2025!",
    a: `If you're reading this, you were part of my 2025.\n\nThank you.\n\nHappy New Year 🎉`,
    c: `2025 is ending.\n\nThanks for sharing this time.\n\nHappy New Year 🎉`
  },
  de: {
    pregunta: "Für wen ist das?",
    amigos: "Freunde",
    conocidos: "Bekannte",
    titulo: "Auf Wiedersehen, 2025!",
    a: `Wenn du das liest, warst du Teil meines 2025.\n\nDanke.\n\nFrohes neues Jahr 🎉`,
    c: `2025 endet.\n\nDanke für diese Zeit.\n\nFrohes neues Jahr 🎉`
  }
};

const bloqueIdioma = document.getElementById("bloque-idioma");
const bloqueDestino = document.getElementById("bloque-destino");
const pregunta = document.getElementById("pregunta");
const carta = document.getElementById("carta");
const titulo = document.getElementById("titulo");
const texto = document.getElementById("texto");

let lang;

document.querySelectorAll("[data-lang]").forEach(b=>{
  b.onclick = ()=>{
    lang = textos[b.dataset.lang];
    bloqueIdioma.style.display = "none";
    bloqueDestino.style.display = "block";
    pregunta.textContent = lang.pregunta;
    btnAmigos.textContent = lang.amigos;
    btnConocidos.textContent = lang.conocidos;
  };
});

btnAmigos.onclick = ()=>mostrarCarta(lang.a);
btnConocidos.onclick = ()=>mostrarCarta(lang.c);

function mostrarCarta(t){
  document.getElementById("pantalla").style.display = "none";
  carta.style.display = "block";
  titulo.textContent = lang.titulo;
  texto.innerHTML = "";
  t.split("\n\n").forEach(p=>{
    const el = document.createElement("p");
    el.textContent = p;
    texto.appendChild(el);
  });
  canvas.style.display = "block";
  animate();
  setInterval(firework, 900);
  document.body.style.overflow = "auto";
}
