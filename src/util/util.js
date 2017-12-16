export function formatLink( url ) {

	if ( process.env.NODE_ENV === 'development' ) {
		// remove trailing slash if present
		var baseURL = CONFIG.baseURL.replace( /\/$/, '' );
	} else {
		var baseURL = window.r2d2Settings.URL.base;
	}

	// remove base URL
	url = url.replace( baseURL, '' );

	return url;
}

export function formatDate( timestamp ) {
	const date = new Date( timestamp )
	return date.toLocaleDateString();
}