// Como linkar o js para o hotml? O 'document.querySelector seleciona uma propriedade dentro do arquivo de html que indicamos no parenteses
// Para usar a variável e indicar o conteúdo que queremos atribuir ao campo no html, usamos innerHTML.

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Número Secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

// Mas fazer dessa forma não é produtivo, se for 50x, cansa, então fazemos function para isso
// Eu faço o mesmo comando e crio "variaveis da função" para que eu atribua valor para elas quando eu quiser chamar
// assim eu tenho apenas uma função, ao invés de varios códigos acima, e somente passo o valor para ela.

let listaNumSorteados = []; // Criando uma lista
let numLimite = 10;
let numeroSecreto = gerarNumAleatorio();
let tentativas = 1;

function exibirTxtNaTela (tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
    // Essa última reproduz o texto em voz, começando pelo texto apresentado na tela, depois a língua e velocidade.
}

// Eu chamo a função e falo 1. o que ela deve pegar no html; 2. o que ela deve atribuir nesse campo;
function exibirMsgInicial (){
    exibirTxtNaTela ('h1', 'Jogo do Número Secreto');
    exibirTxtNaTela ('p', 'Escolha um número entre 1 e 10');
}
exibirMsgInicial()

// No botão do html estamos chamando uma variável para que tenha uma ação no botão e aqui teremos os parâmetros
function verificarChute() {
    let chute = document.querySelector('input').value
    
    if (chute == numeroSecreto) {
        palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTxtNaTela ('h1', 'Acertou!');
        exibirTxtNaTela ('p', mensagemTentativa);

// Para reiniciar o jogo, precisamos ativar o botão, mas simplesmente usar 'button' vai chamar qualquer botão
// então vamos nos referenciar ao botão 'reiniciar' pelo ID dele do html.
// Depois passamos o que queremos fazer naquele campo, usando o remove e especificando o q quero remover.
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else if (chute > numeroSecreto) {
        exibirTxtNaTela ('p', 'O número é menor.')
    } else {
        exibirTxtNaTela ('p', 'O número é maior.')
    }
    tentativas++;

    limparCampo()
}

function gerarNumAleatorio () {
    let numEscolhido = parseInt(Math.random() * numLimite +1);
    let qtdNumLista = listaNumSorteados.length;
    if (qtdNumLista == numLimite){
        listaNumSorteados = [];
    }
    
    if (listaNumSorteados.includes(numEscolhido)) { // Verifica se o num gerado está na lista usando 'includes'
        return gerarNumAleatorio; //se o num gerado estiver, chama a funcao para gerar outro num
    } else {   
        listaNumSorteados.push(numEscolhido); // o push inclui o num gerado na lista
        console.log(listaNumSorteados)
        return numEscolhido; // se não estiver, retorna o num gerado
    }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = ''
}

function reiniciarJogo(){
    numeroSecreto = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMsgInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
    // o true no final é apenas para indicar que eu quero que o atributo mude como setei.
}