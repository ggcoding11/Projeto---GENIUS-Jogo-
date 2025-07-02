const botaoIniciar = document.querySelector("#btn-iniciar");
const topLeft = document.querySelector(".top-left");
const topRight = document.querySelector(".top-right");
const bottomLeft = document.querySelector(".bottom-left");
const bottomRight = document.querySelector(".bottom-right");
const botoes = document.querySelectorAll(".botao");

let botoesCPU;
let botoesPlayer;

let inicioJogo = false;
let podeJogar = false;

botaoIniciar.addEventListener("click", () => {
  if (inicioJogo) {
    return;
  }

  inicioJogo = true;

  iniciarAnimacao();

  let numAcessos = 5;
  let velocidade = 400;

  setTimeout(() => {
    iniciarRodada(numAcessos, velocidade);
  }, 2000);
});

async function iniciarRodada(numAcessos, velocidade) {
  gerarSequenciaCPU(numAcessos);

  let qntdAtual = 1;

  let resultado = true;

  while (qntdAtual <= botoesCPU.length && resultado != false) {
    await iniciarVezCPU(qntdAtual, velocidade);

    resultado = await iniciarVezPlayer(qntdAtual);

    qntdAtual++;
  }

  if (resultado == true) {
    await iniciarAnimacao();

    await esperar(2000);

    iniciarRodada(numAcessos + 1, velocidade - 70);
  } else {
    await iniciarAnimacaoErro();

    inicioJogo = false;
  }
}

function iniciarVezPlayer(qntdAtual) {
  return new Promise((resolve) => {
    tornarClicavel();
    podeJogar = true;
    botoesPlayer = [];

    async function tratarClique(event) {
      if (!podeJogar) {
        return;
      }

      let index = Array.from(botoes).indexOf(event.currentTarget);

      let posicao = botoesPlayer.length;

      botoesPlayer.push(index);

      if (botoesPlayer[posicao] == botoesCPU[posicao]) {
        acender(botoes[index]);

        await esperar(200);

        apagar(botoes[index]);

        if (botoesPlayer.length == qntdAtual) {
          retirarClicavel();
          podeJogar = false;
          removerEvento();

          await esperar(800);
          resolve(true);
        }
      } else {
        retirarClicavel();
        podeJogar = false;
        removerEvento();
        resolve(false);
      }
    }

    function removerEvento() {
      botoes.forEach((botao) => {
        botao.removeEventListener("click", tratarClique);
      });
    }

    botoes.forEach((botao) => {
      botao.addEventListener("click", tratarClique);
    });
  });
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

async function iniciarVezCPU(qntdAtual, velocidade) {
  for (let i = 0; i < qntdAtual; i++) {
    let index = botoesCPU[i];

    acender(botoes[index]);

    await esperar(velocidade);

    apagar(botoes[index]);

    await esperar(velocidade);
  }
}

function gerarSequenciaCPU(numAcessos) {
  botoesCPU = [];

  for (let i = 0; i < numAcessos; i++) {
    let index = Math.floor(Math.random() * 4);

    botoesCPU.push(index);
  }
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
