describe('Cadastro - Campos vazios', () => {
  it('deve exibir alerta ao tentar cadastrar sem preencher nada', () => {
    cy.visit('http://localhost:5173/login');

    // Abre a tela de cadastro
    cy.contains('Cadastrar').click();

    // Captura o alert ANTES de clicar no botão
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alerta');
    });

    // Clica em "Criar conta" sem preencher nada
    cy.contains('Criar conta').click();

    // Verifica se o alert foi chamado com a mensagem correta
    cy.get('@alerta').should('have.been.calledWith', 'Preencha todos os campos');
  });
});
