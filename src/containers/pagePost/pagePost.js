import React from 'react'
import { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import {
	getPage,
} from './pagePostActions'

class Page extends Component {

	componentDidMount() {
		this.fetchContent();
	}

	componentDidUpdate( prevProps ) {

		let oldRoute = prevProps.location.pathname;
		let newRoute = this.props.location.pathname;

		if ( newRoute !== oldRoute ) {
			this.fetchContent()
			console.log( 'fetch' );
		}

	}

	componentWillUnmount() {
		this.ignoreLastFetch = true
	}

	fetchContent() {
		if ( !this.ignoreLastFetch ) {
			this.props.getPage( '/wp-json/wp/v2/multiple-post-type?slug=' + this.props.match.params.pageSlug + '&type[]=post&type[]=page' )
		}
	}

	render() {

		if ( this.props.isLoading ) {
			return (
				<div className="loader"></div>
			)
		}

		const pageContent = this.props.page.content.rendered;

		return (
			<div >
				{ <div dangerouslySetInnerHTML={ { __html: pageContent } } /> }
			</div>
		);
	}
}

const mapStateToProps = function ( state ) {
	return {
		page: state.page.data,
		isLoading: state.page.isLoading
	}
}

const mapDispatchToProps = dispatch => bindActionCreators( {
	getPage
}, dispatch )

export default withRouter( connect(
	mapStateToProps,
	mapDispatchToProps
)( Page ) )
