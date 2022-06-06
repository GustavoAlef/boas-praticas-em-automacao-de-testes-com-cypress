/// <reference types="Cypress"/>
describe("Code duplication bad practice - Sample 2", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/search**").as("getStories");

    cy.visit("https://hackernews-seven.vercel.app");
    cy.wait("@getStories");
  });

  const terms = ["reactjs", "vuejs"];
  terms.forEach((element) => {
    it(`searches for "${element}"`, () => {
      cy.search(element);

      cy.wait("@getStories");

      cy.get(".table-row").should("have.length", 100);
    });
  });
});
