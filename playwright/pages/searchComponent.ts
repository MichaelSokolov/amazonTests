import { PageHolder } from "./abstract";

export class Search extends PageHolder {
  //locators
  private searchField = () => this.page.locator("#twotabsearchtextbox");
  private submitSearchButton = () =>
    this.page.locator("#nav-search-submit-button");
  private dropdownCard = (department: string) =>
    this.page
      .locator("#nav-search-dropdown-card")
      .locator(`//span[text() ='${department}']`);

  // methods
  async typeSearchRequest(value: string) {
    await this.searchField().clear();
    await this.searchField().fill(value);
    return this;
  }

  async clickSearchButton() {
    await this.submitSearchButton().click();
    return this;
  }

  async isDepartmentVisibleInDropdownCard(department: string) {
    await this.dropdownCard(department).waitFor({ state: "visible" });
  }
}
