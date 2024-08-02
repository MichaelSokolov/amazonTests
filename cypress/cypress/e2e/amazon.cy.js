import Search from "../pages/SearchComponent";
import FilterPannel from "../pages/FilterPannelComponent";
import ProductList from "../pages/ProductListComponent";
import ResultBar from "../pages/ResultInfoBarComponent";

describe("Amazon web app", () => {
  beforeEach(() => {
    cy.setup();
    cy.visit("/");
  });
  it("PC Gaming Keyboard department - check sorting items by price in descending order", () => {
    // Search for "PC Gaming Keyboards"
    Search.typeSearchRequest("PC Gaming Keyboards");
    Search.clickSearchButton();

    // Select a department
    FilterPannel.selectDepartment("PC Gaming Keyboards");

    // Wait for the results page to load and display the results
    Search.isDepartmentVisibleInDropdownCard("PC Gaming Keyboards");
    ProductList.isProductListVisible();

    // click on Logitech G in the Brand filter
    FilterPannel.selectBrandFilter("Logitech G");

    // check that filter applied
    FilterPannel.isBrandFilterChecked("Logitech G");

    //Sort found items by price - high to low
    ResultBar.selectSorting("Price: High to Low");

    // Wait for the results page to load and display the results
    cy.url().should("include", "price-desc-rank");
    ProductList.isProductListVisible();

    // Get the prices of the listed items and check that they are sorted in descending order
    ProductList.checkPricesDescendingOrder();
  });

  it("Headphones & Earbuds department - check filtering options", () => {
    // Search for "Headphones & Earbuds"
    Search.typeSearchRequest("Headphones & Earbuds");
    Search.clickSearchButton();

    // Select a department
    FilterPannel.selectDepartment("Headphones & Earbuds");

    // Wait for the results page to load and display the results
    Search.isDepartmentVisibleInDropdownCard("Headphones & Earbuds");
    ProductList.isProductListVisible();

    // Search for "AirPods"
    Search.typeSearchRequest("AirPods");
    Search.clickSearchButton();

    // Wait for the results page to load and display the results
    ProductList.isProductListVisible();

    // Select the "Bluetooth" Wireless Type filter
    FilterPannel.selectFilter("Bluetooth");

    // Wait to apply filter
    FilterPannel.isFilterChecked("Bluetooth");

    // Wait for the filtered results to load
    ProductList.isProductListVisible();

    // Get the names of the listed items and check that every item has keyword substring in its name
    ProductList.checkProductNamesContainKeyword("AirPods");
  });
});
