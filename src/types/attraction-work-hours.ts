export type AttractionTime = {
  start: string;
  end: string;
};

export type AttractionWorkHours = {
  day: string;
  time: AttractionTime | null;
};
