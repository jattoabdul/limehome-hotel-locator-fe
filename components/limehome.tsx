import React from 'react';
import { compose } from 'recompose';
import getConfig from "next/config";
import { usePosition } from 'use-position';
import SimpleMap from './map';
import './limehome.scss';

const { publicRuntimeConfig } = getConfig();

const LimeHome = (props: any) => {
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

  const { latitude, longitude, error } = usePosition(true, {watch: true, enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
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
        <div className="list-wrapper">
          <div className="res">
            <div className="header-wrapper">
              <img src="/hotel.svg" alt="logo"/>
              <div className="hambuger" />
            </div>
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
                type="search"
                value={location.value}
                onChange={e => onChangeLocation({
                  value: e.target.value,
                })}
              />
              <input
                type="submit"
                value="Locate Nearby Hotels"
              />
            </form>
          </div>
          <div className="hotel-result-list">
            {data.map((hotel, index) => (
              <div className="hotel-result-item" key={index}>
                <img src="https://d19yo8val8huli.cloudfront.net/hotels/v7/img/featured/exquisite-suites.jpg" alt="hotel img"/>
                <h2>{hotel.name}</h2>
                <p>{hotel.vicinity}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="map-wrapper">
          <SimpleMap mapStyles={mapStyles} locations={data} mapCenter={mapCenter} zoomRate={13} />
        </div>
      </div>
    </React.Fragment>
  );
};

// apiKey: 'AIzaSyBfE6ygYzCDsyohOgUlTj-lN4Npx4GYoKU'
export default compose()(LimeHome);
