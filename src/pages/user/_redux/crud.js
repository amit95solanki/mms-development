import axios from 'axios';

export const resource = 'https://backend-e-commerce-amit.onrender.com/api/v1/product/all';

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
  return axios.get(resource);
}

export function getItemById(id) {
  return axios.get(`${resource}/${id}`);
}

export function findItems(queryParams) {
  const { search, sort, category, price, page } = queryParams;

  let base = `?search=${search}&page=${page}`;

  const query = ({ price, sort, category }) => {
    if (price) base += `&price=${price}`;
    if (sort) base += `&sort=${sort}`;
    if (category) base += `&category=${category}`;

    return base;
  };

  const queryString = query({ price, search, sort, category, page });
  console.log('queryString', queryString);
  return axios.get(`${resource}${queryString}`);
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
