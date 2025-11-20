describe('Carrinho', () => {
  beforeEach(() => {
    cy.login();

    cy.contains('Abrir menu').first().click();
    cy.contains('Adicionar').first().click();
    cy.contains('Ir para o carrinho').click();
  });

  it('deve mostrar item no carrinho', () => {
    cy.get('.card').should('have.length.at.least', 1);
  });

  it('deve remover item', () => {
    cy.contains('Remover').click();
    cy.contains('Total: R$ 0.00');
  });

  it('deve finalizar pedido', () => {
    cy.on('window:alert', msg => {
      expect(msg).to.include('Pedido realizado');
    });

    cy.contains('Finalizar Pedido').click();
  });
});
