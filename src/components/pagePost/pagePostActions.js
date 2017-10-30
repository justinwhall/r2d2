
function getPageFetchSuccess( data ) {
	return dispatch => {
		dispatch({
			type: 'GET_PAGE',
			data
		})
	}
}

export function getPage(url) {
    return (dispatch) => {

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((data) => dispatch(getPageFetchSuccess(data)))
    };
}