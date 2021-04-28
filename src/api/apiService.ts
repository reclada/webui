import { axiosCall } from '../utils/ajaxCall';

class ApiService {
  callRpcPost<T>(url: string, payload: any): Promise<T> {
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
