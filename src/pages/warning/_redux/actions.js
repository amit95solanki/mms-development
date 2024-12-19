import * as requestFromServer from './crud';
import { warningSlice, callTypes } from './slice';

const { actions } = warningSlice;

export const fetchItems = (queryParams) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findItems(queryParams)

    .then((response) => {
      // console.log(response.data);
      const { totalRecords: totalCount, data: entities } = response.data;
      console.log('servent', totalCount, entities);
      dispatch(actions.itemsFetched({ totalCount, entities }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Cms Management";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchSelectItems = (titleField) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.list }));
  return requestFromServer
    .findSelectItems(titleField)
    .then((response) => {
      const { data: searchItems } = response.data;
      dispatch(actions.selectItemsFetched({ searchItems }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Cms Management";
      dispatch(actions.catchError({ error, callType: callTypes.list }));
    });
};

export const fetchItem = (id) => (dispatch) => {
  if (!id) {
    return dispatch(actions.itemFetched({ data: undefined }));
  }

  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getItemById(id)
    .then((response) => {
      dispatch(actions.itemFetched({ data: response.data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't find Cms Management";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const createItem = (data) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .createItem(data)
    .then((response) => {
      dispatch(actions.itemCreated({ data: response.data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't create Cms Management";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const cloneItem = (id) => async (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .cloneItem(id)
    .then((response) => {
      dispatch(actions.itemCloned({ data: response.data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't clone Cms Management";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateItem = (data) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateItem(data)
    .then(() => {
      dispatch(actions.itemUpdated({ data }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update Cms Management";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const updateItemsStatus = (ids, status) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .updateStatusForItems(ids, status)
    .then(() => {
      dispatch(actions.itemsStatusUpdated({ ids, status }));
    })
    .catch((error) => {
      error.clientMessage = "Can't update Cms Management status";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteItems = (ids) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteItems(ids)
    .then(() => {
      dispatch(actions.itemsDeleted({ ids }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete Cms Management";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const deleteItem = (id) => (dispatch) => {
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .deleteItem(id)
    .then((response) => {
      dispatch(actions.itemDeleted({ id }));
    })
    .catch((error) => {
      error.clientMessage = "Can't delete Cms Management";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};
