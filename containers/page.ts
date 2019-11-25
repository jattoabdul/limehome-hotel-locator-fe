import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import {
  compose,
  pure,
} from 'recompose';
import {
  onChangeLocation,
  onChangeProximity,
  setHotelsAction,
  setHotels,
  onChangeLocationAndMapCenter,
  clearHotels
} from '../actions';
import {
  selectLimeHomeLocation,
  selectLimeHomeProximity,
  selectLimeHomeHotels,
  selectLimeHomeMapCenter,
  selectLimeHomeData,
} from '../selectors';
import Page from '../components/page';

export default compose(
  connect(
    createSelector(
      selectLimeHomeLocation(),
      selectLimeHomeProximity(),
      selectLimeHomeHotels(),
      selectLimeHomeMapCenter(),
      selectLimeHomeData(),
      (location, proximity, hotels, mapCenter, data) => ({ location, proximity, hotels, mapCenter, data }),
    ),
    {
      onChangeLocation,
      onChangeProximity,
      setHotelsAction,
      setHotels,
      onChangeLocationAndMapCenter,
      clearHotels,
    },
  ),
  pure,
)(Page);
