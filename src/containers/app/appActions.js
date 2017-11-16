
function fetchMainContentSuccess( mainContent ) {
	return dispatch => {
		dispatch( {
			type: 'FETCH_MAIN_CONTENT',
			mainContent
		} )
	}
}

export function mainContentIsLoading( bool ) {
	return {
		type: 'MAIN_CONTENT_IS_LOADING',
		mainContentIsLoading: bool
	};
}

export function fetchMainContent( url ) {
	return ( dispatch ) => {

		dispatch( mainContentIsLoading( true ) );

		fetch( url )
			.then( ( response ) => {
				if ( !response.ok ) {
					throw Error( response.statusText );
				}

				return response;
			} )
			.then( ( response ) => response.json() )
			.then( ( mainContent ) => dispatch( fetchMainContentSuccess( mainContent ) ) )
		// .catch(() => dispatch(itemsHasErrored(true)));
	};
}