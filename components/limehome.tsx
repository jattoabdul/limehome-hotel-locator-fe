import React from 'react';
import { compose } from 'recompose';
import getConfig from "next/config";
import { usePosition } from 'use-position';
import SimpleMap from './map';
import './limehome.scss';

const { publicRuntimeConfig } = getConfig();

const LimeHome= (props) => {
  const {
    location,
    proximity,
    data,
    onChangeLocation,
    onChangeProximity,
    setHotels,
    clearHotels,
  } = props;

  const mapStyles = {height: '100vh', width: '50vw',};

  // TODO: tune properly to get accurate current location
  const { latitude, longitude, error } = usePosition(true, {watch: true, enableHighAccuracy: true});
  let mapCenter;
  if (location.value === '' && latitude && longitude && !error) {
    onChangeLocation({
      value: `${latitude},${longitude}`,
    })
  }
  if (location.value !== '') {
    mapCenter = {lat: Number(location.value.split(',')[0]), lng: Number(location.value.split(',')[1])};
  } else {
    onChangeLocation({
      value: '6.522500,3.321350',
    })
    mapCenter = {lat: 6.522500, lng: 3.321350}; // fallback to my home co-ordinates as center
  }
  
  return (
    <React.Fragment>
      <div className="app-wrapper">
        <div>
          <h1>LimeHome</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            setHotels({
              apiKey: publicRuntimeConfig.gApiKey,
              location:  location.value,
              proximity: proximity.value,
              opennow: true
            });
          }}>
            <input
              type="text"
              value={location.value}
              onChange={e => onChangeLocation({
                value: e.target.value,
              })}
            />
            <br />
            <input
              type="submit"
              value="Locate Nearby Hotels"
            />
          </form>
          {/* proximity - input field */}
          {data.map((hotel, index) => (
            <p key={index}>
              {hotel.name}
            </p>
          ))}
        </div>
        <div>
          <SimpleMap mapStyles={mapStyles} locations={data} mapCenter={mapCenter} zoomRate={13} />
        </div>
      </div>
    </React.Fragment>
  );
};

// apiKey: 'AIzaSyBfE6ygYzCDsyohOgUlTj-lN4Npx4GYoKU'
export default compose()(LimeHome);
