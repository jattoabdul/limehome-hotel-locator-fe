import {
  LOCATION_ONCHANGE,
  PROXIMITY_ONCHANGE,
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
  hotels: [],
  data: [],
};

export default (state = initialState, action) => {
  const {
    type,
    location,
    proximity,
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

    case HOTELS_SET: {
      // TODO: check to be sure hotels is an array
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
