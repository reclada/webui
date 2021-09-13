const prefix = process.env.PUBLIC_URL || '';

export const rpcUrls = {
  createRecladaObject: `${prefix}/api/rpc/reclada_object_create`,
  getRecladaObjectList: `${prefix}/api/rpc/reclada_object_list`,
  getRecladaObjectsFromList: `${prefix}/api/rpc/reclada_object_list_related`,
  addToList: `${prefix}/api/rpc/reclada_object_list_add`,
  removeFromList: `${prefix}/api/rpc/reclada_object_list_drop`,
  updateRecladaObject: `${prefix}/api/rpc/reclada_object_update`,
  generatePresignPost: `${prefix}/api/rpc/storage_generate_presigned_post`,
  generatePresignGet: `${prefix}/api/rpc/storage_generate_presigned_get`,
  getObjectSchema: `${prefix}/api/rpc/reclada_object_schema`,
};
