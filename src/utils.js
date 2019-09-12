export const randomId = () => {
	return '_' + Math.random().toString(36).substr(2, 9)
}

export const extension = () => {
	const userAgent = window.navigator.userAgent
 	if( /firefox/i.test(userAgent) )
   	return 'jpg'
 	else if( /chrome/i.test(userAgent) )
   	return 'webp'
 	else if( /safari/i.test(userAgent) )
   	return 'jp2'
 	else if( /msie/i.test(userAgent) )
   	return 'jpg'
 	else
   	return 'jpg'
}