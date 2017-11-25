import React from 'react'
import { Component } from "react";
import { Route, Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchComments } from './commentsActions'
import Comment from './comment'

class Comments extends Component {

	constructor( props ) {
		super( props )
		this.fetchComments = this.fetchComments.bind( this )
	}

	componentDidMount() {
		this.fetchComments()
	}

	componentDidUpdate( prevProps ) {
		console.log( prevProps );

		// let oldRoute = prevProps.location.pathname;
		// let newRoute = this.props.location.pathname;

		// if ( newRoute !== oldRoute ) {
		// 	this.fetchContent()
		// }
	}

	loadMoreComments( e ) {
		e.preventDefault();
		console.log( this );
	}

	componentWillUnmount() {
		this.ignoreLastFetch = true
	}

	fetchComments() {
		// debugger
		this.props.fetchComments( `/wp-json/wp/v2/comments?post=${ this.props.post.id }&page=${ this.props.page }` )
	}

	renderComments() {
		const comments = this.props.comments.map( function ( item, i ) {
			return <Comment key={ i } { ...item } />
		} );

		return comments;
	}

	render() {

		if ( this.props.isLoading ) return <div className="loader comment-loader"></div>
		const comments = this.renderComments()

		return (
			<div className="comments">
				{ comments }
				<a href="#" className="More Comments btn">More Comments</a>
			</div>
		);
	}
}

const mapStateToProps = state => ( {
	page: state.comments.page,
	comments: state.comments.comments,
	numComments: state.comments.numComments,
	isLoading: state.comments.commentsIsLoading,
} )

const mapDispatchToProps = dispatch => bindActionCreators( {
	fetchComments
}, dispatch )

export default connect(
	mapStateToProps,
	mapDispatchToProps
)( Comments )
