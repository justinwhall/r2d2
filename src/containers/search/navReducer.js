const initialState = {}

function nav( state = initialState, action ) {

	switch (action.type) {

	case 'GET_NAV_ITEMS':
		return {
			...state,
			navItems: action.navItems
		}

	  default:
		return state
	}
}

export default nav;