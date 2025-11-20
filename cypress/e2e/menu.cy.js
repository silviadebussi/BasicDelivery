describe('Menu do restaurante', () => {
  beforeEach(() => {
    cy.login();

  
    cy.contains('Abrir menu').first().click();
  });

  it('deve listar itens e adicionar ao carrinho', () => {
    cy.get('.card').should('have.length.at.least', 1);

    cy.contains('Adicionar').first().click();

    cy.contains('Ir para o carrinho').click();

    cy.contains('Carrinho');
  });
});
