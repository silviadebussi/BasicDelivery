describe('Cadastro - Email já cadastrado', () => {
  it('deve exibir erro quando email já existe', () => {

    cy.visit('http://localhost:5173/login');
    cy.contains('Cadastrar').click();

    cy.get('input[placeholder="Nome"]').type('Silvia');
    cy.get('input[placeholder="Email"]').type('existe@test.com');
    cy.get('input[placeholder="Senha"]').type('123456');

   
    cy.on('window:alert', (msg) => {
      expect(msg).to.contain('email already exists');
    });

    cy.contains('Criar conta').click();
  });
});
