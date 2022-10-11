import { serverErrors } from './server-errors';

describe('serverErrors', () => {
  it('should work', () => {
    expect(serverErrors()).toEqual('server-errors');
  });
});
