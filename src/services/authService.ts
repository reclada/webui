import { User, UserManager, UserManagerSettings } from 'oidc-client';

import { UserModel } from '../models/UserModel';

// Log.logger = console;
// Log.level = Log.DEBUG;

// const url = await fetchLoginUrl(); todo to be discussed with Andrey

class AuthService {
  readonly user = new UserModel();
  private hardcodedUser = {
    expires_at: 19219129192219,
    profile: {
      acr: '1',
      auth_time: 1625555617,
      azp: 'reclada-client',
      email_verified: false,
      family_name: 'admin1',
      given_name: 'admin1',
      jti: 'b0041b6f-6f49-4289-8d1a-6bf6db8ced96',
      name: 'admin1 admin1',
      preferred_username: 'admin1',
      session_state: '3ccb4a1a-bdfd-4934-bffb-9d356f8d0c19',
      sub: '944cee0b-038d-48bf-95a5-50a2a6a1e487',
      typ: 'ID',
      iss: 'trst5',
      exp: 1129129,
      aud: '',
      iat: 213123312,
      alg: 'HS256',
    },
    expired: false,
    scope: 'openid email profile',
    session_state: '3ccb4a1a-bdfd-4934-bffb-9d356f8d0c19',
    state: undefined,
    token_type: 'Bearer',
    expires_in: 23838283,
    scopes: ['openid', 'email', 'profile'],
    toStorageString: () => this.hardcodedUser.toString(),
    access_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    id_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    refresh_token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  };

  private oidcUser: User | null = null;

  async init() {
    this.loginUser(this.hardcodedUser);
  }

  login() {
    this.loginUser(this.hardcodedUser);
  }

  async logout() {
    this.user.logout();
  }

  async getAccessToken(): Promise<string | undefined> {
    return this.hardcodedUser.access_token;
  }

  private loginUser(user: User) {
    this.user.login(user.profile?.preferred_username || 'Unknown');
    this.oidcUser = user;
  }
}

export const authService = new AuthService();
