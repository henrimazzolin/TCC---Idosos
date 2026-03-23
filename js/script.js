// ============================
// BOTÕES DO SISTEMA
// ============================

document.querySelectorAll("button").forEach(btn => {

    btn.addEventListener("click", () => {

        console.log("Botão clicado:", btn.innerText);

    });

});


// ============================
// AUMENTAR FONTE (ACESSIBILIDADE)
// ============================

let fontSize = 100;

function aumentarFonte(){

    fontSize += 10;

    document.body.style.fontSize = fontSize + "%";

}