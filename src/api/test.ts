import { axiosCall } from '../utils/ajaxCall';

export function testAPI(): void {
  const body = { query_string: 'C22' };

  try {
    axiosCall
      .post('api/rpc/suggest', body)
      .then(({ data }) => console.info(data))
      .catch(error => console.error(error));

    axiosCall
      .post('api/rpc/search', body)
      .then(({ data }) => console.info(data))
      .catch(error => console.error(error));
  } catch (err) {
    console.error(err);
  }
}
