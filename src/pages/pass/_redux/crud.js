import axios from 'axios';

export const resource = '/api/passes';

// CREATE =>  POST: add a new item to the server
export function createItem(data) {
  return axios.post(resource, data);
}

// CLONE
export function cloneItem(id) {
  return axios.get(`${resource}/${id}/clone`);
}

// READ
export function getAllItems() {
  // return axios.get(`${resource}/all`);
  return axios.get(`auth-api/get-roles`);
}

export function getItemById(id) {
  return axios.get(`${resource}/${id}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findItems(queryParams) {
  return axios.get(`${resource}`);
}

export function findSelectItems(titleField) {
  return axios.get(`${resource}?filter={"fields":["id", "${titleField}"]}`);
}

// UPDATE => PATCH: update the data on the server
export function updateItem(data) {
  return axios.patch(`${resource}/${data.id}`, data);
}

// UPDATE Status
export function updateStatusForItems(ids, status) {
  return axios.patch(`${resource}?where={"id":{"inq":${JSON.stringify(ids)}}}`, {
    ids,
    status,
  });
}

// DELETE => delete the item from the server
export function deleteItem(id) {
  return axios.delete(`${resource}/${id}`);
}

// DELETE Items by ids
export function deleteItems(ids) {
  return axios.post(`${resource}/delete`, { ids });
}

export function getItems() {
  return axios.get('/get-roles');
}
