import React, { useEffect, useState, Fragment } from 'react'
import GoogleMapReact from 'google-map-react'
import { Logo } from '../icons'
import Autocomplete from '../inputs/Autocomplete'
import './map.css'
import { GOOLGE_MAPS_KEY } from '../../config'

const geocode = options => {
  const url = 'https://maps.googleapis.com/maps/api/geocode/json?'
  const params = new URLSearchParams(Object.assign({}, {key: GOOLGE_MAPS_KEY}, options))

  return fetch(url + params, {
    method: 'GET',
    headers: {
    }
  }).then(async response => response.json())
}

const GoggleMap = ({lat, lng, address, onChange, readOnly = false, styles = {}, errorMessage, isValid }) => {
  const [ready, setReady] = useState(false)
  if (!lat || !lng) {
    lat = 50.61916542471506
    lng = 26.25215096590341
  }

	const handleClick = async ({lat, lng}) => {
    if (!readOnly) {
      const options = {
        latlng: `${lat},${lng}`,
        result_type: 'street_address|point_of_interest|park|natural_feature'
      }
      const { results: [result] } = await geocode(options)
      if (result) {
        const innerLat = result.geometry.location.lat
        const innerLng = result.geometry.location.lng
        const innerAddress = result.formatted_address
        onChange(innerAddress, innerLat, innerLng)
      }
    }
	}
	return (
    <Fragment>
  		<div className="map mb-2" style={styles}>
  			<GoogleMapReact
      		bootstrapURLKeys={{key: `${GOOLGE_MAPS_KEY}&libraries=places`}}
      		defaultCenter={{lat: 50.61916542471506, lng: 26.25215096590341}}
          center={{lat, lng}}
      		defaultZoom={readOnly ? 16 : 14}
          scrollwheel={false}
          onGoogleApiLoaded={() => setReady(true)}
          options={maps => {
            return {
              gestureHandling: readOnly ? 'none' : 'greedy',
              zoomControl: !readOnly,
              draggableCursor: readOnly ? 'default' : 'grab',
              zoomControlOptions: {
                style: maps.ZoomControlStyle.SMALL
              },
              scrollwheel: !readOnly,
              fullscreenControl: false,
            }
          }}
      		onClick={handleClick}>
          <Logo lat={lat} lng={lng} width={40} height={40} fill="#fbae17" />
      	</GoogleMapReact>
  		</div>
      {
        !readOnly
        ? <Autocomplete
            value={address}
            onReady={ready}
            onSelect={onChange}
            onChange={onChange}
            errorMessage={errorMessage}
            isValid={isValid} />
        : <div></div>
      }
    </Fragment>
	)
}

export default GoggleMap
