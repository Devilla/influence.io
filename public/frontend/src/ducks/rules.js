import { fromJS, Map } from 'immutable';
const action = name => `/rules/${name}`;

export const FETCH = action('FETCH');
export const CREATE = action('CREATE');
export const UPDATE = action('UPDATE');
export const CREATE_SUCCESS = action('CREATE_SUCCESS');
export const FETCH_SUCCESS = action('FETCH_SUCCESS');

export const fetchRules = () => ({ type: FETCH });
export const createRules = (rules) => ({ type: CREATE, rules });
export const updateRules = (rules) => ({ type: UPDATE, rules });
export const successRules = (rules) => ({ type: CREATE_SUCCESS, rules });
export const fetchSuccess = (rules) => ({ type: FETCH_SUCCESS, rules });

const initialState = fromJS({});

const rules = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return state.set("rules", action.rules);
    case CREATE_SUCCESS:
      return state.set("rules", action.rules);
    default:
      return state
  }
}

export default rules;
