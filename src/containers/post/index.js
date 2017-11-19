import React from 'react'
import NotFound from '../notFound'
import Article from '../../components/article'
import { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { fetchMainContent } from '../app/appActions'

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
			this.props.fetchMainContent( '/wp-json/wp/v2/multiple-post-type?' + queryString + '&type[]=page&type[]=post' )
		}
	}

	render() {

		if ( this.props.mainContentIsLoading ) {
			return <div className="loader"></div>;
		}

		const content = this.props.mainContent ? <Article {...this.props.mainContent} /> : <NotFound />;

		return content;

	}
}

const mapStateToProps = function ( state ) {
	return {
		mainContentIsLoading: state.app.mainContentIsLoading,
		mainContent: state.app.mainContent[ 0 ]
	}
}

const mapDispatchToProps = dispatch => bindActionCreators( {
	fetchMainContent
}, dispatch )

export default withRouter( connect(
	mapStateToProps,
	mapDispatchToProps
)( Post ) )
