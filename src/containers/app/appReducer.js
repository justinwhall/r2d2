import { LOCATION_CHANGE } from 'react-router-redux'

const initialState = {
	mainContent: false,
	isFirstLoad: true,
	mainContentIsLoading: true,
	numPosts: 0
}

function app( state = initialState, action ) {

	switch ( action.type ) {

		case 'RESET_STATE':

			return {
				...initialState,
				isFirstLoad: state.isFirstLoad
			}

		case 'FETCH_MAIN_CONTENT':

			return {
				...state,
				mainContent: action.mainContent,
				mainContentIsLoading: false,
				isFirstLoad: false
			}

		case 'FETCH_MAIN_CONTENT_ERROR':

			return {
				...state,
				mainContent: false,
				fetchError: true,
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