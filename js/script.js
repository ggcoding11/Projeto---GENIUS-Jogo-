const botaoIniciar = document.querySelector("#btn-iniciar")
const topLeft = document.querySelector(".top-left")
const topRight = document.querySelector(".top-right")
const bottomLeft = document.querySelector(".bottom-left")
const bottomRight = document.querySelector(".bottom-right")

botaoIniciar.addEventListener("click", () => {
    topLeft.classList.add("ligado")
    topRight.classList.add("ligado")
    bottomLeft.classList.add("ligado")
    bottomRight.classList.add("ligado")

    setInterval(() => {
        setTimeout(() => {
            topLeft.classList.add("ligado")
            topRight.classList.add("ligado")
            bottomLeft.classList.add("ligado")
            bottomRight.classList.add("ligado")
        }, 200)

        topLeft.classList.remove("ligado")
        topRight.classList.remove("ligado")
        bottomLeft.classList.remove("ligado")
        bottomRight.classList.remove("ligado")
    }, 400)

})