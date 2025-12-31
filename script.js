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

// Mensajes
const mensajes = {
    amigos:`Si estás leyendo esto, es porque de alguna forma fuiste parte de mi 2025.\n\nTal vez estuvimos cerca, tal vez no tanto, pero en algún punto compartimos tiempo, palabras, risas, silencios o simplemente presencia. Y eso ya cuenta.\n\nEste año fue intenso. A ratos bonito, a ratos caótico, a ratos agotador. No siempre salió todo bien, no siempre supimos qué hacer, pero aquí estamos, llegando al final, que no es poca cosa.\n\nQuería despedir el año diciendo gracias. Gracias por estar, por sumar, por acompañar de la forma que pudiste y también por enseñarme cosas, incluso sin darte cuenta. Cada persona deja algo, aunque no lo sepa.\n\nAhora toca cerrar este capítulo y darle espacio al siguiente. Que el 2026 nos trate mejor, o al menos que nos encuentre más fuertes, más tranquilos y un poco más fieles a lo que somos.\n\nTe deseo un año con risas reales, decisiones valientes y momentos que valgan la pena recordar. Cuídate mucho, de verdad. Feliz Año Nuevo. 🎉`,
    conocidos:`Hola, el 2025 está por despedirse, y quería tomar un momento para reconocer que fue un año de todo un poco: desafíos, aprendizajes, risas y cambios.\n\nAunque no nos conozcamos demasiado, de alguna forma formaste parte de este año y eso ya merece un pequeño agradecimiento.\n\nQue el 2026 nos encuentre más fuertes, con nuevas oportunidades y suficientes momentos que nos hagan sonreír de verdad. Gracias por estar, aunque sea de forma lejana, y por compartir este tiempo en el mundo conmigo.\n\nFeliz Año Nuevo 🎉`
};

const inicio=document.getElementById('inicio');
const carta=document.getElementById('carta');
const mensaje=document.getElementById('mensaje');
const btn=document.getElementById('despedirBtn');

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

// Selección de destinatario
inicio.querySelectorAll('button').forEach(b=>{
    b.addEventListener('click',()=>{
        const tipo=b.getAttribute('data-tipo');
        inicio.style.display='none';
        carta.style.display='block';
        document.body.style.overflow='auto'; // activa scroll
        mostrarParrafos(mensajes[tipo],mensaje);
    });
});

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

btn.addEventListener('click',()=>{
    lanzarConfeti();
    mostrarParrafos("🎉 ¡El año ha sido despedido con estilo! Feliz 2026 🎉",mensaje);
    btn.disabled=true;
    btn.textContent="¡Feliz Año Nuevo!";
});
