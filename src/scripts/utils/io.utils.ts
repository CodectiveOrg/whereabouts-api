import fs, { constants } from "node:fs/promises";

import { ScrapedAttraction } from "../../types/attraction";

const SCRAPED_FOLDER_PATH = "output/scraped";

export async function isAlreadyScraped(id: number): Promise<boolean> {
  try {
    await fs.access(idToPath(id), constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

export async function loadScraped(id: number): Promise<ScrapedAttraction> {
  const buffer = await fs.readFile(idToPath(id));
  const content = buffer.toString();
  return JSON.parse(content);
}

export async function saveScraped(
  id: number,
  scraped: ScrapedAttraction,
): Promise<void> {
  const content = JSON.stringify(scraped, null, 2);
  await fs.writeFile(idToPath(id), content);
}

function idToPath(id: number): string {
  return `${SCRAPED_FOLDER_PATH}/${id}.json`;
}
