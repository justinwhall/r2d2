import React from 'react';
import { Component } from "react";
import { Route, Link, Switch, withRouter, Redirect } from 'react-router-dom'
import { BLOG_PAGE } from '../../constants/settings'
import Post from '../post'
import Blog from '../blog'
import Term from '../term'
import Nav from '../nav'
import Author from '../author'
import NotFound from '../notFound'
import '../../styles/style.scss'


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
			<div id="site-wrapper">

				<Nav />

				<main>

					<Switch>
						<Route path="/:url*" exact strict render={ props => <Redirect to={ `${ props.location.pathname }/` } /> } />
						<Route exact path="/" component={ Post } />
						<Route exact path="/category/:catSlug" component={ Term } />
						<Route exact path="/tag/:tagSlug" component={ Term } />
						<Route exact path="/author/:authorSlug/page/:offSet" component={ Author } />
						<Route exact path="/author/:authorSlug" component={ Author } />
						<Route exact path={ `/${ BLOG_PAGE }/page/:offSet` } component={ Blog } />
						<Route exact path={ `/${ BLOG_PAGE }` } component={ Blog } />
						<Route exact path="/:postSlug" component={ Post } />
						<Route exact path="/**" component={ Post } />
						<Route component={ NotFound } />
					</Switch>

				</main>

			</div>
		);
	}
}

export default withRouter( App )
