import { reducer, State } from './visits.reducer';
import { GetVisitsSuccess, GetVisitsFailure } from '../actions/visits.action';
import { UpdateStatusSuccess } from '../actions/visits-status.action';
import * as fromVisits from './visits.reducer';
import { Visit, VisitStatus } from '../models/visit';

describe('Visists Reducer', () => {
  const visit1: Visit = {
    createDate: '2019-08-13T07:30:00.000Z',
    description: 'Zapis',
    id: 124,
    status: VisitStatus.ACCEPTED,
    visitDate: '2019-08-13T08:30:00.000Z'
  };
  const visit2: Visit = {
    createDate: '2019-08-1208:30:00.000Z',
    description: 'Desc',
    id: 125,
    status: VisitStatus.ACCEPTED,
    visitDate: '2019-08-12T10:30:00.000Z'
  };

  const initialState: State = {
    ids: [visit1.id, visit2.id],
    entities: {
      [visit1.id]: visit1,
      [visit2.id]: visit2
    }
  };
  it('should return the default state', () => {
    const action = {} as any;
    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should add visits to the store', () => {
    const visits: Visit[] = [
      {
        createDate: '2019-08-15T07:30:00.000Z',
        description: 'Desc 1',
        id: 126,
        status: VisitStatus.ACCEPTED,
        visitDate: '2019-08-15T08:30:00.000Z'
      },
      {
        createDate: '2019-08-1608:30:00.000Z',
        description: 'Desc 2',
        id: 127,
        status: VisitStatus.ACCEPTED,
        visitDate: '2019-08-16T10:30:00.000Z'
      }
    ];
    const action = new GetVisitsSuccess({ visits, totalItems: 2 });
    const expResult = {
      ids: [...initialState.ids, ...visits.map(v => v.id)],
      entities: {
        ...initialState.entities,
        [visits[0].id]: visits[0],
        [visits[1].id]: visits[1]
      }
    } as State;

    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

  it('should return the existing store if the visit exists', () => {
    const action = new GetVisitsSuccess({ visits: [visit1], totalItems: 1 });

    const result = reducer(initialState, action);
    expect(result).toEqual(initialState);
  });

  it('should add only new visits if the visit already exist', () => {
    const visit3 = {
      createDate: '2019-08-15T07:30:00.000Z',
      description: 'Desc 1',
      id: 126,
      status: VisitStatus.ACCEPTED,
      visitDate: '2019-08-15T08:30:00.000Z'
    };
    const action = new GetVisitsSuccess({
      visits: [visit2, visit3],
      totalItems: 2
    });
    const expResult = {
      ids: [...initialState.ids, visit3.id],
      entities: {
        ...initialState.entities,
        [visit3.id]: visit3
      }
    } as State;

    const result = reducer(initialState, action);
    expect(result).toEqual(expResult);
  });

  it('should remove all visits when the GetVisitsFailure action is called', () => {
    const action = new GetVisitsFailure();
    const expectedResult = fromVisits.initialState;
    const result = reducer(initialState, action);

    expect(result).toEqual(expectedResult);
  });

  it('should remove all visits when the ResetVisits action is called', () => {
    const action = new GetVisitsFailure();
    const expectedResult = fromVisits.initialState;
    const result = reducer(initialState, action);

    expect(result).toEqual(expectedResult);
  });

  it('should update existing visits', () => {
    const expResult = {
      ids: [...initialState.ids],
      entities: {
        ...initialState.entities,
        [visit1.id]: { ...visit1, status: VisitStatus.CANCELED },
        [visit2.id]: { ...visit2, status: VisitStatus.CANCELED }
      }
    } as State;

    const action = new UpdateStatusSuccess([
      {
        id: visit1.id,
        changes: { status: VisitStatus.CANCELED }
      },
      {
        id: visit2.id,
        changes: { status: VisitStatus.CANCELED }
      }
    ]);
    const result = reducer(initialState, action);

    expect(result).toEqual(expResult);
  });
});
