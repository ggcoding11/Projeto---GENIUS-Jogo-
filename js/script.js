const botaoIniciar = document.querySelector("#btn-iniciar");
const topLeft = document.querySelector(".top-left");
const topRight = document.querySelector(".top-right");
const bottomLeft = document.querySelector(".bottom-left");
const bottomRight = document.querySelector(".bottom-right");
const botoes = document.querySelectorAll(".botao");

let podeJogar = false;

let numAcessos = 5;
let velocidade = 500;

let botoesCPU = [];
let botoesPlayer = [];

//Início do jogo aqui

botaoIniciar.addEventListener("click", () => {
  iniciarAnimacao();

  setTimeout(() => {
    iniciarRodada(numAcessos, velocidade);
  }, 2000);
});

function iniciarRodada(numAcessos, velocidade) {
  gerarSequenciaCPU(); //Gerei os que serão acessos

  let qntdAtual = 1;

  let errou = false;

  while ((qntdAtual <= botoesCPU.length) && (errou != true)) {
    iniciarVezCPU(qntdAtual);

    iniciarVezPlayer();

    let cont = botoesPlayer.length - 1;

    if (botoesPlayer[cont] != botoesCPU[cont]) {
      iniciarAnimacaoErro();

      retirarClicavel();

      reiniciarParametros();

      botoesPlayer = [];
      botoesCPU = [];

      errou = true;
    } else {
      acender(botao);

      setTimeout(() => {
        apagar(botao);
      }, 190);

      if (verficarVitoria(botoesCPU, botoesPlayer) == true) {
        retirarClicavel();

        iniciarAnimacao();

        numAcessos += 1;
        velocidade += 50;

        botoesPlayer = [];
        botoesCPU = [];

        setTimeout(() => {
          iniciarRodada(numAcessos, velocidade);
        }, 2000);
      }
    }

    qntdAtual++;
  }
}

function esperar(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

function acender(elemento) {
  elemento.classList.add("ligado");
}

function apagar(elemento) {
  elemento.classList.remove("ligado");
}

async function iniciarVezCPU(qntdAtual) {
  for (let i = 0; i < qntdAtual; i++) {
    let index = botoesCPU[i];

    acender(botoes[index]);

    await esperar(velocidade);

    apagar(botoes[index]);

    await esperar(velocidade);
  }
}

function gerarSequenciaCPU() {
  for (let i = 0; i < numAcessos; i++) {
    let index = Math.floor(Math.random() * 4);

    botoesCPU.push(index);
  }
}

function iniciarVezPlayer() {
  tornarClicavel();
  podeJogar = true;
}

botoes.forEach((botao, index) => {
  botao.addEventListener("click", () => {
    if (!podeJogar) {
      return;
    }

    botoesPlayer.push(index);
  });
});

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

async function iniciarAnimacao() {
  for (let i = 0; i < 6; i++) {
    acender(topLeft);
    acender(topRight);
    acender(bottomLeft);
    acender(bottomRight);

    await esperar(100);

    apagar(topLeft);
    apagar(topRight);
    apagar(bottomLeft);
    apagar(bottomRight);

    await esperar(100);
  }
}

async function iniciarAnimacaoErro() {
  for (let i = 0; i < 2; i++) {
    acender(topLeft);
    acender(topRight);
    acender(bottomLeft);
    acender(bottomRight);

    await esperar(400);

    apagar(topLeft);
    apagar(topRight);
    apagar(bottomLeft);
    apagar(bottomRight);

    await esperar(400);
  }
}

function verficarVitoria(array1, array2) {
  if (array1.length != array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] != array2[i]) {
      return false;
    }
  }

  return true;
}

function reiniciarParametros() {
  numAcessos = 5;
  velocidade = 300;
}
