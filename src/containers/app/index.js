import React from 'react';
import { Component } from "react";
import { Route, Link, Switch, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { BLOG_PAGE } from '../../constants/settings'
import Post from '../post'
import Blog from '../blog'
import Term from '../term'
import Nav from '../nav'
import Author from '../author'
import NotFound from '../notFound'
import '../../styles/style.scss'

class App extends Component {

	updateBodyClass() {
		const bodyClass = this.props.isLoading ? 'isLoading' : 'loaded';
		document.getElementById( 'site-wrapper' ).classList = bodyClass;
	}

	render() {
		this.updateBodyClass();
		return (
			<div id="app">

				<Nav />

				{ this.props.isLoading && <div className="loader"></div> }

				<main className="main">

					<Switch>
						<Route path="/:url*" exact strict render={ props => <Redirect to={ `${ props.location.pathname }/` } /> } />
						<Route exact path="/" component={ Post } />
						<Route exact path="/category/:catSlug/page/:offSet" component={ Term } />
						<Route exact path="/category/:catSlug" component={ Term } />
						<Route exact path="/tag/:tagSlug" component={ Term } />
						<Route exact path="/author/:authorSlug/page/:offSet" component={ Author } />
						<Route exact path="/author/:authorSlug" component={ Author } />
						<Route exact path={ `/${ BLOG_PAGE }/page/:offSet` } component={ Blog } />
						<Route exact path={ `/${ BLOG_PAGE }/` } component={ Blog } />
						<Route exact path={ `/${ BLOG_PAGE }` } component={ Blog } />
						<Route exact path="/:postSlug" component={ Post } />
						<Route exact path="/**" component={ Post } />
						<Route component={ NotFound } />
					</Switch>

				</main>

			</div>
		)
	}
}



const mapStateToProps = function ( state ) {
	return {
		isLoading: state.app.mainContentIsLoading
	}
}

const mapDispatchToProps = dispatch => bindActionCreators( {
}, dispatch )

export default withRouter( connect(
	mapStateToProps,
	mapDispatchToProps
)( App ) )