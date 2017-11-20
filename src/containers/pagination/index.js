import React from 'react'
import { Component } from "react"
import { POSTS_PER_PAGE, BLOG_PAGE } from "../../constants/settings"
import { Route, Link } from 'react-router-dom'

class Pagination extends Component {

	getNextLink() {
		const { params } = this.props.match;
		const pathName = this.props.location.pathname;
		const hasOffset = params.hasOwnProperty( 'offSet' );
		const nextPage = hasOffset ? parseInt( params.offSet ) + 1 : 2;
		const path = hasOffset ? pathName.replace( params.offSet, nextPage ) : pathName + 'page/' + nextPage + '/';

		// Out of pages  - no need for nextPage link
		if ( hasOffset && params.offSet * POSTS_PER_PAGE > parseInt( this.props.numPosts ) ) {
			return null
		}

		return <Link className="float-right" to={ path } >Next Page</Link>
	}

	getPrevLink() {
		const { params } = this.props.match;
		const pathName = this.props.location.pathname;
		const prevPage = params.hasOwnProperty( 'offSet' ) ? parseInt( params.offSet ) - 1 : 0;
		const path = prevPage == 1 ? pathName.replace( 'page/' + params.offSet + '/', '' ) : pathName.replace( params.offSet, prevPage );
		const prevLink = prevPage ? <Link className="float-left" to={ path } >Previous Page</Link> : null;

		return prevLink;
	}

	render() {

		const prevPage = this.getPrevLink()
		const nextPage = this.getNextLink()

		return (
			<div className="pagination clear-fix o-hidden">
				{ prevPage }
				{ nextPage }
			</div>
		);
	}
}

export default Pagination;