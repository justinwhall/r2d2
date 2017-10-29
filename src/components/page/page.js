import React from 'react'
import { Component } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
	getPage,
} from './pageActions'

class Page extends Component {

	componentWillMount() {
		this.props.getPage( '/wp-json/wp/v2/pages?slug=' + this.props.match.params.pageSlug )
	}

	render() {

		if ( ! this.props.page ) {
			return false;
		}

		const pageContent = this.props.page.content.rendered;

		return (
			<div>
				<div dangerouslySetInnerHTML={ {__html: pageContent} } />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	page: state.page.data
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getPage
}, dispatch)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Page)
