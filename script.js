// Canvas fuegos artificiales
const canvas = document.getElementById('fuegos');
const ctx = canvas.getContext('2d');
function resizeCanvas(){canvas.width=window.innerWidth; canvas.height=window.innerHeight;}
window.addEventListener('resize',resizeCanvas);
resizeCanvas();

let particles=[];
function crearFuego(){
    const x=Math.random()*canvas.width;
    const y=Math.random()*canvas.height/2;
    const colores=['#ff4081','#fdd835','#00e5ff','#76ff03','#ff6d00'];
    for(let i=0;i<50;i++){
        particles.push({x:x,y:y,vx:(Math.random()-0.5)*4,vy:(Math.random()-0.5)*4,color:colores[Math.floor(Math.random()*colores.length)],alpha:1,size:2+Math.random()*3});
    }
}
function animarFuegos(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach((p,i)=>{
        ctx.globalAlpha=p.alpha;
        ctx.fillStyle=p.color;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
        p.x+=p.vx; p.y+=p.vy; p.alpha-=0.01;
        if(p.alpha<=0) particles.splice(i,1);
    });
    requestAnimationFrame(animarFuegos);
}
setInterval(crearFuego,800);
animarFuegos();

// Mensajes en varios idiomas
const mensajes = {
    es:{
        amigos:`Si estás leyendo esto, es porque de alguna forma fuiste parte de mi 2025.\n\nTal vez estuvimos cerca, tal vez no tanto, pero en algún punto compartimos tiempo, palabras, risas, silencios o simplemente presencia. Y eso ya cuenta.\n\nEste año fue intenso. A ratos bonito, a ratos caótico, a ratos agotador. No siempre salió todo bien, no siempre supimos qué hacer, pero aquí estamos, llegando al final, que no es poca cosa.\n\nQuería despedir el año diciendo gracias. Gracias por estar, por sumar, por acompañar de la forma que pudiste y también por enseñarme cosas, incluso sin darte cuenta. Cada persona deja algo, aunque no lo sepa.\n\nAhora toca cerrar este capítulo y darle espacio al siguiente. Que el 2026 nos trate mejor, o al menos que nos encuentre más fuertes, más tranquilos y un poco más fieles a lo que somos.\n\nTe deseo un año con risas reales, decisiones valientes y momentos que valgan la pena recordar. Cuídate mucho, de verdad. Feliz Año Nuevo. 🎉`,
        conocidos:`Hola, el 2025 está por despedirse, y quería tomar un momento para reconocer que fue un año de todo un poco: desafíos, aprendizajes, risas y cambios.\n\nAunque no nos conozcamos demasiado, de alguna forma formaste parte de este año y eso ya merece un pequeño agradecimiento.\n\nQue el 2026 nos encuentre más fuertes, con nuevas oportunidades y suficientes momentos que nos hagan sonreír de verdad. Gracias por estar, aunque sea de forma lejana, y por compartir este tiempo en el mundo conmigo.\n\nFeliz Año Nuevo 🎉`,
        destino: "¿Para quién es esta carta?",
        amigosBtn: "Amigos",
        conocidosBtn: "Conocidos",
        despedirBtn: "Despedir Año con Estilo",
        titulo: "¡Adiós, 2025!"
    },
    en:{
        amigos:`If you are reading this, it means you were part of my 2025.\n\nMaybe we were close, maybe not so much, but at some point we shared time, words, laughter, silence or simply presence. And that already counts.\n\nThis year was intense. Sometimes beautiful, sometimes chaotic, sometimes exhausting. Not everything went well, not always knew what to do, but here we are, reaching the end, which is not little.\n\nI wanted to say thank you. Thank you for being there, for adding, for accompanying in the way you could, and also for teaching me things, even without realizing it. Every person leaves something, even if they don't know it.\n\nNow it's time to close this chapter and give space to the next. May 2026 treat us better, or at least find us stronger, calmer, and a little more true to ourselves.\n\nI wish you a year with real laughter, brave decisions and moments worth remembering. Take care of yourself. Happy New Year 🎉`,
        conocidos:`Hello, 2025 is about to end, and I wanted to take a moment to acknowledge it was a year of everything: challenges, learning, laughter, and changes.\n\nEven if we don't know each other very well, in some way you were part of this year and that deserves a little thanks.\n\nMay 2026 find us stronger, with new opportunities and enough moments that make us truly smile. Thanks for being there, even from afar, and for sharing this time in the world with me.\n\nHappy New Year 🎉`,
        destino: "Who is this letter for?",
        amigosBtn: "Friends",
        conocidosBtn: "Acquaintances",
        despedirBtn: "Farewell Year in Style",
        titulo: "Goodbye, 2025!"
    },
    de:{
        amigos:`Wenn du das liest, warst du auf die eine oder andere Weise Teil meines 2025.\n\nVielleicht waren wir nah, vielleicht nicht, aber an einem Punkt haben wir Zeit, Worte, Lachen, Stille oder einfach Präsenz geteilt. Und das zählt schon.\n\nDieses Jahr war intensiv. Manchmal schön, manchmal chaotisch, manchmal erschöpfend. Nicht immer lief alles gut, nicht immer wussten wir, was zu tun war, aber hier sind wir, am Ende angekommen, was nicht wenig ist.\n\nIch wollte mich bedanken. Danke, dass du da warst, dass du beigetragen hast, dass du auf die Weise begleitet hast, wie du konntest, und auch dafür, dass du mir Dinge beigebracht hast, selbst ohne es zu merken. Jede Person hinterlässt etwas, auch wenn sie es nicht weiß.\n\nJetzt ist es Zeit, dieses Kapitel zu schließen und dem nächsten Platz zu geben. Möge 2026 uns besser behandeln oder uns zumindest stärker, ruhiger und ein wenig treuer zu uns selbst finden.\n\nIch wünsche dir ein Jahr mit echtem Lachen, mutigen Entscheidungen und Momenten, die es wert sind, sich zu erinnern. Pass gut auf dich auf. Frohes Neues Jahr 🎉`,
        conocidos:`Hallo, 2025 neigt sich dem Ende zu, und ich wollte einen Moment innehalten, um anzuerkennen, dass es ein Jahr voller Herausforderungen, Lernen, Lachen und Veränderungen war.\n\nAuch wenn wir uns nicht sehr gut kennen, warst du auf die eine oder andere Weise Teil dieses Jahres, und das verdient ein kleines Dankeschön.\n\nMöge 2026 uns stärker finden, mit neuen Möglichkeiten und genügend Momenten, die uns wirklich zum Lächeln bringen. Danke, dass du da warst, auch aus der Ferne, und dass du diese Zeit der Welt mit mir geteilt hast.\n\nFrohes Neues Jahr 🎉`,
        destino: "Für wen ist dieser Brief?",
        amigosBtn: "Freunde",
        conocidosBtn: "Bekannte",
        despedirBtn: "Jahr stilvoll verabschieden",
        titulo: "Auf Wiedersehen, 2025!"
    }
};

