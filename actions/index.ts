import axios from 'axios';
import {
  LOCATION_ONCHANGE,
  PROXIMITY_ONCHANGE,
  SET_MAP_CENTER,
  HOTELS_SET,
  HOTELS_CLEAR,
} from '../constants/actionTypes';

export const onChangeLocation = (location) => ({ type: LOCATION_ONCHANGE, location });

export const onChangeProximity = (proximity) => ({ type: PROXIMITY_ONCHANGE, proximity });

export const setMapCenter = (mapCenter) => ({ type: SET_MAP_CENTER, mapCenter });

export const setHotelsAction = (hotels) => ({ type: HOTELS_SET, hotels });

export const clearHotels = () => ({ type: HOTELS_CLEAR });

export const setHotels = config => async (dispatch) => {
  let parameters = `key=${config.apiKey}&location=${config.location}&radius=${config.proximity}&type=lodging&keyword=hotel`;
  return await axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?${parameters}`)
    .then(res => {
      const hotels = res.data;
      dispatch(setHotelsAction(hotels.results));
    })
};

export const onChangeLocationAndMapCenter = (location) => async (dispatch) => {
  dispatch(onChangeLocation(location))
  if (location.value !== '') {
    dispatch(setMapCenter({
      value: { lat: Number(location.value.split(',')[0]), lng: Number(location.value.split(',')[1]), }
    }))
  }
};
