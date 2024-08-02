class ResultBar {
  elements = {
    sortDropdown: () => cy.get("#s-result-sort-select"),
  };

  selectSorting(sortingType) {
    this.elements.sortDropdown().select(sortingType, { force: true });
  }
}

export default new ResultBar();
