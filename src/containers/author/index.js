import React from 'react'
import { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Excerpt from '../../components/excerpt'
import Pagination from '../pagination'
import { fetchMainContent } from '../app/appActions'
import { Helmet } from "react-helmet"
import { SITE_TITLE } from "../../constants/settings"

class Author extends Component {

	componentDidMount() {
		this.fetchContent();
	}

	componentDidUpdate( prevProps ) {
		let oldRoute = prevProps.location.pathname;
		let newRoute = this.props.location.pathname;

		if ( newRoute !== oldRoute ) {
			this.fetchContent()
			console.log( this.props );

		}
	}

	componentWillUnmount() {
		this.ignoreLastFetch = true
	}

	getAuthorArticles() {

		const authorArticles = this.props.authorPosts.map( function ( item, i ) {
			return <Excerpt key={ i } { ...item } />
		} );

		return authorArticles;
	}

	fetchContent() {
		if ( !this.ignoreLastFetch ) {
			let offSet = this.props.match.params.offSet ? this.props.match.params.offSet : 1;
			this.props.fetchMainContent( '/wp-json/wp/v2/multiple-post-type?type[]=post&author_name=' + this.props.match.params.authorSlug + '&page=' + offSet + '&_embed=true' )
		}
	}

	render() {

		const authorArticles = this.props.mainContentIsLoading ? <div className="loader"></div> : this.getAuthorArticles();

		return (
			<div>
				<Helmet>
					<title>{ this.props.match.params.authorSlug.replace( /-/g, ' ' ) + ' | Author at ' + SITE_TITLE }</title>
				</Helmet>
				{ authorArticles }
				<Pagination { ...this.props } />
			</div>
		);
	}
}

const mapStateToProps = state => ( {
	numPosts: state.app.numPosts,
	authorPosts: state.app.mainContent,
	mainContentIsLoading: state.app.mainContentIsLoading
} )

const mapDispatchToProps = dispatch => bindActionCreators( {
	fetchMainContent
}, dispatch )

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Author )
