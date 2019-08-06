import { reducer, State } from './accounts.reducer';
import {
  ProfileGetFailure,
  ProfileGetSuccess,
  ProfileSaveSuccess
} from '../actions/profile.action';
import { GetAccountsSuccess } from '../actions/accounts.action';
import * as fromAccounts from './accounts.reducer';
import { User } from 'src/app/auth/models/user';
import {
  ResetPatients,
  RemovePatientSuccess
} from 'src/app/patients/actions/patients.action';

const mockSort = (a: User, b: User) => a.name.localeCompare(b.name);
const sortedIds = entities =>
  Object.keys(entities)
    .sort((e1, e2) => mockSort(entities[e1], entities[e2]))
    .map(key => entities[key].id);

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
    const entities = { ...initialState.entities, [user3.id]: user3 };
    const ids = sortedIds(entities);
    const expResult = {
      ids,
      entities
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
    const entities = {
      ...initialState.entities,
      [user3.id]: user3,
      [user4.id]: user4
    };
    const ids = sortedIds(entities);
    const expResult = {
      ids,
      entities
    } as State;

    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

  it('should add only new users if users already exist', () => {
    const user3 = { id: '3', name: 'Test', email: 'test@example.com' };
    const action = new GetAccountsSuccess([user2, user3]);
    const entities = { ...initialState.entities, [user3.id]: user3 };
    const ids = sortedIds(entities);
    const expResult = {
      ids,
      entities
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
    const entities = {
      ...initialState.entities,
      [user.id]: { ...user, surname: user2.surname }
    };
    const ids = sortedIds(entities);
    const expResult = {
      ids,
      entities
    } as State;

    const action = new ProfileSaveSuccess({
      id: user.id,
      changes: user
    });
    const result = reducer(initialState, action);

    expect(result).toEqual(expResult);
  });

  it('should remove patients except the logged in user', () => {
    const expResult = {
      ids: [user1.id],
      entities: {
        [user1.id]: user1
      }
    };

    const action = new ResetPatients({ id: user1.id });
    const result = reducer(initialState, action);

    expect(result).toEqual(expResult);
  });

  it('should remove a patient', () => {
    const expResult = {
      ids: [user2.id],
      entities: {
        [user2.id]: user2
      }
    };

    const action = new RemovePatientSuccess({ id: user1.id });
    const result = reducer(initialState, action);

    expect(result).toEqual(expResult);
  });
});
