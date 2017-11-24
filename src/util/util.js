export function formatLink( url ) {

	if ( process.env.NODE_ENV === 'development' ) {
		// remove trailing slash if present
		const baseURL = CONFIG.baseURL.replace( /\/$/, '' );
		// remove base URL
		url = url.replace( baseURL, '' );
	}

	return url;
}