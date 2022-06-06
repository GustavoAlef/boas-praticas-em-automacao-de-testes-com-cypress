/// <reference types="Cypress"/>
describe("Hardcoded assertion bad practice", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/search**", { fixture: "stories" }).as("getStories");

    cy.visit("https://hackernews-seven.vercel.app");
    cy.wait("@getStories");
  });

  it("searches", () => {
    const { hits } = require("../../fixtures/stories.json");

    cy.search("cypress.io");
    cy.wait("@getStories");

    cy.get(".table-row").as("tableRows")
      .should("have.length", hits.length);
    hits.forEach((hit, indice) => {
      cy.get("@tableRows").eq(indice).should("contain", hit.title);
    });
  });
});
