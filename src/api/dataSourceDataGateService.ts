import { axiosCall, CancelToken } from 'src/utils/ajaxCall';

import { apiService } from './apiService';
import { IRecladaFile } from './IRecladaObject';

interface IS3PathResponse {
  object: IRecladaFile;
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
  name: string;
  fileSize: number;
  fileType: string;
}

async function getS3Path(params: getS3PathParams) {
  return apiService.callRpcPost<IS3PathResponse>(
    '/api/rpc/storage_generate_presigned_post',
    {
      file_type: params.fileType,
      file_size: params.fileSize,
      object_name: params.name,
    }
  );
}

interface UploadDatasourceOptions {
  onProgress?: (percent: number) => void;
  onSetCancel?: (cancel: () => void) => void;
}

export async function createFileDataSource(
  file: File,
  options: UploadDatasourceOptions = {}
) {
  const config = await getS3Path({
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
  return apiService
    .callRpcPost<{ url: string }>('/api/rpc/storage_generate_presigned_get', {
      object_id: id,
    })
    .then(res => res.url);
}
