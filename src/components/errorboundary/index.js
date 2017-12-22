import React from 'react'
import { Component } from "react";

class ErrorBoundary extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			hasError: false,
			error: false,
			info: false
		};
	}

	componentWillReceiveProps( prevProps, prevState ) {
		this.setState( {
			hasError: false,
			error: false,
			info: false
		} );
	}

	componentDidCatch( error, info ) {
		this.setState( {
			hasError: true,
			error: error,
			info: info
		} );
	}

	getDevBoundary() {
		return (
			<div id="dev-error-boundary">
				<div className="container">
					<h1>Runtime Error</h1>
					<div className="well">
						<h4>Error Message</h4>
						{ this.state.error.message }
					</div>
					<div className="well">
						<h4>Error Stack</h4>
						{ this.state.error.stack }
					</div>
					<div className="well">
						<h4>Component Stack</h4>
						<div className="post-content" dangerouslySetInnerHTML={ { __html: this.state.info.componentStack } }></div>
					</div>
				</div>
			</div>
		)
	}

	getProdBoundary() {
		return (
			<div className="text-center" id="runtime-error" >
				<div>Oops, something went wrong</div>
				<a href="/" >Start Over?</a>
			</div>
		)
	}

	render() {
		if ( this.state.hasError ) {
			var boundary;

			if ( process.env.NODE_ENV === 'development' ) {
				boundary = this.getDevBoundary()
			} else {
				boundary = this.getProdBoundary()
			}

			return boundary;

		}
		return this.props.children;
	}
}

export default ErrorBoundary;
