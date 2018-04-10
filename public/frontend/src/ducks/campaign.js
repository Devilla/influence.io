import { fromJS, Map } from 'immutable';

const action = name => `/campaign/${name}`;

export const FETCH = action('FETCH');
export const CREATE = action('CREATE');
export const UPDATE = action('UPDATE');
export const SUCCESS = action('SUCCESS');
export const FETCH_SUCCESS = action('FETCH_SUCCESS');

export const fetchCampaign = () => ({ type: FETCH });
export const createCampaign = (campaign) => ({ type: CREATE, campaign });
export const updateCampaign = (campaign) => ({ type: UPDATE, campaign });
export const successCampaign = (campaign) => ({ type: SUCCESS, campaign });
export const fetchSuccess = (campaign) => ({ type: FETCH_SUCCESS, campaign });

const initialState = fromJS({});

const campaign = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS:
      return state.set("campaigns", action.campaign);
    case SUCCESS:
      return state.set("campaign", action.campaign);
    default:
      return state
  }
}

export default campaign;
