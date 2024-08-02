import { Page } from "playwright";

export abstract class PageHolder {
  constructor(protected page: Page) {}
}
