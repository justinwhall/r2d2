import React from 'react'
import { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { POSTS_PER_PAGE, BLOG_PAGE } from "../../constants/settings"
import Excerpt from '../../components/excerpt'
import Pagination from '../pagination'
import Title from '../../components/title'
import { fetchMainContent } from '../app/appActions'
import { Helmet } from "react-helmet";
import { SITE_TITLE } from "../../constants/settings"

/**
 * Renders the posts routes
 *
 * @class Blog
 * @extends {Component}
 */
class Blog extends Component {

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

	getblogArticles() {

		const blogArticles = this.props.blogPosts.map( function ( item, i ) {
			return <Excerpt key={ i } { ...item } />
		} );

		return blogArticles;
	}

	fetchContent() {
		if ( !this.ignoreLastFetch ) {
			let offSet = this.props.match.params.offSet ? this.props.match.params.offSet : 1;
			this.props.fetchMainContent( '/wp-json/wp/v2/posts?page=' + offSet + '&per_page=' + POSTS_PER_PAGE + '&_embed=true' )
		}
	}

	render() {

		// No response yet, show loader
		if ( this.props.mainContentIsLoading ) {
			return null
		}

		const blogArticles = this.getblogArticles();
		const title = BLOG_PAGE ? BLOG_PAGE.replace( /-/g, ' ' ) : 'Blog';

		return (
			<div className="blog-view">
				<Helmet>
					<title>{ title + ' | ' + SITE_TITLE }</title>
				</Helmet>
				<Title title={ title } />
				{ blogArticles }
				<Pagination { ...this.props } />
			</div>
		);
	}
}

const mapStateToProps = state => ( {
	numPosts: state.app.numPosts,
	blogPosts: state.app.mainContent,
	mainContentIsLoading: state.app.mainContentIsLoading
} )

const mapDispatchToProps = dispatch => bindActionCreators( {
	fetchMainContent
}, dispatch )

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Blog )
