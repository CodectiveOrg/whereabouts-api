import fs from "fs/promises";

import { NormalizedAttraction } from "../types/attraction";
import { AttractionTag } from "../types/attraction-tag";
import {
  AttractionTime,
  AttractionWorkHours,
} from "../types/attraction-work-hours";

import { Input } from "../types/input";
import { InputTag } from "../types/input-tag";
import { InputTime, InputWorkHours } from "../types/input-work-hours";

const INPUT_FILE_PATH = "input/data.json";
const OUTPUT_FILE_PATH = "output/normalized.json";

async function main(): Promise<void> {
  const input = await loadInput();
  const attractions = normalizeInput(input);
  await saveOutput(attractions);
}

async function loadInput(): Promise<Input[]> {
  const buffer = await fs.readFile(INPUT_FILE_PATH);
  const content = buffer.toString();
  return JSON.parse(content);
}

function normalizeInput(items: Input[]): NormalizedAttraction[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    thumbnail: item.coverUrl,
    averageRating: item.averageUserRates,
    reviewsCount: item.userReviewsCount,
    ratingCount: item.userRatingCount,
    workHours: normalizeWorkHours(item.restaurantWorkHours),
    tags: normalizeTags(item.attractionTag),
    phone: item.phone,
    url: item.url,
  }));
}

function normalizeWorkHours(
  workHours: InputWorkHours[],
): AttractionWorkHours[] {
  const days = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنجشنبه",
    "جمعه",
  ];

  return workHours.map((workHour) => {
    if (workHour.times.length === 0) {
      return {
        day: days[workHour.day],
        time: null,
        start: null,
        end: null,
      };
    }

    return {
      day: days[workHour.day],
      time: normalizeTimes(workHour.times),
    };
  });
}

function normalizeTimes(times: InputTime[]): AttractionTime | null {
  if (times.length === 0) {
    return null;
  }

  return {
    start: `${pad2(times[0].beginHours)}:${pad2(times[0].beginMinutes)}`,
    end: `${pad2(times[0].endHours)}:${pad2(times[0].endMinutes)}`,
  };
}

function normalizeTags(tags: InputTag[]): AttractionTag[] {
  return tags.map((tag) => ({
    id: tag.id,
    title: tag.title,
  }));
}

function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

async function saveOutput(attractions: NormalizedAttraction[]): Promise<void> {
  const content = JSON.stringify({ attractions }, null, 2);
  await fs.writeFile(OUTPUT_FILE_PATH, content);
}

main().then(() => console.log("done!"));
