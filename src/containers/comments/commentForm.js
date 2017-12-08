import React from 'react'
import { Component } from "react";
import { Route, Link, withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { submitComment } from './commentsActions'

class CommentForm extends Component {

	constructor( props ) {
		super( props )

		this.state = {
			message: false,
			error: false
		}
	}

	onSubmit( e ) {
		e.preventDefault();
		e.persist();

		let keys = [ 'author', 'author_id', 'email', 'url', 'comment', 'comment_post_ID', 'comment_parent' ];
		let rawValues = {};

		keys.map( function ( key ) {
			if ( e.target[ key ] ) {
				rawValues[ key ] = e.target[ key ].value;
			}
		} );

		let values = {};
		values.author = rawValues.author_id;
		values.author_email = rawValues.email;
		values.author_name = rawValues.author;
		values.author_url = rawValues.url;
		values.content = rawValues.comment;
		values.post = rawValues.comment_post_ID;

		// Remove the `author` param if the user is not logged in
		if ( !parseInt( rawValues.author_id, 10 ) ) {
			delete values.author;
		}

		const submission = this.props.submitComment( values );
		submission.then( ( response ) => {

			if ( !response ) {
				return;
			}

			if ( response.code ) {
				this.setState( {
					message: false,
					error: this.getErrorMessage( response.code )
				} );
			} else {
				// Clear the comment form on successful posts
				e.target.comment.value = '';
				this.setState( {
					message: ( 'hold' === response.status ) ? 'Comment submitted, pending approval.' : 'Comment posted.',
					error: false,
				} );
			}

			// remove feedback error/message after 600ms
			setTimeout( () => {
				this.setState( { message: false, error: false } );
			}, 6000 );
		} );

	}

	getErrorMessage( code ) {
		switch ( code ) {
			case 'comment_duplicate':
				return 'Duplicate comment detected; it looks as though you’ve already said that!';
			case 'comment_flood':
				return 'You\'re commenting too often, please wait before posting again.';
			default:
				return 'Something went wrong when posting your comment, please try again.';
		}
	}

	renderAnonFields() {
		return (
			<div>
				<div className="comment-form-required" key="1">
					<div className="comment-form-field comment-form-author">
						<label htmlFor="author">Name*</label>
						<input id="author" name="author" type="text" aria-required="true" required="required" />
						<input id="author_id" name="author_id" type="hidden" value={ r2d2Settings.user } />
					</div>
					<div className="comment-form-field comment-form-email">
						<span id="email-notes">Your email address will not be published.</span>
						<label htmlFor="email">Email*</label>
						<input id="email" name="email" type="email" aria-describedby="email-notes" aria-required="true" required="required" />
					</div>
				</div>

				<div className="comment-form-field comment-form-url" key="2">
					<label htmlFor="url">Website</label>
					<input id="url" name="url" type="url" />
				</div>
			</div>
		)
	}

	renderAuthedNotice() {
		return (
			<div className="loggedin-notice">
				Logged in as { r2d2Settings.userDisplay }.
			</div>
		)
	}

	render() {

		const error = this.state.error ? <div className="error-block" aria-hidden="true">{ this.state.error }</div> : null
		const message = this.state.message ? <div className="info-block" aria-hidden="true">{ this.state.message }</div> : null

		return (
			<div className="form-wrap">

				<form onSubmit={ this.onSubmit.bind( this ) }>
					<div className="text-center m-bottom-6 m-top-8">
						<div className="h3">Leave a reply</div>
						<div className="bar d-inline-block"></div>
					</div>

					{ error }

					{ message }

					{ r2d2Settings.user === 0 ? this.renderAnonFields() : this.renderAuthedNotice() }

					<div className="comment-form-field comment-form-comment">
						<label htmlFor="comment">Comment*</label>
						<textarea ref="content" id="comment" name="comment" aria-required="true" required="required" />
					</div>

					<div className="comment-form-submit form-submit">
						<input type="submit" name="submit" id="submit" className="submit" value="Post Comment" disabled={ this.props.isSubmitting } />
						<input type="hidden" name="comment_post_ID" id="comment_post_ID" value={ this.props.postID } />
						<input type="hidden" name="comment_parent" id="comment_parent" defaultValue={ 0 } />
					</div>

				</form>
			</div>
		)
	}
}

const mapStateToProps = state => ( {

} )

const mapDispatchToProps = dispatch => bindActionCreators( {
	submitComment
}, dispatch )

export default withRouter( connect(
	mapStateToProps,
	mapDispatchToProps
)( CommentForm ) )