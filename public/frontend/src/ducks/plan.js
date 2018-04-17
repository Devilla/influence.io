import { fromJS, Map } from 'immutable';

const action = name => `/plan/${name}`;

export const FETCH = action('FETCH');
export const CREATE = action('CREATE');
export const UPDATE = action('UPDATE');
export const SUCCESS = action('SUCCESS');

export const fetchPlan = () => ({ type: FETCH });
export const successPlan = (plan) => ({ type: SUCCESS, plan });

const initialState = fromJS({});

const plan = (state = initialState, action) => {
  switch (action.type) {
    // case FETCH:
    //
    //   return state.set("plan", action.plan);
    case SUCCESS:
      return state.set("plan", action.plan);
    default:
      return state
  }
}

export default plan;
