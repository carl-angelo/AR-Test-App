// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
export {}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      login(): Cypress.Chainable<Element>;
      checkHome(): Cypress.Chainable<Element>;
      checkLoading(): Cypress.Chainable<Element>;
    }
  }
}

Cypress.Commands.add('login', () => {
  cy.visit('http://localhost:3000/login');

  cy.get('[data-testid="login-username"]').type('7df7fde0-2252-4eb8-ae70-d3060a406d1d');
  cy.get('[data-testid="login-password"]').type('carl@AdviceRevolution2023”');

  cy.get('[data-testid="login-button"]').click();

  cy.intercept('*/refresh-token').as('refreshToken');
})

Cypress.Commands.add('checkHome', () => {
  cy.get('[data-testid="home-container"]').should('have.length', 1);
})

Cypress.Commands.add('checkLoading', () => {
  cy.get('.loading-overlay').should('have.length', 1);
})