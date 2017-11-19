import React from 'react'
import { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Excerpt from '../../components/excerpt'
import { fetchMainContent } from '../app/appActions'

class Blog extends Component {

	componentWillMount() {
		this.props.fetchMainContent( '/wp-json/wp/v2/posts' )
	}

	getblogArticles() {

		const blogArticles = this.props.blogPosts.map( function ( item, i ) {
			return <Excerpt key={ i } { ...item } />
		} );

		return blogArticles;
	}

	render() {

		const blogArticles = this.props.mainContentIsLoading ? <div className="loader"></div> : this.getblogArticles();

		return (
			<div>
				{ blogArticles }
			</div>
		);
	}
}

const mapStateToProps = state => ( {
	blogPosts: state.app.mainContent,
	mainContentIsLoading: state.app.mainContentIsLoading
} )

const mapDispatchToProps = dispatch => bindActionCreators( {
	fetchMainContent
}, dispatch )

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Blog )
