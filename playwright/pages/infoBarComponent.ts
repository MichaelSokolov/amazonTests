import { PageHolder } from "./abstract";

export class InfoBar extends PageHolder {
  //locators
  private sortDropdown = () => this.page.locator("#s-result-sort-select");

  // methods
  async selectSorting(sortingType: string) {
    await this.sortDropdown().selectOption(sortingType);
    return this;
  }
}
