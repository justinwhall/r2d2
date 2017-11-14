const initialState = { isLoading: true }

function page( state = initialState, action ) {

	switch (action.type) {

		case 'GET_PAGE':
			return {
				...state,
				isLoading: false,
				data: action.data[0]
			}

		case 'PAGE_IS_LOADING':
			return {
				...state,
				isLoading: true,
			}

		default:
			return state
	}
}

export default page;