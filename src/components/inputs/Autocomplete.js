import React, { useEffect } from 'react'
import TextField from './TextField'
import { GOOLGE_MAPS_KEY } from '../../config'

let autocompleteInput = null

const Autocomplete = ({value, onReady, init = false, onSelect, onChange, isValid, errorMessage}) => {
	useEffect(() => {
		if (onReady) {
			addGoogleListener()
		}
  	}, [onReady])
  	useEffect(() => {
  		if (init) {
  			initGoogle()
  		}
  	}, [])
  	const addGoogleListener = () => {
	    const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInput)
	    window.google.maps.event.addDomListener(autocomplete, 'place_changed', () => {
	      	const placeObj = autocomplete.getPlace()
	      	const lat = placeObj.geometry.location.lat()
        	const lng = placeObj.geometry.location.lng()
        	const address = placeObj.formatted_address
	      	onSelect(address, lat, lng)
	    })
  	}
  	const initGoogle = () => {
	  	if (!window.google || !window.google.maps || !window.google.maps.places) {
	      	const script = document.createElement('script')
	      	script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOLGE_MAPS_KEY}&libraries=places&language=en`
	      	script.onload = () => {
	        	addGoogleListener()
	      	}
	      	document.body.appendChild(script)
	    } else {
	      	addGoogleListener()
	    }
	}
	return (
		<TextField
			value={value}
			className="autocomplete"
			label="Address"
			inputRef={ref => autocompleteInput = ref}
			isValid={isValid}
			errorMessage={errorMessage}
			onChange={onChange} />
	)
}

export default Autocomplete
