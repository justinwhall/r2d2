const initialState = {
	comments: false,
	commentsIsLoading: true,
	numComments: 0,
	page: 1
}

function comments( state = initialState, action ) {

	switch ( action.type ) {

		case 'FETCH_COMMENTS':

			return {
				...state,
				comments: action.comments,
				commentsIsLoading: false
			}

		case 'SET_NUM_COMMENTS':

			return {
				...state,
				numComments: parseInt( action.numComments ),
			}

		case 'COMMENTS_IS_LOADING':

			return {
				...state,
				commentsIsLoading: action.commentsIsLoading
			}

		default:
			return state
	}
}

export default comments;