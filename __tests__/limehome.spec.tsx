import * as React from 'react'
import toJson from 'enzyme-to-json'
import {mount, shallow} from 'enzyme'
import LimeHome from '../components/limehome'
import sinon from 'sinon'

//Use array destructurig to create mock functions.
let [onChangeLocationAndMapCenter, setHotels, clearHotels] = new Array(3).fill(jest.fn());

function shallowSetup() {
  // Sample props to pass to our shallow render
  const props = {
    location: '6.522500,3.321350',
    proximity: '1500',
    mapCenter: {lat: 6.522500, lng: 3.321350},
    data: [{name: 'Test Hotel', vicinity: '5 ReactNative Road, Next City', geometry: {location: {lat: 7.522392, lng: 2.123450}}}],
    onChangeLocationAndMapCenter: onChangeLocationAndMapCenter,
    setHotels: setHotels,
    clearHotels: clearHotels
  }
  // wrapper instance around rendered output
  const enzymeWrapper = shallow(<LimeHome {...props} />);

  return {
    props,
    enzymeWrapper
  };
}



describe('Components', () => {
  describe('Shallow rendered LimeHome Component', () => {
    it('should render correctly', () => {
      const { enzymeWrapper, props } = shallowSetup();
      expect(toJson(enzymeWrapper)).toMatchSnapshot();
    });

    it('should render the component with all required elements', () => {
      // Setup wrapper and assign props.
      const { enzymeWrapper, props } = shallowSetup();
      expect(enzymeWrapper.containsMatchingElement(<div className="hambuger" />)).toBe(true);
      expect(enzymeWrapper.find('input')).toHaveLength(2);
      expect(enzymeWrapper.find('input.location-input')).toHaveLength(1);
      expect(enzymeWrapper.find('img.locate-me')).toHaveLength(1);
      expect(enzymeWrapper.find('div.hotel-result-list')).toHaveLength(1);
      expect(enzymeWrapper.find('div.hotel-result-item')).toHaveLength(1);
      expect(enzymeWrapper.find('h2').text()).toBe(props.data[0].name);
      expect(enzymeWrapper.find('.vicinity').text()).toBe(props.data[0].vicinity);
      expect(enzymeWrapper.find('div.map-wrapper')).toHaveLength(1);
    });
  });
})
