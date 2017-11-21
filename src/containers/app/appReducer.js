import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = {
	mainContent: false,
	mainContentIsLoading: true,
	numPosts: 0
}

function app( state = initialState, action ) {

	switch ( action.type ) {

		case LOCATION_CHANGE:

			return {
				...state,
				mainContentIsLoading: true
			}

		case 'FETCH_MAIN_CONTENT':

			return {
				...state,
				mainContent: action.mainContent,
				mainContentIsLoading: false
			}

		case 'SET_NUM_POSTS':
			return {
				...state,
				numPosts: action.numPosts,
			}

		case 'MAIN_CONTENT_IS_LOADING':
			return {
				...state,
				mainContentIsLoading: true,
			}

		default:
			return state
	}
}

export default app;