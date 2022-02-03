import { authService } from 'src/services/authService';
import { axiosCall } from 'src/utils/ajaxCall';

interface Meta {
  ver?: number;
}

class ApiService {
  async callRpcPost<T>(url: string, payload: any, meta: Meta = {}): Promise<T> {
    const token = await authService.getAccessToken();

    if (token) {
      payload.accessToken = token;
    }

    return axiosCall
      .post<T>(
        url,
        {
          data: payload,
          ...meta,
        },
        {
          headers: { 'Content-Profile': 'api' },
        }
      )
      .then(res => res.data);
  }
}

export const apiService = new ApiService();
