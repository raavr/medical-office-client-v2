import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import * as VisitsActions from '../actions/visits.action';
import * as VisitsStatusActions from '../actions/visits-status.action';
import { Visit } from '../models/visit';

export const adapter: EntityAdapter<Visit> = createEntityAdapter<Visit>({
  selectId: (visit: Visit) => visit.id,
  sortComparer: false
});

export interface State extends EntityState<Visit> {}
export const initialState: State = adapter.getInitialState();

export function reducer(
  state = initialState,
  action:
    | VisitsActions.VisitsActionUnion
    | VisitsStatusActions.VisitsStatusActionUnion
): State {
  switch (action.type) {
    case VisitsActions.VisitsActionTypes.GetVisitsSuccess: {
      return adapter.addMany(action.payload.visits, state);
    }

    case VisitsActions.VisitsActionTypes.GetVisitsFailure: 
    case VisitsActions.VisitsActionTypes.ResetVisits: {
      return adapter.removeAll(state);
    }
    
    case VisitsStatusActions.VisitsStatusActionTypes.UpdateStatusSuccess: {
      return adapter.updateMany(action.payload, state);
    }

    case VisitsActions.VisitsActionTypes.CancelVisitSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    default: {
      return state;
    }
  }
}