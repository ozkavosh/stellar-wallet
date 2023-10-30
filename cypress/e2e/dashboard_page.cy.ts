describe("The Dashboard Page", () => {
  it("Should redirect to Home when user is not authenticated", () => {
    cy.visit("/dashboard");
    cy.location().should(({ pathname }) =>
      expect(pathname).to.eq("/")
    );
  });

  beforeEach(() => {
    cy.visit('/');
    cy.get('button').contains('Connect with a secret key').click();
    cy.get("input").type(
      "SCIB7TEDNENDEVW6AYWYQ7IHSFL5CJ67JK4ACZYX6JHMBIKV74OGDBJ7",
    );
    cy.get('button').contains('Connect').click();
  });

  it("Should contain a header and a footer", () => {
    cy.get("header").should("exist");
    cy.get("footer").should("exist");
  });

  it("Should contain two buttons", () => {
    const buttons = cy.get("button");
    buttons.should("have.length", 2);
  });
});
