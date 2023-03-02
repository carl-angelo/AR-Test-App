describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should able to render Login Page on load', () => {
    cy.get('.login-container').should('have.length', 1);
    cy.get('h2').should('have.text', 'Login');
  });

  it('should redirect to Login if no auth yet', () => {
    cy.visit('http://localhost:3000');

    cy.checkLoading();

    cy.get('.login-container').should('have.length', 1);
    cy.get('h2').should('have.text', 'Login');
  });

  it('should show an error if invalid user', () => {
    cy.get('[data-testid="login-username"]').type('test');
    cy.get('[data-testid="login-password"]').type('test');

    cy.get('[data-testid="login-button"]').click();

    cy.checkLoading();

    cy.get('.error-container').should('have.length', 1);
  });

  it('should redirect to home after login', () => {
    cy.login();

    cy.checkLoading();

    cy.get('[data-testid="home-container"]').should('have.length', 1);
  });
});