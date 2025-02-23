import { AttractionWorkHours } from "./attraction-work-hours";
import { AttractionTag } from "./attraction-tag";

export type Attraction = {
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
};
