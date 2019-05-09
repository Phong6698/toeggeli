import { toeggeliReducer, initialState } from './toeggeli.reducer';

describe('Toeggeli Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = toeggeliReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
