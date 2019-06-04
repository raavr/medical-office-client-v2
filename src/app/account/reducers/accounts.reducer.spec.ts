import { reducer, State } from './accounts.reducer';
import { ProfileGetFailure, ProfileGetSuccess } from '../actions/profile.action';
import { GetAccountsSuccess } from '../actions/accounts.action';
import * as fromAccounts from './accounts.reducer';
import { User } from 'src/app/auth/models/user';

describe("Accounts Reducer", () => {
  const user1: User = {
    sub: '1',
    name: 'User1'
  }
  const user2: User = {
    sub: '2',
    name: 'User2'
  }
  const initialState: State = {
    ids: [user1.sub, user2.sub],
    entities: {
      [user1.sub]: user1,
      [user2.sub]: user2,
    }
  }
  it('should return the default state', () => {
    const action = {} as any;
    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should add a user to the store', () => {
    const user3 = { sub: '3', name: 'Test', email: 'test@example.com' }
    const action = new ProfileGetSuccess(user3);
    const expResult = {
      ids: [
        ...initialState.ids,
        user3.sub
      ],
      entities: {
        ...initialState.entities,
        [user3.sub]: user3
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
    const user3 = { sub: '3', name: 'Test', email: 'test@example.com' }
    const user4 = { sub: '4', name: 'John', email: 'john@example.com' }
    const action = new GetAccountsSuccess([user3, user4]);
    const expResult = {
      ids: [
        ...initialState.ids,
        user3.sub,
        user4.sub
      ],
      entities: {
        ...initialState.entities,
        [user3.sub]: user3,
        [user4.sub]: user4,
      }
    } as State;

    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

  it('should add only new users if users already exist', () => {
    const user3 = { sub: '3', name: 'Test', email: 'test@example.com' }
    const action = new GetAccountsSuccess([user2, user3]);
    const expResult = {
      ids: [
        ...initialState.ids,
        user3.sub,
      ],
      entities: {
        ...initialState.entities,
        [user3.sub]: user3,
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

});