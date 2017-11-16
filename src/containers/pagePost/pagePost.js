import React from 'react'
import { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router'
import { fetchMainContent } from '../app/appActions'

class Page extends Component {

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

	fetchContent() {
		if ( !this.ignoreLastFetch ) {
			this.props.fetchMainContent( '/wp-json/wp/v2/multiple-post-type?slug=' + this.props.match.params.pageSlug + '&type[]=post&type[]=page' )
		}
	}

	render() {
		debugger
		const content = this.props.mainContentIsLoading ? <div className="loader"></div> : <div dangerouslySetInnerHTML={ { __html: this.props.mainContent.content.rendered } } />

		return (
			<div >
				{ content }
			</div>
		);
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
)( Page ) )
