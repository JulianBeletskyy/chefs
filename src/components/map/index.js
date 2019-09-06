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

const GoggleMap = ({lat, lng, address, onChange}) => {
  const [ready, setReady] = useState(false)
  if (!lat || !lng) {
    lat = 50.61916542471506
    lng = 26.25215096590341
  }

	const handleClick = async ({lat, lng}) => {
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
	return (
    <Fragment>
  		<div className="map">
  			<GoogleMapReact
      		bootstrapURLKeys={{key: `${GOOLGE_MAPS_KEY}&libraries=places`}}
      		defaultCenter={{lat: 50.61916542471506, lng: 26.25215096590341}}
          center={{lat, lng}}
      		defaultZoom={14}
          scrollwheel={false}
          onGoogleApiLoaded={() => setReady(true)}
          options={maps => {
            return {
              zoomControl: true,
              zoomControlOptions: {
                style: maps.ZoomControlStyle.SMALL
              },
              fullscreenControl: false,
            }
          }}
      		onClick={handleClick}>
          <Logo lat={lat} lng={lng} width={40} height={40} fill="#fbae17" />
      	</GoogleMapReact>
  		</div>
      <Autocomplete value={address} onReady={ready} onSelect={onChange} onChange={onChange} />
    </Fragment>
	)
}

export default GoggleMap
