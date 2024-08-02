class Search {
  elements = {
    searchField: () => cy.get("#twotabsearchtextbox"),
    submitSearchButton: () => cy.get("#nav-search-submit-button"),
    dropdownCard: (department) =>
      cy.get("#nav-search-dropdown-card").contains(department),
  };

  typeSearchRequest(value) {
    this.elements.searchField().clear().type(value);
  }
  clickSearchButton() {
    this.elements.submitSearchButton().click();
  }
  isDepartmentVisibleInDropdownCard(departmentName) {
    this.elements.dropdownCard(departmentName).should("be.visible");
  }
}

export default new Search();
