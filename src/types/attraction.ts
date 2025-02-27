import { AttractionWorkHours } from "./attraction-work-hours";
import { AttractionTag } from "./attraction-tag";

export type NormalizedAttraction = {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  averageRating: number;
  reviewsCount: number;
  ratingCount: number;
  workHours: AttractionWorkHours[];
  tags: AttractionTag[];
  phone: string;
  url: string;
};

export type ScrapedAttraction = {
  address: string;
  carousel: string[];
  body: string;
};

export type Attraction = NormalizedAttraction & ScrapedAttraction;
