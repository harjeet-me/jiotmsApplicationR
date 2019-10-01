import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBookingItem, defaultValue } from 'app/shared/model/booking-item.model';

export const ACTION_TYPES = {
  SEARCH_BOOKINGITEMS: 'bookingItem/SEARCH_BOOKINGITEMS',
  FETCH_BOOKINGITEM_LIST: 'bookingItem/FETCH_BOOKINGITEM_LIST',
  FETCH_BOOKINGITEM: 'bookingItem/FETCH_BOOKINGITEM',
  CREATE_BOOKINGITEM: 'bookingItem/CREATE_BOOKINGITEM',
  UPDATE_BOOKINGITEM: 'bookingItem/UPDATE_BOOKINGITEM',
  DELETE_BOOKINGITEM: 'bookingItem/DELETE_BOOKINGITEM',
  SET_BLOB: 'bookingItem/SET_BLOB',
  RESET: 'bookingItem/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBookingItem>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type BookingItemState = Readonly<typeof initialState>;

// Reducer

export default (state: BookingItemState = initialState, action): BookingItemState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_BOOKINGITEMS):
    case REQUEST(ACTION_TYPES.FETCH_BOOKINGITEM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BOOKINGITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BOOKINGITEM):
    case REQUEST(ACTION_TYPES.UPDATE_BOOKINGITEM):
    case REQUEST(ACTION_TYPES.DELETE_BOOKINGITEM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_BOOKINGITEMS):
    case FAILURE(ACTION_TYPES.FETCH_BOOKINGITEM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BOOKINGITEM):
    case FAILURE(ACTION_TYPES.CREATE_BOOKINGITEM):
    case FAILURE(ACTION_TYPES.UPDATE_BOOKINGITEM):
    case FAILURE(ACTION_TYPES.DELETE_BOOKINGITEM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_BOOKINGITEMS):
    case SUCCESS(ACTION_TYPES.FETCH_BOOKINGITEM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOOKINGITEM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BOOKINGITEM):
    case SUCCESS(ACTION_TYPES.UPDATE_BOOKINGITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BOOKINGITEM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/booking-items';
const apiSearchUrl = 'api/_search/booking-items';

// Actions

export const getSearchEntities: ICrudSearchAction<IBookingItem> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_BOOKINGITEMS,
  payload: axios.get<IBookingItem>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IBookingItem> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BOOKINGITEM_LIST,
  payload: axios.get<IBookingItem>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IBookingItem> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BOOKINGITEM,
    payload: axios.get<IBookingItem>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBookingItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BOOKINGITEM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBookingItem> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BOOKINGITEM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBookingItem> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BOOKINGITEM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
