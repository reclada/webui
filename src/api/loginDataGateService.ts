import { axiosCall } from '../utils/ajaxCall';

export async function fetchLoginUrl(): Promise<string> {
  return axiosCall
    .post<{ login_url: string }>(
      '/api/rpc/get_login_url',
      {
        data: {},
      },
      {
        headers: { 'Content-Profile': 'reclada_user' },
      }
    )
    .then(res => res.data.login_url);
}

export interface ITokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string; // Bearer

  // not in use
  expires_in: number; // 300
  refresh_expires_in: number; // 1800
  scope: string;
  session_state: string;
  ['not-before-policy']: number;
}

export async function fetchAuthToken(code: string): Promise<ITokenResponse> {
  return axiosCall
    .post<ITokenResponse>(
      '/api/rpc/get_token',
      {
        data: { code },
      },
      {
        headers: { 'Content-Profile': 'reclada_user' },
      }
    )
    .then(res => res.data);
}

/*
JWT Token
{
  "exp": 1617880405,
  "iat": 1617880105,
  "auth_time": 1617880090,
  "jti": "49ebfe49-f88b-4b60-b19e-896ea48571a9",
  "iss": "http://keycloak:8080/auth/realms/reclada-users",
  "aud": "account",
  "sub": "0fb381a8-8d5b-4efb-b154-33060fec6f1f",
  "typ": "Bearer",
  "azp": "reclada-client",
  "session_state": "7a9af362-9fb2-4be5-aa87-cebb9aa6c941",
  "acr": "1",
  "allowed-origins": [
    "http://reclada.test"
  ],
  "realm_access": {
    "roles": [
      "offline_access",
      "uma_authorization"
    ]
  },
  "resource_access": {
    "account": {
      "roles": [
        "manage-account",
        "manage-account-links",
        "view-profile"
      ]
    }
  },
  "scope": "profile email",
  "email_verified": true,
  "name": "tt tt",
  "preferred_username": "test",
  "given_name": "tt",
  "family_name": "tt",
  "email": "test@example.com"
}
 */
