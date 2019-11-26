import configureMockStore from 'redux-mock-store'
import { onChangeProximity, onChangeLocation, setMapCenter } from '../actions';

const mockStore = configureMockStore()
const store = mockStore({})

describe('action creators', () => {
  it('creates LOCATION_ONCHANGE when changing location text is ongoing', () => {
    store.dispatch(
      onChangeLocation({
        value: '6.522500,3.321350'
      })
    );
    expect(store.getActions()).toMatchSnapshot();
  });
});
