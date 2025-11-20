describe('Cadastro - Campos vazios', () => {
  it('deve exibir alerta ao tentar cadastrar sem preencher nada', () => {
    cy.visit('http://localhost:5173/login');

   
    cy.contains('Cadastrar').click();

    cy.window().then((win) => {
      cy.stub(win, 'alert').as('alerta');
    });

   
    cy.contains('Criar conta').click();


    cy.get('@alerta').should('have.been.calledWith', 'Preencha todos os campos');
  });
});
