let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

const botaoNovoJogo = document.querySelector("#reiniciar");
const botaoChutar = document.querySelector(".container__botao");


//console.log(numeroSecreto);


// let titulo = document.querySelector(".texto__titulo");
// titulo.innerHTML = "Jogo do Número Secreto";

// let paragrafo = document.querySelector(".texto__paragrafo");
// paragrafo.innerHTML = "Escolha um número entre 1 e 10."

// REFATORANDO: substituindo as linhas acima pela função:

function exibirTextoNaTela (classe, texto) {
    let campo = document.querySelector(classe);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", {rate: 1.2});
}


function exibirMensagemInicial () {
    exibirTextoNaTela (".texto__titulo" , "Jogo do número secreto");
    exibirTextoNaTela (".texto__paragrafo" , "Escolha um número entre 1 e 10.");
}

function exibirMensagemNumeroAlto () {
    exibirTextoNaTela (".texto__titulo", "Muito alto =(");
    exibirTextoNaTela (".texto__paragrafo", "Tente novamente.");
}

function exibirMensagemNumeroBaixo () {
    exibirTextoNaTela (".texto__titulo", "Muito baixo =(");
    exibirTextoNaTela (".texto__paragrafo", "Tente novamente.");
}

function gerarNumeroAleatorio() {
    let numeroSorteado = parseInt ((Math.random()) * numeroLimite + 1 );
    let quantidadeDeElementosDaLista = listaDeNumerosSorteados.length;

    if( quantidadeDeElementosDaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroSorteado)) {
        return gerarNumeroAleatorio(); //recursão: a função chama ela mesma novamente! Tomar cuidado com esse funcionalidade pois se houvessem 500 números, o código ficaria tentando várias vezes até chegar em um número disponível.
    } else {
        listaDeNumerosSorteados.push(numeroSorteado);
        return numeroSorteado;
    }
}

function reiniciarJogo () {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    botaoNovoJogo.setAttribute("disabled", true); 
    botaoChutar.removeAttribute("disabled");
}

function limparCampo() {
    chute = document.querySelector('.container__input');
    chute.value = "";
}


exibirMensagemInicial();


function verificarChute() {
    let chute = document.querySelector(".container__input").value;

    if( chute == numeroSecreto ) {
        exibirTextoNaTela (".texto__titulo", "Parabéns!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`
        exibirTextoNaTela (".texto__paragrafo", mensagemTentativas);
        botaoNovoJogo.removeAttribute("disabled");
        botaoChutar.setAttribute("disabled", true);
    } else if ( chute > numeroSecreto) {
        exibirMensagemNumeroAlto();
    } else {
        exibirMensagemNumeroBaixo();
    }
    tentativas++;
    limparCampo();
}


