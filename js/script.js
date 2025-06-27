const botaoIniciar = document.querySelector("#btn-iniciar");
const topLeft = document.querySelector(".top-left");
const topRight = document.querySelector(".top-right");
const bottomLeft = document.querySelector(".bottom-left");
const bottomRight = document.querySelector(".bottom-right");
const botoes = document.querySelectorAll(".botao");

let numAcessos = 5;
let velocidade = 500;

let botoesCPU = [];
let botoesPlayer = [];

botaoIniciar.addEventListener("click", () => {
  iniciarAnimacao();

  //Depois de 2 segundos o jogo começa

  setTimeout(() => {
    iniciarFase(numAcessos, velocidade);
  }, 2000);
});

function acender(elemento) {
  elemento.classList.add("ligado");
}

function apagar(elemento) {
  elemento.classList.remove("ligado");
}

function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function iniciarFase(numAcessos, velocidade) {
  let cont = 0;

  while (cont < numAcessos) {
    let index = Math.floor(Math.random() * 4);

    botoesCPU.push(index);

    acender(botoes[index]);

    await esperar(velocidade);

    apagar(botoes[index]);

    await esperar(velocidade);

    cont++;
  }

  iniciarVezPlayer();
}

function iniciarVezPlayer() {
  let cont = 0;

  botoes.forEach((botao, index) => {
    tornarClicavel();

    botao.addEventListener("click", () => {
      botoesPlayer.push(index);

      if (botoesPlayer[cont] != botoesCPU[cont]) {
        iniciarAnimacaoErro();

        retirarClicavel();

        return;
      }

      acender(botao);

      setTimeout(() => {
        apagar(botao);
      }, 190);

      cont++;
    });
  });
}

function tornarClicavel() {
  botoes.forEach((botao) => {
    botao.classList.add("clicavel");
  });
}

function retirarClicavel() {
  botoes.forEach((botao) => {
    botao.classList.remove("clicavel");
  });
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

function iniciarAnimacaoErro() {
  acender(topLeft);
  acender(topRight);
  acender(bottomLeft);
  acender(bottomRight);

  setTimeout(() => {
    apagar(topLeft);
    apagar(topRight);
    apagar(bottomLeft);
    apagar(bottomRight);
  }, 400);

  setTimeout(() => {
    acender(topLeft);
    acender(topRight);
    acender(bottomLeft);
    acender(bottomRight);
  }, 800);

  setTimeout(() => {
    apagar(topLeft);
    apagar(topRight);
    apagar(bottomLeft);
    apagar(bottomRight);
  }, 1200);



}
