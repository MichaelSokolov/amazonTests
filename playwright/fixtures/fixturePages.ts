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
  search: ({ page }, use) => {
    const search = new Search(page);
    use(search);
  },
  leftPane: ({ page }, use) => {
    const leftPane = new LeftPane(page);
    use(leftPane);
  },
  productList: ({ page }, use) => {
    const productList = new ProductList(page);
    use(productList);
  },
  infoBar: ({ page }, use) => {
    const infoBar = new InfoBar(page);
    use(infoBar);
  },
});
