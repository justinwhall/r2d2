import React from 'react';
import { Component } from "react";
import { Route, Link, Switch, withRouter } from 'react-router-dom'
import Post from '../post'
import Term from '../term'
import Nav from '../nav'
import Author from '../author'
import r2d2 from '../r2d2'
import '../../styles/App.scss'

const style = {
	'fontFamily': 'Arial, Helvetica, sans-serif',
	'color': 'rgb( 94, 94, 94 )',
	'maxWidth': '900px',
	'margin': '0 auto',
	'padding': '20px',
	'background': '#fff',
}

class App extends Component {

	constructor( props ) {
		super( props );

		this.state = {
			locationKey: this.props.location.key
		};

	}

	componentDidUpdate( prevProps ) {
		if ( this.props.location.pathname !== prevProps.location.pathname ) {
			this.onRouteChanged();
		}
	}

	onRouteChanged() {
		this.setState( {
			locationKey: this.props.location.key
		} )
	}

	render() {

		return (
			<div style={ style }>

				<Nav />

				<main>

					<Route exact path="/" component={ Post } />
					<Route exact path="/category/:termSlug" component={ Term } />
					<Route exact path="/author/:authorSlug" component={ Author } />
					<Route exact path="/page/**" component={ Post } />
					<Route exact path="/:postSlug" component={ Post } />

				</main>

			</div>
		);
	}
}

export default withRouter( App )
