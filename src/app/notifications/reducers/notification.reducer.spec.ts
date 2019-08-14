import { reducer, State } from './notification.reducer';
import * as fromNotification from './notification.reducer';
import { VisitStatus } from 'src/app/visits/models/visit';
import {
  GetNotificationsSuccess,
  GetNotificationsFailure,
  ResetNotifications
} from '../actions/notification.actions';

describe('Notification Reducer', () => {
  const notification1 = {
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
  };
  const notification2 = {
    createDate: '2019-08-14T10:30:00.000Z',
    description: 'Desc',
    id: 125,
    status: VisitStatus.ACCEPTED,
    visitDate: '2019-08-14T10:30:00.000Z',
    patient: {
      id: '1',
      name: 'John',
      surname: 'Doe'
    }
  };

  const initialState: State = {
    ids: [notification1.id, notification2.id],
    entities: {
      [notification1.id]: notification1,
      [notification2.id]: notification2
    }
  };
  it('should return the default state', () => {
    const action = {} as any;
    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should add many notifications to the store', () => {
    const notification3 = {
      createDate: '2019-08-15T10:30:00.000Z',
      description: 'Desc',
      id: 126,
      status: VisitStatus.ACCEPTED,
      visitDate: '2019-08-15T10:30:00.000Z',
      patient: {
        id: '1',
        name: 'John',
        surname: 'Doe'
      }
    };
    const notification4 = {
      createDate: '2019-08-18T10:30:00.000Z',
      description: 'Desc',
      id: 127,
      status: VisitStatus.ACCEPTED,
      visitDate: '2019-08-18T10:30:00.000Z',
      patient: {
        id: '1',
        name: 'John',
        surname: 'Doe'
      }
    };
    const action = new GetNotificationsSuccess([notification3, notification4]);
    const entities = {
      ...initialState.entities,
      [notification3.id]: notification3,
      [notification4.id]: notification4
    };
    const ids = Object.keys(entities).map(id => Number(id));
    const expResult = {
      ids,
      entities
    } as State;

    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

  it('should add only new notifications if some notifications already exist', () => {
    const notification3 = {
      createDate: '2019-08-15T10:30:00.000Z',
      description: 'Desc',
      id: 126,
      status: VisitStatus.ACCEPTED,
      visitDate: '2019-08-15T10:30:00.000Z',
      patient: {
        id: '1',
        name: 'John',
        surname: 'Doe'
      }
    };
    const action = new GetNotificationsSuccess([notification2, notification3]);
    const entities = {
      ...initialState.entities,
      [notification3.id]: notification3
    };
    const ids = Object.keys(entities).map(id => Number(id));
    const expResult = {
      ids,
      entities
    } as State;

    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

  it('should remove all notiifcations when the GetNotificationsFailure is dispatch', () => {
    const action = new GetNotificationsFailure();
    const expectedResult = fromNotification.initialState;
    const result = reducer(initialState, action);

    expect(result).toEqual(expectedResult);
  });

  it('should remove all notifications when the ResetNotifications is dispatch', () => {
    const action = new ResetNotifications();
    const expectedResult = fromNotification.initialState;
    const result = reducer(initialState, action);

    expect(result).toEqual(expectedResult);
  });
});
