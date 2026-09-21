const notas = [5, 7, 9 ,4]
const comBonus = notas.map((n) => n +1)
console.log (comBonus);

const aprovados = notas.filter((n) => n >= 6);
console.log (aprovados);