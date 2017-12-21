import React from 'react'
import { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Excerpt from '../../components/excerpt'
import Title from '../../components/title'
import Pagination from '../pagination'
import { fetchMainContent } from '../app/appActions'
import { Helmet } from "react-helmet";
import { SITE_TITLE } from "../../constants/settings"

/**
 * Renders term routes
 *
 * @class Term
 * @extends {Component}
 */
class Term extends Component {

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
		// debugger;

		if ( params.hasOwnProperty( 'tagSlug' ) ) {
			// tags
			q = 'tag=' + params.tagSlug;
		} else {
			// Categories
			q = 'category_name=' + params.catSlug;
		}

		return q;
	}

	getTitle() {

		let title;
		const { params } = this.props.match;

		if ( params.hasOwnProperty( 'tagSlug' ) ) {
			// tags
			title = params.tagSlug.replace( /-/g, ' ' );
		} else {
			// Categories
			title = params.catSlug.replace( /-/g, ' ' );
		}

		return title;
	}

	fetchContent() {
		if ( !this.ignoreLastFetch ) {
			const queryString = this.getQueryString();
			this.props.fetchMainContent( '/wp-json/wp/v2/multiple-post-type?' + queryString + '&type[]=post&_embed=true' )
		}
	}

	getTermArticles() {

		const termArticles = this.props.termPosts.map( function ( item, i ) {
			return <Excerpt key={ i } { ...item } />
		} );

		return termArticles;
	}

	render() {

		const termPosts = this.props.mainContentIsLoading ? null : this.getTermArticles();
		const title = this.getTitle();

		return (
			<div>
				<Helmet>
					<title>{ title + ' | ' + SITE_TITLE }</title>
				</Helmet>
				<Title title={ title } subHead="Archive" />
				{ termPosts }
				<Pagination { ...this.props } />
			</div>
		);
	}
}

const mapStateToProps = state => ( {
	numPosts: state.app.numPosts,
	termPosts: state.app.mainContent,
	mainContentIsLoading: state.app.mainContentIsLoading
} )

const mapDispatchToProps = dispatch => bindActionCreators( {
	fetchMainContent
}, dispatch )

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Term )
