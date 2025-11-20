describe('Teste de Login', () => {
  it('Login deve funcionar', () => {

    cy.visit('http://localhost:5173/login')

    cy.get('input[placeholder="Email"]').type('test@test.com')
    cy.get('input[placeholder="Senha"]').type('123')

    cy.contains('Entrar').click()

    cy.contains('Restaurantes').should('be.visible')

 
    cy.contains('Pizzaria Central').should('exist')
  })
})
