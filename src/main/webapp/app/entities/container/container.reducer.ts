import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IContainer, defaultValue } from 'app/shared/model/container.model';

export const ACTION_TYPES = {
  SEARCH_CONTAINERS: 'container/SEARCH_CONTAINERS',
  FETCH_CONTAINER_LIST: 'container/FETCH_CONTAINER_LIST',
  FETCH_CONTAINER: 'container/FETCH_CONTAINER',
  CREATE_CONTAINER: 'container/CREATE_CONTAINER',
  UPDATE_CONTAINER: 'container/UPDATE_CONTAINER',
  DELETE_CONTAINER: 'container/DELETE_CONTAINER',
  RESET: 'container/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IContainer>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ContainerState = Readonly<typeof initialState>;

// Reducer

export default (state: ContainerState = initialState, action): ContainerState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_CONTAINERS):
    case REQUEST(ACTION_TYPES.FETCH_CONTAINER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONTAINER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONTAINER):
    case REQUEST(ACTION_TYPES.UPDATE_CONTAINER):
    case REQUEST(ACTION_TYPES.DELETE_CONTAINER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_CONTAINERS):
    case FAILURE(ACTION_TYPES.FETCH_CONTAINER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONTAINER):
    case FAILURE(ACTION_TYPES.CREATE_CONTAINER):
    case FAILURE(ACTION_TYPES.UPDATE_CONTAINER):
    case FAILURE(ACTION_TYPES.DELETE_CONTAINER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_CONTAINERS):
    case SUCCESS(ACTION_TYPES.FETCH_CONTAINER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONTAINER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONTAINER):
    case SUCCESS(ACTION_TYPES.UPDATE_CONTAINER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONTAINER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/containers';
const apiSearchUrl = 'api/_search/containers';

// Actions

export const getSearchEntities: ICrudSearchAction<IContainer> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_CONTAINERS,
  payload: axios.get<IContainer>(`${apiSearchUrl}?query=${query}`)
});

export const getEntities: ICrudGetAllAction<IContainer> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONTAINER_LIST,
  payload: axios.get<IContainer>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IContainer> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONTAINER,
    payload: axios.get<IContainer>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IContainer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONTAINER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IContainer> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONTAINER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IContainer> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONTAINER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
