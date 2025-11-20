describe('Cadastro - Senha vazia', () => {
  it('deve exibir erro ao enviar sem senha', () => {

    cy.visit('http://localhost:5173/login');
    cy.contains('Cadastrar').click();

    cy.get('input[placeholder="Nome"]').type('Silvia');
    cy.get('input[placeholder="Email"]').type('silvia@test.com');
    

    cy.on('window:alert', (msg) => {
      expect(msg.toLowerCase()).to.contain('erro');
    });

    cy.contains('Criar conta').click();
  });
});
