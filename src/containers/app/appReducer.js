import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = {
	mainContent: false,
	mainContentIsLoading: true,
	numPosts: 0
}

function app( state = initialState, action ) {

	switch ( action.type ) {

		case 'RESET_STATE':

			return initialState

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
				mainContentIsLoading: action.mainContentIsLoading
			}

		default:
			return state
	}
}

export default app;