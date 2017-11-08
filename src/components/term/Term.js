import React from 'react'
import { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Article from '../article/article'

import {
  getTermPosts,
} from './termActions'

class Term extends Component {

	componentWillMount() {
		this.props.getTermPosts( 'http://r2d2.dev/wp-json/wp/v2/posts?category=' + this.props.match.params.termSlug )
	}

	getTermArticles() {

		const termArticles = this.props.termPosts.map( function ( item, i ) {
			return <Article key={ i } { ...item }  />
		} );

		return termArticles;
	}

	render() {

		const termPosts = this.getTermArticles();

		return (
			<div>
				{ termPosts }
			</div>
		);
	}
}

const mapStateToProps = state => ({
  termPosts: state.term.termPosts
})

const mapDispatchToProps = dispatch => bindActionCreators({
	getTermPosts
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Term)
