import { authService } from 'src/services/authService';
import { axiosCall } from 'src/utils/ajaxCall';

class ApiService {
  callRpcPost<T>(url: string, payload: any): Promise<T> {
    const token = authService.getAccessToken();

    if (token) {
      payload.accessToken = token;
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
