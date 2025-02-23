export type InputTime = {
  beginHours: number;
  endHours: number;
  beginMinutes: number;
  endMinutes: number;
};

export type InputWorkHours = {
  day: number;
  times: InputTime[];
};
