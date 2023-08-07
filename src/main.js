"use strict";
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
class ATM {
    constructor() {
        this.notasDisponiveis = {
            100: 100,
            50: 100,
            20: 100,
            10: 100,
        };
    }
    verificarRestricoes(valorSaque) {
        const horarioAtual = new Date().getHours();
        const limiteSaque = horarioAtual >= 6 && horarioAtual <= 21 ? 10000 : 1000;
        if (valorSaque < 10 || valorSaque > limiteSaque) {
            const mensagemErro = "Valor de saque inválido! O valor do saque deve estar entre R$ 10,00 e R$ " +
                limiteSaque.toLocaleString();
            alert(mensagemErro);
            return false;
        }
        if (valorSaque % 10 !== 0) {
            const mensagemDiv = "Valor de saque deve ser divisível por 10";
            alert(mensagemDiv);
            return false;
        }
        return true;
    }
    calcularNotasNecessarias(valorSaque) {
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
        return notasNecessarias;
    }
    atualizarDOM(notasNecessarias) {
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
    realizarSaque(valorSaque) {
        if (!this.verificarRestricoes(valorSaque)) {
            return;
        }
        const notasNecessarias = this.calcularNotasNecessarias(valorSaque);
        this.atualizarDOM(notasNecessarias);
    }
}
