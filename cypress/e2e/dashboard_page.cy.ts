describe("The Dashboard Page", () => {
  it("Should redirect to Home when user is not authenticated", () => {
    cy.visit("/dashboard");
    cy.location().should(({ pathname }) => expect(pathname).to.eq("/"));
  });

  beforeEach(() => {
    cy.visit("/");
    cy.get("button").contains("Connect with a secret key").click();
    cy.get("input").type(
      "SCIB7TEDNENDEVW6AYWYQ7IHSFL5CJ67JK4ACZYX6JHMBIKV74OGDBJ7"
    );
    cy.get("button").contains("Connect").click();
  });

  it("Should contain a header and a footer", () => {
    cy.get("header").should("exist");
    cy.get("footer").should("exist");
  });

  it("Should contain three buttons", () => {
    cy.get("button").should("have.length", 3);
  });

  it("Should redirect to Home on successful logout", () => {
    cy.get("button").contains("Sign Out").click();
    cy.location().should(({ pathname }) => expect(pathname).to.eq("/"));
  });
});
