import React from 'react'
import { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
	getPage,
} from './pagePostActions'

class Page extends Component {

	componentDidMount() {
		this.props.getPage( '/wp-json/wp/v2/multiple-post-type?slug=' + this.props.match.params.pageSlug + '&type[]=post&type[]=page' )
	}

	render() {

		if ( ! this.props.page ) {
			return false;
		}

		const pageContent = this.props.page.content.rendered;

		return (
			<div >
				<div dangerouslySetInnerHTML={ {__html: pageContent} } />
			</div>
		);
	}
}

const mapStateToProps = function ( state ) {
	return {
		page: state.page.data
	}
}

const mapDispatchToProps = dispatch => bindActionCreators({
	getPage
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page)
