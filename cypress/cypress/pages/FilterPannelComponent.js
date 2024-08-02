class FilterPannel {
  elements = {
    departmentItem: (department) => cy.get("#departments").contains(department),
    brandFilterItemCheckbox: (item) =>
      cy.get("#brandsRefinements").find(`[aria-label="${item}"]`).find("input"),
    filterItemCheckbox: (item) =>
      cy.get("#filters").contains(item).find("input"),
  };

  selectDepartment(departmentName) {
    this.elements.departmentItem(departmentName).click();
  }
  selectBrandFilter(item) {
    this.elements.brandFilterItemCheckbox(item).click({ force: true });
  }
  selectFilter(item) {
    this.elements.filterItemCheckbox(item).click({ force: true });
  }
  isBrandFilterChecked(item) {
    this.elements.brandFilterItemCheckbox(item).should("be.checked");
  }
  isFilterChecked(item) {
    this.elements.filterItemCheckbox(item).should("be.checked");
  }
}

export default new FilterPannel();
