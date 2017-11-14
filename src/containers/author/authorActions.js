
function authorPostsFetchSuccess( authorPosts ) {
	return dispatch => {
		dispatch( {
			type: 'GET_AUTHOR_POSTS',
			authorPosts
		} )
	}
}

export function getAuthorPosts( url ) {
	return ( dispatch ) => {

		fetch( url )
			.then( ( response ) => {
				if ( !response.ok ) {
					throw Error( response.statusText );
				}

				return response;
			} )
			.then( ( response ) => response.json() )
			.then( ( authorPosts ) => dispatch( authorPostsFetchSuccess( authorPosts ) ) )
		// .catch(() => dispatch(itemsHasErrored(true)));
	};
}