const inicio=document.getElementById('inicio');
const selectorIdioma=document.getElementById('selectorIdioma');
const selectorDest=document.getElementById('selectorDestinatario');
const preguntaDestino=document.getElementById('preguntaDestino');
const btnAmigos=document.getElementById('btnAmigos');
const btnConocidos=document.getElementById('btnConocidos');
const carta=document.getElementById('carta');
const mensaje=document.getElementById('mensaje');
const btn=document.getElementById('despedirBtn');

let idiomaSeleccionado = 'es'; // predeterminado

// Selección de idioma
selectorIdioma.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
        idiomaSeleccionado = btn.getAttribute('data-idioma');
        selectorIdioma.style.display='none';
        selectorDest.style.display='flex';
        preguntaDestino.textContent = mensajes[idiomaSeleccionado].destino;
        btnAmigos.textContent = mensajes[idiomaSeleccionado].amigosBtn;
        btnConocidos.textContent = mensajes[idiomaSeleccionado].conocidosBtn;
        btn.textContent = mensajes[idiomaSeleccionado].despedirBtn;
        document.getElementById('tituloCarta').textContent = mensajes[idiomaSeleccionado].titulo;
    });
});

// Elección destinatario
btnAmigos.addEventListener('click', ()=>{
    selectorDest.style.display='none';
    carta.style.display='block';
    document.body.style.overflow='auto';
    mostrarParrafos(mensajes[idiomaSeleccionado].amigos, mensaje);
});
btnConocidos.addEventListener('click', ()=>{
    selectorDest.style.display='none';
    carta.style.display='block';
    document.body.style.overflow='auto';
    mostrarParrafos(mensajes[idiomaSeleccionado].conocidos, mensaje);
});

// Mostrar párrafos animados
function mostrarParrafos(texto, elemento, callback){
    elemento.innerHTML="";
    const parrafos=texto.split("\n\n");
    let i=0;
    function mostrarSiguiente(){
        if(i>=parrafos.length){if(callback)callback(); return;}
        const p=document.createElement("p");
        p.textContent=parrafos[i].trim();
        elemento.appendChild(p);
        p.style.animation="aparecerParrafo 0.8s ease forwards";
        i++;
        setTimeout(mostrarSiguiente,900);
    }
    mostrarSiguiente();
}

// Confeti y emojis
function lanzarConfeti(){
    for(let i=0;i<50;i++){
        const conf=document.createElement('div');
        conf.classList.add('confeti');
        conf.style.left=Math.random()*window.innerWidth+'px';
        conf.style.width=conf.style.height=(5+Math.random()*10)+'px';
        conf.style.background=`hsl(${Math.random()*360},90%,60%)`;
        document.body.appendChild(conf);
        moverElemento(conf);
    }
    for(let i=0;i<10;i++){
        const emoji=document.createElement('div');
        emoji.classList.add('emoji');
        emoji.textContent=['🎉','🥳','✨','🎆'][Math.floor(Math.random()*4)];
        emoji.style.left=Math.random()*window.innerWidth+'px';
        document.body.appendChild(emoji);
        moverElemento(emoji,true);
    }
}
function moverElemento(el){
    let top=0;
    const velocidad=2+Math.random()*3;
    const interval=setInterval(()=>{
        top+=velocidad; el.style.top=top+'px';
        if(top>window.innerHeight){el.remove(); clearInterval(interval);}
    },20);
}

// Botón despedir año
btn.addEventListener('click',()=>{
    lanzarConfeti();
    mostrarParrafos({
        es:"🎉 ¡El año ha sido despedido con estilo! Feliz 2026 🎉",
        en:"🎉 The year has been farewelled in style! Happy 2026 🎉",
        de:"🎉 Das Jahr wurde stilvoll verabschiedet! Frohes 2026 🎉"
    }[idiomaSeleccionado],mensaje);
    btn.disabled=true;
});
