import puppeteer, { Page } from "puppeteer";

import normalizedJson from "../../../output/normalized.json";

import {
  NormalizedAttraction,
  ScrapedAttraction,
} from "../../types/attraction";

import { AddressScraper } from "./scrapers/address.scraper";
import { CarouselScraper } from "./scrapers/carousel.scraper";
import { BodyScraper } from "./scrapers/body.scraper";

import { isAlreadyScraped, saveScraped } from "../utils/io.utils";
import { logResult, Result } from "../utils/log.utils";

const BASE_URL = "https://www.kojaro.com";

const scrapers = [
  new AddressScraper(),
  new CarouselScraper(),
  new BodyScraper(),
];

const normalizedAttractions =
  normalizedJson.attractions.slice() as NormalizedAttraction[];

async function main(): Promise<void> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const normalized of normalizedAttractions) {
    if (await isAlreadyScraped(normalized.id)) {
      logResult(normalized.id, Result.ALREADY_SCRAPED);
      continue;
    }

    const scraped = await scrapeAttraction(page, normalized.url);
    await saveScraped(normalized.id, scraped);
    logResult(normalized.id, Result.SCRAPED);
  }

  await browser.close();
}

async function scrapeAttraction(
  page: Page,
  path: string,
): Promise<ScrapedAttraction> {
  const url = `${BASE_URL}${path}`;

  await page.goto(url);

  const promises = scrapers.map((scraper) => scraper.scrape(page));
  const values = await Promise.all(promises);

  return scrapers.reduce(
    (result, scraper, index) => ({ ...result, [scraper.field]: values[index] }),
    {} as ScrapedAttraction,
  );
}

main().then(() => console.log("done!"));
