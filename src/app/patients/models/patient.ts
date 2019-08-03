import { User } from 'src/app/auth/models/user';

export interface PatientsApi {
  patients: User[];
  totalItems: number;
}
