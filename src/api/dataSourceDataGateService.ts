import { v4 } from 'uuid';

import { userService } from '../services/userService';
import { axiosCall } from '../utils/ajaxCall';

interface IS3PathResponse {
  url: string;
  fields: {
    key: string;
    policy: string;
    signature: string;
    'Content-Type': string;
    AWSAccessKeyId: string;
  };
}

const S3_URL = 'http://localhost:9000';
const BUCKET = 'sample';

async function getS3Path(token: string, name: string) {
  return axiosCall
    .post<IS3PathResponse>(
      '/api/rpc/storage_generate_presigned_post',
      {
        data: {
          endpoint_url: S3_URL,
          region_name: 'us-east-1',
          access_key_id: 'minio',
          secret_access_key: 'password',
          file_type: 'application/pdf',
          file_size: '50000000',
          bucket_name: BUCKET,
          object_name: name,
          access_token: token,
        },
      },
      {
        headers: { 'Content-Profile': 'api' },
      }
    )
    .then(res => res.data);
}

async function uploadFile(file: Blob, name: string, token: string) {
  const config = await getS3Path(token, name);
  const form = new FormData();

  form.append('file', file);
  const fields = config.fields;

  Object.keys(fields).forEach(key => {
    // @ts-ignore
    form.append(key, fields[key]);
  });

  return axiosCall.post(config.url, form, {
    headers: { 'content-type': 'multipart/form-data' },
    onUploadProgress: event => console.log('upload', event),
  });
}

async function callRpc(name: string, originalName: string, token: string) {
  const uri = `${S3_URL}/minio/download/${BUCKET}/${name}`;

  return axiosCall
    .post(
      '/api/rpc/reclada_object_create',
      {
        data: {
          class: 'File',
          attrs: {
            name: originalName,
            checksum: 'asdfasdfasdf',
            mimeType: 'application/pdf',
            uri: uri,
          },
          access_token: token,
        },
      },
      {
        headers: { 'Content-Profile': 'api' },
      }
    )
    .then(res => {
      console.log('reclada_object_create', res.data);

      return uri;
    });
}

export async function createFileDataSource(file: File) {
  const token = userService.user.token;

  if (!token) {
    throw new Error('Is not logged in');
  }

  const name = `${v4()}.pdf`;

  await uploadFile(file, name, token);

  return callRpc(name, file.name, token);
}
