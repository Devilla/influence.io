import { fromJS, Map } from 'immutable';

const action = name => `/notification/${name}`;

export const FETCH = action('FETCH');
export const CREATE = action('CREATE');
export const UPDATE = action('UPDATE');
export const SUCCESS = action('SUCCESS');
export const CREATE_SUCCESS = action('CREATE_SUCCESS');

export const fetchNotification = () => ({ type: FETCH });
export const createNotification = (notification) => ({ type: CREATE, notification });
export const updateNotification = (notification) => ({ type: UPDATE, notification });
export const successNotification = (notification) => ({ type: SUCCESS, notification });
export const createSuccess = (notification) => ({ type: CREATE_SUCCESS, notification });

const initialState = fromJS({
  notifications: [],
  notification: {}
});

const notification = (state = initialState, action) => {
  switch (action.type) {
    // case FETCH:
    //   return state.set("notification", action.notification);
    case SUCCESS:
      return state.set("notifications", action.notification);
    case CREATE_SUCCESS:
      return state.set("notification", action.notification);

    default:
      return state
  }
}

export default notification;
