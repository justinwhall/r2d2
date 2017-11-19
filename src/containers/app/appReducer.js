const initialState = {
	mainContent: false,
	mainContentIsLoading: true
}

function app( state = initialState, action ) {

	switch ( action.type ) {

		case 'FETCH_MAIN_CONTENT':
			return {
				...state,
				mainContent: action.mainContent,
				mainContentIsLoading: false
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