import { combineReducers } from 'redux';
import limeHome, { initialState as limeHomeState } from './limehome';

export const initialState = {
  limeHome: limeHomeState
};

export default combineReducers({
  limeHome
});
