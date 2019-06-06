import { mediaReducer } from './media.reducers';
import { MediaChanged } from '../actions/media.actions';

describe('Media Reducer', () => {
  it('should return the default state', () => {
    const state = {};
    const action = {} as any;
    const result = mediaReducer(state, action);

    expect(result).toBe(state);
  });

  it('should set media state', () => {
    const action = new MediaChanged({ '(max-width: 960px)': true });
    const expectedResult = {
      '(max-width: 960px)': true
    };
    const result = mediaReducer({}, action);
    expect(result).toEqual(expectedResult);
  });
});
