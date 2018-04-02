import { fromJS, Map } from 'immutable';

const action = name => `/payment/${name}`;

export const FETCH = action('FETCH');
export const CREATE = action('CREATE');
export const UPDATE = action('UPDATE');
export const SUCCESS = action('SUCCESS');

export const fetchPayment = () => ({ type: FETCH });
export const createPayment = (payment) => ({ type: CREATE, payment });
export const updatePayment = (payment) => ({ type: UPDATE, payment });
export const successPayment = (payment) => ({ type: SUCCESS, payment });

const initialState = fromJS({});

const payment = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS:
      return state.set("payment", action.payment);
    default:
      return state
  }
}

export default payment;
