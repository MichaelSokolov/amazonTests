import { expect } from "@playwright/test";
import assert from "assert";
import { PageHolder } from "./abstract";

export class ProductList extends PageHolder {
  //locators
  private productList = () => this.page.locator(".s-main-slot");
  private productPrice = () => this.page.locator(".a-price-whole");
  private productName = () => this.page.locator(".s-main-slot h2 a span");

  // methods
  async isProductListVisible() {
    await this.productList().waitFor({ state: "visible" });
    return this;
  }

  async checkPricesDescendingOrder() {
    const prices = await this.productPrice().evaluateAll(
      (elements: Element[]): number[] =>
        elements.map((el: Element) => parseFloat(el.textContent || "0"))
    );
    // Assert that the prices are sorted in descending order
    for (let i = 1; i < prices.length; i++) {
      expect(prices[i - 1]).toBeGreaterThanOrEqual(prices[i]);
    }
    return this;
  }

  async checkProductNamesContainKeyword(keyword: string) {
    const itemNames = await this.productName().evaluateAll(
      (elements: Element[]): string[] =>
        elements.map((el: Element) => el.textContent || "")
    );
    // Assert that every item has keyword substring in its name
    const nonMatchingItems = itemNames.filter(
      (name) => !name.includes(keyword)
    );
    assert(
      nonMatchingItems.length === 0,
      `Items without ${keyword} in the name:\n${nonMatchingItems.join("\n\n")}`
    );
    return this;
  }
}
