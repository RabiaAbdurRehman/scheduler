describe("Navigation", () => {
  it("should navigate to Tuesday", () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected")
  });
});



/*** it("should navigate to Tuesday", () => {
    cy.get(".day-list__item--selected > [data-testid=spots]")
      .click()
      .should("exist");
  });

  it("specific background color", () => {
    cy.contains("li", "Tuesday")
      .contains("Tuesday")
      .should("have.css", "background-color", "rgba(0, 0, 0, 0)");
  }); */
