const botaoIniciar = document.querySelector("#btn-iniciar");
const topLeft = document.querySelector(".top-left");
const topRight = document.querySelector(".top-right");
const bottomLeft = document.querySelector(".bottom-left");
const bottomRight = document.querySelector(".bottom-right");
const botoes = document.querySelectorAll(".botao");

let numAcessos = 5;
let velocidade = 300;

botaoIniciar.addEventListener("click", () => {
  iniciarAnimacao();
  
  setTimeout(()=>{
    iniciarFase(numAcessos, velocidade);
  }, 3000)
});

function acender(elemento) {
  elemento.classList.add("ligado");
}

function apagar(elemento) {
  elemento.classList.remove("ligado");
}

function iniciarFase(numAcessos, velocidade) {
  
  
  
  acender(botoes[0]);
}

function iniciarAnimacao() {
  acender(topLeft);
  acender(topRight);
  acender(bottomLeft);
  acender(bottomRight);

  setTimeout(() => {
    apagar(topLeft);
    apagar(topRight);
    apagar(bottomLeft);
    apagar(bottomRight);
  }, 100);

  let intervalo = setInterval(() => {
    acender(topLeft);
    acender(topRight);
    acender(bottomLeft);
    acender(bottomRight);

    setTimeout(() => {
      apagar(topLeft);
      apagar(topRight);
      apagar(bottomLeft);
      apagar(bottomRight);
    }, 100);
  }, 200);

  setTimeout(() => {
    clearInterval(intervalo);
  }, 1000);
}
