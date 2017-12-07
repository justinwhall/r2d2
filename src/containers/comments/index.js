import React from 'react'
import { Component } from "react";
import { Route, Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchComments, incrementCommentPage } from './commentsActions'
import Comment from './comment'
import CommentForm from './commentForm'

class Comments extends Component {

	constructor( props ) {
		super( props )
		this.loadMoreComments = this.loadMoreComments.bind( this )
	}

	componentDidMount() {
		this.fetchComments()
	}

	componentDidUpdate( nextProps ) {
		if ( nextProps.page !== this.props.page ) {
			this.fetchComments()
		}
	}

	loadMoreComments( e ) {
		e.preventDefault();
		this.props.incrementCommentPage();
	}

	componentWillUnmount() {
		this.ignoreLastFetch = true
	}

	fetchComments() {
		this.props.fetchComments( `/wp-json/wp/v2/comments?post=${ this.props.post.id }&page=${ this.props.page }&per_page=25` )
	}

	renderComments() {
		const comments = this.props.comments.map( function ( item, i ) {
			return <Comment key={ i } { ...item } />
		} );

		return comments;
	}

	render() {
		const loader = this.props.isLoading ? <div className="loader comment-loader"></div> : null
		const comments = this.renderComments()
		const loadMore = this.props.commentsLoaded < this.props.numComments ? <a href="#" onClick={ this.loadMoreComments } className="More Comments btn">More Comments</a> : null
		let commentsTitle = null

		if ( this.props.numComments == 1 ) {
			commentsTitle = 'One Comment'
		} else {
			commentsTitle = `${ this.props.numComments } Comments`
		}

		return (
			<div className="comments">
				<div className="comments-title h3">{ commentsTitle }</div>
				<div className="bar"></div>
				{ comments }
				{ loader }
				{ loadMore }
				<CommentForm postID={ this.props.post.id } />
			</div>
		);
	}
}

const mapStateToProps = state => ( {
	page: state.comments.page,
	comments: state.comments.comments,
	commentsLoaded: state.comments.commentsLoaded,
	numComments: state.comments.numComments,
	isLoading: state.comments.commentsIsLoading,
} )

const mapDispatchToProps = dispatch => bindActionCreators( {
	fetchComments,
	incrementCommentPage
}, dispatch )

export default withRouter( connect(
	mapStateToProps,
	mapDispatchToProps
)( Comments ) )
