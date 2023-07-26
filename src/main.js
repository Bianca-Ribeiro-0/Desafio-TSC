"use strict";
//iniciando o DOM e adicionando eventos ao botao submit
document.addEventListener('DOMContentLoaded', () => {
    const caixaEletronico = new ATM();
    const formSaque = document.getElementById('form-saque');
    formSaque.addEventListener('submit', (event) => {
        event.preventDefault();
        const valorSaqueInput = document.getElementById('valor-saque');
        const valorSaque = Number(valorSaqueInput.value);
        caixaEletronico.realizarSaque(valorSaque);
        valorSaqueInput.value = '';
    });
});
//classe de notas disponíveis no caixa Eletronico
class ATM {
    constructor() {
        this.notasDisponiveis = {
            100: 100,
            50: 100,
            20: 100,
            10: 100,
        };
    }
    //funcao para realizar o saque de acordo com as restricoes pré-estabelecidas
    realizarSaque(valorSaque) {
        const horarioAtual = new Date().getHours();
        const limiteSaque = horarioAtual >= 6 && horarioAtual <= 21 ? 10000 : 1000;
        //restricao de saque - horario
        if (valorSaque < 10 || valorSaque > limiteSaque) {
            const mensagemErro = "Valor de saque inválido! O valor do saque deve estar entre R$ 10,00 e R$ " +
                limiteSaque.toLocaleString();
            alert(mensagemErro);
        }
        //restrição de saque - divisor de 10
        if (valorSaque % 10 !== 0) {
            const mensagemDiv = "Valor de saque deve ser divisível por 10";
            alert(mensagemDiv);
        }
        // calculando a quantidade de notas necessarias 
        const notas = Object.keys(this.notasDisponiveis)
            .sort((a, b) => Number(b) - Number(a))
            .map(Number);
        const notasNecessarias = {};
        for (const nota of notas) {
            const quantidadeNotas = Math.floor(valorSaque / nota);
            if (quantidadeNotas > 0 && this.notasDisponiveis[nota] >= quantidadeNotas) {
                notasNecessarias[nota] = quantidadeNotas;
                valorSaque -= nota * quantidadeNotas;
                this.notasDisponiveis[nota] -= quantidadeNotas;
            }
        }
        // atualizando o DOM com as notas utilizadas
        const listaNotasSacadas = document.getElementById('lista-notas-sacadas');
        if (listaNotasSacadas !== null) {
            listaNotasSacadas.innerHTML = '';
            for (const nota in notasNecessarias) {
                const quantidade = notasNecessarias[nota];
                const liNota = document.createElement('li');
                liNota.textContent = `${quantidade}x - RS$${nota},00`;
                listaNotasSacadas.appendChild(liNota);
            }
        }
    }
}
