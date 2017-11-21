import React from 'react'
import { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Excerpt from '../../components/excerpt'
import Pagination from '../pagination'
import { fetchMainContent } from '../app/appActions'

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

		const termPosts = this.props.mainContentIsLoading ? <div className="loader"></div> : this.getTermArticles();

		return (
			<div>
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
