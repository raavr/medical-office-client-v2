export interface SelectedVisitTime {
  time: string;
  selected: boolean;
}

export interface VisitTimeOfDay {
  dayOfWeek: number;
  visitTime: SelectedVisitTime[];
}

export interface VisitDatetime {
  times: string[];
  weeklyVisitTimes: VisitTimeOfDay[];
  disabledDates: string[];
}
