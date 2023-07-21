//iniciando o DOM e adicionando eventos ao botao submit
document.addEventListener('DOMContentLoaded', () => {
    const caixaEletronico = new ATM();
    const formSaque = document.getElementById('form-saque') as HTMLFormElement;

    formSaque.addEventListener('submit', (event) => {
        event.preventDefault();
        const valorSaqueInput = document.getElementById('valor-saque') as HTMLInputElement;
        const valorSaque = Number(valorSaqueInput.value);
        caixaEletronico.realizarSaque(valorSaque);
    })
});

//classe de notas disponíveis no caixa Eletronico
class ATM {
    notasDisponiveis: { [valor:number]: number } = {
        100: 40,
        50: 40,
        20: 40,
        10: 40,
    };

    //funcao para realizar o saque de acordo com as restricoes pré-estabelecidas
    realizarSaque(valorSaque:number) {
        const horarioAtual = new Date().getHours();
        const limiteSaque = horarioAtual >=6 && horarioAtual <= 21 ? 10000 : 1000;
       
        //restricao de saque - horario
        if (valorSaque < 10 || valorSaque > limiteSaque) {
            const mensagemErro =
              "Valor de saque inválido! O valor do saque deve estar entre R$ 10,00 e R$ " +
              limiteSaque.toLocaleString();
            alert(mensagemErro);
          } else {}

          //restrição de saque - divisor de 10
          if (valorSaque % 10 !== 0) {
            const mensagemDiv = "Valor de saque deve ser divisível por 10"
            alert(mensagemDiv);
          } else {}
      
          // calculando a quantidade de notas necessarias 
          const notas = Object.keys(this.notasDisponiveis)
            .sort((a, b) => Number(b) - Number(a))
            .map(Number);
      
          const notasNecessarias: { [valor: number]: number } = {};
          for (const nota of notas) {
            const quantidadeNotas = Math.floor(valorSaque / nota);
      
            if (quantidadeNotas > 0 && this.notasDisponiveis[nota] >= quantidadeNotas) {
              notasNecessarias[nota] = quantidadeNotas;
              valorSaque -= nota * quantidadeNotas;
              this.notasDisponiveis[nota] -= quantidadeNotas;
            }
          }
      
          // atualizando o DOM com as notas utilizadas
          const ulNotasSacadas = document.getElementById('lista-notas-sacadas');
      
          if (ulNotasSacadas !== null) {
            ulNotasSacadas.innerHTML = '';
      
            for (const nota in notasNecessarias) {
              const quantidade = notasNecessarias[nota];
              const liNota = document.createElement('li');
              liNota.textContent = `Nota de R$ ${nota},00 - quantidade: ${quantidade}x`;
              ulNotasSacadas.appendChild(liNota);
            }
          }
        }
      }