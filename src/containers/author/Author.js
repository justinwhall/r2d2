import React from 'react'
import { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Article from '../article/article'

import {
	getAuthorPosts,
} from './authorActions'

class Author extends Component {

	componentWillMount() {
		this.props.getAuthorPosts( '/wp-json/wp/v2/multiple-post-type?type[]=post&author_name=' + this.props.match.params.authorSlug )
	}

	getAuthorArticles() {

		const authorArticles = this.props.authorPosts.map( function ( item, i ) {
			return <Article key={ i } { ...item } />
		} );

		return authorArticles;
	}

	render() {

		const authorArticles = this.getAuthorArticles();

		return (
			<div>
				{ authorArticles }
			</div>
		);
	}
}

const mapStateToProps = state => ( {
	authorPosts: state.author.authorPosts
} )

const mapDispatchToProps = dispatch => bindActionCreators( {
	getAuthorPosts
}, dispatch )

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Author )
