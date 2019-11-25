import { createSelector } from 'reselect';

export const selectState = () => state => state.limeHome;

export const selectLimeHomeLocation = () =>
  createSelector(
    selectState(),
    limeHome => limeHome.location,
  );

export const selectLimeHomeProximity = () =>
  createSelector(
    selectState(),
    limeHome => limeHome.proximity,
  );

export const selectLimeHomeMapCenter = () =>
  createSelector(
    selectState(),
    limeHome => limeHome.mapCenter,
  );

export const selectLimeHomeHotels = () =>
  createSelector(
    selectState(),
    limeHome => limeHome.hotels,
  );

export const selectLimeHomeData = () =>
  createSelector(
    selectState(),
    limeHome => limeHome.data,
  );
