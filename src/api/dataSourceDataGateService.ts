import { fetchSourceById } from 'src/api/datasourcesService';
import { axiosCall, CancelToken } from 'src/utils/ajaxCall';

import { apiService } from './apiService';
import { IRecladaFile, RecladaObjectClass, RecladaPartialObject } from './IRecladaObject';
import { rpcUrls } from './rpcUrls';

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
  // return apiService
  //   .callRpcPost<{ url: string }>(rpcUrls.generatePresignGet, {
  //     objectId: id,
  //   })
  //   .then(res => res.url);
  //!!!!!!!!!!!!!
  return fetchSourceById(id, RecladaObjectClass.DataSource).then(res => {
    const uri = res?.[0]?.attrs?.uri;

    if (uri) {
      const url = new URL(uri);

      if (url.protocol === 's3:') {
        url.protocol = 'https:';
        url.hostname += '.s3.amazonaws.com';
      }

      return url.href;
    }
    throw new Error(`id not found: ${id}`);
  });
}

export async function updateDataSource(
  name: string,
  dataSource: { id: string; checksum: string; mimeType: string }
) {
  const ds: RecladaPartialObject<IRecladaFile> = {
    id: dataSource.id,
    class: RecladaObjectClass.File,
    attrs: {
      name: name,
      checksum: dataSource.checksum,
      mimeType: dataSource.mimeType,
    },
  };

  return apiService.callRpcPost(rpcUrls.updateRecladaObject, ds);
}
