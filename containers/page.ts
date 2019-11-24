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
  clearHotels
} from '../actions';
import {
  selectLimeHomeLocation,
  selectLimeHomeProximity,
  selectLimeHomeHotels,
  selectLimeHomeData,
} from '../selectors';
import Page from '../components/page';

export default compose(
  connect(
    createSelector(
      selectLimeHomeLocation(),
      selectLimeHomeProximity(),
      selectLimeHomeHotels(),
      selectLimeHomeData(),
      (location, proximity, hotels, data) => ({ location, proximity, hotels, data }),
    ),
    {
      onChangeLocation,
      onChangeProximity,
      setHotelsAction,
      setHotels,
      clearHotels,
    },
  ),
  pure,
)(Page);
