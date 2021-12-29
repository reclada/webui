import { authService } from 'src/services/authService';
import { axiosCall } from 'src/utils/ajaxCall';

class ApiService {
  async callRpcPost<T>(url: string, payload: any): Promise<T> {
    const token = await authService.getAccessToken();

    if (token) {
      payload.accessToken = token;
    }

    return axiosCall
      .post<T>(
        url,
        {
          data: payload,
          ver: 2,
        },
        {
          headers: { 'Content-Profile': 'api' },
        }
      )
      .then(res => res.data);
  }
}

export const apiService = new ApiService();
