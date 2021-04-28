import { apiService } from 'api/apiService';

import { userService } from '../services/userService';
import { axiosCall, CancelToken } from '../utils/ajaxCall';

import { IRecladaFileObject } from './IRecladaObject';

interface IS3PathResponse {
  object: IRecladaFileObject;
  upload_url: {
    url: string;
    fields: {
      key: string;
      policy: string;
      signature: string;
      'Content-Type': string;
      AWSAccessKeyId: string;
    };
  };
}

interface getS3PathParams {
  accessToken: string;
  name: string;
  fileSize: number;
  fileType: string;
}

async function getS3Path(params: getS3PathParams) {
  return axiosCall
    .post<IS3PathResponse>(
      '/api/rpc/storage_generate_presigned_post',
      {
        data: {
          file_type: params.fileType,
          file_size: params.fileSize,
          object_name: params.name,
          access_token: params.accessToken,
        },
      },
      {
        headers: { 'Content-Profile': 'api' },
      }
    )
    .then(res => res.data);
}

interface UploadDatasourceOptions {
  onProgress?: (percent: number) => void;
  onSetCancel?: (cancel: () => void) => void;
}

export async function createFileDataSource(
  file: File,
  options: UploadDatasourceOptions = {}
) {
  const accessToken = userService.user.token;

  if (!accessToken) {
    throw new Error('Is not logged in');
  }

  const config = await getS3Path({
    accessToken,
    name: file.name,
    fileSize: file.size,
    fileType: file.type,
  });
  const form = new FormData();

  form.append('file', file);
  const fields = config.upload_url.fields;

  Object.keys(fields).forEach(key => {
    // @ts-ignore
    form.append(key, fields[key]);
  });

  return axiosCall.post(config.upload_url.url, form, {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: (event: ProgressEvent) => {
      if (event.lengthComputable) {
        options.onProgress?.(Math.round(event.loaded / event.total) * 100);
      }
    },
    cancelToken: new CancelToken(cancel => options.onSetCancel?.(() => cancel())),
  });
}

export async function getDatasourceDownloadLink(id: string): Promise<string> {
  const token = userService.user.token;

  return apiService
    .callRpcPost<{ url: string }>('/api/rpc/storage_generate_presigned_get', {
      object_id: id,
      access_token: token,
    })
    .then(res => res.url);
}
