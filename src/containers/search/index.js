import React from 'react'
import { Component } from "react";
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { fetchMainContent } from '../app/appActions'
import { Helmet } from "react-helmet"
import SearchForm from './form'
import Excerpt from '../../components/excerpt'
import { SITE_TITLE } from "../../constants/settings"

/**
 * Renders Search route
 *
 * @class Search
 * @extends {Component}
 */
class Search extends Component {

	constructor( props ) {
		super( props );

		this.getQueryValue = this.getQueryValue.bind( this );
		this.query = this.query.bind( this );
	}

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

	getSearchResults() {

		const searchResults = this.props.searchResults.map( function ( item, i ) {
			return <Excerpt key={ i } { ...item } />
		} );

		return searchResults.length ? searchResults : 'Nothing found...';
	}

	fetchContent() {
		if ( !this.ignoreLastFetch ) {
			this.props.fetchMainContent( '/wp-json/wp/v2/posts?_embed=true&search=' + this.getQueryValue() )
		}
	}

	query( event ) {
		event.preventDefault();

		const q = this.getQueryValue()
		const url = `/search/${ q }`;

		this.props.history.push( url );
	}

	getQueryValue() {

		let query
		const { params } = this.props.match

		if ( 'undefined' !== typeof this.refs.searchForm ) {

			query = this.refs.searchForm.getValue();

		} else if ( params.hasOwnProperty( 'query' ) ) {

			query = params.query.replace( /\+/g, ' ' );

		} else {

			query = '';

		}

		return query;
	}

	render() {

		if ( this.props.mainContentIsLoading ) {
			return null;
		}

		const query = this.props.match.params.query
		const initialQuery = this.getQueryValue()
		const results = initialQuery.length ? this.getSearchResults() : null
		const h1 = initialQuery.length ? `You searched for "${ initialQuery }"` : 'Go ahead and search for something'

		return (
			<div>
				<Helmet>
					<title>{ 'Search | ' + SITE_TITLE }</title>
				</Helmet>
				<h1> { h1 }</h1>

				<SearchForm ref='searchForm' initialQuery={ initialQuery } onSubmit={ this.query } />

				<div>
					{ results }
				</div>
			</div>
		)

	}
}

const mapStateToProps = function ( state, ownProps ) {
	return {
		mainContentIsLoading: state.app.mainContentIsLoading,
		searchResults: state.app.mainContent
	}
}

const mapDispatchToProps = dispatch => bindActionCreators( {
	fetchMainContent
}, dispatch )

export default withRouter( connect(
	mapStateToProps,
	mapDispatchToProps
)( Search ) )
