import React from 'react'
import { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Article from '../../components/article/article'
import { fetchMainContent } from '../app/appActions'

class Author extends Component {

	componentWillMount() {
		this.props.fetchMainContent( '/wp-json/wp/v2/multiple-post-type?type[]=post&author_name=' + this.props.match.params.authorSlug )
	}

	getAuthorArticles() {

		const authorArticles = this.props.authorPosts.map( function ( item, i ) {
			return <Article key={ i } { ...item } />
		} );

		return authorArticles;
	}

	render() {

		console.log( this.props );

		const authorArticles = this.props.mainContentIsLoading ? <div className="loader"></div> : this.getAuthorArticles();

		return (
			<div>
				{ authorArticles }
			</div>
		);
	}
}

const mapStateToProps = state => ( {
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
