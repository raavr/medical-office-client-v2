import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../auth/models/user';
import * as AccountsActions from '../actions/accounts.action';
import * as ProfileActions from '../actions/profile.action';

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: (user: User) => user.sub,
  sortComparer: false
});

export interface State extends EntityState<User> {}
export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action:
    | AccountsActions.AccountsActionUnion
    | ProfileActions.ProfileActionUnion
): State {
  switch (action.type) {
    case AccountsActions.AccountsActionTypes.GetAccountsSuccess: {
      return adapter.addMany(action.payload, state);
    }

    case ProfileActions.ProfileActionTypes.ProfileGetSuccess: {
      return adapter.addOne(action.payload, state);
    }

    case ProfileActions.ProfileActionTypes.ProfileGetFailure: {
      return adapter.removeAll(state);
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
