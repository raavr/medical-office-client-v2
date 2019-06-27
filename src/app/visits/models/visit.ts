import { User } from '../../auth/models/user';

export enum VisitStatus {
  ALL = 'all',
  CANCELED = 'canceled',
  ACCEPTED =  'accepted',
  RESERVED = 'reserved',
};

export enum VisitType {
  CURRENT = 'current',
  PAST = 'past'
}

export interface Visit {
  id: number;
  visitDate: string;
  createDate: string;
  description: string;
  patient?: User;
  doctor?: User;
  rejectReason?: string;
  status: VisitStatus;
}

export interface VisitsApi {
  visits: Visit[],
  totalItems: number;
}

export interface VisitStatusView {
  value: string;
  viewValue: string;
}
