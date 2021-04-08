import { fetchAuthToken, fetchLoginUrl } from '../api/loginDataGateService';
import { UserModel } from '../models/UserModel';

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

    console.log('set is logged');
    this.user.login(token, jwt.name);
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
