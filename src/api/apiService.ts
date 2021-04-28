import { userService } from 'services/userService';

import { axiosCall } from '../utils/ajaxCall';

class ApiService {
  callRpcPost<T>(url: string, payload: any): Promise<T> {
    const token = userService.user.token;

    if (token) {
      payload.access_token = token;
    }

    return axiosCall
      .post<T>(
        url,
        {
          data: payload,
        },
        {
          headers: { 'Content-Profile': 'api' },
        }
      )
      .then(res => res.data);
  }
}

export const apiService = new ApiService();
