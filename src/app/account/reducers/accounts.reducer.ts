import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../auth/models/user';
import * as AccountsActions from '../actions/accounts.action';
import * as ProfileActions from '../actions/profile.action';
import * as PatientsActions from '../../patients/actions/patients.action';
import * as CreatePatientActions from '../../patients/actions/create-patient.action';

export function sortByName(a: User, b: User): number {
  return a.name.localeCompare(b.name) || a.surname.localeCompare(b.surname);
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.id,
  sortComparer: sortByName
});

export interface State extends EntityState<User> {}
export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action:
    | AccountsActions.AccountsActionUnion
    | ProfileActions.ProfileActionUnion
    | PatientsActions.PatientsActionUnion
    | CreatePatientActions.CreatePatientActionUnion
): State {
  switch (action.type) {
    case AccountsActions.AccountsActionTypes.GetAccountsSuccess: {
      return adapter.addMany(action.payload, state);
    }

    case ProfileActions.ProfileActionTypes.ProfileGetSuccess: 
    case CreatePatientActions.CreatePatientActionTypes.CreatePatientSuccess: {
      return adapter.addOne(action.payload, state);
    }

    case ProfileActions.ProfileActionTypes.ProfileGetFailure: {
      return adapter.removeAll(state);
    }

    case PatientsActions.PatientsActionTypes.ResetPatients: {
      const ids = (state.ids as string[]).filter(id => id !== action.payload.id);
      return adapter.removeMany(ids, state);
    }

    case PatientsActions.PatientsActionTypes.RemovePatientSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ProfileActions.ProfileActionTypes.ProfileSaveSuccess:
    case ProfileActions.ProfileActionTypes.ProfileUploadAvatarSuccess: {
      return adapter.updateOne(action.payload, state);
    }

    default: {
      return state;
    }
  }
}
