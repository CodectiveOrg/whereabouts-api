import { Page } from "puppeteer";

import { ScrapedAttraction } from "../../types/attraction";

export interface ScraperInterface<T = unknown> {
  field: keyof ScrapedAttraction;
  scrape(page: Page): Promise<T>;
}
