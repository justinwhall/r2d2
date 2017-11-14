const initialState = {
	termPosts: []
}

function term( state = initialState, action ) {

	switch (action.type) {

	case 'GET_TERM_POSTS':
		return {
			...state,
			termPosts: action.termPosts
		}

	  default:
		return state
	}
}

export default term;