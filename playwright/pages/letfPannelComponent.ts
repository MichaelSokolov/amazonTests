import { expect } from "@playwright/test";
import { PageHolder } from "./abstract";

export class LeftPane extends PageHolder {
  //locators
  private departmentItem = (department: string) =>
    this.page.locator("#departments").getByText(department);
  private brandFilterItemCheckbox = (filter: string) =>
    this.page
      .locator("#brandsRefinements")
      .locator(`//*[@aria-label="${filter}"]//input`);
  private filterItemCheckbox = (filter: string) =>
    this.page
      .locator("#filters")
      .locator(`//*[@aria-label="${filter}"]//input`);

  // methods
  async selectDepartment(department: string) {
    await this.departmentItem(department).click();
    return this;
  }

  async selectBrandFilter(filter: string) {
    await this.brandFilterItemCheckbox(filter).click({ force: true });
    return this;
  }

  async selectFilter(filter: string) {
    await this.filterItemCheckbox(filter).dispatchEvent("click");
    return this;
  }

  async isBrandFilterChecked(filter: string) {
    await expect(this.brandFilterItemCheckbox(filter)).toBeChecked();
    return this;
  }

  async isFilterChecked(filter: string) {
    await expect(this.filterItemCheckbox(filter)).toBeChecked();
    return this;
  }
}
