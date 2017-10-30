import React from 'react';
import { Route, Link, Switch } from 'react-router-dom'
import PagePost from '../pagePost/pagePost'
import { Component } from "react";
import { withRouter } from 'react-router-dom';
import Nav from '../nav/Nav'
import r2d2 from '../r2d2/r2d2'
import '../../styles/App.css'

const blogSlug = r2d2Settings.blogURI


class App extends Component {

	componentDidUpdate( prevProps ) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			this.onRouteChanged();
		}
	}

	onRouteChanged() {
		console.log("R2D2 says route changed. beep."); // TODO: only update route component if router actually changes.
	}

	render() {

		return (
			<div>

				<Nav />

				<main>

					<Route exact path="/" component={r2d2} />
					<Route exact path="/:pageSlug" component={ PagePost } key={this.props.location.key}  />

				</main>

			</div>
			);
		}
	}

export default withRouter(App)