const botaoIniciar = document.querySelector("#btn-iniciar");
const topLeft = document.querySelector(".top-left");
const topRight = document.querySelector(".top-right");
const bottomLeft = document.querySelector(".bottom-left");
const bottomRight = document.querySelector(".bottom-right");

botaoIniciar.addEventListener("click", () => {
  iniciarAnimacao();
});

function acender(elemento) {
  elemento.classList.add("ligado");
}

function apagar(elemento) {
  elemento.classList.remove("ligado");
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
