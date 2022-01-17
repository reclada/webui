import { fetchSourceById } from 'src/api/datasourcesService';
import { axiosCall, CancelToken } from 'src/utils/ajaxCall';

import { apiService } from './apiService';
import { IRecladaFile, RecladaObjectClass, RecladaPartialObject } from './IRecladaObject';
import { rpcUrls } from './rpcUrls';

interface IS3PathResponse {
  object: IRecladaFile;
  uploadUrl: {
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
  return apiService.callRpcPost<IS3PathResponse>(rpcUrls.generatePresignPost, {
    fileType: params.fileType,
    fileSize: params.fileSize,
    objectName: params.name,
  });
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

  const fields = config.uploadUrl.fields;

  Object.keys(fields).forEach(key => {
    // @ts-ignore
    form.append(key, fields[key]);
  });

  form.append('file', file);

  return axiosCall.post(config.uploadUrl.url, form, {
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
    .callRpcPost<{ url: string }>(rpcUrls.generatePresignGet, {
      objectId: id,
    })
    .then(res => res.url);
}

export async function updateDataSource(name: string, dataSource: Partial<IRecladaFile>) {
  const ds: RecladaPartialObject<IRecladaFile> = {
    '{class}': RecladaObjectClass.File,
    ...dataSource,
    '{attributes,name}': name,
  };

  return apiService.callRpcPost(rpcUrls.updateRecladaObject, ds, { ver: 2 });
}
