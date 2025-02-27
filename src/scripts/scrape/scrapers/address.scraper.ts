import { Page } from "puppeteer";

import { ScraperInterface } from "../../interfaces/scraper.interface";

export class AddressScraper implements ScraperInterface<string> {
  public readonly field = "address";

  public scrape(page: Page): Promise<string> {
    return page.evaluate(() => {
      const addressElement = document.querySelector<HTMLParagraphElement>(
        "#theiaStickySidebar .address",
      )!;

      return addressElement.innerText.trim();
    });
  }
}
