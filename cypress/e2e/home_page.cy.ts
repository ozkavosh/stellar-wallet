describe("The Home Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("button").contains("Connect with a secret key").as("signInButton");
    cy.get("button")
      .contains("Generate key pair for a new account")
      .as("signUpButton");
  });

  it("Should contain a header", () => {
    cy.get("header").should("exist");
  });

  it("Should contain two buttons", () => {
    const buttons = cy.get("button");
    buttons.should("have.length", 2);
  });

  it("Should open sign in modal when sign in button is clicked", () => {
    cy.get("@signInButton").click();
    cy.get("h2").contains("Your secret key");
  });

  it("Should open sign up modal when sign up button is clicked", () => {
    cy.get("@signUpButton").click();
    cy.get("h2").contains("Create a new account");
  });

  describe("Sign in modal", () => {
    beforeEach(() => {
      cy.get("@signInButton").click();
      cy.get("button").contains("Connect").as("connectButton");
    })

    it("Should get an error message when the secret key couldn't be validated with StellarSDK", () => {
      cy.get("input").type("Invalid key example");
      cy.get("@connectButton").click();
      cy.get("p").contains(
        "Invalid secret key. Must start with S and be 56 characters long.",
      );
    });
  
    it("Should redirect to dashboard on successful login", () => {
      cy.get("input").type(
        "SCIB7TEDNENDEVW6AYWYQ7IHSFL5CJ67JK4ACZYX6JHMBIKV74OGDBJ7",
      );
      cy.get("@connectButton").click();
      cy.location().should(({ pathname }) =>
        expect(pathname).to.eq("/dashboard")
      );
    });
  })
});
