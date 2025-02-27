import fs from "node:fs/promises";

import normalizedJson from "../../output/normalized.json";

import { Attraction, NormalizedAttraction } from "../types/attraction";

import { loadScraped } from "./utils/io.utils";

const OUTPUT_FILE_PATH = "output/db.json";

const normalizedAttractions =
  normalizedJson.attractions.slice() as NormalizedAttraction[];

async function main(): Promise<void> {
  const promises = normalizedAttractions.map(merge);
  const attractions = await Promise.all(promises);

  await saveOutput(attractions);
}

async function merge(normalized: NormalizedAttraction): Promise<Attraction> {
  const scraped = await loadScraped(normalized.id);

  return {
    ...normalized,
    ...scraped,
  };
}

async function saveOutput(attractions: Attraction[]): Promise<void> {
  const content = JSON.stringify({ attractions }, null, 2);
  await fs.writeFile(OUTPUT_FILE_PATH, content);
}

main().then(() => console.log("done!"));
