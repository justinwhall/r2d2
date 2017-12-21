import React from 'react'
import { Component } from "react"
import { POSTS_PER_PAGE, BLOG_PAGE, HOME_IS_BLOG } from "../../constants/settings"
import { Route, Link } from 'react-router-dom'

/**
 * Renders pagination for posts route(s)
 *
 * @class Pagination
 * @extends {Component}
 */
class Pagination extends Component {

	getNextLink() {
		const { params } = this.props.match;
		const pathName = HOME_IS_BLOG ? 'blog/' : this.props.location.pathname;
		const hasOffset = params.hasOwnProperty( 'offSet' );
		const nextPage = hasOffset ? parseInt( params.offSet ) + 1 : 2;
		const path = hasOffset ? pathName.replace( params.offSet, nextPage ) : pathName + 'page/' + nextPage + '/';

		// Out of pages or all posts fit on one page  - no need for nextPage link
		if ( hasOffset && params.offSet * POSTS_PER_PAGE > parseInt( this.props.numPosts ) || POSTS_PER_PAGE >= this.props.numPosts ) {
			return null
		}

		return <Link className="float-right" to={ path } >Next &#9658;</Link>
	}

	getPrevLink() {
		const { params } = this.props.match;
		const prevPage = params.hasOwnProperty( 'offSet' ) ? parseInt( params.offSet ) - 1 : 0;
		const pathName = ( prevPage == 1 && HOME_IS_BLOG ) ? '/' : this.props.location.pathname;
		const path = prevPage == 1 ? pathName.replace( 'page/' + params.offSet + '/', '' ) : pathName.replace( params.offSet, prevPage );
		const prevLink = prevPage ? <Link className="float-left" to={ path } >&#9668; Previous</Link> : null;

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