import { alertReducer, initialState } from './alert.reducer';
import { AlertShow, AlertReset } from '../actions/alert.actions';
import { ALERT_TYPE } from '../components/alert/alert-factory.service';

describe('Alert Reducer', () => {
  it('should return the default state', () => {
    const state = Object.assign({}, initialState);
    const action = {} as any;
    const result = alertReducer(state, action);

    expect(result).toBe(state);
  });

  it('should set message and alertType', () => {
    const action = new AlertShow({
      message: 'OK',
      alertType: ALERT_TYPE.SUCCESS
    });
    const expectedResult = {
      message: 'OK',
      alertType: ALERT_TYPE.SUCCESS
    };
    const result = alertReducer(initialState, action);
    expect(result).toEqual(expectedResult);
  });

  it('should return the default state when the AlertReset action called', () => {
    const action = new AlertReset();

    const result = alertReducer(initialState, action);
    expect(result).toEqual(initialState);
  });
});
