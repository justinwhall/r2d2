
function termPostsFetchSuccess( termPosts ) {
	return dispatch => {
		dispatch({
			type: 'GET_TERM_POSTS',
			termPosts
		})
	}
}

export function getTermPosts(url) {
    return (dispatch) => {

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                return response;
            })
            .then((response) => response.json())
            .then((termPosts) => dispatch(termPostsFetchSuccess(termPosts)))
            // .catch(() => dispatch(itemsHasErrored(true)));
    };
}