describe('Cadastro', () => {
  it('deve cadastrar um usuário com sucesso', () => {

    cy.visit('http://localhost:5173/login');

   
    cy.contains('Cadastrar').click();

    
    cy.get('input[placeholder="Nome"]').type('Silvia Teste');
    cy.get('input[placeholder="Email"]').type('batata@test.com');
    cy.get('input[placeholder="Senha"]').type('123456');


    cy.on('window:alert', (text) => {
      expect(text).to.contain('Cadastro OK');
    });

    cy.contains('Criar conta').click();
  });
});
