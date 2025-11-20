describe('Restaurantes', () => {
  beforeEach(() => {
    cy.login();   
  });

  it('deve listar restaurantes e abrir menu', () => {
    cy.get('.card').should('have.length.at.least', 1);

    cy.contains('Abrir menu').first().click();

    cy.contains('Menu');
  });
});
