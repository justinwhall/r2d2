const initialState = {
	authorPosts: []
}

function author( state = initialState, action ) {

	switch ( action.type ) {

		case 'GET_AUTHOR_POSTS':
			return {
				...state,
				authorPosts: action.authorPosts
			}

		default:
			return state
	}
}

export default author;