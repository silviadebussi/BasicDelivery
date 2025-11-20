describe('Logout', () => {
  beforeEach(() => {
    
    cy.visit('http://localhost:5173/login');
    cy.get('input[placeholder="Email"]').type('test@test.com');
    cy.get('input[placeholder="Senha"]').type('123');
    cy.contains('Entrar').click();

    
    cy.contains('Restaurantes');
  });

  it('deve fazer logout e voltar para tela de login', () => {
    
    cy.contains('Logout').should('be.visible');

    
    cy.contains('Logout').click();

    cy.contains('Login'); 
    cy.contains('Entrar'); 

   
    cy.contains('Restaurantes').should('not.exist');
  });
});
