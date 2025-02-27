import { Page } from "puppeteer";

import { ScraperInterface } from "../../interfaces/scraper.interface";

export class BodyScraper implements ScraperInterface<string> {
  public readonly field = "body";

  public scrape(page: Page): Promise<string> {
    return page.evaluate(() => {
      const containerElement =
        document.querySelector<HTMLDivElement>("#bodyContainer")!;

      return containerElement.innerHTML;
    });
  }
}
