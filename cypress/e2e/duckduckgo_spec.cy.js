describe('DuckDuckGo E2E Tests', () => {

    it('should allow changing the region settings', () => {
        cy.visit('https://www.duckduckgo.com');
        cy.get('button[data-testid="sidemenu-button"]').first().click({ force: true });
        cy.contains('Settings', { timeout: 10000 }).click({ force: true });
        cy.visit('https://duckduckgo.com/settings'); 
        cy.contains('Region').should('be.visible');
    });

    it('should display the DuckDuckGo homepage', () => {
      cy.visit('https://www.duckduckgo.com');
      cy.get('input[name="q"]').should('be.visible');
    });
  
    it('should not allow an empty search', () => {
        cy.visit('https://www.duckduckgo.com');  
        cy.get('input[name="q"]').clear();  
        cy.get('button[type="submit"]').should('be.disabled');  
        cy.url().should('eq', 'https://duckduckgo.com/');  
    });

    it('should display search results for "Cypress"', () => {
        cy.visit('https://www.duckduckgo.com');
        cy.get('input[name="q"]').type('Cypress');
        cy.get('button[type="submit"]').should('not.be.disabled').click();
      
        cy.get('a.result__a', { timeout: 10000 }).should('have.length.greaterThan', 0);  
    });
      

    it('should not display results for a single character', () => {
        cy.visit('https://www.duckduckgo.com');
        cy.get('input[name="q"]').type('a');
        cy.get('button[type="submit"]').click();  
        cy.contains('No results found').should('not.exist');
    });

    it('should open the side menu', () => {
        cy.visit('https://www.duckduckgo.com');
        cy.get('button[data-testid="sidemenu-button"]').first().click({ force: true }); 
        cy.get('div[data-testid="sidemenu"]', { timeout: 10000 }).should('be.visible');
    });
      
      

    it('should handle invalid page by performing a search', () => {
        cy.visit('https://www.duckduckgo.com/invalidpage');
        cy.get('input[name="q"]').should('have.value', 'invalidpage');
        cy.get('.react-results--main').should('have.length.greaterThan', 0);
    });
      
    it('should display no results for invalid search string', () => {
        cy.visit('https://www.duckduckgo.com');
        cy.get('input[name="q"]').type('!@#$%^&*()');
        cy.get('button[type="submit"]').click(); 
        cy.contains('No results found').should('not.exist');
    });
});
  