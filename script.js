const formulario = document.querySelector('form');
const resultadoElement = document.getElementById('resultado');


const PUNICOES = [
  'Kick da sala Brasil',
  '1h -> (Link do forum)',
  '3h -> (Link do forum)',
  '24h -> (Link do forum)',
  '2d -> (Link do forum)',
  '3d -> (Link do forum)',
  '5d -> (Link do forum)',
  '7d -> (Link do forum)',
  '12d -> (Link do forum)',
  '20d -> (Link do forum)',
  '30d -> (Link do forum)',
  '60d -> (Link do forum)',
  '90d -> (Link do forum)',
];


const REGRAS = {
  'Anuncio na Brasil de outros Países': 8,
  'Disconnect': 2,
  'Leaver': 5,
  'AntiGamer': 4,
  'AFK (Away From the Keyboard)': 3,
  'No !RMK': 2,
  'Desrespeito a Moderação': 7,
  'Racismo/Preconceito/Bullying': 9,
  'BadManner': 3,
  'Flooder/Caps': 2,
  'Conta Fake': 'duplicado',
  'Mamuter': 10,
  'MapHack': 'ban permanente',
  'Abuso de TC (Team Captain)': 2,
  'Abuso de SIGN': 1,
  'Abuso de BUG': 8,
  'Multi-Ranking': 10,
  'Pause In-Game': 4,
};


function calcularPunicao(nome, escolha, vezes) {
  const nivelBase = REGRAS[escolha];

  if (!nivelBase) {
    return 'Regra inválida!';
  }


  const nivelAtual =
    typeof nivelBase === 'number' ? Math.min(nivelBase + vezes - 1, PUNICOES.length - 1) : nivelBase;

  if (nivelAtual === 'duplicado') {
    return `!timeban ${nome} duplicado (ambas as contas)`;
  }

  if (nivelAtual === 'ban permanente') {
    return `!timeban ${nome} ban permanente`;
  }

  return `!timeban ${nome} ${PUNICOES[nivelAtual]}`;
}


formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const escolha = document.getElementById('escolha').value;
  const vezes = parseInt(document.getElementById('multiplicador').value, 10);



  if (isNaN(vezes) || vezes <= 0) {
    resultadoElement.textContent = 'Número de infrações inválido!';
    return;
  }

  const resultado = calcularPunicao(nome, escolha, vezes);
  resultadoElement.textContent = resultado;
});
