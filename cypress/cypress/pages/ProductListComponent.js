class ProductList {
  elements = {
    productList: () => cy.get(".s-main-slot"),
    productPrice: () => cy.get(".a-price-whole"),
    productName: () => cy.get(".s-main-slot h2 a span"),
  };

  isProductListVisible() {
    this.elements.productList().should("be.visible");
  }
  checkPricesDescendingOrder() {
    this.elements.productPrice().then(($prices) => {
      const prices = $prices
        .toArray()
        .map((el) => parseFloat(el.innerText.replace(/,/g, "")));
      for (let i = 1; i < prices.length; i++) {
        expect(prices[i - 1]).to.be.at.least(prices[i]);
      }
    });
  }
  checkProductNamesContainKeyword(keyword) {
    this.elements.productName().then(($items) => {
      const itemNames = $items.toArray().map((el) => el.innerText);

      // Assert that every item has keyword substring in its name
      const nonMatchingItems = itemNames.filter(
        (name) => !name.includes(keyword)
      );
      expect(
        nonMatchingItems.length,
        `Items without ${keyword} in the name:\n${nonMatchingItems.join(
          "\n\n"
        )}`
      ).to.equal(0);
    });
  }
}

export default new ProductList();
