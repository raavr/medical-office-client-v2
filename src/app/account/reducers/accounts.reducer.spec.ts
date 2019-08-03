import { reducer, State } from './accounts.reducer';
import {
  ProfileGetFailure,
  ProfileGetSuccess,
  ProfileSaveSuccess
} from '../actions/profile.action';
import { GetAccountsSuccess } from '../actions/accounts.action';
import * as fromAccounts from './accounts.reducer';
import { User } from 'src/app/auth/models/user';

describe('Accounts Reducer', () => {
  const user1: User = {
    id: '1',
    name: 'User1'
  };
  const user2: User = {
    id: '2',
    name: 'User2',
    surname: 'User Surname'
  };
  const initialState: State = {
    ids: [user1.id, user2.id],
    entities: {
      [user1.id]: user1,
      [user2.id]: user2
    }
  };
  it('should return the default state', () => {
    const action = {} as any;
    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should add a user to the store', () => {
    const user3 = { id: '3', name: 'Test', email: 'test@example.com' };
    const action = new ProfileGetSuccess(user3);
    const expResult = {
      ids: [...initialState.ids, user3.id],
      entities: {
        ...initialState.entities,
        [user3.id]: user3
      }
    } as State;

    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

  it('should return the existing store if the user exists', () => {
    const action = new ProfileGetSuccess(user2);

    const result = reducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('should add many users to the store', () => {
    const user3 = { id: '3', name: 'Test', email: 'test@example.com' };
    const user4 = { id: '4', name: 'John', email: 'john@example.com' };
    const action = new GetAccountsSuccess([user3, user4]);
    const expResult = {
      ids: [...initialState.ids, user3.id, user4.id],
      entities: {
        ...initialState.entities,
        [user3.id]: user3,
        [user4.id]: user4
      }
    } as State;

    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

  it('should add only new users if users already exist', () => {
    const user3 = { id: '3', name: 'Test', email: 'test@example.com' };
    const action = new GetAccountsSuccess([user2, user3]);
    const expResult = {
      ids: [...initialState.ids, user3.id],
      entities: {
        ...initialState.entities,
        [user3.id]: user3
      }
    } as State;

    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

  it('should remove all users', () => {
    const action = new ProfileGetFailure();
    const expectedResult = fromAccounts.initialState;
    const result = reducer(initialState, action);

    expect(result).toEqual(expectedResult);
  });

  it('should update the second user', () => {
    const user = { id: '2', name: 'Test', email: 'test@example.com' };
    const expResult = {
      ids: [...initialState.ids],
      entities: {
        ...initialState.entities,
        [user.id]: { ...user, surname: user2.surname }
      }
    } as State;

    const action = new ProfileSaveSuccess({
      id: user.id,
      changes: user
    });
    const result = reducer(initialState, action);

    expect(result).toEqual(expResult);
  });
});
