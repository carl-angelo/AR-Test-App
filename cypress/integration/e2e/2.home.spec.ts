
describe('Home Page', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
    cy.login();
    cy.checkLoading();
  });

  it('should render Home page', () => {
    cy.checkHome();
  });

  it('should be redirect to Home when user try to back to login', () => {
    cy.checkHome();
    cy.visit('http://localhost:3000/login');
    cy.checkLoading();
    
    cy.wait('@refreshToken').then(() => {
      cy.checkHome();
    });
  });

  it('should render Header', () => {
    cy.get('[data-testid="header"]').should('have.length', 1);
    cy.get('.logo').should('have.text', 'Advice Revolution');
  });

  it('should render Table with data', () => {
    cy.intercept(`*/api/v1/people*`, { fixture: 'mockPeople.json'  }).as('getPeople');

    cy.wait('@getPeople').then(() => {
      cy.get('[data-testid="table-wrapper"]').should('have.length', 1);

      cy.get('tbody tr').should('have.length.gt', 1);
    });
  });

  it('should render empty Table', () => {
    cy.intercept(`*/api/v1/people*`, { fixture: 'mockPeopleEmpty.json'  }).as('getPeople');

    cy.wait('@getPeople').then(() => {
      cy.get('[data-testid="table-wrapper"]').should('have.length', 1);

      cy.get('tbody tr td').should('have.text', 'No data found');
    });
  });

  it('should able to go to next and previous page', () => {
    cy.intercept(`*/api/v1/people*`, { fixture: 'mockPeople.json'  }).as('getPeople');

    cy.wait('@getPeople').then(() => {
      cy.get('[data-testid="table-wrapper"]').should('have.length', 1);

      cy.get('tbody tr').should('have.lengthOf', 5);

      cy.get('[data-testid="table-next-page-btn"]').should('have.length', 1);
      cy.get('[data-testid="table-next-page-btn"]').click();

      cy.get('tbody tr').should('have.lengthOf', 1);

      cy.get('[data-testid="table-prev-page-btn"]').should('have.length', 1);
      cy.get('[data-testid="table-prev-page-btn"]').click();

      cy.get('tbody tr').should('have.lengthOf', 5);
    });
  });

  it('should able to search data', () => {
    cy.intercept(`*/api/v1/people*`, { fixture: 'mockPeople.json'  }).as('getPeople');

    cy.wait('@getPeople').then(() => {
      cy.get('[data-testid="table-wrapper"]').should('have.length', 1);

      cy.get('tbody tr').should('have.length.gt', 1);

      cy.get('input[name="filter"]').type('john');
      cy.get('tbody tr').should('have.length', 3);
    });
  });

  it('should able to sort data', () => {
    cy.intercept(`*/api/v1/people*`, { fixture: 'mockPeople.json'  }).as('getPeople');

    cy.wait('@getPeople').then(() => {
      cy.get('[data-testid="table-wrapper"]').should('have.length', 1);

      cy.get('tbody tr').should('have.length.gt', 1);

      cy.get('thead tr th:nth-child(2)').click();
      cy.get('thead tr th:nth-child(2)').contains(/asc/);

      cy.get('thead tr th:nth-child(2)').click();
      cy.get('thead tr th:nth-child(2)').contains(/desc/);

      cy.get('tbody tr:first-child td:nth-child(2)').contains(/Mark/);
    });
  });

  it('should able to delete record', () => {
    cy.intercept('GET', `*/api/v1/people*`, { fixture: 'mockPeople.json'  }).as('getPeople');
    cy.intercept('DELETE', `*/api/v1/people/*`, {
      statusCode: 200,
      body: {
        "entryId": "7df7fde0-2252-4eb8-ae70-d3060a4100000",
        "entryStatus": "DELETED",
        "createDate": "2023-03-02T06:30:50.944Z",
        "updateDate": "2023-03-02T06:30:50.944Z",
        "createdBy": "string",
        "updatedBy": "string",
        "practiceId": "9d31cbd2-f551-4a2a-aa89-242f5c6de01a"
      }
    }).as('deletePeople');

    cy.wait('@getPeople').then(() => {
      cy.get('[data-testid="table-wrapper"]').should('have.length', 1);

      cy.get('tbody tr').should('have.length.gt', 1);

      cy.get('tbody tr:first-child td:first-child input[type="checkbox"]').click();

      cy.get('[data-testid="table-delete-btn"]').should('have.length', 1);
      cy.get('[data-testid="table-delete-btn"]').click();

      cy.wait('@deletePeople').its('response.statusCode').should('eq', 200);
    });
  });

  it('should able to Logout and redirect to Login', () => {
    cy.get('[data-testid="logout-btn"]').click();
    cy.checkLoading();
    cy.get('.login-container').should('have.length', 1);
  })
  
});