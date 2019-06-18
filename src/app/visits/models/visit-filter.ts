import { VisitStatus, VisitType } from './visit';

export interface VisitFilter {
  currentPage?: number;
  date?: string;
  time?: string;
  limit?: number;
  numPages?: number;
  status?: VisitStatus;
  type?: VisitType;
  userName?: string;
}

