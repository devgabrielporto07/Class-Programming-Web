function saudar (nome = "visitante") {
    console.log (`Olá, ${nome}`)
}
saudar ("Gabriel");
saudar ();

// quando o não atributo argumento 

function calcularMedia (n1, n2) {
    return (n1 + n2) / 2;
}
const media = calcularMedia (7, 9);
console.log (media);