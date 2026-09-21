function calcularMedia (notas) {
    return ((notas[0] + notas [1] / 2));
}

function verificarSituacao (media) {
    return media >= 6 ? "aprovado":"reprovado"
}

const alunos = [
    { nome: "Gabriel", notas:[7, 8]},
    { nome: "Bruno", notas:[5, 4]},
    { nome: "Carla", notas:[9, 10]},
];

alunos.forEach((aluno) => {
    const media = calcularMedia(aluno.notas);
    const situacao = verificarSituacao(media);
    console.log(`${aluno.nome}: ${situacao} (${media})`);
});