export const queries = {
	chefsWithDistance: (lat, lng) => (
		`(((acos(sin((${lat}*pi()/180)) *
		sin((lat*pi()/180))+cos((${lat}*pi()/180)) *
		cos((lat*pi()/180)) * cos(((${lng}-
		lng)*pi()/180))))*180/pi())*60*1.1515*1.609344)`
	)
}