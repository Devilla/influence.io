import { fromJS, Map } from 'immutable';

const action = name => `/configuration/${name}`;

export const FETCH = action('FETCH');
export const FETCH_CAMPAIGN_CONFIG = action('FETCH_CAMPAIGN_CONFIG');
export const CREATE = action('CREATE');
export const UPDATE = action('UPDATE');
export const SUCCESS = action('SUCCESS');
export const CREATE_SUCCESS = action('CREATE_SUCCESS');
export const CLEAR = action('CLEAR');

export const fetchConfiguration = () => ({ type: FETCH });
export const fetchCampaignConfiguration = (campId , notifId) => ({ type: FETCH_CAMPAIGN_CONFIG, campId, notifId });
export const createConfiguration = (configuration) => ({ type: CREATE, configuration });
export const updateConfiguration = (configuration) => ({ type: UPDATE, configuration });
export const successConfiguration = (configuration) => ({ type: SUCCESS, configuration });
export const createSuccess = (configuration) => ({ type: CREATE_SUCCESS, configuration });
export const clearConfiguration = () => ({ type: CLEAR });

const initialConfig = {
  activity: true,
  panelStyle: { // TODO: Take style values from server
    radius: 35,
    borderWidth: 0,
    borderColor: {
      r: 200,
      g: 200,
      b: 200,
      a: 1
    },
    shadow: 0,
    blur: 2,
    color: {
      r: 0,
      g: 0,
      b: 0
    },
    backgroundColor: {
      r: 255,
      g: 255,
      b: 255,
      a: 1
    },
    fontFamily: 'inherit',
    fontWeight: 'normal'
  },
  contentText: ''
};

const initialState = fromJS({
  // configurations: [],
  configuration: initialConfig
});

const configuration = (state = initialState, action) => {
  switch (action.type) {
    // case FETCH:
    //   return state.set("configuration", action.configuration);
    case SUCCESS:
      return state.set("configurations", action.configuration);
    case CREATE_SUCCESS:
      return state.set("configuration", action.configuration);
    case CLEAR:
      return state.set("configuration", initialConfig);

    default:
      return state
  }
}

export default configuration;
