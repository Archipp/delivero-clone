
describe("Test", () => {
  it("background-color bleu", ()=>{
    cy.visit("/")
    cy.get('.r-backgroundColor-57dg7b').should('have.css','background-color', 'rgb(0, 0, 255)')
  })
it("test du texte", ()=>{
    cy.visit("/")
    cy.contains('Bonjour ! ceci est un test cypress pour verifier que cette phrase existe dans ce fichier')
})
})
