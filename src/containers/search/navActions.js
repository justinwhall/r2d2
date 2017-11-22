
function navItemsFetchSuccess( navItems ) {
	return dispatch => {
		dispatch({
			type: 'GET_NAV_ITEMS',
			navItems
		})
	}
}

export function getNavItems(url) {
    return (dispatch) => {

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(navItemsFetchSuccess(items)))
            // .catch(() => dispatch(itemsHasErrored(true)));
    };
}