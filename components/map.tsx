import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import Marker from './marker';


const SimpleMap = (props: any) => {
  const getMapOptions = (maps: any) => {
    return {
      disableDefaultUI: true,
      mapTypeControl: true,
      streetViewControl: true,
      styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'on' }] }],
    };
  };

  const { mapStyles, locations, mapCenter, zoomRate } = props;

  const [center, setCenter] = useState(mapCenter);
  const [zoom, setZoom] = useState(zoomRate);

  return (
      <div style={mapStyles}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBfE6ygYzCDsyohOgUlTj-lN4Npx4GYoKU' }}
        defaultCenter={center}
        defaultZoom={zoom}
        options={getMapOptions}
      >
        <Marker
          lat={mapCenter.lat}
          lng={mapCenter.lng}
          name="My Current Location"
          color="red"
        />
        {
          locations.map((hotel, index) =>
            <Marker
              key={index}
              id={index}
              lat={hotel.geometry.location.lat}
              lng={hotel.geometry.location.lng}
              name={hotel.name}
              color="blue"
              // onClick={() => console.log("You clicked me!")}
            />
          )
        }
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap;
