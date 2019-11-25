import {
  LOCATION_ONCHANGE,
  PROXIMITY_ONCHANGE,
  SET_MAP_CENTER,
  HOTELS_SET,
  HOTELS_CLEAR,
} from '../constants/actionTypes';

export const initialState = {
  location: {
    value: '',
  },
  proximity: {
    value: '',
  },
  mapCenter: {
    value: {},
  },
  hotels: [],
  data: [],
};

export default (state = initialState, action) => {
  const {
    type,
    location,
    proximity,
    mapCenter,
    hotels
  } = action;

  switch (type) {
    case LOCATION_ONCHANGE: {
      return Object.assign({}, state, {
        location,
      });
    }
    case PROXIMITY_ONCHANGE: {
      return Object.assign({}, state, {
        proximity,
      });
    }
    case SET_MAP_CENTER: {
      return Object.assign({}, state, {
        mapCenter,
      });
    }
    case HOTELS_SET: {
      return Object.assign({}, state, {
        hotels: [],
        data: [...hotels],
      });
    }

    case HOTELS_CLEAR: {
      return Object.assign({}, state, {
        data: [],
      });
    }

    default: {
      return state;
    }
  }
};
