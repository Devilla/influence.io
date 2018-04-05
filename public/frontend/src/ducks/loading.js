import { Map } from 'immutable';

const action = name => `zikher/modals/${name}`;
const LOAD = action('LOAD');
const LOADED = action('LOADED');

export const load = () => ({ type: LOAD });
export const loaded = () => ({ type: LOADED });

const initialState = Map({
    state: false,
});

const loading = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      return state.set('state', true);

    case LOADED:
      return state.set('state', false);

    default:
      return state;
  }
};

export default loading;
