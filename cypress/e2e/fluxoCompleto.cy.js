describe('Fluxo completo do Mini Delivery', () => {


  it('login → restaurante → menu → adicionar item → carrinho → finalizar pedido → logout', () => {


    cy.visit('http://localhost:5173/login');

    cy.get('input[placeholder="Email"]').type('test@test.com');
    cy.get('input[placeholder="Senha"]').type('123');
    cy.contains('Entrar').click();

 
    cy.contains('Restaurantes', { timeout: 6000 });


    cy.get('.card').should('have.length.at.least', 1);
    cy.contains('Abrir menu').first().click();

    
    cy.contains('Menu');
    cy.get('.card').should('have.length.at.least', 1);


    cy.contains('Adicionar').first().click();

 
    cy.contains('Ir para o carrinho').click();

   
    cy.contains('Carrinho');
    cy.get('.card').should('have.length.at.least', 1);

 
    cy.on('window:alert', (msg) => {
      expect(msg).to.include('Pedido realizado');
    });

    cy.contains('Finalizar Pedido').click();

    
    cy.contains('Restaurantes');


    cy.contains('Logout').click();

 
    cy.contains('Entrar');
    cy.contains('Restaurantes').should('not.exist');
  });

});
