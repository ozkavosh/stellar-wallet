describe("The Home Page", () => {
  it("Should contain a header", () => {
    cy.visit("/");

    cy.get("header").should("exist");
  });

  it("Should contain two buttons", () => {
    cy.visit("/");

    const buttons = cy.get("button");

    buttons.should("have.length", 2);
  });
});
