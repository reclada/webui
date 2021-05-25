import { User, UserManager, UserManagerSettings, Log } from 'oidc-client';

import { UserModel } from '../models/UserModel';

// Log.logger = console;
// Log.level = Log.DEBUG;

// const url = await fetchLoginUrl(); todo to be discussed with Andrey

const userManagerSettings: UserManagerSettings = {
  authority: 'http://keycloak:8080/auth/realms/reclada-users',
  client_id: 'reclada-client',
  redirect_uri: window.location.origin + '/signin-callback.html',
  popup_redirect_uri: window.location.origin + '/signin-popup-callback.html',
  silent_redirect_uri: window.location.origin + '/silent-callback.html',
  popup_post_logout_redirect_uri: window.location.origin + '/logout-callback.html',
  post_logout_redirect_uri: window.location.origin,
  response_type: 'code', // or "code" for "Authorization code flow"
  popupWindowFeatures: 'location=no,toolbar=no,width=800,height=600,left=100,top=100',
  automaticSilentRenew: true,
  // popupWindowTarget: '_self',
};

class AuthService {
  readonly user = new UserModel();
  private userManager = new UserManager(userManagerSettings);

  private oidcUser: User | null = null;

  async init() {
    try {
      const user = await this.userManager.getUser();

      console.log('user', user);

      if (user) {
        this.loginUser(user);
      }
    } catch (err) {
      console.error(err);
      this.user.logout();
    }
  }

  login() {
    this.userManager.signinPopup().then(user => this.loginUser(user));
  }

  async logout() {
    await this.userManager.signoutPopup();
    this.userManager.removeUser();
    this.user.logout();
  }

  async getAccessToken(): Promise<string | undefined> {
    const user = await this.userManager.getUser();

    return user?.access_token;
  }

  private loginUser(user: User) {
    this.user.login(user.profile?.preferred_username || 'Unknown');
    this.oidcUser = user;
  }
}

export const authService = new AuthService();
