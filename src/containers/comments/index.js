import React from 'react'
import { Component } from "react";
import { Route, Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchComments, incrementCommentPage } from './commentsActions'
import { COMMENTS_PER_PAGE } from "../../constants/settings"
import Comment from './comment'
import CommentForm from './commentForm'

/**
 * Renders the comments for a post/page
 *
 * @class Comments
 * @extends {Component}
 */
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
		this.props.fetchComments( `/wp-json/wp/v2/comments?post=${ this.props.post.id }&page=${ this.props.page }&per_page=${ COMMENTS_PER_PAGE }&order=asc` )
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
		const loadMore = this.props.commentsLoaded < this.props.numComments ? <a href="#" onClick={ this.loadMoreComments } className="more-commentes button">More Comments</a> : null
		let commentsTitle = false;

		if ( this.props.numComments === 1 ) {
			commentsTitle = 'One Comment'
		} else if ( this.props.numComments > 1 ) {
			commentsTitle = `${ this.props.numComments } Comments`
		}


		return (
			<div className="comments">

				{ commentsTitle &&
					<div className="text-center m-bottom-6">
						<div className="comments-title h3">{ commentsTitle }</div>
						<div className="bar d-inline-block"></div>
					</div>
				}

				{ comments }
				{ loader }
				<div className="text-center">
					{ loadMore }
				</div>
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
