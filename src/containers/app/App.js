import React from 'react';
import { Component } from "react";
import { Route, Link, Switch, withRouter } from 'react-router-dom'
import PagePost from '../pagePost/pagePost'
import Term from '../term/Term'
import Nav from '../nav/Nav'
import Author from '../author/Author'
import r2d2 from '../r2d2/r2d2'
import '../../styles/App.css'
import { formatLink } from '../util/util'

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
			<div>

				<Nav />

				<main>

					<Route exact path="/" component={ r2d2 } />
					<Route exact path="/:pageSlug" component={ PagePost } />
					<Route exact path="/category/:termSlug" component={ Term } />
					<Route exact path="/author/:authorSlug" component={ Author } />

				</main>

			</div>
		);
	}
}

export default withRouter( App )
