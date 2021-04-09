import { fetchAuthToken, fetchLoginUrl } from '../api/loginDataGateService';
import { UserModel } from '../models/UserModel';

interface ISessionData {
  token: string;
  name: string;
  expired: number;
}

class UserService {
  readonly user = new UserModel();

  async login() {
    const url = await fetchLoginUrl();

    window.location.href = url;
  }

  async fetchToken(code: string) {
    const resp = await fetchAuthToken(code);
    const token = resp.access_token;
    const jwt = parseJwt(resp.access_token);
    const name = jwt.name;

    this.storeSession({
      token,
      name,
      expired: jwt.exp,
    });
    this.user.login(token, name);
  }

  logout() {
    this.clearSession();
    this.user.logout();
  }

  restoreSession() {
    try {
      const sessionData = window.localStorage.getItem('session');

      if (sessionData) {
        const session: ISessionData = JSON.parse(sessionData);

        if (session.expired > Date.now()) {
          this.user.logout();
        } else {
          this.user.login(session.token, session.name);
        }
      }
    } catch {
      this.user.logout();
    }
  }

  private storeSession(sessionData: ISessionData) {
    window.localStorage.setItem('session', JSON.stringify(sessionData));
  }

  private clearSession() {
    window.localStorage.setItem('session', '');
  }
}

export const userService = new UserService();

interface IJwtData {
  exp: number; // date.now()
  iat: number; // date.now()
  auth_time: number; // date.now()
  email_verified: string;
  name: string;
  preferred_username: string;
  given_name: string;
  family_name: string;
  email: string;
}

function parseJwt(token: string): IJwtData {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (char) {
        return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload) as IJwtData;
}
