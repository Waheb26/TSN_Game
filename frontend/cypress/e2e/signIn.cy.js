describe("testing signup, login", () => {
  it("fills the signup form", () => {
    cy.visit("http://localhost:3000/signup");
    cy.get(":nth-child(2) > .signup-input").type("wawa26");
    cy.get(":nth-child(3) > .signup-input").type("wawa26@tsn.game");
    cy.get(":nth-child(4) > .signup-input").type("Devfull@2669");
    cy.get(":nth-child(5) > .signup-input").type("Devfull@2669");
    cy.get(".signup-submit").click();
  });

  it("fills the login form and connects", () => {
    cy.visit("http://localhost:3000/login");
    cy.get("#username").type("wawa26");
    cy.get("#password").type("Devfull@2669");
    cy.get(".button-text").click();
  });
});
