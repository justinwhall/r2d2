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

/**
 * Redners the WordPress attachment routes
 *
 * @class Attachment
 * @extends {Component}
 */
class Attachment extends Component {

	componentDidMount() {
		this.fetchMedia();
	}

	componentDidUpdate( prevProps ) {
		let oldRoute = prevProps.location.pathname;
		let newRoute = this.props.location.pathname;

		if ( newRoute !== oldRoute ) {
			this.fetchMedia()
		}
	}

	componentWillUnmount() {
		this.ignoreLastFetch = true
	}

	fetchMedia() {
		if ( !this.ignoreLastFetch ) {
			// const queryString = this.getQueryString()
			this.props.fetchMainContent( '/wp-json/wp/v2/media/' + this.props.match.params.mediaID + '?_embed=true' )
		}
	}

	render() {

		const { mainContent, mainContentIsLoading, fetchError } = this.props

		if ( mainContentIsLoading || fetchError ) {
			return fetchError ? <div>Oops, something went wrong fetching this page. Beep. Boop. Beep.</div> : null
		}

		const content = mainContent ? <Article {...mainContent} /> : <NotFound />

		return (
			<div className="post-type-attachment">
				<Helmet>
					<title>{ 'title' + ' | ' + SITE_TITLE }</title>
				</Helmet>
				<h1>{ content }</h1>
			</div>
		)

	}
}

const mapStateToProps = function ( state ) {
	return {
		mainContentIsLoading: state.app.mainContentIsLoading,
		mainContent: state.app.mainContent,
		fetchError: state.app.fetchError
	}
}

const mapDispatchToProps = dispatch => bindActionCreators( {
	fetchMainContent
}, dispatch )

export default withRouter( connect(
	mapStateToProps,
	mapDispatchToProps
)( Attachment ) )
