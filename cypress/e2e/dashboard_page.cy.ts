describe("The Dashboard Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("button").contains("Connect with a secret key").as("signInButton");
    cy.get("button")
      .contains("Generate key pair for a new account")
      .as("signUpButton");
  });

  it("Should redirect to Home when user is not authenticated", () => {
    cy.visit("/dashboard");
    cy.location().should(({ pathname }) => expect(pathname).to.eq("/"));
  });

  beforeEach(() => {
    cy.visit("/");
    cy.get("@signInButton").click();
    cy.get("input").type(
      "SCIB7TEDNENDEVW6AYWYQ7IHSFL5CJ67JK4ACZYX6JHMBIKV74OGDBJ7"
    );
    cy.get("button").contains("Connect").click();
  });

  it("Should contain a header and a footer", () => {
    cy.get("header").should("exist");
    cy.get("footer").should("exist");
  });

  it("Should contain four buttons", () => {
    cy.get("button").should("have.length", 4);
  });

  it("Should redirect to Home on successful logout", () => {
    cy.get("button").contains("Sign Out").click();
    cy.location().should(({ pathname }) => expect(pathname).to.eq("/"));
  });

  describe("The fund button", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("@signUpButton").click();
      cy.get("input[name='secretKey']").then(($secretKey) => {
        cy.get("input[type='checkbox']").click();
        cy.get("button").contains("Continue").click();
        cy.get("@signInButton").click();
        cy.get("input").type($secretKey.val());
        cy.get("button").contains("Connect").click();
      });
    });

    it("Should show fund account button and inactive account warning for new accounts", () => {
      cy.get("button").contains("Fund");
      cy.get("span").contains("send at least 1 lumen (XLM)");
    });

    it("Should fund account with 10000 lumens on fund button click", () => {
      cy.get("button").contains("Fund").click();
      cy.get('[test-name="loaderContainer"]').should('not.exist');
      cy.get("p").contains("10000.0000000 Lumens (XLM)");
    });
  });
});
