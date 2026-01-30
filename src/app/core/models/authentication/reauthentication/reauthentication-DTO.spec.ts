import { IReauthenticationDTO } from './reauthentication-DTO';

/**
 * `IRefreshAccessTokenDTO` object for testing
 */
export const TestReauthenticationDTO: IReauthenticationDTO = {
  refreshToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30',
  refreshExpire: Date.now() + 800000,
};
