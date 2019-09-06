import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './slider.css'

const DEFAULT_SETTINGS = {
	infinite: true,
	slidesToShow: 1,
  	slidesToScroll: 1,
  	autoplay: true,
}

const CustomSlider = ({items, settings = {}}) => {
	const presets = {
		...DEFAULT_SETTINGS,
		...settings
	}
	return (
		<Slider {...presets}>
			{
				items.map((item, i) => 
					<div key={i}>
						<div className="slider-img" style={{backgroundImage: `url(${item.imgUrl})`}}>
						</div>
					</div>)
			}
		</Slider>
	)
}

export default CustomSlider