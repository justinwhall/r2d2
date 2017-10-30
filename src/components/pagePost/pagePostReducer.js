const initialState = {}

function page( state = initialState, action ) {

	switch (action.type) {

	case 'GET_PAGE':
		return {
			...state,
			data: action.data[0]
		}

	  default:
		return state
	}
}

export default page;