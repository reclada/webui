const prefix = process.env.PUBLIC_URL || '';

export const rpcUrls = {
  createRecladaObject: `${prefix}/api/rpc/reclada_object_create`,
  getRecladaObjectList: `${prefix}/api/rpc/reclada_object_list`,
  getRecladaObjectsFromList: `${prefix}/api/rpc/reclada_object_list_related`,
  addToList: `${prefix}/api/rpc/reclada_object_list_add`,
  removeFromList: `${prefix}/api/rpc/reclada_object_list_drop`,
  updateRecladaObject: `${prefix}/api/rpc/reclada_object_update`,
};
