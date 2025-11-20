// Cypress E2E example (run after backend + frontend are up)
describe('Mini Delivery E2E', () => {
  it('loads restaurants and completes a purchase', () => {
    cy.visit('http://localhost:5173')
    // go to login and register quickly via UI simulation
    cy.contains('Cadastrar').click()
    cy.get('input[placeholder="Nome"]').type('Teste')
    cy.get('input[placeholder="Email"]').type('teste@teste.com')
    cy.get('input[placeholder="Senha"]').type('123456')
    cy.contains('Criar conta').click()
    // login
    cy.get('input[placeholder="Email"]').clear().type('teste@teste.com')
    cy.get('input[placeholder="Senha"]').clear().type('123456')
    cy.contains('Entrar').click()
    cy.contains('Restaurantes')
    cy.contains('Abrir menu').first().click()
    cy.contains('Adicionar').first().click()
    cy.contains('Ir para o carrinho').click()
    cy.contains('Finalizar Pedido').click()
    cy.on('window:alert', (txt) => {
      expect(txt).to.match(/Pedido realizado/)
    })
  })
})
