import qs from 'qs';

/**
 * Comments read
 */
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

export function incrementCommentPage( pageNum ) {
	return {
		type: 'INCREMENT_COMMENT_PAGE',
		commentsIsLoading: pageNum
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

/**
 * Comment write
*/
export function submitComment( comment ) {

	return ( dispatch ) => {
		dispatch( {
			type: 'COMMENT_SUBMIT_REQUEST',
			postId: comment.post,
		} );

		return submitCommentRequest( comment ).then( ( data ) => {
			dispatch( {
				type: 'COMMENT_SUBMIT_REQUEST_SUCCESS',
				comment: data,
				postId: comment.post,
			} );
			return data;
		} ).catch( ( error ) => {
			dispatch( {
				type: 'COMMENT_SUBMIT_REQUEST_FAILURE',
				postId: comment.post,
				error
			} );
			return error;
		} );
	};

}

export function submitCommentRequest( comment ) {

	const url = '/wp-json/wp/v2/comments';

	const headers = {
		'Accept': 'application/json',
		'X-WP-Nonce': r2d2Settings.nonce,
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	};

	return fetch( url, {
		method: 'POST',
		headers: headers,
		body: qs.stringify( comment ),
		mode: 'same-origin',
		credentials: 'include',
	} ).then( response => {
		return response.text().then( text => {
			let json;
			try {
				json = JSON.parse( text )
			} catch ( e ) {
				throw { message: text, code: response.status }
			}

			if ( response.status >= 300 ) {
				throw json
			} else {
				return json
			}
		} );
	} )

}