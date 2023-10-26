describe("The Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should contain a header", () => {
    cy.get("header").should("exist");
  });

  it("Should contain two buttons", () => {
    const buttons = cy.get("button");

    buttons.should("have.length", 2);
  });

  it("Should open sign in modal when sign in button is clicked", () => {
    cy.get("button").contains("Connect with a secret key").click();

    cy.get("h2").contains("Your secret key");
  });

  it("Should open sign up modal when sign up button is clicked", () => {
    cy.get("button").contains("Generate key pair for a new account").click();

    cy.get("h2").contains("Create a new account");
  });
});
