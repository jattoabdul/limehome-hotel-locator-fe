import * as React from 'react';
import { compose } from 'recompose';
import getConfig from "next/config";
import SimpleMap from './map';
import './limehome.scss';

const { publicRuntimeConfig } = getConfig();

const LimeHome = (props: any) => {
  const {
    location,
    proximity,
    mapCenter,
    data,
    onChangeLocationAndMapCenter,
    setHotels,
    clearHotels,
  } = props;

  const getCurrentLocationCordinates = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        onChangeLocationAndMapCenter({
            value: `${position.coords.latitude},${position.coords.longitude}`,
          })
       }, (error_message) => {
        onChangeLocationAndMapCenter({
          value: '6.522500,3.321350',
        })
      }
      );
    } else {
      onChangeLocationAndMapCenter({
        value: '6.522500,3.321350',
      })
    }
  };

  const mapStyles = {height: '100vh', width: '100%'};

  // TODO: add proximity input field and allow users to adjust the value
  // TODO: write tests

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
              if (location.value === '') return;
              setHotels({
                apiKey: publicRuntimeConfig.gApiKey,
                location:  location.value,
                proximity: proximity.value,
                opennow: true
              });
            }}>
              <input
                type="search"
                className="location-input"
                value={location.value}
                onChange={e => onChangeLocationAndMapCenter({
                  value: e.target.value,
                })}
              />
              <input
                type="submit"
                value="Locate Nearby Hotels"
              />
              <img
                onClick={() => getCurrentLocationCordinates()}
                className="locate-me"
                src="/target.svg"
                alt="return to location"
                title="Locate me"
              />
            </form>
          </div>
          <div className="hotel-result-list">
            {data.map((hotel, index) => (
              <div className="hotel-result-item" key={index}>
                <img src="https://d19yo8val8huli.cloudfront.net/hotels/v7/img/featured/exquisite-suites.jpg" alt="hotel img"/>
                <h2>{hotel.name}</h2>
                <p className="vicinity">{hotel.vicinity}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="map-wrapper">
          <SimpleMap mapStyles={mapStyles} locations={data} mapCenter={mapCenter.value} zoomRate={13} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default compose()(LimeHome);
