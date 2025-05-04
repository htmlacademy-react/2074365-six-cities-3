import {NameSpace} from '@/constants/constants.ts';
import {
  getAuthCheckedStatus,
  getAuthError,
  getAuthorizationStatus,
  getUser
} from '@/store/user-process/user-process.selectors.ts';
import {mockState} from '@/store/mock.ts';


describe('User selectors', () => {
  it('should get authorizationStatus', () => {
    const authorizationStatus = getAuthorizationStatus(mockState);
    expect(authorizationStatus).toBe(mockState[NameSpace.User].authorizationStatus);
  });

  it('should get auth checked status', () => {
    expect(getAuthCheckedStatus(mockState)).toBe(true);
  });

  it('should get user', () => {
    expect(getUser(mockState)).toEqual(mockState[NameSpace.User].user);
  });

  it('should get error', () => {
    expect(getAuthError(mockState)).toBe(mockState[NameSpace.User].error);
  });
});
