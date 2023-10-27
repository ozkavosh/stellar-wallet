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

  it("Should get an error message when input an invalid secret key format", () => {
    cy.get("button").contains("Connect with a secret key").click();
    cy.get("input").type("invalid secret key example");
    cy.get("button").contains("Connect").click();
    cy.get("p").contains("Invalid secret key. Must start with S and be 56 characters long.");
  });

  it("Should get an error message when the secret key couldn't be validated with StellarSDK", () => {
    cy.get("button").contains("Connect with a secret key").click();
    cy.get("input").type("SCIB7TEDNENDEVW6AYWYQ7IHSFLXCJ67JK4ACZYX6JHMBIKV74OGDBJ7");
    cy.get("button").contains("Connect").click();
    cy.get("p").contains("An error has ocurred while login with secret key.");
  });

  it("Should redirect to dashboard on successful login", () => {
    cy.get("button").contains("Connect with a secret key").click();
    cy.get("input").type("SCIB7TEDNENDEVW6AYWYQ7IHSFL5CJ67JK4ACZYX6JHMBIKV74OGDBJ7");
    cy.get("button").contains("Connect").click();
    cy.location().should((loc) => {
      expect(loc.pathname).to.eq("/dashboard");
    });
  });
});
