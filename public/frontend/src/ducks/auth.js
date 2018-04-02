import { fromJS, Map, List } from 'immutable';

const action = name => `/auth/${name}`;

export const FETCH = action('FETCH');
export const FETCHROLES = action('FETCHROLES');
export const LOGIN_SUCCESS = action('LOGIN_SUCCESS');
export const CHECK_TOKEN_EXISTS = action('CHECK_TOKEN_EXISTS');
export const FETCH_USER_SUCCESS = action('FETCH_USER_SUCCESS');
export const FETCH_ROLES_SUCCESS = action('FETCH_ROLES_SUCCESS');
export const UPDATE = action('UPDATE');

export const fetchUser = () => ({ type: FETCH });
export const fetchRoles = () => ({ type: FETCHROLES });
export const fetchUserSuccess = (user) => ({ type: FETCH_USER_SUCCESS, user });
export const updateUser = (user) => ({ type: UPDATE, user });
export const fetchRolesSuccess = (roles) => ({ type: FETCH_ROLES_SUCCESS, roles });

export const loginSuccess = (res) => ({ type: LOGIN_SUCCESS, res });
export const checkTokenExists = (token) => ({ type: CHECK_TOKEN_EXISTS, token });

const initialState = fromJS({
  user: {},
  roles: List([])
});

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.set('user', action.res.user);
    case FETCH_USER_SUCCESS:
      return state.set('user', action.user);
    case FETCH_ROLES_SUCCESS:
      return state.set('roles', action.roles.roles);
    default:
      return state
  }
}

export default auth;
