import React from 'react'
import NotFound from '../notFound'
import Comments from '../comments'
import Article from '../../components/article'
import { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Helmet } from "react-helmet"
import { fetchMainContent } from '../app/appActions'
import { SITE_TITLE } from "../../constants/settings"
import { withRouter } from 'react-router-dom'
import BodyClassName from 'react-body-classname';
import { fetchComments } from '../comments/commentsActions';


/**
 * Renders a post
 *
 * @class Post
 * @extends {Component}
 */
class Post extends Component {

	componentDidMount() {
		this.fetchContent();
	}

	componentDidUpdate( prevProps ) {
		let oldRoute = prevProps.location.pathname;
		let newRoute = this.props.location.pathname;

		if ( newRoute !== oldRoute ) {
			this.fetchContent()
		}
	}

	componentWillUnmount() {
		this.ignoreLastFetch = true
	}

	getQueryString() {

		let q;
		const { params } = this.props.match;

		if ( Object.keys( params ).length === 0 ) {
			// No params - show homepage
			q = 'slug=' + r2d2Settings.frontPage;
		} else if ( params.postSlug ) {
			// We have a postSlug - it's a post
			q = 'slug=' + params.postSlug;
		} else {
			// Else - it's a page
			q = 'pagename=' + this.props.match.params[ 0 ];
		}

		return q;
	}

	fetchContent() {
		if ( !this.ignoreLastFetch ) {
			const queryString = this.getQueryString()
			this.props.fetchMainContent( '/wp-json/wp/v2/multiple-post-type?' + queryString + '&type[]=page&type[]=post&_embed=true' )
		}
	}

	render() {

		const { mainContent, mainContentIsLoading, fetchError } = this.props

		if ( mainContentIsLoading || fetchError ) {
			return fetchError ? <div>Oops, something went wrong fetching this page. Beep. Boop. Beep.</div> : null
		}

		const content = mainContent ? <Article {...mainContent} /> : <NotFound />
		const title = mainContent ? mainContent.title.rendered : 'Page Not Found'
		const comments = ( mainContent && mainContent.comment_status === 'open' ) ? <Comments post={ mainContent } /> : null
		const postTypeClass = mainContent ? 'post-type-' + mainContent.type : null
		const classNames = postTypeClass + ' ' + mainContent.slug + ' ' + 'post' + mainContent.id

		return (
			<BodyClassName className={ classNames } >
				<div>
					<Helmet>
						<title>{ title + ' | ' + SITE_TITLE }</title>
					</Helmet>
					{ content }
					{ comments }
				</div>
			</BodyClassName>
		)

	}
}

const mapStateToProps = function ( state ) {
	return {
		mainContentIsLoading: state.app.mainContentIsLoading,
		mainContent: state.app.mainContent[ 0 ],
		fetchError: state.app.fetchError
	}
}

const mapDispatchToProps = dispatch => bindActionCreators( {
	fetchMainContent
}, dispatch )

export default withRouter( connect(
	mapStateToProps,
	mapDispatchToProps
)( Post ) )
