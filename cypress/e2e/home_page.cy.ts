describe("The Home Page", () => {
  it("Should contain a header", () => {
    cy.visit(cy.request(Cypress.env('BASE_URL')) + "/");

    cy.get("header").should("exist");
  });

  it("Should contain two buttons", () => {
    cy.visit(cy.request(Cypress.env('BASE_URL')) + "/");

    const buttons = cy.get("button");

    buttons.should("have.length", 2);
  });
});
