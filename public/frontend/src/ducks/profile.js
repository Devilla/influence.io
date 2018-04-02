import { fromJS, Map } from 'immutable';

const action = name => `/profile/${name}`;

export const FETCH = action('FETCH');
export const CREATE = action('CREATE');
export const UPDATE = action('UPDATE');
export const SUCCESS = action('SUCCESS');

export const fetchProfile = () => ({ type: FETCH });
export const createProfile = (profile) => ({ type: CREATE, profile });
export const updateProfile = (profile) => ({ type: UPDATE, profile });
export const successProfile = (profile) => ({ type: SUCCESS, profile });

const initialState = fromJS({});

const profile = (state = initialState, action) => {
  switch (action.type) {
    // case FETCH:
    //   return state.set("profile", action.profile);
    case SUCCESS:
      return state.set("profile", action.profile);
    default:
      return state
  }
}

export default profile;
