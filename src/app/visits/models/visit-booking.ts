import { Moment } from 'moment';

export interface VisitTime {
  visitTime: string;
}

export interface DisabledDates {
  disabledDates: string[];
}

export interface VisitReservationDto {
  date: string;
  time: string;
  userId: string;
  desc?: string;
}

export interface DoctorsDateDto {
  date: string;
  doctorId: string;
}

export interface DoctorsMomentDateDto {
  date: Moment;
  doctorId: string;
}