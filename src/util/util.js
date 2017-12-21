/**
 * Turns a URL into a URI for use in <Link> component
 *
 * @export
 * @param {string} url
 * @returns
 */
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

/**
 * Formats a time stamp into a date
 *
 * @export
 * @param {string} timestamp
 * @returns
 */
export function formatDate( timestamp ) {
	const date = new Date( timestamp )
	return date.toLocaleDateString();
}