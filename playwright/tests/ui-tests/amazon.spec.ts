import { test } from "@playwright/test";
import { Search } from "../../pages/searchComponent";
import { LeftPane } from "../../pages/letfPannelComponent";
import { ProductList } from "../../pages/productListComponent";
import { InfoBar } from "../../pages/infoBarComponent";

test.beforeEach(async ({ page }) => {
  // Close location change pop-up if displayed
  await page.addLocatorHandler(
    page.locator("//*[@data-action-type='DISMISS']"),
    async () => {
      await page.locator("//*[@data-action-type='DISMISS']").click();
    }
  );
  // Go to Amazon's homepage
  await page.goto("/", {
    waitUntil: "load",
    timeout: 30000,
  });
});

test("PC Gaming Keyboard department - check sorting items by price in descending order", async ({
  page,
}) => {
  const search = new Search(page);
  const leftPane = new LeftPane(page);
  const productList = new ProductList(page);
  const infoBar = new InfoBar(page);

  // Search for "PC Gaming Keyboards"
  await search.typeSearchRequest("PC Gaming Keyboards");
  await search.clickSearchButton();

  // Select department
  await leftPane.selectDepartment("PC Gaming Keyboards");

  // Wait for the results page to load and display the results
  await search.isDepartmentVisibleInDropdownCard("PC Gaming Keyboards");
  await productList.isProductListVisible();

  // click on Logitech G in the Brand filter
  await leftPane.selectBrandFilter("Logitech G");

  // check that filter applied
  await leftPane.isBrandFilterChecked("Logitech G");
  await productList.isProductListVisible();

  //Sort found items by price - high to low
  await infoBar.selectSorting("Price: High to Low");

  // Wait for the results page to load and display the results
  await page.waitForURL(/price-desc-rank/);
  await productList.isProductListVisible();

  // Get the prices of the listed items and check that they are sorted in descending order
  await productList.checkPricesDescendingOrder();
});

test("Headphones & Earbuds department - check filtering options", async ({
  page,
}) => {
  const search = new Search(page);
  const leftPane = new LeftPane(page);
  const productList = new ProductList(page);

  // Search for "Headphones & Earbuds"
  await search.typeSearchRequest("Headphones & Earbuds");
  await search.clickSearchButton();

  // Select department
  await leftPane.selectDepartment("Headphones & Earbuds");

  // Wait for the results page to load and display the results
  await search.isDepartmentVisibleInDropdownCard("Headphones & Earbuds");
  await productList.isProductListVisible();

  // Search for "AirPods"
  await search.typeSearchRequest("AirPods");
  await search.clickSearchButton();

  // Wait for the results page to load and display the results
  await productList.isProductListVisible();

  // Select the "NFC" Wireless Type filter
  await leftPane.selectFilter("Bluetooth");

  //wait to apply filter
  await leftPane.isFilterChecked("Bluetooth");

  // Wait for the filtered results to load
  await productList.isProductListVisible();

  // Get the names of the listed items and check that every item has keyword substring in its name
  await productList.checkProductNamesContainKeyword("AirPods");
});
