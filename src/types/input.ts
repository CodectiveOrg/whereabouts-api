import { InputWorkHours } from "./input-work-hours";
import { InputTag } from "./input-tag";

export type Input = {
  id: number;
  title: string;
  description: string;
  coverUrl: string;
  averageUserRates: number;
  userReviewsCount: number;
  userRatingCount: number;
  restaurantWorkHours: InputWorkHours[];
  attractionTag: InputTag[];
  phone: string;
  url: string;
};
