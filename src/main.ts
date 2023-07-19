class ATM {
    notasDisponiveis: { [valor: number]: number } = {
      100: 10,
      50: 10,
      20: 10,
      10: 10,
    };
  
    realizarSaque(valorSaque: number) {
      // Verificar limites de horário
      const horarioAtual = new Date().getHours();
      const limiteSaque = horarioAtual >= 6 && horarioAtual <= 21 ? 10000 : 1000;
  
      if (valorSaque < 10 || valorSaque > limiteSaque) {
        const mensagem =
          "Valor de saque inválido! O valor do saque deve estar entre R$ 10,00 e R$ " +
          limiteSaque.toLocaleString();
        alert(mensagem);
      }
  
      // Lógica para calcular a quantidade de notas
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
  
      // Atualizar o DOM
      const ulNotasSacadas = document.getElementById('lista-notas-sacadas');
  
      if (ulNotasSacadas !== null) {
        ulNotasSacadas.innerHTML = '';
  
        for (const nota in notasNecessarias) {
          const quantidade = notasNecessarias[nota];
          const liNota = document.createElement('li');
          liNota.textContent = `Nota de R$ ${nota}, quantidade: ${quantidade}`;
          ulNotasSacadas.appendChild(liNota);
        }
      }
    }
  }
  
  // Exemplo de uso
  document.addEventListener('DOMContentLoaded', () => {
    const caixaEletronico = new ATM();
    const formSaque = document.getElementById('form-saque') as HTMLFormElement;
  
    formSaque.addEventListener('submit', (event) => {
      event.preventDefault();
      const valorSaqueInput = document.getElementById('valor-saque') as HTMLInputElement;
      const valorSaque = Number(valorSaqueInput.value);
      caixaEletronico.realizarSaque(valorSaque);
    });
  });