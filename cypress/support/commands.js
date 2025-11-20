Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:5173/login');

  cy.get('input[placeholder="Email"]').type('test@test.com');
  cy.get('input[placeholder="Senha"]').type('123');

  cy.contains('Entrar').click();


  cy.contains('Restaurantes', { timeout: 6000 });
});
