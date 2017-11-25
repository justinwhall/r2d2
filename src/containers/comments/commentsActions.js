
function fetchCommentsSuccess( comments ) {

	return dispatch => {
		dispatch( {
			type: 'FETCH_COMMENTS',
			comments
		} )
	}
}

function setNumComments( numComments ) {
	return dispatch => {
		dispatch( {
			type: 'SET_NUM_COMMENTS',
			numComments
		} )
	}
}

export function commentsIsLoading( bool ) {
	return {
		type: 'COMMENTS_IS_LOADING',
		commentsIsLoading: bool
	};
}

export function fetchComments( url ) {

	return ( dispatch ) => {

		dispatch( commentsIsLoading( true ) );

		fetch( url )
			.then( ( response ) => {
				if ( !response.ok ) {
					throw Error( response.statusText );
				}
				return response;
			} )
			.then( ( response ) => {
				dispatch( setNumComments( response.headers.get( 'x-wp-total' ) ) );
				return response.json();
			} )
			.then( ( comments ) => dispatch( fetchCommentsSuccess( comments ) ) )
		// .catch(() => dispatch(itemsHasErrored(true)));
	};
}