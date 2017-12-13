
function fetchMainContentSuccess( mainContent ) {

	return dispatch => {
		dispatch( {
			type: 'FETCH_MAIN_CONTENT',
			mainContent
		} )
	}
}

function fetchMainContentError() {
	return {
		type: 'FETCH_MAIN_CONTENT_ERROR'
	}
}

function setNumPosts( numPosts ) {
	return dispatch => {
		dispatch( {
			type: 'SET_NUM_POSTS',
			numPosts
		} )
	}
}

export function mainContentIsLoading( bool ) {
	return {
		type: 'MAIN_CONTENT_IS_LOADING',
		mainContentIsLoading: bool
	}
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
			.then( ( response ) => {
				dispatch( setNumPosts( response.headers.get( 'x-wp-total' ) ) );
				return response.json();
			} )
			.then( ( mainContent ) => dispatch( fetchMainContentSuccess( mainContent ) ) )
			.catch( () => dispatch( fetchMainContentError() ) );
	};
}