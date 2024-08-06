import { Search } from "../pages/searchComponent";
import { LeftPane } from "../pages/letfPannelComponent";
import { ProductList } from "../pages/productListComponent";
import { InfoBar } from "../pages/infoBarComponent";
import { test as base } from "./fixtureBase";

type Pages = {
  search: Search;
  leftPane: LeftPane;
  productList: ProductList;
  infoBar: InfoBar;
};

export const test = base.extend<Pages>({
  search: async ({ page }, use) => {
    await use(new Search(page));
  },
  leftPane: async ({ page }, use) => {
    await use(new LeftPane(page));
  },
  productList: async ({ page }, use) => {
    await use(new ProductList(page));
  },
  infoBar: async ({ page }, use) => {
    await use(new InfoBar(page));
  },
});
