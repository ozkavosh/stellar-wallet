describe("The Home Page", () => {
  it("successfully loads", () => {
    cy.visit("/");
  });

  it("contains a header", () => {
    cy.visit("/");

    cy.get("header").should("exist");
  });

  it("contains two buttons", () => {
    cy.visit("/");

    const buttons = cy.get("button");

    buttons.should("have.length", 2);
  });
});
