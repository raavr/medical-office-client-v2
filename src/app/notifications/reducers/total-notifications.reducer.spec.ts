import { reducer, initialState, State } from './total-notifications.reducer';
import {
  GetNotifications,
  GetNotificationsSuccess,
  GetNotificationsFailure,
  StopNotificationAnimation,
  RunNotificationAnimation,
  SetNotificationsCounter
} from '../actions/notification.actions';
import { VisitStatus } from 'src/app/visits/models/visit';

describe('Total Notifications Reducer', () => {
  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = reducer(state, action);

    expect(result).toBe(state);
  });

  it('should return the state containing pending prop equals true when the GetNotifications action is dispatch', () => {
    const state = {
      pending: false,
      totalItems: 0,
      animationPending: false
    };
    const action = new GetNotifications();

    const expResult = {
      totalItems: 0,
      pending: true,
      animationPending: false
    } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it('should return the state containing pending prop equals false when the GetNotificationsSuccess action is dispatch', () => {
    const state = {
      pending: true,
      totalItems: 0,
      animationPending: false
    };
    const action = new GetNotificationsSuccess([
      {
        createDate: '2019-08-13T07:30:00.000Z',
        description: 'Zapis',
        id: 124,
        status: VisitStatus.ACCEPTED,
        visitDate: '2019-08-13T08:30:00.000Z',
        patient: {
          id: '1',
          name: 'John',
          surname: 'Doe'
        }
      }
    ]);

    const expResult = {
      totalItems: 0,
      pending: false,
      animationPending: false
    } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it('should return the state containing pending prop equals false when the GetNotificationsFailure action is dispatch', () => {
    const state = {
      pending: true,
      totalItems: 0,
      animationPending: false
    };
    const action = new GetNotificationsFailure();

    const expResult = {
      totalItems: 0,
      pending: false,
      animationPending: false
    } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it('should return the state containing animationPending prop equals false when the StopNotificationAnimation action is dispatch', () => {
    const state = {
      pending: false,
      totalItems: 0,
      animationPending: true
    };
    const action = new StopNotificationAnimation();

    const expResult = {
      totalItems: 0,
      pending: false,
      animationPending: false
    } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it('should return the state containing animationPending prop equals true when the RunNotificationAnimation action is dispatch', () => {
    const state = {
      pending: false,
      totalItems: 0,
      animationPending: false
    };
    const action = new RunNotificationAnimation();

    const expResult = {
      totalItems: 0,
      pending: false,
      animationPending: true
    } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });

  it('should return new state containing totalItems prop when the SetNotificationsCounter action is dispatch', () => {
    const state = {
      pending: false,
      totalItems: 2,
      animationPending: false
    };
    const action = new SetNotificationsCounter(1);

    const expResult = {
      pending: false,
      totalItems: 1,
      animationPending: false
    } as State;
    const result = reducer(state, action);
    expect(result).toEqual(expResult);
  });
});
