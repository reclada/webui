import axios from 'axios';

export const axiosCall = axios.create();

axiosCall.interceptors.response.use(
  result => result,
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const { code, message = 'Request error' } = error.response.data || {};

      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({
        code,
        message,
      });
    }

    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
    } else {
      // Something happened in setting up the request that triggered an Error
    }

    if (axios.isCancel(error)) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject('cancelled');
    }

    return Promise.reject(error);
  }
);

export function paramsSerializer(params: Record<string, string | Object>) {
  return Object.entries(params)
    .map(([key, value]) => {
      if (!value) {
        return false;
      }

      if (typeof value !== 'object') {
        return `${key}=${value}`;
      }

      return Object.entries(value)
        .map(([subkey, subvalue]) => {
          if (typeof subvalue !== 'object') {
            return `${key}[${subkey}]=${subvalue}`;
          }

          return Object.entries(subvalue)
            .map(([subsubkey, susubbvalue]) => {
              return `${key}[${subkey}][${subsubkey}]=${susubbvalue}`;
            })
            .join('&');
        })
        .join('&');
    })
    .filter(item => item)
    .join('&');
}
