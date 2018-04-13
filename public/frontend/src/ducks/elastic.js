import { fromJS, Map } from 'immutable';

const action = name => `/elastic/${name}`;

export const FETCH = action('FETCH');
export const FETCH_SUCCESS = action('FETCH_SUCCESS');

export const fetchElastic = (query) => ({ type: FETCH, query });
export const fetchSuccess = (elastic) => ({ type: FETCH_SUCCESS, elastic });

const initialState = fromJS({});

const elastic = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return state.set("elastic", action.elastic);
    default:
      return state
  }
}

export default elastic;
