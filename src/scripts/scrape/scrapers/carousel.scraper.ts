import { Page } from "puppeteer";

import { ScraperInterface } from "../../interfaces/scraper.interface";

export class CarouselScraper implements ScraperInterface<string[]> {
  public readonly field = "carousel";

  public scrape(page: Page): Promise<string[]> {
    return page.evaluate(() => {
      const images = document.querySelectorAll<HTMLImageElement>(
        ".owl-item.item:not(.cloned) > img",
      )!;

      const sources = Array.from(images).map(
        (image) => image.dataset.exthumb as string,
      );

      return sources.map((source) => {
        const pattern = /https:\/\/images\.kojaro\.com(.+)\?.+/;
        const match = pattern.exec(source);
        return match?.[1] ?? "";
      });
    });
  }
}
